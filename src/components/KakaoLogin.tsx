import styled from "styled-components";
import KakaoLogin from "react-kakao-login";

const { Kakao } = window as any;

const Container = styled.div`
  margin: 15px;
  margin-bottom: 5px;
`

const buttonBlock = {
  border: "none",
  borderRadius: "9px",
  fontSize: "17px",
  width: "284px",
  fontWeight: "500",
  height: "32px",
  cursor: "pointer",
  background: "#fae101",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  padding: "4px 0px",
};

const ButtoninnerText = styled.h3`
  margin: 0;
  font-size: 14px;
`;

function requestUserInfo() {
  Kakao.API.request({
    url: '/v2/user/me',
  })
    .then(function (res: any) {
      alert(JSON.stringify(res));
    })
    .catch(function (err: any) {
      alert(
        'failed to request user information: ' + JSON.stringify(err)
      );
    });
}

export default function SocialKakao(){
  const onSuccess = async (data: any) => {
    console.log("로그인 성공");
    console.log(data)
    const idToken = data.response.access_token  // 엑세스 토큰 백엔드로 전달
  }

  function deleteCookie(name: string) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
  deleteCookie("webid");
  const Logout = () => {
    deleteCookie("webid_ts");
    console.log("로그아웃");
  }
  return (
    <Container>
      <button onClick={requestUserInfo}>사용자 정보 가져오기</button>
      <KakaoLogin
        token={`${process.env.REACT_APP_JAVASCRIPT_KEY}`}
        onSuccess={onSuccess}
        onFail={(err) => console.error("로그인 실패", err)}
        onLogout={Logout}
        style={buttonBlock}
      >
        <ButtoninnerText>카카오로 로그인</ButtoninnerText>
      </KakaoLogin>
    </Container>
  );
};