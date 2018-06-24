$(function () {


  $('.getCode').on('click', function () {
    var phone = $('[name="mobile"]').val();
    var count = 5;
    if(!/^1\d{10}$/.test(phone)) {
      mui.toast('请输入正确的手机号');
      return;
    }
    $(this).text('发送中…').prop('disabled', true).addClass('disabled');

    $.ajax({

      url: '/user/vCode',
      success: function (info) {
        var timeId = setInterval(function () {
          if (count == 0) {
            clearInterval(timeId);
            $('.getCode').text('获取验证码').prop('disabled', false).removeClass('disabled');
            return;
          }
          count--
          $('.getCode').text(count + '秒后再次发送')
        },1000)  
        console.log(info);
           
      }
    })
  })
  $('.btn_res').on('click', function () {
    var username = $("[name='username']").val();
    var password = $("[name='password']").val();
    var repass = $("#repass").val();
    var mobile = $("[name='mobile']").val();
    var vCode = $("[name='vCode']").val();

    if(!username) {
      mui.toast('请输入用户名');
      return;
    }
    if(!password) {
      mui.toast('请输入用户名');
      return;
    }
    if(repass !== password) {
      mui.toast('第二次输入与第一次不同');
      return;
    }
    if(!/^1\d{10}$/.test(mobile)) {
      mui.toast('请输入正确的手机号');
      return;
    }
    if(!/^\d{6}$/.test(vCode)) {
      mui.toast('请输入正确验证码');
      return;
    }

    $.ajax({
      type: 'post',
      url : "/user/register",
      data: $('.lt_main').serialize(),
      success: function (info) {
       
        
        if(info.success) {
          location.href = 'login.html';

        } else { 
          mui.toast(info.message)
        }
      }
    })
  })
})