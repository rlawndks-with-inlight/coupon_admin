import { useEffect } from "react"

//주는 함수
export const onPostWebview = (method) => {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify({ method: method }))
  }
}
//받는 함수
export const onMessageHandler = (e) => {
  const event = JSON.parse(e.data)
  if (event.method == 'kakao_login') {
    alert('asd')
  } else {

  }
}




