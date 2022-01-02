function cardCreation (imgVal, titleVal, topicVal, contentVal, dateVal){
    
    // Card is on a single row, with two columns.
    // One for image, one for content.
    var mainRow = document.createElement("div");
    mainRow.className = "row";


    // Column containing the image.
    var picCol = document.createElement("div");
    picCol.className = "col-md-2";
    mainRow.appendChild(picCol);
    var image = document.createElement("IMG");
    image.setAttribute('src', imgVal);
    picCol.appendChild(image);



    // Column containing the title, content, date, etc.
    // Contains three rows.
    var contentCol = document.createElement("div");
    contentCol.className = "col-md-9 col-md-offset-1";
    mainRow.appendChild(contentCol);

    // First row - title and topic
    var firstRow = document.createElement("div");
    firstRow.className = "row";
    contentCol.appendChild(firstRow);
    var titleCol = document.createElement("div");
    titleCol.className = "col-md-8";
    firstRow.appendChild(titleCol);
    var h6 = document.createElement("H6");
    var title = document.createTextNode(titleVal);
    h6.appendChild(title);
    titleCol.appendChild(h6);
    var topicCol = document.createElement("div");
    topicCol.className = "col-md-4";
    firstRow.appendChild(topicCol);
    var topicButton = document.createElement("button");
    topicButton.type = "button";
    topicButton.className = "btn btn-default";
    var topic = document.createTextNode(topicVal);
    topicButton.appendChild(topic);
    topicCol.appendChild(topicButton);


    // Second row - 'explain in detail'
    var secondRow = document.createElement("div");
    secondRow.className = "row";
    contentCol.appendChild(secondRow);
    var explainCol = document.createElement("div");
    explainCol.className = "col-md-12";
    var explanation = document.createTextNode(contentVal);
    explainCol.appendChild(explanation);
    secondRow.appendChild(explainCol);

    // Third row - date and replies
    var thirdRow = document.createElement("div");
    thirdRow.className = "row";
    contentCol.appendChild(thirdRow);
    var dateCol = document.createElement("div");
    dateCol.className = "col-md-8";
    thirdRow.appendChild(dateCol);
    var date = createTextNode(dateVal);
    dateCol.appendChild(date);
    var repliesCol = document.createElement("div");
    repliesCol.className = "col-md-4";
    thirdRow.appendChild(repliesCol);
    var replies = document.createTextNode("Replies");
    repliesCol.appendChild(replies);

}

