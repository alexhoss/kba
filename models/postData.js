let db = require('../util/database');
// Gets all the individuals in the database
// function getTop5Post() {
//     let sql = "Select * from posts ORDER BY date DESC LIMIT 5"
//     return db.execute(sql)   
// }
// Add a single individual to the database
function addPost(data) {
   
    let sql = "Insert into posts (title, topic, topic_desc, author_id) values ('" + data.subject + "','" + data.topic + "','" + data.about + "','" + data.author + "')";
    return db.execute(sql);
}
function getAll(data) {
   let  sql =  "Select * from posts LEFT JOIN users ON posts.author_id = users.id LEFT JOIN replies ON posts.pk_post_id = replies.post_id ORDER BY posts.date DESC";
   return db.execute(sql);
}
function getAuthorPic(id) {
    let sql = "Select img_url from users where id = " + id;
    console.log 
}

function getReplies(data){
    let sql = r
}

function addReplyDB(data){
    let sql = "Insert into replies (post_id, author_id, post_desc) values ('" + data.topic + "','" + data.author + "','" + data.desc + "')";
    return db.execute(sql);
}
function getAllbyKeyword(keyword) {
    let combinedTable = "Select * from posts LEFT JOIN users ON posts.author_id = users.id LEFT JOIN replies ON posts.pk_post_id = replies.post_id"
    let condition = `(posts.title LIKE '%${keyword}%' OR posts.topic LIKE '%${keyword}%' OR posts.topic_desc LIKE '%${keyword}%' OR users.name LIKE '%${keyword}%' OR replies.post_desc LIKE '%${keyword}%')`
    let sql = `${combinedTable} WHERE ${condition}`
    return db.execute(sql)
}

function getNumberOfRowsByID(id){
    let sql = `Select Count(*) as num From posts Where author_id = ${id}`
    return db.execute(sql)
}
module.exports = {
    add: addPost,
    getAllPosts: getAll,
    addReply: addReplyDB,
    getAllbyKeyword: getAllbyKeyword,
    getNumberOfRowsByID: getNumberOfRowsByID
}