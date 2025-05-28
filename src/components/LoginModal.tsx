import React, { useState } from 'react';
import { 
  Modal,
  Form, 
  Input, 
  Button, 
  Typography, 
  Alert,
  Divider,
  Row,
  Col,
  Space
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  GoogleOutlined, 
  FacebookOutlined, 
  AppleOutlined,
  KeyOutlined 
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;

interface LoginModalProps {
  visible: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ visible }) => {
  const { signIn, signInWithProvider } = useAuth();
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form] = Form.useForm();

  const handleEmailLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await signIn(values.email, values.password);
      
      if (error) {
        throw error;
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Invalid credentials. Only authorized users can access this system.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'apple') => {
    setSocialLoading(provider);
    setError(null);

    try {
      const { error } = await signInWithProvider(provider);
      
      if (error) {
        throw error;
      }
    } catch (err: any) {
      console.error(`${provider} login error:`, err);
      setError(`Failed to login with ${provider}. Only authorized users can access this system.`);
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <Modal
      open={visible}
      footer={null}
      closable={false}
      centered
      width={480}
      maskClosable={false}
      keyboard={false}
    >
      <div style={{ padding: '20px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <KeyOutlined style={{ fontSize: '48px', color: '#2E5F85', marginBottom: '16px' }} />
          <Title level={2} style={{ marginBottom: 8 }}>221CRM Access</Title>
          <Text type="secondary">Authorized Personnel Only</Text>
        </div>
        
        {error && (
          <Alert
            message="Access Denied"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: 24 }}
            closable
            onClose={() => setError(null)}
          />
        )}
        
        <Form
          form={form}
          name="login"
          onFinish={handleEmailLogin}
          layout="vertical"
          requiredMark={false}
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Email" 
              autoComplete="email"
            />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              autoComplete="current-password"
            />
          </Form.Item>
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
              size="large"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
        
        <Divider plain>Or continue with</Divider>
        
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Button
                icon={<GoogleOutlined />}
                size="large"
                block
                onClick={() => handleSocialLogin('google')}
                loading={socialLoading === 'google'}
                className="social-login-btn google-btn"
              >
                Google
              </Button>
            </Col>
            <Col span={12}>
              <Button
                icon={<FacebookOutlined />}
                size="large"
                block
                onClick={() => handleSocialLogin('facebook')}
                loading={socialLoading === 'facebook'}
                className="social-login-btn facebook-btn"
              >
                Facebook
              </Button>
            </Col>
          </Row>
          
          <Button
            icon={<AppleOutlined />}
            size="large"
            block
            onClick={() => handleSocialLogin('apple')}
            loading={socialLoading === 'apple'}
            style={{ 
              backgroundColor: '#000',
              borderColor: '#000',
              color: 'white'
            }}
            className="social-login-btn"
          >
            Continue with Apple
          </Button>
        </Space>
        
        <Divider />
        
        <div style={{ 
          background: '#f0f2f5', 
          padding: '16px', 
          borderRadius: '6px',
          marginTop: '20px'
        }}>
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Text strong style={{ color: '#2E5F85' }}>
              <KeyOutlined /> Authorized Users:
            </Text>
            <Text type="secondary" style={{ fontSize: '13px' }}>
              • Doug Mino - Property Manager<br />
              • Jason Golden - System Administrator
            </Text>
            <Text type="secondary" style={{ fontSize: '12px', fontStyle: 'italic' }}>
              Unauthorized access attempts will be logged and reported.
            </Text>
          </Space>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;