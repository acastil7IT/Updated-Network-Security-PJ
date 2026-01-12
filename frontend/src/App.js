import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  GlobalOutlined,
  SecurityScanOutlined,
  BugOutlined,
  SafetyOutlined
} from '@ant-design/icons';

import Dashboard from './components/Dashboard';
import NetworkTraffic from './components/NetworkTraffic';
import LiveAlerts from './components/LiveAlerts';
import AdvancedScanning from './components/AdvancedScanning';

import './App.css';

const { Header, Sider, Content } = Layout;

function App() {
  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Command Center',
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
      key: '/security-tools',
      icon: <BugOutlined />,
      label: 'Security & Discovery',
    },
  ];

  return (
    <Router>
      <Layout className="cyberhawk-layout" style={{ minHeight: '100vh' }}>
        <Sider
          className="cyberhawk-sider"
          width={240}
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className="logo">
            <SafetyOutlined style={{ fontSize: '28px', color: '#00d4ff' }} />
            <span className="logo-text">CyberHawk</span>
          </div>
          
          <Menu
            className="cyberhawk-menu"
            mode="inline"
            defaultSelectedKeys={[window.location.pathname]}
            items={menuItems}
            onClick={({ key }) => {
              window.location.pathname = key;
            }}
          />
        </Sider>
        
        <Layout>
          <Header className="cyberhawk-header">
            <div className="header-title">
              <h2 style={{ margin: 0, color: '#1e293b' }}>
                CyberHawk Security Operations Center
              </h2>
            </div>
          </Header>
          
          <Content className="cyberhawk-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/traffic" element={<NetworkTraffic />} />
              <Route path="/alerts" element={<LiveAlerts />} />
              <Route path="/security-tools" element={<AdvancedScanning />} />
              <Route path="/advanced-scanning" element={<AdvancedScanning />} />
              <Route path="/network-discovery" element={<AdvancedScanning />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;