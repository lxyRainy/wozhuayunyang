$(function () {
  let id = getUrlParam("id")
  console.log("id==", id)
  getPets(id)
})
function getPets (id) {
  let param = {
    org_id: id,
    // status: 1,
  }
  let html = ""
  getApi("post", "/ca-pet/list", param).then((res) => {
    if (res.status && res.data && res.data.length) {
      let data = res.data
      sharePets(data[0].avatar) // 自定义分享

      data.map((item) => {
        // 状态 0全部 1未认养 2认养中
        let status = item.status
        let str = ""
        let clickStr = ""
        let cloudUser = ""
        if (status === 1) {
          str = `<b >云养它</b>`
          clickStr = `onclick="openPetDetail(${item.id})"`
        } else {
          str = `<b style="background:var(--light-green-color);border-color:var(--light-green-color);color:#fff">已云养</b>`
          // if (item.cloudUser) {
          let user = item.cloud_user
          let avatar = user.avatar
          if (user.avatar.indexOf("tx_") !== -1) {
            avatar = "static/images/pet_detail/" + avatar
          }
          cloudUser = `<div class="pet_user"><img src="${avatar}" >${user.nickname} 云养</div>`
          // }
        }
        // <img src="${item.avatar}" alt="宠物">
        html += `<div class="pets_list" ${clickStr}>
              <p style="background-image:url(${item.avatar})" class="pets_img"></p>
              <div class="pets_info">
                ${cloudUser}
                  <p class="pet_name">
                  <span>${item.org_nickname}</span>
                  ${str}
                  </p>
                  <div class="pet_no">编号：${item.pet_no}</div>
                  <div class="pet_intro">${item.intro}</div>
              </div>
          </div>`
      })
    } else {
      html = "<div class='no_data'>暂无数据</div>"
    }

    $("#petsList").html(html)
  })
}
function openPetDetail (id) {
  window.location.href = "pet_detail.html?id=" + id
}
function sharePets (avatar) {
  let param = {
    title: '我家小院的毛孩子', // 分享标题
    desc: "小可爱们等待你的助养，感谢你的爱心和付出！", // 分享描述
    link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: avatar, // 分享图标
    success: function () {
      // 设置成功
      console.log("分享设置成功")
    },
  }
  console.log('详情页分享，入参', param)
  initWxConfig(param)
}

