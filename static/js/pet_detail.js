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
function showVideos(files) {
  let html = ""
  const len = files.length
  if (files && len) {
    let item = files[0]

    html = `
    
    <div class="video_item">
      <div style="line-height:8vw;">拍摄于${formatTime(item.add_time)}</div>
      <video src="${
        item.file_url
      }" class="pet_video"  webkit-playsinline="true" controls="controls" id="myVideo" ></video>
    </div>      
    `
    html += `
    <div class="video_item">
      <div class="pet_video"  style="filter:contrast(5%) blur(5px);background:black;height:100vw"></div>
      ${
        len > 1
          ? `<p class="unlock_video">云养成功后解锁剩余${len - 1}个视频</p>`
          : ""
      } 
    </div>      
    `
    $("#pet_movies").html(html)
    // setPoster()
    let poster = ""
    getVideoBase64(item.file_url).then((res) => {
      poster = res
      console.log("111", poster)
    })
  } else {
    html = "<div class='no_data'>暂无数据</div>"
    $("#pet_movies").html(html)
  }
}

function setPoster() {
  var scale = 0.8 //第一帧图片与源视频的比例
  let video = $("#myVideo") //.get(0) //赋值标签
  $("#myVideo").on("loadeddata", function (e) {
    //加载完成事件，调用函数
    var canvas = document.createElement("canvas") //canvas画布
    canvas.width = video.videoWidth * scale
    canvas.height = video.videoHeight * scale
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height) //画图
    video.setAttribute("poster", canvas.toDataURL("image/png")) //关键一步 —— 设置标签的 poster 属性的值为 base64 编译过后的canvas绘图。
    console.log("post", canvas.toDataURL("image/png"))
  })

  // video.on("loadeddata", function () {
  //   //加载完成事件，调用函数
  //   var canvas = document.createElement("canvas") //canvas画布
  //   canvas.width = video.videoWidth * scale
  //   canvas.height = video.videoHeight * scale
  //   canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height) //画图
  //   video.setAttribute("poster", canvas.toDataURL("image/png")) //关键一步 —— 设置标签的 poster 属性的值为 base64 编译过后的canvas绘图。
  //   console.log("post", canvas.toDataURL("image/png"))
  // })
}
function getVideoBase64(url) {
  return new Promise(function (resolve, reject) {
    let dataURL = ""
    // let video = document.createElement("video")
    // video.setAttribute("crossOrigin", "anonymous") //处理跨域
    // video.setAttribute("src", url)
    // video.setAttribute("width", 400)
    // video.setAttribute("height", 240)
    // video.setAttribute("preload", "auto")
    let video = document.getElementById("myVideo")
    console.log("video", video)
    video.addEventListener("loadeddata", function () {
      let canvas = document.createElement("canvas"),
        width = video.width, //canvas的尺寸和图片一样
        height = video.height
      canvas.width = width
      canvas.height = height
      canvas.getContext("2d").drawImage(video, 0, 0, width, height) //绘制canvas
      dataURL = canvas.toDataURL("image/jpeg") //转换为base64
      console.log("dataURL", dataURL)
      resolve(dataURL)
    })
  })
}
