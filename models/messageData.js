let db = require('../util/database');

function getNumberOfRecievedMSGByID(id) {
    let sql = `Select Count(*) as num From messages Where recipient_id = ${id}`
    return db.execute(sql)
}
// Add a single individual to the database
function getMessages(id) {
    let sql = `SELECT * FROM message WHERE sender_id="${id}" OR receiver_id="${id}"`;
    return db.execute(sql);
}

function getSubjects(id) {
    let sql = `SELECT * FROM subjects WHERE sender_id="${id}" OR receiver_id="${id}"`;
    return db.execute(sql);
}

function getMessage(subject_id) {
    let sql = `SELECT * FROM messaging WHERE subject_id="${subject_id}" ORDER BY date`;
    return db.execute(sql);
}

function addMessage(data) {

    let sql = "Insert into messaging (content, sender_id, receiver_id, subject_id) values ('" + data.content + "','" + data.sender_id + "','" + data.receipient_id + "','" + 1 + "')";
    return db.execute(sql);
}

module.exports = {
    getAll: getMessages,
    add: addMessage,
    getAllSubjects: getSubjects,
    getAllMessages: getMessage,
    getNumberOfRecievedMSGByID: getNumberOfRecievedMSGByID
}