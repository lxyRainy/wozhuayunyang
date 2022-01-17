var countdown = 60
var openid = sessionStorage.getItem("openid")
// 发送手机验证码
function sendVerification(val) {
  if (!$("#phone").val()) {
    $.alert("请输入手机号")
    return
  }
  let params = {
    phone: $("#phone").val(),
  }
  settime(val)
  getApi("post", "/login/send-code", params).then((res) => {
    $.alert(res.msg || "发送成功")
  })
}
function settime(val) {
  if (countdown == 0) {
    val.removeAttribute("disabled")
    $(val).html("获取验证码")
    countdown = 60
  } else {
    val.setAttribute("disabled", true)
    $(val).html("获取验证码(" + countdown + ")")
    countdown--
    setTimeout(function () {
      settime(val)
    }, 1000)
  }
}

// 提交点击
function loginSubmit() {
  if (!$("#phone").val()) {
    $.alert("请输入手机号")
    return
  }
  if (!$("#yzm").val()) {
    $.alert("请输入验证码")
    return
  }
  if ($("#yzm").val().length !== 6) {
    $.alert("验证码有误")
    return
  }
  console.log("11", $("#weuiAgree").is(":checked"))
  if (!$("#weuiAgree").is(":checked")) {
    $.alert("请勾选已阅读并同意")
    return
  }
  let params = {
    phone: $("#phone").val(),
    code: $("#yzm").val(),
    byte_openid: openid,
    wechat_openid: openid,
  }

  getApi("post", "/login/phone", params).then((res) => {
    if (res.status) {
      sfLogin = true
      localStorage.setItem("wxUser", JSON.stringify(res.data))
      localStorage.setItem("sfLogin", sfLogin)
      history.back(-1)
    } else {
      $.alert(res.msg || "登录失败")
    }
  })
}
