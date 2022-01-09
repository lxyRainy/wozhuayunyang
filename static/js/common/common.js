var router = "https://adopt.wozhua.net"
var key = "8da71946065811ec8e456c92bf623eda"
// 价格格式化
function fmPrice(num) {
  return num.toFixed(2)
}
// 日期格式化
Date.prototype.format = function (format) {
  var args = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    S: this.getMilliseconds(),
  }
  if (/(y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    )
  for (var i in args) {
    var n = args[i]
    if (new RegExp("(" + i + ")").test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length)
      )
  }
  return format
}
/**
 * 调接口
 * @param {*} method post/get
 * @param {*} url 接口路径
 * @param {*} data 传参
 * @returns
 */
function getApi(method, url, data) {
  return new Promise(function (resolve, reject) {
    let timestamp = new Date().getTime().toString().substr(0, 10)
    // let url = "/ca-caring-organization/list"
    let sign = md5(key + url + timestamp + key).toUpperCase() //签名
    let params = {
      ...data,
      timestamp,
      sign,
    }
    $.ajax({
      // 请求方式
      type: method,
      // 请求的媒体类型
      contentType: "application/x-www-form-urlencoded",
      // 请求地址
      url: router + url, //+ "?timestamp=" + timestamp + "&sign=" + sign,
      // 数据，json字符串
      data: params, // JSON.stringify(params),
      // header: header,
      // 请求成功
      success: function (res) {
        res = JSON.parse(res)
        if (res.status) {
          resolve(res)
        } else {
          $.alert(res.msg || "网络错误")
        }
      },
      error: function () {
        $.alert("网络错误")
      },
    })
  })
}
// 获取路径中的参数
function getUrlParam(name) {
  var result = window.location.search.match(
    new RegExp("[?&]" + name + "=([^&]+)", "i")
  )
  if (result == null || result.length < 1) {
    return ""
  }
  return result[1]
}
// 将所有空格替换为换行符
function toBr(string) {
  //替换所有的换行符
  string = string.replace(/\r\n/g, "<br>")
  string = string.replace(/\n/g, "<br>")

  //替换所有的空格（中文空格、英文空格都会被替换）
  string = string.replace(/\s/g, "&nbsp;")
  return string
}
