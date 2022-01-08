$(function () {
  let id = getUrlParam("id")
  console.log("id==", id)
  getOrgInfo(id)
})
// 获取机构信息
function getOrgInfo(id) {
  let param = {
    org_id: id,
  }
  getApi("post", "/ca-caring-organization/get", param).then((res) => {
    let data = res.data
    console.log(res)
    $("#topImg").attr("src", data.top_image)
    $(".arrow_header").appendTo(data.org_name)
  })
}
