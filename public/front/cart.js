$(function () {


  // 注册下拉事件
  mui.init({
    pullRefresh: {
      container: ".mui-scroll",
      down: {
        auto: true,
        callback: function () {
          $.ajax({
            url: '/cart/queryCart',
            success: function (info) {
              if (info.error === 400) {
                location.href = 'login.html?back=' + location.href;
              }

              $('.mui-table-view').html(template('tpl', {
                rows: info
              }))
              mui('.mui-scroll').pullRefresh().endPulldownToRefresh();
            }
          })
        }
      },

    }
  });

  mui('.mui-scroll').pullRefresh().pulldownLoading()

  // 注册删除事件
  $('.mui-scroll').on('tap', '.btn_delete', function () {
    var id = $(this).data('id');
    console.log(id);

    mui.confirm('您确定要删除这条信息', '温馨提示', ['是', '否'], function (e) {
      if (e.index === 0) {
        $.ajax({
          url: '/cart/deleteCart',
          data: {
            id: [id]
          },
          success: function (info) {
            console.log(info);

            if (info.success) {
              mui('.mui-scroll').pullRefresh().pulldownLoading()
            }
          }
        })
      }
    })
  })

  // 注册checkbox事件
  $('.mui-scroll').on('change', '#ck', function () {
    var total = 0;
    $('#ck:checked').each(function () {
      var price = $(this).data('price');
      var num = $(this).data('num');
      total += price * num;
    })
    $('.total').text(total.toFixed(2));
  })

  // 注册编辑事件

  $('.mui-scroll').on('tap', '.btn_edit', function () {

    var data = this.dataset;
    var html = template("tpl02", data);
    //html中会有很多的换行,把html这个字符串中所有的\n替换成""
    html = html.replace(/\n/g, "");

    mui.confirm(html, "编辑商品", ["确定", "取消"], function (e) {
      if (e.index === 0) {
        var id = data.id;
        var num = $(".mui-numbox-input").val();
        var size = $(".pro_size span.now").text();

        $.ajax({
          type: 'post',
          url: '/cart/updateCart',
          data: {
            id: id,
            num: num,
            size: size,
          },
          success: function (info) {
            if (info.success) {
              mui('.mui-scroll').pullRefresh().pulldownLoading();
            }
          }
        })
      }
    })
    // 激活按钮事件
    mui('.mui-numbox').numbox();

    $('.pro_size span').on('click', function () {
      $(this).addClass('now').siblings().removeClass('now');
    })
  });
})