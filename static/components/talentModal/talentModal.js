var Ok = function () {
}
var Cancel = function () {
}
var Others = function () {
}
var Close = function () {
}
// 弹窗方法  外部可直接使用talentui.dialog调用
/**
 * 利用talentui调用
 * @type {{toast: 轻提示, dialog: 弹窗, loading: 加载中, close: 关闭方法}}
 */
var talentui = {
    /**
     * @description loading  用于提交防连击等
     * @param type  1 2 3 默认1
     * @param text 加载显示字 默认为加载中
     * @author lupeng
     * @date 2021-6-30 10:22:36
     */
    loading: function (obj) {
        // 设置默认值等等
        var {text = '', type} = obj
        // 创建一个时间戳当层级id
        var date = new Date().getTime()
        // 拼接一个dom节点，其实原理上我们还是使用的插入节点的方式。
        var box1 = $(`<div id="talentui-loading-${date}" class="talentui-loading-box">
                        <div class="talentui-masking-layer">
                        <div class="talentui-loading-line">
                        <div class="talentui-loading">
                        <svg t="1625629316223" class="talentui-loading-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1597" width="32" height="32"><path d="M144.205 202.496a136.678 136.678 0 1 0 273.357 0 136.678 136.678 0 1 0-273.357 0zM41.728 492.902a119.578 119.578 0 1 0 239.155 0 119.578 119.578 0 1 0-239.155 0zM144.23 749.158a102.502 102.502 0 1 0 205.005 0 102.502 102.502 0 1 0-205.005 0zM435.2 861.926a89.6 89.6 0 1 0 179.2 0 89.6 89.6 0 1 0-179.2 0zM725.043 766.26a85.427 85.427 0 1 0 170.855 0 85.427 85.427 0 1 0-170.855 0zM861.747 475.827a68.326 68.326 0 1 0 136.653 0 68.326 68.326 0 1 0-136.653 0zM759.22 219.571a51.251 51.251 0 1 0 102.502 0 51.251 51.251 0 1 0-102.503 0zM512 85.376a34.176 34.176 0 1 0 68.352 0 34.176 34.176 0 1 0-68.352 0z" p-id="1598"></path></svg>
                          <div class="talentui-loading-text">
                            ${text ? text : '加载中'}
                        </div>
                        </div>
                        </div>
                        </div>
                    </div>`)
        var box2 = $(`<div id="talentui-loading-${date}" class="talentui-loading-box">
              </div>`)
        //选取不同类型的轻提示
        switch (type) {
            case 1:
                $('body').append(box1)
                break;
            case 2:
                $('body').append(box2)
                break;
            default:
                $('body').append(box1)

        }
        // 返回我们拼接的id值  用于关闭这个弹窗
        return $('#talentui-loading-' + date)[0]
    },
    /**
     * @description 轻提示 用于提交成功 失败 字段校验
     * @param type  1 2 3 默认1
     * @param status  'success' 提交成功 'false' 提交失败 'warning' 校验提示
     * @param msg 提示语 默认为空
     * @param callback 关闭后的回调
     * @author lupeng
     * @date 2021-6-29 11:47:39
     */
    toast: function (obj) {
        // 设置默认值等等
        var {msg = '', type, status, duration, callback} = obj
        // 创建一个时间戳当层级id
        var date = new Date().getTime()
        //判断成功 失败 校验
        var svg = ''
        switch (status) {
            case 'success':
                svg = '<svg t="1625014976612" class="talentui-toast-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1825" width="32" height="32"><path d="M513.3 512.9m-423 0a423 423 0 1 0 846 0 423 423 0 1 0-846 0Z" fill="#558DF7" p-id="1826"></path><path d="M786.3 328.9c-7.7-7.7-19.4-7.7-27.1 0L443.6 607.8c-7.7 5.8-17.4 5.8-25.2 0l-151-116.2c-7.7-7.7-19.4-7.7-27.1 0-7.7 7.7-7.7 19.4 0 27.1l178.1 178.1c7.7 7.7 19.4 7.7 27.1 0L786.3 356c7.7-7.7 7.7-21.3 0-27.1z m0 0" fill="#FFFFFF" p-id="1827"></path></svg>'
                break;
            case 'fail':
                svg = '<svg t="1625015021076" class="talentui-toast-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2081" width="32" height="32"><path d="M512.8 512m-423 0a423 423 0 1 0 846 0 423 423 0 1 0-846 0Z" fill="#FF7575" p-id="2082"></path><path d="M481.3 590.7c5.3 15.8 15.8 26.2 31.5 26.2 15.8 0 26.2-10.5 31.5-26.2l21-288.7c0-31.5-26.2-52.5-52.5-52.5-31.5 0-52.5 26.2-52.5 57.8l21 283.4z m31.5 78.8c-31.5 0-52.5 21-52.5 52.5s21 52.5 52.5 52.5 52.5-21 52.5-52.5-21-52.5-52.5-52.5z m0 0" fill="#FFFFFF" p-id="2083"></path></svg>'
                break;
            case 'warning':
                svg = '<svg t="1625015054874" class="talentui-toast-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2289" width="32" height="32"><path d="M513.2 212.8l372.3 598.1H147l366.2-598.1m0-61c-18.3 0-42.7 12.2-48.8 30.5L92.1 780.4c-24.4 42.7 6.1 91.5 48.8 91.5h738.5c48.8 0 79.3-54.9 48.8-91.5L562 182.3c-6.1-18.3-30.5-30.5-48.8-30.5z m0 0" fill="#FF262B" p-id="2290"></path><path d="M513.2 652.2c-18.3 0-30.5-12.2-30.5-30.5V438.6c0-18.3 12.2-30.5 30.5-30.5s30.5 12.2 30.5 30.5v183.1c0 18.3-12.2 30.5-30.5 30.5z m0 0M482.6 731.5c0 16.9 13.7 30.5 30.5 30.5 16.9 0 30.5-13.7 30.5-30.5 0-16.9-13.7-30.5-30.5-30.5s-30.5 13.7-30.5 30.5z m0 0" fill="#FF262B" p-id="2291"></path></svg>'
                break;
            default:
                svg = '<svg t="1625014976612" class="talentui-toast-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1825" width="32" height="32"><path d="M513.3 512.9m-423 0a423 423 0 1 0 846 0 423 423 0 1 0-846 0Z" fill="#558DF7" p-id="1826"></path><path d="M786.3 328.9c-7.7-7.7-19.4-7.7-27.1 0L443.6 607.8c-7.7 5.8-17.4 5.8-25.2 0l-151-116.2c-7.7-7.7-19.4-7.7-27.1 0-7.7 7.7-7.7 19.4 0 27.1l178.1 178.1c7.7 7.7 19.4 7.7 27.1 0L786.3 356c7.7-7.7 7.7-21.3 0-27.1z m0 0" fill="#FFFFFF" p-id="1827"></path></svg>'
        }
        // 拼接一个dom节点，其实原理上我们还是使用的插入节点的方式。
        var box1 = $(`<div id="talentui-toast-${date}" class="talentui-toast-box">
                        <div class="talentui-masking-layer">
                        <div class="talentui-toast-line">
                            <div class="talentui-toast">
                            ${svg}
                            <div class="talentui-toast-text">${msg}</div>
                            </div>
                        </div>
                        </div>
                    </div>`)
        var box2 = $(`<div id="talentui-toast-${date}" class="talentui-toast-box">
                            <div class="talentui-masking-layer talentui-masking-layer-white">
                            <div class="talentui-toast-line">
                            <div class="talentui-toast talentui-toast-black">
                            <div class="talentui-toast-text talentui-toast-text-white">${msg}</div>
                            </div>
                        </div>
                        </div>
              </div>`)
        //选取不同类型的轻提示
        switch (type) {
            case 1:
                $('body').append(box1)
                break;
            case 2:
                $('body').append(box2)
                break;
            default:
                $('body').append(box1)

        }
        // 设置关闭延时 默认三秒
        if (!duration) {
            duration = 3000
        }
        setTimeout(function () {
            $('#talentui-toast-' + date)[0].remove()
            if (typeof callback == 'function') {
                callback()
            } else if (callback) {
                console.error("callback is not a function")
                console.warn("callback should be a function")
            }
        }, duration)
    },
    /**
     * @description 弹窗 用于提示和在途流程校验等
     * @param type  1 2 3 默认1
     * @param title  标题  默认为 弹窗
     * @param content 内容 默认为空
     * @param yes 回调
     * @param no 回调
     * @param close 回调
     * @author lupeng
     * @date 2021-6-29 11:47:39
     */
    dialog: function (obj) {
        // 设置默认值等等
        var {title = '弹窗', content = '',type=1,parentContent='body', btn = [], close, area = ['60vw', '33vw'],overflowY='auto',} = obj
        // 创建一个时间戳当层级id
        var date = new Date().getTime()
        var dialog_close = ''
        var dialog_bottom = ''
        if (close) {
            dialog_close = `<a href="javascript:;" class="talentui-rightUp-close" onclick="Close()">×</a>`
            if (typeof close === "function") {
                Close = close
            } else {
                console.error("close is not a function")
                console.warn("close should be a function")
            }
        }
        if (btn && btn.length) {
            // 拼接
            dialog_bottom += `<div class="talentui-dialog-bottom">`
            btn.forEach((element, index) => {
                if (btn.length == 1) {
                    dialog_bottom += `<div style="${element.style ? element.style : ''}" class="talentui-btn talentui-btn-mini talentui-btn-one ${element.status == 'ok' ? 'talentui-btn-primary' : element.status == 'cancel' ? '' : ''}" onclick="${element.status == 'ok' ? 'Ok()' : element.status == 'cancel' ? 'Cancel()' : 'Others()'}">${element.title}</div>`
                } else {
                    dialog_bottom += `<div style="${element.style ? element.style : ''}" class="talentui-btn talentui-btn-mini ${element.status == 'ok' ? 'talentui-btn-primary' : element.status == 'cancel' ? '' : 'talentui-btn-primary'}" onclick="${element.status == 'ok' ? 'Ok()' : element.status == 'cancel' ? 'Cancel()' : 'Others()'}">${element.title}</div>`
                }
                if (element.ok) {
                    if (typeof element.ok === "function") {
                        Ok = element.ok
                    } else {
                        console.error("ok is not a function")
                        console.warn("ok should be a function")
                    }
                }
                if (element.cancel) {
                    if (typeof element.cancel === "function") {
                        Cancel = element.cancel
                    } else {
                        console.error("cancel is not a function")
                        console.warn("cancel should be a function")
                    }
                }
                if (element.others) {
                    if (typeof element.others === "function") {
                        Others = element.others
                    } else {
                        console.error("others is not a function")
                        console.warn("others should be a function")
                    }
                }
            });
            dialog_bottom += `</div>`
        }

        // 拼接一个dom节点，其实原理上我们还是使用的插入节点的方式。
        //    内容可以通过结点生成  ${content?toInnerHTML($(content).clone(true)[0]):''}
        var box1 = $(`<div id="talentui-dialog-${date}" class="talentui-dialog-box">
                <div class="talentui-masking-layer">
                  <div class="talentui-dialog" style="width:${area[0]};min-height:${area[1]}">
                    <div class="talentui-dialog-head">
                    <span>${title}</span>
                      ${dialog_close}
                    </div>
                    <div class="talentui-dialog-content">
                        ${content ? content : ''}
                    </div>
                      ${dialog_bottom}
                  </div>
                </div>
              </div>`)
      
        //  将数据插入到对应的body页面中  当然层级我们肯定要设置很高，防止被其他内容盖住
        var box2 = $(`<div id="talentui-dialog-${date}" class="talentui-dialog-box">
                <div class="talentui-masking-layer">
                  <div class="talentui-dialog-1" style="min-height:${area[1]}">
                    <div class="talentui-dialog-head">
                    <span>${title}</span>
                      ${dialog_close}
                    </div>
                    <div class="talentui-dialog-content">
                        ${content ? content : ''}
                    </div>
                      ${dialog_bottom}
                  </div>
                </div>
              </div>`)
              //    内容可以通过结点生成  ${content?toInnerHTML($(content).clone(true)[0]):''}
        var box3 = $(`<div id="talentui-dialog-${date}" class="talentui-dialog-box">
                <div class="talentui-masking-layer">
                  <div class="talentui-dialog" style="width:${area[0]};min-height:${area[1]}">
                    <div class="talentui-dialog-head1">
                    <span>${title}</span>
                      ${dialog_close}
                    </div>
                    <div class="talentui-dialog-content">
                        ${content ? content : ''}
                    </div>
                      ${dialog_bottom}
                  </div>
                </div>
              </div>`)
        switch (type) {
            case 1:
                $(parentContent).append(box1)
                break;
            case 2:
                $(parentContent).append(box2)
  //               $('.talentui-dialog-bottom').css({
  //   "margin":`calc(${area[1]} - 45px) auto 0 auto`,
  // })
                $('.talentui-rightUp-close').css({
    "color":`#000`,
  })
            break;
            case 3:
                $(parentContent).append(box3)
            break;
            default:
                $(parentContent).append(box1)

        }
        let _thisModal = $('#talentui-dialog-' + date)
        $(_thisModal.find('.talentui-dialog-content')[0]).css('overflow-y',overflowY)
        // 返回我们拼接的id值  用于关闭这个弹窗
        return $('#talentui-dialog-' + date)[0]
    },
    // 关闭弹窗方法，index其实对应的是一个dom节点也就是上方弹窗返还的节点
    close: function (index) {
        //  取当前节点  直接清除
        index.remove();
    }
}
