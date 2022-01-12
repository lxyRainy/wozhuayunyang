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
  $("#yunyang_price").html("￥" + fmPrice(data.renew_price / 20) + "（5周）")
  showVideos(data.files)
}
async function showVideos (files) {
  let html = ""
  const len = files.length
  if (files && len) {
    let item = files[0]
    // const videoImg = await this.getVideoBase64(item.file_url) // video的url
    // getVideoFrame(3);
    html = `
    <div class="video_item">
      <div style="line-height:8vw;">拍摄于${formatTime(item.add_time)}</div>
      <video src="${item.file_url
      }" class="pet_video"  webkit-playsinline="true" controls="controls" id="myVideo" poster="static/images/home/cat.png" ></video>
    </div>      
    `
    html += `
    <div class="video_item">
      <div class="pet_video"  style="filter:contrast(5%) blur(5px);background:black;height:100vw"></div>
      ${len > 1
        ? `<p class="unlock_video">云养成功后解锁剩余${len - 1}个视频</p>`
        : ""
      } 
    </div>      
    `
    $("#pet_movies").html(html)

    getVideoBase64(item.file_url).then((res) => {
      poster = res
      // console.log("111", poster)
      $("#myVideo").attr("poster", res)
    })
  } else {
    html = "<div class='no_data'>暂无数据</div>"
    $("#pet_movies").html(html)
  }
}

function getVideoBase64 (url) {
  // console.log('url', url)
  return new Promise(function (resolve, reject) {
    let dataURL = ""
    const video = document.createElement("video")
    video.setAttribute("crossOrigin", "Anonymous") // 处理跨域
    video.setAttribute("src", url)
    // 可以设置创建视频有固定的宽高
    // video.setAttribute('width', 400)
    // video.setAttribute('height', 240)
    video.setAttribute("preload", "auto") // auto|metadata|none
    video.addEventListener("loadeddata", function () {
      const canvas = document.createElement("canvas")
      // canvas的尺寸和设置的视频宽高一样
      // const width = video.width
      // const height = video.height
      // 如果未设置创建时视频的宽高，则使用默认视频的宽高
      const width = video.videoWidth
      const height = video.videoHeight
      canvas.width = width
      canvas.height = height
      canvas.getContext("2d").drawImage(video, 0, 0, width, height) // 绘制canvas
      dataURL = canvas.toDataURL("image/jpeg") // 转换为base64
      // console.log('dataURL:', dataURL) // base64格式的地址
      resolve(dataURL)
    })
  })
}
/**
 * 获取视频封面
 * @param {*} videoUrl 视频链接
 * @param {*} frames 帧数
 */
// const getVideoFrame = (videoUrl, frames) => {
//   const video = document.createElement('video');
//   video.width = 200;
//   video.height = 200;
//   video.src = videoUrl;
//   video.currentTime = 1 / 60 * frames;
//   video.setAttribute('crossOrigin', 'anonymous');
//   video.oncanplay = () => {
//     const oCanvas = document.createElement('canvas');
//     oCanvas.width = video.width;
//     oCanvas.height = video.width;
//     oCanvas.getContext("2d").drawImage(video, 0, 0, video.width, oCanvas.height);
//     const base64 = oCanvas.toDataURL("image/png");
//     console.log(base64, '图片地址');
//   }
// };

function yunyangClick (params) {
  if (!sfLogin) {
    window.location.href = "login.html"
  } else {
    $.alert('此功能暂未开放')
  }
}
