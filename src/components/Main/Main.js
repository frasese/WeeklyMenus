import { React, useEffect, useState } from "react";
import { useLocation, navigate, Link, Router } from "@reach/router";

import { Layout } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined
} from "@ant-design/icons";
import Button from "antd-button-color";

import AuthService from "../../services/auth.service";

import MyHeader from "../Header/Header";
import Dashboard from "../Dashboard/Dashboard";
import RecipeList from "../Recipes/RecipeList";
import Recipe from "../Recipes/Recipe";
import MainMenu from "./MainMenu";

const { Header, Content, Footer, Sider } = Layout;

const Placeholder = ({ children }) => {
  return children;
};

export default function Main() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
    }
  }, []);

  const handleCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout className="main-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={handleCollapse}
        //collapsedWidth={0}
        //trigger={null}
      >
        <MainMenu />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-header">
          <MyHeader />
        </Header>
        <Content>
          <div className="site-layout-content">
            <Router>
              <Dashboard default />
              <Placeholder path="/recipe">
                <RecipeList path="/" />
                <Recipe path=":recipeId" />
              </Placeholder>
            </Router>
          </div>
        </Content>
        <Footer className="site-layout-footer">Footer by Paco</Footer>
      </Layout>
    </Layout>
  );
}
