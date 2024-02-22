import { useSearchParams } from "react-router-dom";

const { Kakao } = window as any;

export function loginWithKakao() {
  Kakao.Auth.authorize({
    redirectUri: 'http://localhost:3000/auth',
  });
  displayToken();
}
// 아래는 데모를 위한 UI 코드입니다.
function displayToken() {
  console.log(window.location.search)
  const params = new URLSearchParams(window.location.search);
  const auth_code = params.get('auth');
  let token = getCookie(auth_code + '');
  console.log(token)

  if (token) {
    Kakao.Auth.setAccessToken(token);
    Kakao.Auth.getStatusInfo()
      .then(function (res: { status: string }) {
        if (res.status === 'connected') {
          // if(document.getElementById('token-result') != null) document.getElementById('token-result').innerText = 'login success, token: ' + Kakao.Auth.getAccessToken();
          console.log("성공")
        }
      })
      .catch(function (err: any) {
        Kakao.Auth.setAccessToken(null);
        console.log("실패")
      });
  }
}

function getCookie(name: string) {
  let parts = document.cookie.split(name + '=');
  if (parts.length === 2) { return parts[1].split(';')[0]; }
}