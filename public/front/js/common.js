//初始化mui的区域滚动
mui('.mui-scroll-wrapper').scroll({
  indicators: false, //不显示滚动条
});

//初始化轮播图
mui('.mui-slider').slider({
  interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
});

// 获取地址参数对象
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