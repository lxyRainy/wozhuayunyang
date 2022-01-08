$(function () {
  getHomeCx()
})
function getHomeCx() {
  let timestamp = timest()
  let url = "/ca-caring-organization/get"
  let sign = md5(key + url + timestamp + key).toLocaleUpperCase()
  let params = {
    timestamp,
    sign,
  }
  $.ajax({
    // 请求方式
    type: "post",
    // 请求的媒体类型
    contentType: "application/json;charset=UTF-8",
    // 请求地址
    url: router + url, //+ "?timestamp=" + timestamp + "&sign=" + sign,
    // 数据，json字符串
    data: JSON.stringify(params),
    // 请求成功
    success: function (res) {
      if (res.success) {
      }
    },
    error: function (res) {},
  })
}
// 输入框change事件
function xyncChange(v) {
  // console.log("v", $(v).val())
  if ($(v).val() !== "") {
    $(".home_top img").show()
  } else {
    $(".home_top img").hide()
  }
}
// 叉的点击事件
function chaClick() {
  $(".home_top img").hide()
  $(".home_top input").val("")
}
// 打开小院详情
function openXyxq(params) {
  window.location.href = "xiaoyuanxq.html"
}
