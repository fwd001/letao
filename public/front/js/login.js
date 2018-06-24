$(function () {
  $('.btn_login').on('click', function () {
    if($('[type="text"]').val().length === 0) {
      mui.toast('请输入用户名')
      return;
    }
    if($('[type="password"]').val().length === 0) {
      mui.toast('请输入密码')
      return;
    }
    $.ajax({
      type: 'post',
      url: '/user/login',
      data: {
        username: $('[type="text"]').val(),
        password: $('[type="password"]').val()
      },
      success: function (info) {
        console.log(info);
        if(info.error) {
          mui.toast(info.message);
          return;
        }
        
        var href = location.search;
        if(href.indexOf('back') > -1) {
          location.href = href.replace('?back=','');
        } else {
          location.href = 'user.html';
        }
      }
    })
  })
})