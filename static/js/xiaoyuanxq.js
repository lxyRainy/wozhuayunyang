var id
$(function () {
  id = getUrlParam("id")
  console.log("id==", id)
  getOrgInfo(id)
  let sfpay = sessionStorage.getItem("sfpay")
  state = getUrlCode("state")
  if (state == "1" && sfpay == "1") {
    // 直接调云养的接口
    sessionStorage.removeItem("sfpay") // 此页面调用过一次支付以后就不要直接再调了
    yunyangClick()
  }
})

// 获取机构信息
function getOrgInfo (id) {
  let param = {
    org_id: id,
  }
  getApi("post", "/ca-caring-organization/get", param).then((res) => {
    let data = res.data
    sessionStorage.setItem("orgData", JSON.stringify(res.data))
    shareOrg(data)
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
  let params = {
    org_id: id,
    type: 1,
    user_id: userId,
    num: "",
    pet_id: "",
  }
  const page = "xiaoyuanxq.html?id=" + id
  commonAdoptClick(page, params, "1")
}
function shareOrg (data) {
  let param = {
    title: data.org_name, // 分享标题
    desc: "欢迎云养我家小院的毛孩子，非常感谢你的爱心和付出！", // 分享描述
    link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: data.box_image, // 分享图标
    success: function () {
      // 设置成功
      console.log("分享设置成功")
    },
  }
  initWxConfig(param)
}
