$(function () {
  render();

  // 注册点击事件
  $('.cg_l ul').on('click', 'li', function () {
    $(this).addClass("active").siblings().removeClass('active')
    renderCategory($(this).data('id'))
    mui('.cg_r .mui-scroll-wrapper').scroll().scrollTo(0, 0, 100); //100毫秒滚动到顶
  })

  function render() {
    $.get("/category/queryTopCategory", function (info) {
      $('.cg_l ul').html(template('tpl', info))
      renderCategory(info.rows[0].id);
    })
  }

  function renderCategory(id) {
    $.get('/category/querySecondCategory', {
      id: id
    }, function (info02) {
      console.log(info02);
      $('.cg_r ul').html(template('tpl02', info02))
    })
  }


})