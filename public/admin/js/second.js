require(['template','common', 'bootstrapPaginator', 'bootstrapValidator' ,'jqueryFileupload'], function (template) {
  $(function () {
    var page = 1;
    var pageSize = 8;
    render();

    function render() {
      $.ajax({
        type: 'get',
        url: '/category/querySecondCategoryPaging',
        data: {
          page: page,
          pageSize: pageSize,
        },
        success: function (info) {
          $('tbody').html(template('tpl', info));
          $('#paginator').bootstrapPaginator({
            size: 'small',
            bootstrapMajorVersion: 3,
            currentPage: page,
            totalPages: Math.ceil(info.total / info.size),
            onPageClicked: function (a, b, c, p) {
              page = p;
              render();
            }
          })
        }
      })
    }

    $('.btn_addCategroy').on('click', function () {
      $('#addModal').modal('show');
      $.ajax({
        url: '/category/queryTopCategoryPaging',
        data: {
          page: 1,
          pageSize: 100,
        },
        success: function (info) {
          $('form .dropdown-menu').html(template('tpl02', info))
        }
      })
    })

    $('form').bootstrapValidator({
      excluded: [], //不校验的内容
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      //校验规则
      fields: {
        categoryId: {
          validators: {
            notEmpty: {
              message: "请选择一级分类"
            }
          }
        },
        brandName: {
          validators: {
            notEmpty: {
              message: "请输入二级分类的名称"
            }
          }
        },
        brandLogo: {
          validators: {
            notEmpty: {
              message: "请上传品牌图片"
            }
          }
        }
      }
    })


    $('form .dropdown-menu').on('click', 'a', function () {
      var id = $(this).data('id');
      var txt = $(this).text();
      $('.dropdown_text').text(txt);
      $('input[name="categoryId"]').val(id);
      $('form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
    })



    // 图片上传初始化
    $("#fileupload").fileupload({
      // dataType: 'json', //返回的结果的类型是json
      //e :事件对象
      //data: 上传后的结果
      done: function (e, data) { //图片上传后的回调函数

        //获取到地址后，需要干什么？？？？
        console.log(data);
        //修改img_box下的img的src

        $(".img_box img").attr("src", data.result.picAddr);

        //给brandLogo赋值
        $("[name='brandLogo']").val(data.result.picAddr);

        $('form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
      }
    });

    $('form').on('success.form.bv', function (e) {
      e.preventDefault();

      $.ajax({
        type: 'post',
        url: '/category/addSecondCategory',
        data: $('form').serialize(),
        success: function (info) {
          if (info.success) {
            $('#addModal').modal('hide');
            page = 1;
            render();
            $('form').data('bootstrapValidator').resetForm(true);
            $('.dropdown_text').text('请选择');
            $('.img_box img').attr('src', 'images/none.png');
            $('imput[name="categoryId"]').val('');
            $('imput[name="brandLogo"]').val('');
          }
        }
      })
    })
  })
})