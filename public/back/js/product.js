$(function () {
  var page = 1;
  var pageSize = 7;
  var imgs = [];
  render();

  function render() {
    $.ajax({
      url: '/product/queryProductDetailList',
      data: {
        page: page,
        pageSize: pageSize,
      },
      success: function (info) {
        $('.lt_content tbody').html(template('tpl', info));
        $('#paginator').bootstrapPaginator({
          size: 'small',
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          },
          itemTexts: function (type, page) {
            switch (type) {
              case 'next':
                return '下一页'
              case 'prev':
                return '上一页'
              case 'page':
                return page
              case 'first':
                return '首页'
              case 'last':
                return '尾页'
            }

          },
          useBootstrapTooltip: true,
          tooltipTitles: function (type, page) {
            switch (type) {
              case 'next':
                return '下一页'
              case 'prev':
                return '上一页'
              case 'page':
                return page
              case 'first':
                return '首页'
              case 'last':
                return '尾页'
            }
          }
        })
      }
    })
  }
  //添加按钮事件
  $('.btn_addCategroy').on('click', function () {
    $('#addModal').modal('show');

    $.ajax({
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100,
      },
      success: function (info) {
        $('.dropdown-menu').html(template('tpl02', info))
      }
    })
  })

  //表单校验
  $('form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      //校验成功的图标
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {

      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品的名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品的描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品的库存"
          },
          //正则校验
          regexp: {
            //不能是0开头，必须是数字
            regexp: /^[1-9]\d*$/,
            message: "请输入合法的库存"
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品的尺码"
          },
          //正则校验
          regexp: {
            //不能是0开头，必须是数字
            regexp: /^\d{2}-\d{2}$/,
            message: "请输入合法的尺码,例如(32-46)"
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品的原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品的价格"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }
    }
  })

  $('.dropdown-menu').on('click', 'a', function () {
    var id = $(this).data('id');
    var txt = $(this).text();
    $('.dropdown_text').text(txt);
    $('input[name="brandId"]').val(id);
    $('form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
  })

  // 图片上传
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function (e, data) {

      if (imgs.length >= 3) return;
      imgs.push(data.result);
      
      $(".img_box").append('<img src="' + data.result.picAddr + '" width="100" height="100" alt="">');

      if (imgs.length === 3) {
        $('form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
      } else {
        $('form').data('bootstrapValidator').updateStatus('brandLogo', 'INVALID');
      }
    }

  })
  $('form').on('success.form.bv', function (e) {
    e.preventDefault();
    var param = $('form').serialize();

    param += "&picName1=" + imgs[0].picAddr.substr(14) + "&picAddr1=" + imgs[0].picAddr;
    param += "&picName2=" + imgs[1].picAddr.substr(14) + "&picAddr2=" + imgs[1].picAddr;
    param += "&picName3=" + imgs[2].picAddr.substr(14) + "&picAddr3=" + imgs[2].picAddr;
    
    $.ajax({
      type: 'post',
      url: "/product/addProduct",
      data: param,
      success: function (info) {
        if(info.success) {

          $('#addModal').modal('hide');
          page = 1;
          render();

          $("form").data("bootstrapValidator").resetForm(true);
          $(".img_box img").remove();
          $('.fropdown-text').text('请选择二级分类');
          $('input[type="brandId"]').val('');
        }
      }
    })
  })
})