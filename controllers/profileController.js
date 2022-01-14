if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}
let userData = require("../models/userData");
let postData = require("../models/postData");

exports.postSignupProfile = (req, res, next) => {
  console.log("#####when you click sign up#########");
  console.log(req.body);
  let userData = {};
  userData.name = req.body.firstName + " " + req.body.lastName;
  userData.email = req.body.email;
  userData.pwd = req.body.pwd1;
  userCheckByEamil(userData.email).then((data) => {
    if (!data.length) {
      res.render("registration_curtis", {
        pageTitle: "KnowledgeBase",
        curtisCSS: true,
        userData: userData,
      });
    } else {
      let errorMessage = "email already exists!";
      res.render("login_curtis", {
        pageTitle: "KnowledgeBase",
        curtisCSS: true,
        errorSignupMessage: errorMessage,
      });
      console.log("alert to browser");
    }
  });
};
exports.postRegistrationProfile = (req, res, next) => {
  console.log(req.body);
  data = {};
  data.name = req.body.name;
  data.email = req.body.email;
  data.pwd = req.body.pwd;
  data.img_url = req.body.imageurl;
  data.description = req.body.description;
  data.country = req.body.country;
  data.dob = req.body.dob;
  addToDatabase(data).then(() => {
    userData.getUserIdByEmail(req.body.email).then(([rows, fieldData]) => {
      let id = rows[0].id;
      localStorage.setItem("id", id);
      // console.log(localStorage.getItem('id'));
    });
    res.redirect("/home");
  });
};
exports.postLoginProfile = (req, res, next) => {
  console.log("login ", req.body);
  data = {};
  data.email = req.body.email;
  data.pwd = req.body.pwd;
  userLogin(data.email, data.pwd).then((data) => {
    if (data.length) {
      userData.getUserIdByEmail(req.body.email).then(([rows, fieldData]) => {
        let id = rows[0].id;
        localStorage.setItem("id", id);
        console.log(localStorage.getItem("id"));
      });
      res.redirect("/home");
    } else {
      let errorMessage = "please check your email or password!";
      res.render("login_curtis", {
        pageTitle: "KnowledgeBase",
        curtisCSS: true,
        errorLoginMessage: errorMessage,
      });
      console.log("alert to browser");
    }
  });
};

function userCheckByEamil(email) {
  return new Promise(function (resolve, reject) {
    userData.getUserByEmail(email).then((data) => resolve(data[0]));
  });
}

function userLogin(email, pwd) {
  return new Promise(function (resolve, reject) {
    userData.getUserByEmailAndPWD(email, pwd).then((data) => resolve(data[0]));
  });
}

function addToDatabase(data) {
  return new Promise(function (resolve, reject) {
    userData.addUser(data);
    resolve(data);
  });
}
exports.getAllPeople = (req, res, next) => {
  let Peoples = userData.getall();
  Peoples.then(([rows, fieldData]) => {
    res.render("peoples", { people: rows, peoplesCSS: true });
  });
};

exports.getPeople = (req, res, next) => {
  let id = req.params.id;
  let People = userData.getUser(id);
  People.then(([data, metadata]) => {
    console.log(data[0].id);
    let postNumber = 0;
    postData.getNumberOfRowsByID(id).then((data) => {
      postNumber = data[0][0].num;
    });
    let likesnumber = data[0].likes;
    userData.getPostsByUserID2(data[0].id).then(([rows, fieldData]) => {
      let postsByUserData = rows;
      res.render("people", {
        people: data[0],
        peopleProfileCSS: true,
        curtisCSS: true,
        postNumber: postNumber,
        likesnumber: likesnumber,
        postsByUserData: postsByUserData,
        postsByUserDataHasData: postsByUserData.length > 0,
      });
    });
  });
};

exports.getPostsFromUser = (req, res, next) => {
  let id = req.params.id;
  let Posts = userData.getPostsFromUser(id);
  console.log(req.params);

  Posts.then(([data, metadata]) => {
    res.render("people", { post: data[0] });
  });
};

exports.addLike = (req, res, next) => {
  let id = req.params.id;

  userData.addLike(id);
  res.redirect(`/profiles/${id}`);
};
// function getTop5Post() {
//     return new Promise(function (resolve, reject) {
//         postData.getTop5Post().then(([rows, fieldData]) => {
//             resolve(rows)
//         })
//     })
// }
// function foo(array){
//     return new Promise(function(resolve, reject){
//         postData.getTop5Post().then(rows => {
//             rows[0].forEach(element => {
//                 userData.getImagebyID(element.author_id).then(img => {
//                     let obj = {}
//                     obj.id = element.id
//                     obj.date = element.date
//                     obj.title = element.title
//                     obj.topic = element.topic
//                     obj.description = element.description
//                     obj.ima_url = img[0][0].img_url
//                     console.log(obj)
//                     array.push(obj)
//                 })
//             })
//         })
//         resolve(array)
//     })
// }
