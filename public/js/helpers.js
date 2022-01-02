$('.tohide').hide();

$('.hideReply').on('click', function(){
    $(this).prev('.tohide').show();
})