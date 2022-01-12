var router = "https://adopt.wozhua.net"
var key = "8da71946065811ec8e456c92bf623eda" //调接口用的
var sfLogin = localStorage.getItem("sfLogin") || false // 是否登录
console.log("sfLogin", sfLogin)
$(function () {
  hideHeader()
})
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
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : "0" + n
}
// 将时间戳（秒）转换为时间
function formatTime(time) {
  let date = new Date(time * 1000)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return (
    year +
    "年" +
    formatNumber(month) +
    "月" +
    formatNumber(day) +
    "日" +
    " " +
    [hour, minute].map(formatNumber).join(":")
  )
}
/**
 * 调接口
 * @param {*} method post/get
 * @param {*} url 接口路径
 * @param {*} data 传参
 * @returns
 */
function getApi(method, url, data) {
  console.log("data===", data)
  return new Promise(function (resolve, reject) {
    let timestamp = new Date().getTime().toString().substr(0, 10)
    // let url = "/ca-caring-organization/list"
    let sign = md5(key + url + timestamp + key).toUpperCase() //签名
    let params = {
      ...data,
      timestamp,
      sign,
    }
    $.showLoading("加载中")
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
        $.hideLoading()
        res = JSON.parse(res)
        // console.log('data', params)
        // console.log('res', res)
        if (res.status) {
          resolve(res)
        } else {
          $.alert(res.msg || "网络错误")
        }
      },
      error: function () {
        $.hideLoading()
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
// 根据是否是微信浏览器判断header隐藏
function hideHeader() {
  if (is_weixn()) {
    $(".arrow_header").hide()
    $(".hide_header").css("padding-top", 0)
    $(".home_content").css({ "margin-top": 0, "padding-top": "13vw" })
    $(".hide_header2").css("padding-top", "0")
    $(".back_home").css("top", "2vw")
  }
}
// 判断是否是微信浏览器
function is_weixn() {
  var ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    console.log("微信浏览器")
    return true
  } else {
    console.log("不是微信浏览器")
    return false
  }
}
function onBridgeReady() {
  WeixinJSBridge.invoke(
    "getBrandWCPayRequest",
    {
      appId: "wx80b0358d642bed86", //公众号名称，由商户传入
      timeStamp: "1395712654", //时间戳，自1970年以来的秒数
      nonceStr: "e61463f8efa94090b1f366cccfbbb444", //随机串
      package: "prepay_id=u802345jgfjsdfgsdg888",
      signType: "RSA", //微信签名方式：
      paySign: "70EA570631E4BB79628FBCA90534C63FF7FADD89", //微信签名
    },
    function (res) {
      if (res.err_msg == "get_brand_wcpay_request:ok") {
      } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
    }
  )
}
// if (typeof WeixinJSBridge == "undefined") {
//   if (document.addEventListener) {
//     document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false)
//   } else if (document.attachEvent) {
//     document.attachEvent("WeixinJSBridgeReady", onBridgeReady)
//     document.attachEvent("onWeixinJSBridgeReady", onBridgeReady)
//   }
// } else {
//   onBridgeReady()
// }
// 防抖
function debounce(fn, delay = 500) {
  // timer是在闭包中
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}
