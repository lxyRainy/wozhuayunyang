var allOrg = sessionStorage.getItem("allOrg")
  ? JSON.parse(sessionStorage.getItem("allOrg"))
  : [] //所有组织

$(function () {
  console.log($(".home_top input").val())
  getHomeCx()
})
function getHomeCx() {
  console.log("allOrg", allOrg)
  if (allOrg.length === 0) {
    getApi("post", "/ca-caring-organization/list").then((res) => {
      console.log("res", res)
      let data = res.data
      allOrg = data
      sessionStorage.setItem("allOrg", JSON.stringify(allOrg))
      showOrgs(data)
    })
  } else {
    let myinput = $(".home_top input").val()
    if (myinput) {
      getOrgsByInput(myinput)
    } else {
      showOrgs(allOrg)
    }
  }
}
// 渲染所有组织页面
function showOrgs(data) {
  let html = ""
  data.map((item, i) => {
    let price = fmPrice(item.first_price / 100)
    html += ` <div class="content_item" onclick="openXyxq('${item.id}')">
    <img src="${item.box_image || "../static/images/home/cat.png"}" alt="" />
    <p>${item.org_name}</p>
    <div class="content_msg"><b>￥${price}</b><span>剩余:${
      item.pet_num
    }</span></div>
  </div>`
    $("#home_content").html(html)
  })
}
// 输入框change事件
function xyncChange(v) {
  // console.log("v", $(v).val())
  if ($(v).val() !== "") {
    $(".home_top img").show()
    // 模糊搜索
    getOrgsByInput($(v).val())
  } else {
    $(".home_top img").hide()
  }
}
// 模糊搜索
function getOrgsByInput(val) {
  let newArr = allOrg.filter((item, i) => {
    return (
      item.org_name.indexOf(val) !== -1 ||
      item.city.indexOf(val) !== -1 ||
      item.province.indexOf(val) !== -1 ||
      item.area.indexOf(val) !== -1
    )
  })
  console.log("newArr".newArr)
  if (newArr.length) {
    showOrgs(newArr)
  } else {
    $("#home_content").html("暂无数据")
  }
}
// 叉的点击事件
function chaClick() {
  $(".home_top img").hide()
  $(".home_top input").val("")
  showOrgs(allOrg)
}
// 打开小院详情
function openXyxq(id) {
  window.location.href = "xiaoyuanxq.html?id=" + id
}
