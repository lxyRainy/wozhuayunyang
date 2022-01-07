

var talentui = {
    /**
     * @description step  步骤进度条
     * @param type  1 2 3 默认1
     * @param  List 入参
     * @param  id 渲染入盒子的id
     * @author lupeng
     * @date 2021-7-26 10:59:13
     */
    step: function (obj) {
        // 设置默认值等等
        var {List = [], type,id} = obj
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
                $('#'+id).append(box1)
                break;
            case 2:
                $('#'+id).append(box2)
                break;
            default:
                $('#'+id).append(box1)

        }
    }
}