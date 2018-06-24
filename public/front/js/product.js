$(function () {
  var id = getSearch().id;
  var size = 0;
  

  render();

  // 选择尺码事件
  $('.lt_center .mui-scroll').on('click', '.pro_size span', function () {
    $(this).addClass('now').siblings().removeClass('now');
    size = $(this).text();
  })

  $(".btn_buy").on('click', function () {
    if(size === 0) {
      mui.toast('请选择尺码');
      return;
    }
    

    $.ajax({
      type:'post',
      url: '/cart/addCart',
      data: {
        productId: id,
        num: $('[type="number"]').val(),
        size: size,
      },
      success: function (info) {
        if(info.error === 400) {
          window.location.href = "login.html?back="+location.href;
        }
        if(info.success) {
          mui.confirm("添加成功", "温馨提示", ["去购物车", "继续浏览"], function(e){
            if(e.index === 0) {
              location.href = "cart.html";
            }
          });
        }
      }

    })
    
  })

  function render() {
    
    $.ajax({
      type: 'get',
      url: "/product/queryProductDetail",
      data: {
        id: id
      },
      success: function (info) {
        // console.log(info);

        $('.lt_center .mui-scroll').html(template('tpl', info));

        mui('.mui-slider').slider({
          interval: 5000,
        });

        mui('.mui-numbox').numbox()
      }
    })
  }
})