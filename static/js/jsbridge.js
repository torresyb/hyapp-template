// 获取浏览器类型
var browser = {
  versions: (function () {
    var u = navigator.userAgent
    // app = navigator.appVersion
    return {
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器
      iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      webApp: u.indexOf('Safari') == -1, // 是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, // 是否微信
      qq: u.match(/\sQQ/i) == 'qq' // 是否QQ
    }
  }())
}
window.isIos = browser.versions.ios
window.isAndroid = browser.versions.android
// 这段代码是固定的，必须要放到js中
function setupWebViewJavascriptBridge (callback) {
  // Android
  if (window.isAndroid) {
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge)
    } else {
      document.addEventListener('WebViewJavascriptBridgeReady', function () {
        callback(WebViewJavascriptBridge)
      }, false)
    }
  } else if (window.isIos) {
    // iOS
    if (window.WebViewJavascriptBridge) {
      return callback(WebViewJavascriptBridge)
    }

    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback)
    }

    window.WVJBCallbacks = [callback]
    var WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(function () {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
  }
}
// js调用原生方法
function appInvoked (name, params, cb) {
  if (typeof params === 'object') {
    params = JSON.stringify(params)
  } else {
    try {
      params = eval('(' + params + ')')
      if (typeof params === 'object') {
        params = JSON.stringify(params)
      }
    } catch (e) {

    }
  }
  if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.callHandler) {
    window.WebViewJavascriptBridge.callHandler(name, params, function (res) {
      try {
        res = JSON.parse(res)
      } catch (e) {

      }
      var code = res.code
      if (code == 'success') {
        cb && cb(res.result)
      }
    })
  } else if (window.isIos || window.isAndroid) { // 如果首次调用时候webviewbridge未能初始化成功，需要主动再初始化一下
    setupWebViewJavascriptBridge(function (bridge) {
      appInvoked(name, params, cb)
    })
  } else {
    if (name == 'appOpenWebview') {
      window.location.href = JSON.parse(params).url
    }
    console.log('请在APP内调用' + name + params)
  }
}

// 接受原生方法
function appGetInvoked (name, cb) {
  if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.callHandler) {
    window.WebViewJavascriptBridge.registerHandler(name, cb)
  } else if (isIos || isAndroid) { // 如果首次调用时候webviewbridge未能初始化成功，需要主动再初始化一下
    setupWebViewJavascriptBridge(function (bridge) {
      bridge.registerHandler(name, cb)
    })
  } else {
    console.log('请在APP内调用' + name)
  }
}

setupWebViewJavascriptBridge(function (bridge) {
  var appGetAjaxHeaderSdk = function (cb) {
    bridge.registerHandler('webViewWillDisappear', function () {

    })

    bridge.registerHandler('webViewWillAppear', function () {
      var appAwake = localStorage.getItem('kAppEnterForegroundTime')
      if (needRefreshData(appAwake)) {
        window.location.reload()
      }
      var timestamp = new Date().getTime()
      localStorage.setItem('kAppEnterForegroundTime', timestamp)
    })
  }
  appGetAjaxHeaderSdk(function (data) {
    console.log(data)
  })
})

function needRefreshData (lasttime) {
  if (!lasttime || lasttime == '') {
    return false
  }
  var timestamp = new Date().getTime()
  var distance = timestamp - lasttime
  distance = distance / (60 * 1000) // 换算成分
  if (distance >= 10) {
    return true
  } else {
    return false
  }
}
