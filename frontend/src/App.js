import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout, Menu, Typography, Avatar, Badge, Dropdown, Space, Button, Tooltip } from 'antd';
import {
  DashboardOutlined,
  AlertOutlined,
  GlobalOutlined,
  SecurityScanOutlined,
  BugOutlined,
  WifiOutlined,
  SafetyOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined
} from '@ant-design/icons';

import Dashboard from './components/Dashboard';
import Incidents from './components/Incidents';
import NetworkTraffic from './components/NetworkTraffic';
import LiveAlerts from './components/LiveAlerts';
import AdvancedScanning from './components/AdvancedScanning';
import NetworkDiscovery from './components/NetworkDiscovery';

import './App.css';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Command Center',
    },
    {
      key: '/incidents',
      icon: <AlertOutlined />,
      label: 'Threat Intelligence',
    },
    {
      key: '/traffic',
      icon: <GlobalOutlined />,
      label: 'Network Monitor',
    },
    {
      key: '/alerts',
      icon: <SecurityScanOutlined />,
      label: 'Live Threats',
    },
    {
      key: '/advanced-scanning',
      icon: <BugOutlined />,
      label: 'Security Tools',
    },
    {
      key: '/network-discovery',
      icon: <WifiOutlined />,
      label: 'Asset Discovery',
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile Settings',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'System Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sign Out',
      danger: true,
    },
  ];

  return (
    <Router>
      <Layout className="cyberhawk-layout" style={{ minHeight: '100vh' }}>
        <Sider
          className="cyberhawk-sider"
          width={240}
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          breakpoint="lg"
          collapsedWidth="80"
        >
          <div className="logo">
            <SafetyOutlined style={{ fontSize: '28px', color: '#00d4ff' }} />
            {!collapsed && <span className="logo-text">CyberHawk</span>}
          </div>
          
          <div className="nav-section">
            <Menu
              className="cyberhawk-menu"
              mode="inline"
              defaultSelectedKeys={[window.location.pathname]}
              items={menuItems}
              onClick={({ key }) => {
                window.location.pathname = key;
              }}
            />
          </div>

          {!collapsed && (
            <div className="sidebar-footer">
              <div className="system-status">
                <div className="status-item">
                  <Badge status="success" />
                  <Text className="status-text">System Online</Text>
                </div>
                <div className="status-item">
                  <Badge status="processing" />
                  <Text className="status-text">Monitoring Active</Text>
                </div>
              </div>
            </div>
          )}
        </Sider>
        
        <Layout>
          <Header className="cyberhawk-header">
            <div className="header-left">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className="collapse-btn"
              />
              <div className="header-title">
                <Title level={4} style={{ margin: 0, color: '#1e293b' }}>
                  Security Operations Center
                </Title>
                <Text type="secondary">Real-time threat monitoring and response</Text>
              </div>
            </div>
            
            <div className="header-right">
              <Space size="middle">
                <Tooltip title="Search">
                  <Button type="text" icon={<SearchOutlined />} />
                </Tooltip>
                
                <Badge count={3} size="small">
                  <Tooltip title="Notifications">
                    <Button type="text" icon={<BellOutlined />} />
                  </Tooltip>
                </Badge>
                
                <Dropdown
                  menu={{ items: userMenuItems }}
                  placement="bottomRight"
                  trigger={['click']}
                >
                  <Space className="user-profile" style={{ cursor: 'pointer' }}>
                    <Avatar size="small" icon={<UserOutlined />} />
                    <Text strong>Security Admin</Text>
                  </Space>
                </Dropdown>
              </Space>
            </div>
          </Header>
          
          <Content className="cyberhawk-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/incidents" element={<Incidents />} />
              <Route path="/traffic" element={<NetworkTraffic />} />
              <Route path="/alerts" element={<LiveAlerts />} />
              <Route path="/advanced-scanning" element={<AdvancedScanning />} />
              <Route path="/network-discovery" element={<NetworkDiscovery />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;