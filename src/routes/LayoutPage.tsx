import logo from '../image/logoMobifone.png'
import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import { AuthStatus } from '../components/auth';
import { useState } from 'react';
import { UserOutlined, LineChartOutlined } from '@ant-design/icons';
import { routeList } from './RouteList';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
const { Header, Content, Sider } = Layout
export function LayoutPage() {
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const handleCollase = () => {
    setCollapsed(old => {
      return !old
    })
  }
  const handleSelect = (info: any) => {
    setSelectedKeys([info.key])
  }
  const menuItems: ItemType[] = [
    {
      key: "1",
      icon: <UserOutlined />,
      title: "User",
      label: (
        <Link to={routeList.USER_INFO}>
          Thông tin tài khoản
        </Link>
      )
    },
    {
      key: "sub1",
      icon: <LineChartOutlined />,
      label: "Báo cáo",
      children: [
        {
          key: "3",
          className: "sub-menu-item",
          label: (
            <Link to={routeList.DETAILED_FEE_LOG_CDR}>
              Log cước chi tiết CDR
            </Link>
          )
        },
        {
          key: "4",
          className: "sub-menu-item",
          label: (
            <Link to={routeList.DETAILED_CALL_QUANTITY_LOG}>
              Báo cáo cước
            </Link>
          )
        }
      ]
    }
  ]
  return (
    <Layout style={{ minHeight: '100vh' }}>
    <Sider collapsible collapsed={collapsed} onCollapse={handleCollase}>
      <div className="logo">
        <Link to={routeList.HOME}>
          <img src = {logo} alt="Logo" />
        </Link>
      </div>
      <Menu theme="dark" mode="inline" selectedKeys={selectedKeys} onSelect={handleSelect} items={menuItems} />
    </Sider>
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