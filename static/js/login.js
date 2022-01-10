var openid = ''
// 发送手机验证码
function sendVerification () {
  if (!$("#phone").val()) {
    $.alert('请输入手机号')
    return
  }
  let params = {
    phone: $("#phone").val()
  }
  getApi('post', '/login/send-code', params).then(res => {
    let data = res.data
    getApi('post', '/login/get-byte-openid', { code: data.code }).then(res => {
      openid = data.openid
    })

  })
}
// 提交点击
function loginSubmit () {
  if (!$("#phone").val()) {
    $.alert('请输入手机号')
    return
  }
  if (!$("#yzm").val()) {
    $.alert('请输入验证码')
    return
  }
  if ($("#yzm").val().length !== 6) {
    $.alert('验证码有误')
    return
  }
  console.log('11', $("#weuiAgree").is(':checked'))
  if (!$("#weuiAgree").is(':checked')) {
    $.alert('请勾选已阅读并同意')
    return
  }
}