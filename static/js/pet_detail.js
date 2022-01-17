var org_id, pet_id
$(function () {
  pet_id = getUrlParam("id")
  console.log("id==", pet_id)
  getPetDetail()
})
function getPetDetail() {
  let param = {
    pet_id: pet_id,
  }
  getApi("post", "/ca-pet/get", param).then((res) => {
    console.log("res", res)
    let data = res.data
    if (data) {
      org_id = data.org_id
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
  $("#yunyang_price").html("￥" + fmPrice(data.renew_price / 20) + "（5周）")
  showVideos(data.files)
}
async function showVideos(files) {
  let html = ""
  const len = files.length
  if (files && len) {
    let item = files[0]

    // x5-video-player-type="h5"
    html = `
    <div class="video_item">
      <div style="line-height:8vw;">拍摄于${formatTime(item.add_time)}</div>
      <video  class="pet_video"  webkit-playsinline="true" controls="controls" id="myVideo"  style="object-fit:cover"  poster="static/images/pet_detail/black.jpg" >
      <source src="${item.file_url}">
      </video>
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

    // 这里通过http-server将视频地址与js进行同源
    const videoSrc = item.file_url
    // 饱和度品质 0/10/30/50
    const targetSaturation = 0
    getBestPoster(videoSrc, targetSaturation)
      .then((posterUrl) => {
        // const image = new Image()
        // image.src = posterUrl
        // document.body.append(image)
        $("#myVideo").attr("poster", posterUrl)
      })
      .catch((error) => {
        console.log(error)
      })
  } else {
    html = "<div class='no_data'>暂无数据</div>"
    $("#pet_movies").html(html)
  }
}

// 获取视频基本信息
function getVideoBasicInfo(videoSrc) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video")
    video.src = videoSrc
    // 视频一定要添加预加载
    video.preload = "auto"
    // 视频一定要同源或者必须允许跨域
    video.crossOrigin = "Anonymous"
    // 监听：异常
    video.addEventListener("error", (error) => {
      reject(error)
    })
    // 监听：加载完成基本信息,设置要播放的时常
    video.addEventListener("loadedmetadata", () => {
      const videoInfo = {
        video,
        width: video.videoWidth,
        height: video.videoHeight,
        duration: video.duration,
      }
      resolve(videoInfo)
    })
  })
}
// 获取视频基本信息
function getVideoBasicInfo(videoSrc) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video")
    video.src = videoSrc
    // 视频一定要添加预加载
    video.preload = "auto"
    // 视频一定要同源或者必须允许跨域
    video.crossOrigin = "Anonymous"
    // 监听：异常
    video.addEventListener("error", (error) => {
      reject(error)
    })
    // 监听：加载完成基本信息,设置要播放的时常
    video.addEventListener("loadedmetadata", () => {
      const videoInfo = {
        video,
        width: video.videoWidth,
        height: video.videoHeight,
        duration: video.duration,
      }
      resolve(videoInfo)
    })
  })
}

// 将获取到的视频信息，转化为图片地址
function getVideoPosterInfo(videoInfo) {
  return new Promise((resolve) => {
    const { video, width, height } = videoInfo
    video.addEventListener("canplay", () => {
      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d")
      ctx.drawImage(video, 0, 0, width, height)
      const saturation = getImageSaturation(canvas)
      const posterUrl = canvas.toDataURL("image/jpg")
      resolve({ posterUrl, saturation })
    })
  })
}
// 获取一个图片的平均饱和度
function getImageSaturation(canvas) {
  const ctx = canvas.getContext("2d")
  const uint8ClampedArray = ctx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  ).data
  console.log(uint8ClampedArray)
  const rgbaList = binary2rgba(uint8ClampedArray)
  const hslList = rgbaList.map((item) => {
    return rgb2hsl(item.r, item.g, item.b)
  })
  const avarageSaturation =
    hslList.reduce((total, curr) => total + curr.s, 0) / hslList.length
  return avarageSaturation
}

function rgb2hsl(r, g, b) {
  r = r / 255
  g = g / 255
  b = b / 255

  var min = Math.min(r, g, b)
  var max = Math.max(r, g, b)
  var l = (min + max) / 2
  var difference = max - min
  var h, s, l
  if (max == min) {
    h = 0
    s = 0
  } else {
    s = l > 0.5 ? difference / (2.0 - max - min) : difference / (max + min)
    switch (max) {
      case r:
        h = (g - b) / difference + (g < b ? 6 : 0)
        break
      case g:
        h = 2.0 + (b - r) / difference
        break
      case b:
        h = 4.0 + (r - g) / difference
        break
    }
    h = Math.round(h * 60)
  }
  s = Math.round(s * 100) //转换成百分比的形式
  l = Math.round(l * 100)
  return { h, s, l }
}

function binary2rgba(uint8ClampedArray) {
  const rgbaList = []
  for (let i = 0; i < uint8ClampedArray.length; i++) {
    if (i % 4 === 0) {
      rgbaList.push({ r: uint8ClampedArray[i] })
      continue
    }
    const currentRgba = rgbaList[rgbaList.length - 1]
    if (i % 4 === 1) {
      currentRgba.g = uint8ClampedArray[i]
      continue
    }
    if (i % 4 === 2) {
      currentRgba.b = uint8ClampedArray[i]
      continue
    }
    if (i % 4 === 3) {
      currentRgba.a = uint8ClampedArray[i]
      continue
    }
  }
  return rgbaList
}

// 根据视频地址与播放时长获取图片信息与图片平均饱和度
function getVideoPosterByFrame(videoSrc, targetTime) {
  return getVideoBasicInfo(videoSrc).then((videoInfo) => {
    const { video, duration } = videoInfo
    video.currentTime = targetTime
    return getVideoPosterInfo(videoInfo)
  })
}

async function getBestPoster(videoSrc, targetSaturation) {
  const videoInfo = await getVideoBasicInfo(videoSrc)
  const { duration } = videoInfo
  for (let i = 0; i <= duration; i++) {
    const posterInfo = await getVideoPosterByFrame(videoSrc, i)
    const { posterUrl, saturation } = posterInfo
    // 判断当前饱和度是否大于等于期望的饱和度
    if (saturation >= targetSaturation) {
      return posterUrl
    }
  }
}

function yunyangClick() {
  if (!sfLogin) {
    weChatLogin("pet_detail.html?id=" + pet_id)
  } else {
    // $.alert('此功能暂未开放')
    //这个接口，在小院详情点云养一只时候，传type=1,传orgid，另外两个可以不传
    // 点指定云养的时候，type=5，petid,num=5
    let params = {
      org_id: org_id,
      type: 5,
      user_id: userId,
      num: 5,
      pet_id: pet_id,
    }
    getApi("post", "/ca-pet/adopt", params).then((res) => {
      console.log("res", res)
      let data = res.data
      if (data) {
        console.log("开始支付")
        payPet(data.order_no)
      }
    })
  }
}
