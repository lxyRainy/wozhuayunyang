var orgData = sessionStorage.getItem("orgData")
$(function () {
  let id = getUrlParam("id")
  console.log("id==", id)
  getPets(id)
  // 分享小院的信息
  if (orgData) {
    orgData = JSON.parse(orgData)
    shareOrg(orgData)
  }
})
function getPets(id) {
  let param = {
    org_id: id,
    // status: 1,
  }
  let html = ""
  getApi("post", "/ca-pet/list", param).then((res) => {
    if (res.status && res.data && res.data.length) {
      let data = res.data

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
function openPetDetail(id) {
  window.location.href = "pet_detail.html?id=" + id
}
