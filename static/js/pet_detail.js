
$(function () {
  let id = getUrlParam("id")
  console.log("id==", id)
  getPetDetail(id)
})
function getPetDetail (id) {
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
function showPetPge (data) {
  // 顶部图
  $("#topImg").attr("src", data.avatar)
  $("#petNo").html("编号：" + data.pet_no)
  $(".pet_name").html(data.org_nickname)
  $(".arrow_header").append(data.org_nickname)
  $("#pet_intro").html(data.intro)
  const org = data.org_info
  $(".org_address").html(org.province + " " + org.city + " " + org.area)
  $("#jgName").html(org.org_name)
  //   $(".pet_notice>div").html(org.note)
  // 云养价格
  $("#yunyang_price").html("￥" + fmPrice(data.first_price / 100))
  showVideos(data.files)
}
function showVideos (files) {
  let html = ''
  const len = files.length
  if (files && len) {
    let item = files[0]
    html = `
    <div class="video_item">
      <div style="line-height:8vw;">拍摄于${formatTime(item.add_time)}</div>
      <video src="${item.file_url}" class="pet_video"  webkit-playsinline="true" controls="controls"></video>
    </div>      
    `
    html += `
    <div class="video_item">
      <video src="${item.file_url}" class="pet_video"  webkit-playsinline="true" style="filter:contrast(10%) blur(5px)"></video>
      ${len > 1 ? `<p class="unlock_video">云养成功后解锁剩余${len - 1}个视频</p>` : ''} 
    </div>      
    `
    // files.map((item, i) => {
    //   // <img src="/static/images/pet_detail/start.svg" class="video_start"></img>
    //   html += `
    //   <div class="video_item">
    //     <div style="line-height:8vw;">拍摄于${formatTime(item.add_time)}</div>
    //     <video src="${item.file_url}" class="pet_video"  webkit-playsinline="true" controls="controls"></video>
    //   </div>      
    //   `
    // })
  } else {
    html = "<div class='no_data'>暂无数据</div>"
  }
  $("#pet_movies").html(html)
}

