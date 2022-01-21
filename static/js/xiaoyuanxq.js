var id
$(function () {
  id = getUrlParam("id")
  console.log("id==", id)
  getOrgInfo(id)
  wechatInit()
  let sfpay = sessionStorage.getItem('sfpay')
  state = getUrlCode('state')
  if (state == '1' && sfpay == '1') {// 直接调云养的接口
    sessionStorage.remove('sfpay')// 此页面调用过一次支付以后就不要直接再调了
    yunyangClick()
  }
})
function wechatInit () {
  // wx.config({
  //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  //   appId: '', // 必填，公众号的唯一标识
  //   timestamp: , // 必填，生成签名的时间戳
  //   nonceStr: '', // 必填，生成签名的随机串
  //   signature: '',// 必填，签名
  //   jsApiList: [] // 必填，需要使用的JS接口列表
  // });
}
// 获取机构信息
function getOrgInfo (id) {
  let param = {
    org_id: id,
  }
  getApi("post", "/ca-caring-organization/get", param).then((res) => {
    let data = res.data
    initOrgPage(data)

    console.log(res)
    $("#openPets").click(function () {
      window.location.href = "pets_list.html?id=" + id
    })
  })
}
// 返显页面
function initOrgPage (data) {
  // 顶部图
  $("#topImg").attr("src", data.top_image)
  // 小院名称
  $("title").html(data.org_name)
  $(".arrow_header").append(data.org_name)
  $(".orgName").html(data.org_name)
  // 剩余 数量
  $("#restAnimal").html(data.pet_num)
  // 价格
  $(".pet_price").html("￥" + fmPrice(data.first_price / 100))
  const category = data.category
  let string = category.content
  string = toBr(string)

  // 云养介绍
  $("#org_info").html(string)
  // 大树
  $("#org_tree img").attr("src", category.logo)
  $("#org_tree p").html(category.desc)
  // 机构信息
  $(".org_address").html(data.province + " " + data.city + " " + data.area)
  $("#org_intro").html(data.intro)
  // 图片
  let imgs = `<img src="${data.image1}"><img src="${data.image2}"><img src="${data.image3}">`
  $("#orgImgs").html(imgs)
  $("#orgDetail").show()
}
// 云养点击事件
function yunyangClick () {
  console.log("云养点击事件wxUser", wxUser)
  if (!wxUser || !openid) {
    weChatLogin("xiaoyuanxq.html?id=" + id, '1')
  } else {
    // $.alert("此功能暂未开放")
    //这个接口，在小院详情点云养一只时候，传type=1,传orgid，另外两个可以不传
    // 点指定云养的时候，type=5，petid,num=5
    let params = {
      org_id: id,
      type: 1,
      user_id: userId,
      num: "",
      pet_id: "",
    }
    getApi("post", "/ca-pet/adopt", params).then((res) => {
      console.log("res", res)
      if (res.status && res.data) {
        let data = res.data
        console.log("开始支付")
        payPet(data.order_no, "xiaoyuanxq.html?id=" + id)
      } else {
        $.alert(res.msg || "操作失败")
      }
    })
  }
}
