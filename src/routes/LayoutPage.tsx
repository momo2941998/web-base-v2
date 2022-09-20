import logo from '../image/logoMobifone.png'
import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import { AuthStatus } from '../components/auth';
const { Header, Content, Sider } = Layout
export function LayoutPage() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Header className="site-layout-header" style={{ padding: 0 }} >
          <AuthStatus />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}