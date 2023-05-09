import { useEffect } from "react"

//주는 함수
export const onPostWebview = (method, data) => {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify({ method: method, data: data }))
  }
}
//받는 함수
export const onMessageHandler = (e) => {
  const event = JSON.parse(e.data)
  if (event.method == 'kakao_login') {
    if (event?.data?.id) {
      if (event?.data?.phone) {

      } else {

      }
    }
  } else if (1) {

  }
}




