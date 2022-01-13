var allOrg = sessionStorage.getItem("allOrg")
  ? JSON.parse(sessionStorage.getItem("allOrg"))
  : [] //所有组织
var allOrgHtml = ""
var timer = null //定时器
$(function () {
  // hideHeader()
  console.log($(".home_top input").val())
  // $.showLoading('加载中')
  getHomeCx()
  // inputkeyup事件
  xyncChange()
})

function getHomeCx () {
  // console.log("sessionStorage.getItem", sessionStorage.getItem("allOrg"))
  // console.log("allOrg", allOrg)
  if (allOrg.length === 0) {
    // console.log('111')
    getApi("post", "/ca-caring-organization/list").then((res) => {
      console.log("res", res)
      let data = res.data
      allOrg = data
      sessionStorage.setItem("allOrg", JSON.stringify(allOrg))
      showOrgs(data, true)
    })
  } else {
    // console.log('222')
    let myinput = $(".home_top input").val()
    if (myinput) {
      $(".home_top img").show()
      getOrgsByInput(myinput)
    } else {
      showOrgs(allOrg, true)
    }
  }
}

/**
 * 渲染所有组织页面
 * @param {*} data 渲染的数据
 * @param {*} flag 是否渲染所有数据，true为是
 */
function showOrgs (data, flag) {
  let html = ""
  if (!flag) {
    // 模糊搜索的
    data.map((item, i) => {
      let price = fmPrice(item.first_price / 100)
      html += ` <div class="content_item" onclick="openXyxq('${item.id}')">
      <img src="${item.box_image || "../static/images/home/cat.png"}" alt="" />
      <p>${item.org_name}</p>
      <div class="content_msg"><b>￥${price}</b><span>剩余:${item.pet_num
        }</span></div>
    </div>`
    })
  } else {
    if (!allOrgHtml) {
      data.map((item, i) => {
        let price = fmPrice(item.first_price / 100)
        html += ` <div class="content_item" onclick="openXyxq('${item.id}')">
        <img src="${item.box_image || "../static/images/home/cat.png"
          }" alt="" />
        <p>${item.org_name}</p>
        <div class="content_msg"><b>￥${price}</b><span>剩余:${item.pet_num
          }</span></div>
      </div>`
      })
    } else {
      allOrgHtml = html
    }
  }

  $("#home_content").html(html)
}
// 输入框change事件
function xyncChange () {
  const xync = document.getElementById('xync')
  xync.addEventListener('keyup', debounce(function () {
    console.log('keyup');
    myinput = xync.value
    if (!myinput) {
      $(".home_top img").hide()
      showOrgs(allOrg)
    } else {
      $(".home_top img").show()
      // 模糊搜索
      getOrgsByInput(myinput)
    }
  }, 400))
}
// 模糊搜索
function getOrgsByInput (val) {
  val = val.toUpperCase()
  let newArr = allOrg.filter((item, i) => {
    return (
      item.org_name.toUpperCase().indexOf(val) !== -1 ||
      item.city.toUpperCase().indexOf(val) !== -1 ||
      item.province.toUpperCase().indexOf(val) !== -1 ||
      item.area.toUpperCase().indexOf(val) !== -1
    )
  })
  console.log("newArr".newArr)
  if (newArr.length) {
    showOrgs(newArr)
  } else {
    // html = '<div class="weui-loadmore weui-loadmore_line"><span class="weui-loadmore__tips">暂无数据</span></div>'
    html = "<div class='no_data'>暂无数据</div>"
    $("#home_content").html(html)
  }
}
// 叉的点击事件
function chaClick () {
  $(".home_top img").hide()
  $(".home_top input").val("")
  showOrgs(allOrg)
}
// 打开小院详情
function openXyxq (id) {
  window.location.href = "xiaoyuanxq.html?id=" + id
}
