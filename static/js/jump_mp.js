$(function () {
  // initPage()
})
function initPage() {
  if (is_weixn()) {
    console.log("微信初始化")
    var myurl = location.href.split("#")[0]
    myurl = "http://yunyangh5.wozhua.net/jump_mp.html"

    // var url = ` 获取配置的后台接口?url=${myurl}`
    getApi("post", "/login/get-jssdk", { url: myurl }).then((res) => {
      if (res.status) {
        console.log("微信初始化接口结果：", res)
        let datad = res.data //转译为Json字符串
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
          appId: datad.appId, // 必填，公众号的唯一标识
          timestamp: datad.timestamp, // 必填，生成签名的时间戳
          nonceStr: datad.nonceStr, // 必填，生成签名的随机串
          signature: datad.signature, // 必填，签名，见附录1
          jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          openTagList: ["wx-open-launch-weapp"],
        })
        wx.error(function (res) {
          $.alert(res.msg || "微信config失败")
        })
        // initShare(param)
        wx.ready(function () {
          console.info("ready")

          var btn = document.getElementById("launch-btn")
          btn.addEventListener("launch", function (e) {
            console.log("success")
          })
          btn.addEventListener("error", function (e) {
            console.log("fail", e.detail)
          })
        })
      }
    })
  }
}
// function docReady(fn) {
//   if (
//     document.readyState === "complete" ||
//     document.readyState === "interactive"
//   ) {
//     fn()
//   } else {
//     document.addEventListener("DOMContentLoaded", fn)
//   }
// }

// docReady(async function () {
//   console.log("111")
//   var ua = navigator.userAgent.toLowerCase()
//   var isWXWork = ua.match(/wxwork/i) == "wxwork"
//   var isWeixin = !isWXWork && ua.match(/micromessenger/i) == "micromessenger"
//   var isMobile = false
//   var isDesktop = false
//   if (
//     navigator.userAgent.match(
//       /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|IEMobile)/i
//     )
//   ) {
//     isMobile = true
//   } else {
//     isDesktop = true
//   }

//   var myurl = location.href.split("#")[0]
//   myurl = encodeURIComponent(myurl)
//   // var url = ` 获取配置的后台接口?url=${myurl}`
//   getApi("post", "/login/get-jssdk", { url: myurl }).then((res) => {
//     if (res.status) {
//       console.log("微信初始化接口结果：", res)
//       let datad = res.data //转译为Json字符串
//       wx.config({
//         debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
//         appId: datad.appId, // 必填，公众号的唯一标识
//         timestamp: datad.timestamp, // 必填，生成签名的时间戳
//         nonceStr: datad.nonceStr, // 必填，生成签名的随机串
//         signature: datad.signature, // 必填，签名，见附录1
//         jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//       })
//       wx.error(function (res) {
//         $.alert(res.msg || "微信config失败")
//       })
//       // initShare(param)
//       wx.ready(function () {
//         console.info("ready")

//         //需在用户可能点击分享按钮前就先调用
//         wx.updateAppMessageShareData(param)
//         //需在用户可能点击分享按钮前就先调用
//         wx.updateTimelineShareData(param)
//       })
//     }
//   })
//   return

//   if (isWeixin) {
//     console.log("这是维系11")
//     var link = window.location.href.split("#")[0]
//     console.log("这是维系12", link)
//     getApi("post", "/login/get-jssdk", { url: link }).then((res) => {
//       if (res.status) {
//         console.log("微信初始化接口结果：", res)
//         var datad = res.data //转译为Json字符串
//         const { appId, timestamp, nonceStr, signature } = signPackage
//         console.log("signPackage", signPackage)
//         wx.config({
//           debug: true, // 调试时可开启
//           appId: appId, // <!-- replace -->
//           timestamp, // 必填，填任意数字即可
//           nonceStr, // 必填，填任意非空字符串即可
//           signature, //'signature', // 必填，填任意非空字符串即可
//           jsApiList: ["chooseImage", "previewImage"], // 必填，随意一个接口即可
//           openTagList: ["wx-open-launch-weapp"], // 填入打开小程序的开放标签名
//         })

//         wx.error(function (res) {
//           $.alert(res.msg)
//         })
//       }
//       var containerEl = document.getElementById("wechat-web-container")
//       containerEl.classList.remove("hidden")
//       containerEl.classList.add("full", "wechat-web-container")

//       var launchBtn = document.getElementById("launch-btn")
//       launchBtn.addEventListener("ready", function (e) {
//         console.log("开放标签 ready")
//       })
//       launchBtn.addEventListener("launch", function (e) {
//         console.log("开放标签 success")
//       })
//       launchBtn.addEventListener("error", function (e) {
//         console.log("开放标签 fail", e.detail)
//       })
//       console.log("这是维系222")
//     })
//   } else if (isDesktop) {
//     // 在 pc 上则给提示引导到手机端打开
//     var containerEl = document.getElementById("desktop-web-container")
//     containerEl.classList.remove("hidden")
//     containerEl.classList.add("full", "desktop-web-container")
//   } else {
//     var containerEl = document.getElementById("public-web-container")
//     containerEl.classList.remove("hidden")
//     containerEl.classList.add("full", "public-web-container")
//     var c = new cloud.Cloud({
//       // 必填，表示是未登录模式
//       identityless: true,
//       // 资源方 AppID
//       resourceAppid: "小程序 AppID", // <!-- replace -->
//       // 资源方环境 ID
//       resourceEnv: "云开发环境 ID", // <!-- replace -->
//     })
//     await c.init()
//     window.c = c

//     var buttonEl = document.getElementById("public-web-jump-button")
//     var buttonLoadingEl = document.getElementById(
//       "public-web-jump-button-loading"
//     )
//     try {
//       await openWeapp(() => {
//         buttonEl.classList.remove("weui-btn_loading")
//         buttonLoadingEl.classList.add("hidden")
//       })
//     } catch (e) {
//       buttonEl.classList.remove("weui-btn_loading")
//       buttonLoadingEl.classList.add("hidden")
//       throw e
//     }
//   }
// })

// async function openWeapp(onBeforeJump) {
//   var c = window.c
//   const res = await c.callFunction({
//     name: "public",
//     data: {
//       action: "getUrlScheme",
//     },
//   })
//   console.warn(res)
//   if (onBeforeJump) {
//     onBeforeJump()
//   }
//   location.href = res.result.openlink
// }
