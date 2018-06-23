$(function () {


  render();
  // 清除全部
  $('.history-bar').on('click', '.history-tips .fa-trash', function () {

    mui.confirm('请确认要全部清空历史记录', '温馨提示', ['确认', '取消'], function (e) {
      if (e.index === 0) {
        localStorage.removeItem("lt_history");
        render();
      }
    })

  })

  // 点击按钮关闭
  $('.history-bar').on('click', 'ul .btn_delete', function () {
    var index = $(this).data('index')

    mui.confirm('请确认要此条历史记录', '温馨提示', ['否', '是'], function (e) {
      if (e.index === 1) {
        var arr = getHistory();
        arr.splice(index, 1);
        localStorage.setItem("lt_history", JSON.stringify(arr));
        render();
      }
    })
  })

  // 点击历史进行搜索
  $('.history-bar').on('click', 'ul li a', function () {
    location.href = 'searchList.html?key='+$(this).text();
  })

  // 点击添加历史
  $('.search-bar button').on('click', function () {
    var txt = $('.search-bar input').val();
    $('.search-bar input').val('');
    if (txt.length == 0) {
      mui.toast('请输入搜索内容');
    } else {
      var arr = getHistory();
      if (arr.indexOf(txt) > -1) {
        arr.splice(arr.indexOf(txt), 1);
      }
      if (arr.length >= 10) {
        arr.pop();
      }

      arr.unshift(txt);

      localStorage.setItem("lt_history", JSON.stringify(arr));
      // render();
      location.href = 'searchList.html?key='+txt;

    }
  })

  // 获取本地存储
  function getHistory() {
    var history = localStorage.getItem('lt_history') || "[]";
    history = JSON.parse(history);

    // console.log(history);

    return history
  }

  function render() {
    var history = getHistory();

    // 显示在界面里
    $('.lt_center .history-bar').html(template('tpl', {
      rows: history
    }))
  }
})