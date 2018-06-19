/* 公共js */

$(document).ajaxStart(function () {
  NProgress.start();
})
$(document).ajaxStop(function () {
  NProgress.done();
})

$('#classify').on('click', function () {
  $('#classify .child').slideToggle(500);
});

$('.menu_bar .pull-left').on('click', function () {
  $('.lt_aside').toggleClass('active');
  $('.lt_right').toggleClass('active');
})

$('.menu_bar .pull-right').on('click', function () {
  $('#logout').modal('show')

})
$('#logout .logout').on('click', function () {
  $.ajax({
    url: '/employee/employeeLogout',
    success: function (info) {
      if(info.success) {
        window.location.href = 'login.html';
      }
    }
  })
})