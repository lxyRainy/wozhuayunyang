var router = "https://adopt.wozhua.net"
var onlineUrl = "http://yunyangh5.wozhua.net/" // 上线以后的访问地址
var key = "8da71946065811ec8e456c92bf623eda" //调接口用的
// sessionStorage.removeItem('sfLogin')
var sfLogin // = sessionStorage.getItem("sfLogin") || false // 是否登录
var appid = "wxaadeae0c92ecddb3"
var wxUser = localStorage.getItem("wxUser") //|| '{ "userid": 32227, "nickname": "蜜城", "username": "7c72f7e8a18d38c7a5264503a95dc6d5", "phone": "15227132129", "avatar": "http://wozhuaapi.newpi.net/images/avatar_1.png", "gender": 1, "identity": 1, "wechat_openid": "o4SX354GWnnvEIsA2nHWWBbK8PVw" }'// 微信用户信息
var openid = localStorage.getItem("openid") || ""
var userId // = wxUser ? wxUser.userid : '';
var code = sessionStorage.getItem("code")
var orgData = sessionStorage.getItem("orgData")
var state = ""

$(function () {
  let code1 = getUrlCode("code")
  if (code1) {
    sessionStorage.setItem("code", code1)
    code = code1
  }
  userId = wxUser ? JSON.parse(wxUser).userid : ""
  // alert("code===", code)
  // console.log("sfLogin==", sfLogin)
  console.log("openid==", openid)
  console.log("wxUser==", wxUser)
  console.log("userId==", userId)
  console.log("code==", code)
  hideHeader()
})

//转码
function getUrlCode(key) {
  let url = window.location.href
  console.log("当前url===", url)
  //如果有就直接截取code
  if (url.indexOf("?") != -1) {
    let obj = urlToObj(url)
    console.log("getUrlCode()---" + key, obj[key])
    if (obj[key]) {
      return obj[key]
    }
  }
  return ""
}

function urlToObj(str) {
  var obj = {}
  var arr1 = str.split("?")
  var arr2 = arr1[1].split("&")
  for (var i = 0; i < arr2.length; i++) {
    var res = arr2[i].split("=")
    obj[res[0]] = res[1]
  }
  return obj
}

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
  console.log("入参data===", data)
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
          resolve(res)
        }
      },
      error: function (res) {
        console.log("调接口失败了res", res)
        $.hideLoading()
        resolve(false)
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

/**
 * 防抖
 * @param fn 事件触发的回调函数
 * @param delay 延迟时间
 */
function debounce(fn, delay = 500) {
  let timer = null

  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      // 执行事件的回调函数
      fn.apply(this, arguments)
      // 执行后清空定时器
      timer = null
    }, delay)
  }
}

/**
 * 打开验证页
 * @param {*} url 回调页面的路径
 * @param {*} state 携带的参数。自己规定 传 '1' 则立即执行支付的方法
 */
function openAuthorizePage(url, state) {
  console.log("进入验证页", url, state)
  let response_type = "code"
  state = state || "STATE"
  let scope = "snsapi_base" // ""//"snsapi_userinfo" //
  var router = encodeURIComponent("http://yunyangh5.wozhua.net/" + url)
  const jumpPath = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${router}&response_type=${response_type}&scope=${scope}&state=${state}#wechat_redirect`
  console.log("跳转url", jumpPath)
  // window.open(jumpPath)
  window.location.href = jumpPath
}
/**
 * 公共云养点击事件
 * @param {*} page 当前页面url
 * @param {*} params 调支付接口需传参
 * @param {*} state 回调页面里的参数。自行判断 '1'的时候直接去调支付的接口
 */
function commonAdoptClick(page, params, state) {
  if (!wxUser || !openid) {
    // 如果没有user信息或者openid就去登录，否则就生成订单去支付
    weChatLogin(page, params, state)
  } else {
    makeAdot(params, page)
  }
}
// 微信公众号登录
function weChatLogin(page, params, state) {
  if (code) {
    if (openid && !wxUser) {
      // 拿到openid了去登录页注册
      window.location.href = "login.html"
    } else {
      getApi("post", "/login/login-mpcode", { code: code }).then((res) => {
        if (res.status) {
          // 之前注册过，拿code登录成功
          localStorage.setItem("wxUser", JSON.stringify(res.data))
          localStorage.setItem("openid", res.data.wechat_openid)
          openid = res.data.wechat_openid
          params.user_id = res.data.userId
          makeAdot(params, page)
        } else {
          // 之前没注册过，生成的openid 去登录页
          localStorage.setItem("openid", res.data.openid)
          window.location.href = "login.html"
        }
      })
    }
  } else {
    // 获取code
    openAuthorizePage(page, state)
  }
}
// 生成云养订单
function makeAdot(params, page) {
  getApi("post", "/ca-pet/adopt", params).then((res) => {
    console.log("res", res)
    if (res.status && res.data) {
      let data = res.data
      console.log("开始支付")
      payPet(data.order_no, page)
    } else {
      $.alert(res.msg || "操作失败")
    }
  })
}
// 订单支付
function payPet(order_no, url) {
  // getApi("post", "/login/get-mp-openid", { code: code }).then((res) => {
  // if (res.status) {
  // openid = res.data.openid
  let param1 = {
    user_id: userId,
    order_no,
    type: 3, //类型 1-APP 2-小程序 3-公众号JSAPI 不传默认app
    openid: openid,
  }
  console.log("订单支付入参", param1)
  getApi("post", "/ca-pet/pay-order", param1).then((res) => {
    if (res.status) {
      // 调微信的支付
      const data = res.data
      sessionStorage.setItem("signPackage", JSON.stringify(data))
      onBridgeReady(data, order_no)

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
    } else {
      $.alert(res.msg || "查询失败")
    }
  })
  // } else {
  //   sessionStorage.setItem('sfpay', '1')// 调了页面回调后就支付
  //   openAuthorizePage(url, "1")
  // }
  // })
}

function onBridgeReady(data, order_no) {
  WeixinJSBridge.invoke(
    "getBrandWCPayRequest",
    {
      appId: data.appId, //公众号ID，由商户传入appid, //
      timeStamp: data.timeStamp, //时间戳，自1970年以来的秒数
      nonceStr: data.nonceStr, //随机串
      package: data.package,
      signType: data.signType, //微信签名方式：
      paySign: data.paySign, //微信签名
    },
    function (res) {
      if (res.err_msg == "get_brand_wcpay_request:ok") {
        // 使用以上方式判断前端返回,微信团队郑重提示：
        //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        // setTimeout(getPeyResult(order_no), 3000)
        $.confirm({
          title: "提示",
          text: "恭喜您云养成功，您可以去小程序-“我的云养”查看云养的宠物",
          onOK: function () {
            //点击确认
            //点击确认后的回调函数
            window.location.href = "jump_mp.html"
          },
          onCancel: function () {},
        })
      } else {
        $.alert("支付失败")
      }
    }
  )
}

// 查看订单支付结果
function getPeyResult(order_no) {
  let param = {
    user_id: userId,
    order_no,
  }
  getApi("post", "/ca-pet/get-order", param).then((res) => {
    // onBridgeReady()

    //如果参数过多，建议通过 object 方式传入
    $.confirm({
      title: "提示",
      text: "恭喜您云养成功，您可以去小程序-“我的云养”查看云养的宠物",
      onOK: function () {
        //点击确认
        //点击确认后的回调函数
        window.location.href = "jump_mp.html"
      },
      onCancel: function () {},
    })
  })
}
function initWxConfig(param) {
  if (is_weixn()) {
    console.log("微信初始化")
    // var link = window.location.href.split("#")[0]
    var myurl = location.href.split("#")[0]
    // myurl = encodeURIComponent(myurl)
    // var url = ` 获取配置的后台接口?url=${myurl}`
    // myurl = "http://yunyangh5.wozhua.net"
    getApi("post", "/login/get-jssdk", { url: myurl }).then((res) => {
      if (res.status) {
        console.log("微信初始化接口结果：", res)
        let datad = res.data //转译为Json字符串
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
          appId: datad.appId, // 必填，公众号的唯一标识
          timestamp: datad.timestamp, // 必填，生成签名的时间戳
          nonceStr: datad.nonceStr, // 必填，生成签名的随机串
          signature: datad.signature, // 必填，签名，见附录1
          jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        wx.error(function (res) {
          $.alert(res.msg || "微信config失败")
        })
        // initShare(param)
        wx.ready(function () {
          console.info("ready")

          //需在用户可能点击分享按钮前就先调用
          wx.updateAppMessageShareData(param)
          //需在用户可能点击分享按钮前就先调用
          wx.updateTimelineShareData(param)
        })
      }
    })
  }
}
function initShare(param) {
  console.log("进入分享功能")
  wx.ready(function () {
    console.info("ready")
    // let paramOrz = {
    //   title: "小院名字", // 分享标题
    //   desc: "欢迎云养我家小院的毛孩子，非常感谢你的爱心和付出！", // 分享描述
    //   link: "", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //   imgUrl: "当前小院头像", // 分享图标
    // }
    //需在用户可能点击分享按钮前就先调用
    wx.updateAppMessageShareData(param)
    //需在用户可能点击分享按钮前就先调用
    wx.updateTimelineShareData(param)
  })
}
