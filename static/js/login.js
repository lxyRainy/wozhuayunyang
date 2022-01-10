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