let messageModel = require('../models/messageData');
let userData = require('../models/userData')

async function getAllSubjectMessages(req, res, next) {
    // USER ID HARD CODED
    // SUBJECT ID HARD CODED
    userID = 1;
    let subjectID = 1;
    current_name = await userData.getNamebyID(userID)
    if (current_name[0][0].name != undefined) {
        current_name = (current_name[0][0].name)
    }
    current_image = await userData.getImagebyID(userID)
    if (current_image[0][0].img_url != undefined) {
        current_image = (current_image[0][0].img_url)
    }
    let subjects = messageModel.getAllSubjects(userID);
    subjects.then(async([rows, fieldData]) => {
        overallJSON = {
            "subjects": [],
            "messages": []
        }
        for (index in rows) {
            let neededUser;
            if (rows[index].sender_id == userID) {
                neededUser = rows[index].receiver_id
            } else {
                neededUser = rows[index].sender_id
            }

            name = await userData.getNamebyID(neededUser)
            if (name[0][0].name != undefined) {
                name = (name[0][0].name)
            }
            image = await userData.getImagebyID(neededUser)
            if (image[0][0].img_url != undefined) {
                image = (image[0][0].img_url)
            }
            month = (rows[index].date.toLocaleString('default', { month: 'short' }))
            monthDay = "" + month + " " + rows[index].date.getDay()

            rows[index]["name"] = name;
            rows[index]["image"] = image;
            rows[index]["image"] = image;
            rows[index]["monthDay"] = monthDay
            overallJSON.subjects.push(rows[index])

        }
        messages = await messageModel.getAllMessages(subjectID)
        console.log(messages)
        for (messageIndex in messages[0]) {
            if (messages[0][messageIndex].sender_id == userID) {
                messages[0][messageIndex]["image"] = current_image
                messages[0][messageIndex]["name"] = current_name
            } else {
                messages[0][messageIndex]["image"] = image
                messages[0][messageIndex]["name"] = name
            }
            month = (messages[0][messageIndex].date.toLocaleString('default', { month: 'short' }))
            monthDay = "" + month + " " + messages[0][messageIndex].date.getDay()
            var time = messages[0][messageIndex].date.toLocaleTimeString();
            messages[0][messageIndex]["monthDay"] = monthDay
            messages[0][messageIndex]["time"] = time
            console.log("yoooooo")
            console.log(messages[0][messageIndex])
            overallJSON.messages.push(messages[0][messageIndex])
        }
        res.render('messages', overallJSON);
    });
}
async function getAllSubjects(req, res, next) {
    userID = 1;
    let subjects = messageModel.getAllSubjects(userID);
    subjects.then(async([rows, fieldData]) => {
        overallJSON = {
            "subjects": [],
            "messages": []
        }
        for (index in rows) {
            var neededUser;
            if (rows[index].sender_id == userID) {
                neededUser = rows[index].receiver_id
            } else {
                neededUser = rows[index].sender_id
            }

            name = await userData.getNamebyID(rows[index].sender_id)
            if (name[0][0].name != undefined) {
                name = (name[0][0].name)
            }
            image = await userData.getImagebyID(rows[index].sender_id)
            if (image[0][0].img_url != undefined) {
                image = (image[0][0].img_url)
            }
            month = (rows[index].date.toLocaleString('default', { month: 'short' }))
            monthDay = "" + month + " " + rows[index].date.getDay()

            rows[index]["name"] = name;
            rows[index]["image"] = image;
            rows[index]["monthDay"] = monthDay
            overallJSON.subjects.push(rows[index])

        }
    });
}
async function getAllMessages(req, res, next) {
    subjectID = 1

    let Messages = messageModel.getAllMessages(subjectID);
    Messages.then(async([rows, fieldData]) => {
        first = rows[0].receiver_id
        console.log(first)
        second = rows[0].sender_id
        first_name = await userData.getNamebyID(rows[0].receiver_id)
        first_name = first_name[0][0].name;
        first_image = await userData.getImagebyID(rows[0].receiver_id)
        first_image = first_image[0][0].img_url;
        second_name = await userData.getNamebyID(rows[0].sender_id)
        second_name = second_name[0][0].name;
        second_image = await userData.getImagebyID(rows[0].sender_id)
        second_image = second_image[0][0].img_url;
        for (index in rows) {
            if (rows[index].sender_id == first) {
                rows[index]["image"] = first_image
                rows[index]["name"] = first_name
            } else {
                rows[index]["image"] = second_image
                rows[index]["name"] = second_name
            }
            month = (rows[index].date.toLocaleString('default', { month: 'short' }))
            monthDay = "" + month + " " + rows[index].date.getDay()
            var time = rows[index].date.toLocaleTimeString();
            rows[index]["monthDay"] = monthDay
            rows[index]["time"] = time
        }
        console.log(rows)
        res.render('messages', { "messages": rows });
    });
}

module.exports.getAllMessages = getAllMessages;
module.exports.getAllSubjectMessages = getAllSubjectMessages;
module.exports.getAllSubjects = getAllSubjects;

exports.sendMessage = (req, res, next) => {
    //SENDER_ID HARDCODED
    //RECEIVER_ID HARDCODED
    //SUBJECT_ID HARDCODED
    //
    let p_content = req.body.txtcomment
    console.log(p_content);

    let sender_id = 1;
    let receiver_id = 4;
    let subject_id = 1;
    let p_author = 2;
    let pOject = {
        content: p_content,
        sender_id: sender_id,
        receipient_id: receiver_id,
        author: p_author
    }

    let Send = messageModel.add(pOject);
    Send.then(async([rows, fieldData]) => {
        res.redirect('/messages')
    });


}