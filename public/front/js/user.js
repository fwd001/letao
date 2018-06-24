$(function () {


  render();

  $('.logout').on('click', function () {
    $.get('/user/logout', function (info) {
      // console.log(info);
      location.href = 'login.html';
    })
  })

  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUserMessage',
      success: function (info) {
        console.log(info);
        
        if (info.error == 400) {
          location.href = 'login.html'
          return;
        }
        $('.userinfo').html(template('tpl', info))
      }
    })
  }
})