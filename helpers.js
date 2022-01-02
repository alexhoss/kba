$('.tohide').hide();

$('.hideReply').on('click', function(){
    alert("a")
    $(this).prev('.tohide').show();
})