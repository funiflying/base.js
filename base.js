/*
 *@version:1.0.0
 *@author:wutianxiang
 *@date:2015-10-10
 */
Base = {};
/************************
  控制台日志
 ***********************/
Base.Logger = {
        log: function (_msg) {
            if (!!window.console) {
                console.log(_msg);
            }
        },
        info: function (_msg) {
            if (!!window.console) {
                console.info(_msg);
            }
        },
        warn: function (_msg) {
            if (!!window.console) {
                console.warn(_msg);
            }
        },
        error: function (_msg) {
            if (!!window.console) {
                console.error(_msg);
            }
        }
    }
    /************************
      cookies
     ************************/
Base.Cookie = {
        /*
         *@param:name
         *@param:value
         *@param:options
         *@return:cookie
         */
        setCookie: function (COOKIE_NAME, COOKIE_VALUE, OPTIONS) {
            if (typeof COOKIE_VALUE != "undefined") {
                var options = OPTIONS || {};
                var date;
                var expires = '';
                if (COOKIE_VALUE === null) {
                    COOKIE_VALUE = '';
                    options.expires = -1;
                }
                if (options.expires && typeof options.expires == "number") {
                    date = new Date();
                    date.setDate(date.getDate() + options.expires)
                    expires = ';expires=' + date;
                }
                var path = options.path ? ';path=' + options.path : '';
                var domain = options.domain ? '; domain=' + (options.domain) : '';
                var secure = options.secure ? '; secure' : '';
                document.cookie = [COOKIE_NAME, '=', encodeURIComponent(COOKIE_VALUE), expires, path, domain, secure].join('');
            }
        },
        /*
         *@param:name
         *@return:value
         */
        getCookie: function (COOKIE_NAME) {
            if (document.cookie && document.cookie != "") {
                var COOKIE_VALUE = null;
                var cookies = document.cookie.split(';');

                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i].replace(/(^\s*)|(\s*$)/g, "");
                    if (cookie.substring(0, COOKIE_NAME.length + 1) == COOKIE_NAME + '=') {
                        COOKIE_VALUE = encodeURIComponent(cookie.substring(COOKIE_NAME.length + 1));
                    }
                }
                return COOKIE_VALUE;
            }
        },
        /*
         *@param:name
         *@return:void
         */
        clearCookie: function (COOKIE_NAME) {
            var cookie = this.getCookie(COOKIE_NAME);
            if (cookie != null) {
                this.setCookie(COOKIE_NAME, null);
            }
        }
    }
    /************************
     Ajax
    ************************/
Base.Ajax = {
    getAjaxHttp: function () {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTp');
        }
        return xhr;
    },
    ajaxRequest: function (url, methodType, async, params, callback) {
        var xhr = this.getAjaxHttp();
        xhr.open(methodType, url, async);
        if (methodType == 'post') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(params);
        }
        else{
            xhr.send(null);  
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    callback.call(this,xhr.responseText);
                }
            }
        }
    },
    post:function(url, async, params, callback){
        this.ajaxRequest(url,'post', async, params, callback)
    },
    get:function(url, async,callback){
        this.ajaxRequest(url,'get', async, '', callback)
    }






}
