import React from "react";
import { Link, navigate, useLocation } from "@reach/router";
import Button from "antd-button-color";
import { LeftSquareOutlined, PoweroffOutlined } from "@ant-design/icons";

import AuthService from "../../services/auth.service";

import "./Header.scss";

/*const MainButton = () => {
  const location = useLocation();

  if (location.pathname !== "/") {
    return (
      <Link to="/">
        <Button type="primary" icon={<HomeOutlined />}>
          Return to main
        </Button>
      </Link>
    );
  }
  return null;
};*/

const BackButton = () => {
  const location = useLocation();

  /*console.log(
    location.pathname + " -> " + (location.pathname.match(/\//g) || []).length
  );*/
  if ((location.pathname.match(/\//g) || []).length > 1) {
    return (
      <Link to="../">
        <Button type="primary" icon={<LeftSquareOutlined />}>
          Back
        </Button>
      </Link>
    );
  }
  return null;
};

export default function Header() {
  const handleClick = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <>
      <BackButton />
      <Button
        type="primary"
        className="btn-logout"
        icon={<PoweroffOutlined />}
        onClick={handleClick}
      >
        Logout
      </Button>
    </>
  );
}
