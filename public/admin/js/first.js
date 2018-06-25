require(['template', 'common', 'bootstrapPaginator', 'bootstrapValidator'], function (template) {
  $(function () {
    var page = 1;
    var pageSize = 8;
    render();

    function render() {
      $.ajax({
        type: 'get',
        url: '/category/queryTopCategoryPaging',
        data: {
          page: page,
          pageSize: pageSize
        },
        success: function (info) {

          $('tbody').html(template('tpl', info));
          $('#paginator').bootstrapPaginator({
            bootstrapMajorVersion: 3,
            currentPage: page,
            totalPages: Math.ceil(info.total / info.size),
            size: 'small',
            onPageClicked: function (a, b, c, p) {
              page = p,
                render();
            }
          })
        }
      })
    }

    // 添加功能
    $('form').bootstrapValidator({
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
        categoryName: {
          validators: {
            notEmpty: {
              message: '分类名不能为空'
            }
          }
        }
      }
    })
    var validator = $("#form").data('bootstrapValidator');
    $('.btn_addCategroy').on('click', function () {
      $('#addModal').modal('show');
    })


    $('form').on('success.form.bv', function (e) {
      e.preventDefault();

      $.ajax({
        type: 'post',
        url: '/category/addTopCategory',
        data: $('form').serialize(),
        success: function (info) {
          if (info.success) {
            $('#addModal').modal('hide');
            $('form')[0].reset();
            render();
          }
        }
      })
    })
  })
})