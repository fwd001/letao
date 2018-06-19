$(function () {
  var page = 1;
  var pageSize = 8;

  render();

  function render () {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: page,
        pageSize: pageSize,
      },
      success: function (info) {
        
        $('.lt_content table tbody').html( template('tpl', info) )

        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          size: 'small',
          onPageClicked: function (a,b,c,p) {
            page = p;
            render();
          }
        })
      }

    })
  }

  // 注册启用禁用按钮
  $('tbody').on('click','button' ,function () {
    var id = $(this).parent().data('id');
    var isDelete = $(this).hasClass('btn-success')? 1 : 0;
    $('#onModal').modal('show');

    $('.btn_confirm').off().on('click', function () {
      $.ajax({
        type: 'post',
        url: '/user/updateUser',
        data: {
          id: id,
          isDelete: isDelete, 
        },
        success: function (info) {
          if(info.success) {
            render();
            $('#onModal').modal('hide');
          }
        }
      })    
    })
  })
  
})