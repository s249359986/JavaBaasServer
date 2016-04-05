/**
 * Created by bill on 15/7/7.
 */








(function ($) {
    // register namespace
    $.extend(true, window, {
        "Util": {
            "Common": {
                "dateFormat": dateFormat

            }
        }
    });


//    function lazyloadImg(opt,callBack){
//        opt.obj.attr("src","image/all/loading.gif");
//        var img=new Image();
//        img.src=opt.url;
//        img.onload=function(){
//            //    $("#picPreviewId img").attr("src",img.src);
//            callBack(true);
//        };
//    }


//    function loadZeroClibord(clzz,atr){
//
//
//
//        var client = new ZeroClipboard( $(clzz) );
//
//        client.on( 'ready', function(event) {
//            // console.log( 'movie is loaded' );
//
//            client.on( 'copy', function(event) {
//
//                //  alert(event.target.innerHTML);
//
//
//                //  event.clipboardData.setData('text/plain', $(event.target).text());
//            } );
//
//            client.on( 'aftercopy', function(event) {
//                //   alert(event.data['text/plain']);
//
//                //  alert(event.data["text/plain"]);
//                console.log('Copied text to clipboard: ' + event.data['text/plain']);
//            } );
//        } );
//
//        client.on( 'error', function(event) {
//            // console.log( 'ZeroClipboard error of type "' + event.name + '": ' + event.message );
//            ZeroClipboard.destroy();
//        } );
//
//    }




//
//    function GetRandomNum(Min,Max)
//    {
//        var Range = Max - Min;
//        var Rand = Math.random();
//        return(Min + Math.round(Rand * Range));
//    }




    function getQueryString(name)
    {

        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }



    function dateFormat(dt,fmt){
        if(fmt==undefined)
        {
            // fmt="yyyy年MM月dd日hh小时mm分ss秒";
            fmt="yyyy-MM-dd hh:mm:ss";  //2015-07-20 20:35:24


        }
        var that=dt;
        var o = {
            "M+": that.getMonth() + 1, //月份
            "d+": that.getDate(), //日
            "h+": that.getHours(), //小时
            "m+": that.getMinutes(), //分
            "s+": that.getSeconds(), //秒
            "q+": Math.floor((that.getMonth() + 3) / 3), //季度
            "S": that.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (that.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    function getClazzLength(s)
    {
        s=String(s);
        return s.length+(s.match(/[^\x00-\xff]/g) ||"").length;//加上匹配到的全角字符长度
    }

//    function getCookie(c_name)
//    {
//        if (document.cookie.length>0)
//        {
//            c_start=document.cookie.indexOf(c_name + "=")
//            if (c_start!=-1)
//            {
//                c_start=c_start + c_name.length+1;
//                c_end=document.cookie.indexOf(";",c_start);
//                if (c_end==-1) c_end=document.cookie.length;
//                return decodeURIComponent(unescape(document.cookie.substring(c_start,c_end)));
//
//            }
//        }
//        return ""
//    }

})(jQuery);

