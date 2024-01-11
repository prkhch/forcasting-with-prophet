import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>헤더</div>
      <button onClick={() => navigate("/")}>리스트</button>
      <button onClick={() => navigate("/login")}>로그인</button>
      <button onClick={() => navigate("/signup")}>회원가입</button>
    </div>
  );
};

export default Header;
