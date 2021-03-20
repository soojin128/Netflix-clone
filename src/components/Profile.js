import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';
import '../styles/Profile.css';
import Nav from './Nav';
import Plan from './Plan';

function Profile() {
  const user = useSelector(selectUser);
  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>프로필 설정</h1>
        <div className="profileScreen__info">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="avatar"
          />
          <div className="profileScreen__details">
            <h2>{user.email}</h2>
            <div className="profileScreen__plans">
              <h3>원하는 멤버십을 선택하세요.</h3>
              <Plan />
              <button
              onClick={() => auth.signOut()} className="profileScreen__signOut">로그아웃</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;
