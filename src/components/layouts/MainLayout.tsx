import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Layout,
  Menu,
  Button,
  theme,
  Dropdown,
  Avatar,
  Typography,
  Space,
  Switch,
  Drawer,
} from 'antd';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ToolOutlined,
  DollarOutlined,
  FileOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
  SunOutlined,
  MoonOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileDrawerVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle swipe gestures for mobile drawer
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isRightSwipe && isMobile && !mobileDrawerVisible) {
      setMobileDrawerVisible(true);
    }
    if (isLeftSwipe && isMobile && mobileDrawerVisible) {
      setMobileDrawerVisible(false);
    }
  };

  const handleMenuClick = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileDrawerVisible(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const menuItems = [
    {
      key: '/maintenance',
      icon: <ToolOutlined />,
      label: 'Maintenance',
      onClick: () => handleMenuClick('/maintenance'),
    },
    {
      key: '/properties',
      icon: <AppstoreOutlined />,
      label: 'Properties',
      onClick: () => handleMenuClick('/properties'),
    },
    {
      key: '/tenants',
      icon: <TeamOutlined />,
      label: 'Tenants',
      onClick: () => handleMenuClick('/tenants'),
    },
    {
      key: '/financial',
      icon: <DollarOutlined />,
      label: 'Financial',
      onClick: () => handleMenuClick('/financial'),
    },
    {
      key: '/documents',
      icon: <FileOutlined />,
      label: 'Documents',
      onClick: () => handleMenuClick('/documents'),
    },
    {
      key: '/dashboard',
      icon: <HomeOutlined />,
      label: 'Dashboard',
      onClick: () => handleMenuClick('/dashboard'),
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => handleMenuClick('/settings'),
    },
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => handleMenuClick('/profile'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleSignOut,
    },
  ];

  return (
    <Layout 
      style={{ minHeight: '100vh' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={250}
          style={{
            background: '#001529',
          }}
        >
          <div className="logo" style={{ padding: '16px', textAlign: 'center' }}>
            <Title level={4} style={{ color: 'white', margin: 0 }}>
              {collapsed ? 'DM' : "Doug Mino's CRM"}
            </Title>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            items={menuItems}
            selectedKeys={[location.pathname]}
          />
        </Sider>
      )}
      
      {isMobile && (
        <Drawer
          title={
            <Title level={4} style={{ margin: 0 }}>
              Doug Mino's CRM
            </Title>
          }
          placement="left"
          onClose={() => setMobileDrawerVisible(false)}
          open={mobileDrawerVisible}
          width={280}
          bodyStyle={{ padding: 0 }}
        >
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            items={menuItems}
            selectedKeys={[location.pathname]}
          />
        </Drawer>
      )}
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: 24 }}>
            <Button
              type="text"
              icon={isMobile ? <MenuUnfoldOutlined /> : (collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />)}
              onClick={() => isMobile ? setMobileDrawerVisible(true) : setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: 64, height: 64 }}
            />
            <Space>
              <Switch
                checked={isDarkMode}
                onChange={toggleTheme}
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<SunOutlined />}
                style={{ marginRight: 8 }}
              />
              {!isMobile && (
                <Button
                  type="text"
                  icon={<BellOutlined />}
                  style={{ fontSize: '16px' }}
                />
              )}
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <Space style={{ cursor: 'pointer' }}>
                  <Avatar style={{ backgroundColor: '#2E5F85' }}>
                    {user?.user_metadata?.full_name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                  </Avatar>
                  {user && !isMobile && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: 8 }}>
                      <Text strong style={{ fontSize: '14px' }}>
                        {user.user_metadata?.full_name || 'User'}
                      </Text>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        Milestone Equities
                      </Text>
                    </div>
                  )}
                </Space>
              </Dropdown>
            </Space>
          </div>
        </Header>
        <Content
          style={{
            margin: isMobile ? '12px 8px' : '24px 16px',
            padding: isMobile ? 12 : 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflowY: 'auto',
            minHeight: 'calc(100vh - 64px - 24px)',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
