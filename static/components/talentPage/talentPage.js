var talentPage=(function () {
    var id;
    var pag_numpage;//总页数
    var pag_page;//当前页
    var pag_num;//总条数
    var size=10
    var initPage =function (_id,_size,callback) {
        let html=`<div class="pag_content" id="${_id}_content" style="display:none;">
        <div class="pag_num">共-条</div>
        <div class="pag_toFirst"><<</div>
        <div class="pag_toBefore"><</div>
        <div class="pag_page">第-页</div>
        <div class="pag_numpage">共-页</div>
        <div class="pag_toNext">></div>
        <div class="pag_toEnd">>></div>
        <div class="pag_topage">跳至<input class="pag_input">页</div>
    </div>`
        console.log(_id,$("#"+_id))
        $("#"+_id).html('')
        $("#"+_id).html(html)
        id=_id
        size=_size
        if (typeof callback == 'function') {
            initClick(callback)
        } else if (callback) {
            console.error("callback is not a function")
            console.warn("callback should be a function")
        }
    }
    var initPageData = function(totalcount,page){
        if(totalcount){
            $("#"+id+"_content").show()
        }else{
            $("#"+id+"_content").hide()
        }
        pag_num=totalcount;
        pag_numpage=Math.ceil(pag_num/size)
        $(".pag_num").html('共'+pag_num+'条')
        $(".pag_page").html('第'+page+'页')
        pag_page=page
        $(".pag_numpage").html('共'+pag_numpage+'页')
    }

    //初始化点击事件
   var initClick= function (callback) {
        $(".pag_toFirst").on('click',function () {
            if(pag_page!=1){
                callback(1,size)
            }
        });
        $(".pag_toEnd").on('click',function () {
            if(pag_page!=pag_numpage){
                callback(pag_numpage,size)
            }
        });
        $(".pag_toBefore").on('click',function () {
            if(pag_page>1){
                pag_page--;
                callback(pag_page,size)
            }
        });
        $(".pag_toNext").on('click',function () {
            if(pag_page<pag_numpage){
                pag_page++;
                callback(pag_page,size)
            }
        });
        $(".pag_input").blur(function () {
            let toPage=$(".pag_input").val()
            console.log('跳转',toPage)
            if(toPage>pag_numpage){
                toPage=pag_numpage
            }
            if(!toPage||toPage==0){
                $(".pag_input").val('')
                return
            }
            if(toPage!=pag_page){
                callback(toPage,size)
            }
            $(".pag_input").val('')
        });
        $(".pag_input").keyup(function(e){
            if (e.keyCode == "13") {
                let toPage=$(".pag_input").val()
                console.log('跳转',toPage)
                if(toPage>pag_numpage){
                    toPage=pag_numpage
                }
                if(!toPage||toPage==0){
                    $(".pag_input").val('')
                    return
                }
                if(toPage!=pag_page){
                    callback(toPage,size)
                }
                $(".pag_input").val('')
            }
        });
    }
    return {
        initPage:initPage,
        initPageData:initPageData,
    }
})()
