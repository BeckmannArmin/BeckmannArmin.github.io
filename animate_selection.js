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

   $('.list__ul').find('li').eq(index).prependTo('.list__ul');
   $('.list__ul').toggle();

 });

 function val() {
    d = document.getElementById("select#gender").value;
    console.log(d);
}
