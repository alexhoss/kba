let db = require('../util/database');
// Add a single individual to the database
function addUser(data) {
    let sql = "Insert into users (name, email, pwd, img_url, country, dob, description) values ('" + data.name + "','" + data.email + "','" + data.pwd + "','" + data.img_url + "','" + data.country + "','" + data.dob + "','" + data.description + "')";
    return db.execute(sql);
}
// Gets all the individuals in the database
function getAllUser() {
    let sql = "SELECT * FROM users";
    return db.execute(sql);
}
// Gets a specific individual from the database
function getUserByEmail(email) {
    let sql = `Select * from users where email = "${email}"`
    return db.execute(sql)
}

function getUserByEmailAndPWD(email, pwd) {
    let sql = `Select * from users where email = "${email}" and pwd = "${pwd}"`
    return db.execute(sql)
}

function getUserByImageURL(imgurl) {
    let sql = `Select * from users where img_url = "${imgurl}"`
    return db.execute(sql)
}

function getUserByID(id) {
    let sql = "Select * from users where id = " + id + " LIMIT 1";
    return db.execute(sql);
}

function getPostsByUserID(id) {
    let sql = "Select * from posts where author_id = " + id;
    return db.execute(sql);
}

function getPostsByUserID2(id) {
    let sql = `Select * from posts LEFT JOIN users ON posts.author_id = users.id WHERE users.id = ${id}`;
    return db.execute(sql);
}

function updateUser(id) {
    let sql = "";
    return db.execute(sql)
}

function getImagebyID(id) {
    let sql = `Select img_url from users where id = "${id}" LIMIT 1`
    return db.execute(sql)
}

function getUserIdByEmail(email) {
    let sql = `Select id from users where email = "${email}" LIMIT 1`
    return db.execute(sql)
}

function getLikes(id) {
    let sql = `Select likes from users where id = "${id}"`
    return db.execute(sql)
}

function incLike(id) {

    let sql = `UPDATE users SET likes = likes + 1 where id= "${id}"`;
    console.log(sql);
    return db.execute(sql)
}

function getNamebyID(id) {
    let sql = `Select name from users where id = "${id}" LIMIT 1`
    return db.execute(sql)
}
module.exports = {
    addUser: addUser,
    getall: getAllUser,
    getUser: getUserByID,
    getPostsByUserID: getPostsByUserID,
    getUserByID: getUserByID,
    getUserByEmailAndPWD: getUserByEmailAndPWD,
    updateUser: updateUser,
    getUserByEmail: getUserByEmail,
    getImagebyID: getImagebyID,
    getUserIdByEmail: getUserIdByEmail,
    addLike: incLike,
    getLikes: getLikes,
    getPostsByUserID2: getPostsByUserID2,
    getNamebyID: getNamebyID
}