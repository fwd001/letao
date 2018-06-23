$(function () {

  var page = 1;
  var pageSize = 8;
  var obj = getSearch();

  $('.search-bar input').val(decodeURI(obj.key));

  render();
  //  console.log(decodeURI(obj.key));

  $('.lt_sort li[data-type]').on('click', function () {
    var $this = $(this);
    if (!$this.hasClass('now')) {
      $this.addClass('now').siblings().removeClass('now');
      $this.siblings().find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
    } else {
      $this.find('span').toggleClass('fa-angle-up').toggleClass('fa-angle-down');
    }
    render();
  })

  // 注册本页搜索按钮
  $('.search-bar button').on('click', function () {
    $('.lt_sort li[data-type]').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
    render();
  })



  function render() {
    $('.lt_product>ul').html('<div class="loading"></div>')

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
      // console.log(info);
      setTimeout(function () {
        $('.lt_product>ul').html(template('tpl', info))
      }, 1000)
    })
  }


  function getSearch() {
    var txt = location.search.slice(1).split('&');
    var obj = {};
    txt.forEach(function (e, i) {
      var key = e.split('=')[0];
      var value = e.split('=')[1];
      obj[key] = value
    })
    return obj
  }
})