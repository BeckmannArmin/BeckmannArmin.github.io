/** https://codepen.io/afalchi82/pen/aNXjgb */

console.clear();

var el = {};

$('.placeholder').on('click', function (ev) {
  $('.placeholder').css('opacity', '0');
  $('.list__ul').toggle();
});

 $('.list__ul a').on('click', function (ev) {
   ev.preventDefault();
   var index = $(this).parent().index();
   var value = $('.list__ul').find('li a').eq(index).html();

   $('.placeholder').text( $(this).text() ).css('opacity', '1');

   console.log(value);

   $('select#gender').val(value);
   $('.strikethrough').css({'text-decoration':"line-through"});

   $('.list__ul').find('li').eq(index).prependTo('.list__ul');
   $('.list__ul').toggle();
   checkDisabled()
 });


$('.placeholder-player').on('click', function (ev) {
  $('.placeholder-player').css('opacity', '0');
  $('.list__ul-player').toggle();
});

 $('.list__ul-player a').on('click', function (ev) {
   ev.preventDefault();
   var index = $(this).parent().index();
   var value = $('.list__ul-player').find('li a').eq(index).html();

   $('.placeholder-player').text( $(this).text() ).css('opacity', '1');

   console.log(value);

   $('select#player').val(value);
   $('.strikethrough-player').css({'text-decoration':"line-through"});

   $('.list__ul-player').find('li').eq(index).prependTo('.list__ul-player');
   $('.list__ul-player').toggle();
   checkDisabled()
 });
