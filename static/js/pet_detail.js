$(function () {
  let id = getUrlParam("id")
  console.log("id==", id)
  getPetDetail(id)
})
function getPetDetail(id) {
  let param = {
    pet_id: id,
  }
  getApi("post", "/ca-pet/get", param).then((res) => {
    console.log("res", res)
    let data = res.data
    if (data) {
      showPetPge(data)
    } else {
      $("#petDetail").html("<div class='no_data'>暂无数据</div>")
    }
  })
}
function showPetPge(data) {
  // 顶部图
  $("#topImg").attr("src", data.avatar)
  $(".orgName").html("编号：" + data.pet_no)
  $(".pet_name").html(data.org_nickname)
  $(".arrow_header").append(data.org_nickname)
  $("#pet_intro").html(data.intro)
  const org = data.org_info
  $(".org_address").html(org.province + " " + org.city + " " + org.area)
  $("#orgName").html(org.org_name)
  //   $(".pet_notice>div").html(org.note)
}
