import React, { useState } from "react";
import {
  UserOutlined,
  FileAddOutlined,
  ReadOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import logo from "../assets/logo.svg";
import { logout } from "@/api/services/authService";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const items: MenuProps["items"] = [
  { icon: UserOutlined, label: "Home", key: "home" },
  { icon: ReadOutlined, label: "My Blogs", key: "myBlogs" },
  { icon: FileAddOutlined, label: "New Blog", key: "newBlog" },
  { icon: LogoutOutlined, label: "Logout", key: "logout" },
].map((itm, index) => ({
  key: String(itm?.key || index),
  icon: React.createElement(itm?.icon),
  label: String(itm.label),
}));

interface TemplateProps {
  children: React.ReactNode;
}

const Template: React.FC<TemplateProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout>
      <Sider
        style={siderStyle}
        collapsed={collapsed}
        collapsible
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[]}
          items={items}
          onClick={(e) => {
            if (e.key === "logout") {
              logout();
            } else if (e.key === "newBlog") {
              navigate("/editor?mode=new", { replace: true });
            } else if (e.key === "myBlogs") {
              navigate("/my-blogs", { replace: true });
            } else if (e.key === "home") {
              navigate("/", { replace: true });
            }
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: colorBgContainer,
            position: "sticky",
            top: 0,
          }}
        >
          <div className="w-full flex justify-between items-center">
            <img src={logo} alt="" />
          </div>
        </Header>
        <Content
          style={{
            margin: "18px 12px 0",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: 12,
              height: "100%",
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <>{children}</>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Venteury ©{new Date().getFullYear()} Developed by Vishal Patel
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Template;
