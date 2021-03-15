import React from 'react';
import '../styles/Login.css';
import NetflixLogo from '../images/netflix-logo.png';

function Login() {
  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <div className="loginScreen__header">
          <img 
          className="loginScreen__logo"
          src={NetflixLogo}
          alt="logo" 
          />
          <button 
          className="loginScreen__button">
            로그인
          </button>
          </div>
          <div className="loginScreen__gradient" />
        </div>

      <div className="loginScreen__body">
        <>
          <h1>영화, TV 프로그램을 무제한으로.</h1>
          <h2>다양한 디바이스에서 시청하세요. 언제든 해지하실 수 있습니다.</h2>
          <h3>시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일 주소를 입력하세요.</h3>
          <div className="loginScreen__input">
            <form>
              <input type="email" placeholder="이메일 주소" />
              <button className="loginScreen__getStarted">시작하기</button>
            </form>
          </div>
        </>
      </div>
    </div>
  )
}

export default Login;
