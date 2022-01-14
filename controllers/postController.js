const postModel = require("../models/postData");
const userData = require("../models/userData");
const messageData = require("../models/messageData");

exports.getAllPosts = (req, res, next) => {
  let Posts = postModel.getAllPosts();
  Posts.then(([rows, fieldData]) => {
    let allPostData = rows;
    console.log(localStorage.getItem("id"));
    let id = localStorage.getItem("id");
    let postNumber = 0;
    postModel.getNumberOfRowsByID(id).then((data) => {
      postNumber = data[0][0].num;
    });
    let messageNumber = 0;
    messageData.getNumberOfRecievedMSGByID(id).then((data) => {
      messageNumber = data[0][0].num;
    });

    userData.getUserByID(id).then(([rows, fieldData]) => {
      console.log(rows);
      let userData = rows;
      res.render("all_posts", {
        people: rows,
        peoplesCSS: true,
        curtisCSS: true,
        userData: userData[0],
        people: allPostData,
        postNumber: postNumber,
        messageNumber: messageNumber,
      });
    });
  });
}; //sdsdsd

exports.getAllPostsHome = (req, res, next) => {
  let Posts = postModel.getAllPosts();
  Posts.then(([rows, fieldData]) => {
    let allPostData = rows;
    console.log(localStorage.getItem("id"));
    let id = localStorage.getItem("id");
    let postNumber = 0;
    postModel.getNumberOfRowsByID(id).then((data) => {
      postNumber = data[0][0].num;
    });
    let messageNumber = 0;
    messageData.getNumberOfRecievedMSGByID(id).then((data) => {
      messageNumber = data[0][0].num;
    });
    userData.getUserByID(id).then(([rows, fieldData]) => {
      console.log(rows);
      let userData = rows;
      res.render("home_johnny", {
        people: rows,
        peoplesCSS: true,
        curtisCSS: true,
        userData: userData[0],
        people: allPostData,
        postNumber: postNumber,
        messageNumber: messageNumber,
      });
    });
  });
};

exports.postDiscussionRequest = (req, res, next) => {
  let p_subject = req.body.subject;
  let p_topic = req.body.topic;
  let p_desc = req.body.explain;
  let p_author = localStorage.getItem("id");
  let pOject = {
    subject: p_subject,
    about: p_desc,
    topic: p_topic,
    author: p_author,
  };

  postModel.add(pOject);
  res.redirect(301, "/home");
};

exports.postReplyRequest = (req, res, next) => {
  let p_subject = req.body.replyText;
  let p_topic = req.body.postID;
  console.log(req.body);

  let pOject = {
    desc: p_subject,
    author: localStorage.getItem("id"),
    topic: p_topic,
  };

  postModel.addReply(pOject);
  res.redirect(301, "/all_posts");
};
