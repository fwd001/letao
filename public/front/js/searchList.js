$(function () {

  var page = 1;
  var pageSize = 4;

  $('.search-bar input').val(decodeURI(getSearch().key));

  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        auto: true, //可选,默认false.首次加载自动下拉刷新一次

        callback: function () {
          page = 1;
          render(function (info) {
            console.log(info);
            
            // 关闭下拉刷新
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();

            // 重置上拉刷新
            mui('.mui-scroll-wrapper').pullRefresh().refresh(true);

            $('.lt_product>ul').html(template('tpl', info))
          });
        }
      },
      // 上拉刷新
      up: {
        callback: function () {
          page++;
          render(function (info) {
            // 关闭上拉刷新
            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(info.data.length === 0);

            $('.lt_product>ul').append(template('tpl', info))
          });
        }
      }
    }
  });


  $('.lt_sort li[data-type]').on('tap', function () {
    var $this = $(this);
    if (!$this.hasClass('now')) {
      $this.addClass('now').siblings().removeClass('now');
      $this.siblings().find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
    } else {
      $this.find('span').toggleClass('fa-angle-up').toggleClass('fa-angle-down');
    }
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
  })

  // 注册本页搜索按钮
  $('.search-bar button').on('click', function () {
    $('.lt_sort li[data-type]').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');

    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
  })

  // 注册点击商品事件
  $('.lt_product').on('tap', 'li', function () {
    location.href = 'product.html?id='+$(this).data('id');
  })



  function render(callback) {
    // $('.lt_product>ul').html('<div class="loading"></div>')

    var $select = $('.lt_sort li[data-type].now');

    var param = {
      proName: $('.search-bar input').val(),
      page: page,
      pageSize: pageSize,
    }

    if ($select.length == 1) {
      var index = $select.find('span').hasClass('fa-angle-down') ? 2 : 1;
      param[$select.data('type')] = index;
    }

    $.get('/product/queryProduct', param, function (info) {
      setTimeout(function () {
        callback(info);
      }, 300)
    })
  }


})