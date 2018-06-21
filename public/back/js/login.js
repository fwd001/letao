$(function () {
  console.log ($("form").data())
  $('form').bootstrapValidator({
    fields: {
      // 用户名配置
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空',
          },
          stringLength: {
            min: 3,
            max: 10,
            message: '用户名长度必须在3到10之间'
          },
          regexp: {
            regexp: /^[a-zA-Z0-9_\.]+$/,
            message: '用户名由数字字母下划线和.组成',
          },
          callback: {
            message: '账号名不存在',
          }
        }
      },
      // 密码配置
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空',
          },
          stringLength: {
            min: 6,
            message: '密码长度必须大于6位'
          },
          callback: {
            message: '密码错误',
          }
        }
      },
    },
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    }
  })
  var validator = $("form").data('bootstrapValidator');
  // console.log ($("form").data())
  $('form').on('success.form.bv', function (e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: "/employee/employeeLogin",
      data: $('form').serialize(),
      success: function (info) {
        console.log(info);
        if(info.error == 1000) {
          validator.updateStatus('username', 'INVALID',"callback")
        } 
        if(info.error == 1001) {
          validator.updateStatus("password", 'INVALID', 'callback');
        }
        if (info.success) {
          window.location.href = 'index.html';
        }
      },

    })
  })

  $('button[type="reset"]').on('click', function () {
    validator.resetForm();
  })
})

