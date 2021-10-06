import { React, useEffect, useState } from "react";
import { Link, useLocation } from "@reach/router";
import { Menu } from "antd";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";

const MainMenu = () => {
  const location = useLocation();
  const [selectedMenuKeys, setSelectedMenuKeys] = useState([]);

  useEffect(() => {
    console.log(
      "re-render: (" + location.pathname + "):",
      location.state?.menukey
    );
    //Cuando cambia el path porque se ha pulsado un elemento del menu ("state" contiene "menukey")
    if (location.state?.menukey) {
      setSelectedMenuKeys([location.state.menukey]);
    } else {
      //Si cambia porque se ha pulsado otro tipo de enlace o se accede directamente por URL
      //Seleccionamos el elemento del menu acorde a la URL
      switch (true) {
        case /^\/recipe/.test(location.pathname):
          setSelectedMenuKeys(["r"]);
          break;
        default:
          setSelectedMenuKeys(["h"]);
      }
    }
  }, [location]);

  /*const handleMenuClick = (e) => {
    setSelectedMenuKeys([e.key]);
  };*/
  return (
    <>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="vertical"
        //onClick={handleMenuClick}
        selectedKeys={selectedMenuKeys}
      >
        <Menu.Item key="h" icon={<HomeOutlined />}>
          <Link to="/" state={{ menukey: "h" }}>
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="r" icon={<UserOutlined />}>
          <Link to="/recipe" state={{ menukey: "r" }}>
            Recetas
          </Link>
        </Menu.Item>
        <Menu.Item key="x" icon={<UserOutlined />}>
          <Link to="/cccc" state={{ menukey: "x" }}>
            CCC
          </Link>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default MainMenu;
