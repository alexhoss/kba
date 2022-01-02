// Date picker only
$('#datepicker').datetimepicker({
    format: 'YYYY-MM-DD'
});

$(document).ready(function () {
    $("#pwd2").keyup(checkPasswordMatch);
});

function checkPasswordMatch() {
    var password = $("#pwd1").val();
    var confirmPassword = $("#pwd2").val();

    if (password != confirmPassword) {
        $("#divCheckPasswordMatch").html("Passwords do not match!");
        $("#signupbtn").prop('disabled', true);
    }
    else {
        $("#divCheckPasswordMatch").html("Passwords match.");
        $('#signupbtn').prop('disabled', false);
    }
}
function showReplies(){
    console.log("Show replies")

    // Reply card is on a single row, with two columns.
    // One for image, one for content.
    var mainRow = document.createElement("div");
    mainRow.className = "row";

    // Column containing the image.
    var picCol = document.createElement("div");
    picCol.className = "col-md-2";
    mainRow.appendChild(picCol);
    var image = document.createElement("IMG");
    image.setAttribute('src', '/img/sean.png');
    picCol.appendChild(image);

    // Column containing the reply.
    var contentCol = document.createElement("div");
    contentCol.className = "col-md-10";
    mainRow.appendChild(contentCol);
    var reply = document.createTextNode("Reply reply reply");
    contentCol.appendChild(reply);
    console.log("Done replies")
}

function toggleReplies(){
    var x = document.getElementById("replies");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

// function searchbarFunction() {
//     let input, filter, row_container, cards, td, i, txtValue;
//     input = document.getElementById("myInput");
//     filter = input.value.toUpperCase();
//     row_container = document.getElementById("row-container");
//     cards = row_container.getElementsById("card");
//     for (i = 0; i < cards.length; i++) {
//         // td = tr[i].getElementsByTagName("td")[1];
//         // if (td) {
//         //     txtValue = td.textContent || td.innerText;
//         //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//         //         tr[i].style.display = "";
//         //     } else {
//         //         tr[i].style.display = "none";
//         //     }
//         // }
//         console.log(cards.textContent)
//     }
// }