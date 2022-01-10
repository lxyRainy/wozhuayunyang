$(function () {
  let id = getUrlParam("id")
  console.log("id==", id)
  getOrgInfo(id)
})
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
}
