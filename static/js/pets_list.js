$(function () {
  let id = getUrlParam("id")
  console.log("id==", id)
  getPets(id)
})
function getPets(id) {
  let param = {
    org_id: id,
    // status: 1,
  }
  getApi("post", "/ca-pet/list", param).then((res) => {
    let data = res.data
    let html = ""
    if (data && data.length) {
      data.map((item) => {
        // 状态 0全部 1未认养 2认养中
        let status = item.status
        let str = ""
        if (status === 1) {
          str = `<b onclick="openPetDetail(${item.id})">云养它</b>`
        } else {
          str = `<b style="background:var(--light-green-color);border-color:var(--light-green-color);color:#fff">已云养</b>`
        }
        html += `<div class="pets_list">
              <img src="${item.avatar}" alt="宠物">
              <div class="pets_info">
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