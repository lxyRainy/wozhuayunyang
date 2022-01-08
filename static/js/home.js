$(function () {
  getHomeCx()
})
function getHomeCx() {
  getApi("post", "/ca-caring-organization/list").then((res) => {
    console.log("res", res)
    let data = res.data
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
  })
  // let timestamp = new Date().getTime().toString().substr(0, 10)
  // let url = "/ca-caring-organization/list"
  // let sign = md5(key + url + timestamp + key).toUpperCase() //签名
  // let params = {
  //   timestamp,
  //   sign,
  // }
  // $.ajax({
  //   // 请求方式
  //   type: "post",
  //   // 请求的媒体类型
  //   contentType: "application/x-www-form-urlencoded",
  //   // 请求地址
  //   url: router + url, //+ "?timestamp=" + timestamp + "&sign=" + sign,
  //   // 数据，json字符串
  //   data: params, // JSON.stringify(params),
  //   // header: header,
  //   // 请求成功
  //   success: function (res) {
  //     if (res.success) {
  //     }
  //   },
  //   error: function (res) {},
  // })
}
// 输入框change事件
function xyncChange(v) {
  // console.log("v", $(v).val())
  if ($(v).val() !== "") {
    $(".home_top img").show()
  } else {
    $(".home_top img").hide()
  }
}
// 叉的点击事件
function chaClick() {
  $(".home_top img").hide()
  $(".home_top input").val("")
}
// 打开小院详情
function openXyxq(id) {
  window.location.href = "xiaoyuanxq.html?id=" + id
}
