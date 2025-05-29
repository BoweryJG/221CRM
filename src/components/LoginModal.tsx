import React, { useState } from 'react';
import { 
  Modal,
  Form, 
  Input, 
  Button, 
  Typography, 
  Alert,
  Divider,
  Space
} from 'antd';
import { 
  LockOutlined, 
  KeyOutlined,
  MailOutlined,
  GoogleOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;

interface LoginModalProps {
  visible: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ visible }) => {
  const { signIn, signInWithProvider } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form] = Form.useForm();

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      // Sign in with email and password
      const { error } = await signIn(values.email, values.password);
      
      if (error) {
        throw error;
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await signInWithProvider('google');
      
      if (error) {
        throw error;
      }
    } catch (err: any) {
      console.error('Google login error:', err);
      setError(err.message || 'Failed to sign in with Google');
      setLoading(false);
    }
  };

  return (
    <Modal
      open={visible}
      footer={null}
      closable={false}
      centered
      width={400}
      maskClosable={false}
      keyboard={false}
    >
      <div style={{ padding: '20px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <KeyOutlined style={{ fontSize: '48px', color: '#2E5F85', marginBottom: '16px' }} />
          <Title level={2} style={{ marginBottom: 8 }}>221 CRM</Title>
          <Text type="secondary">Sign in to continue</Text>
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
          onFinish={handleLogin}
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
              prefix={<MailOutlined />}
              placeholder="Email"
              autoComplete="email"
              autoFocus
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
        
        <Divider style={{ margin: '16px 0' }}>Or</Divider>
        
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button
            icon={<GoogleOutlined />}
            onClick={handleGoogleLogin}
            loading={loading}
            block
            size="large"
          >
            Continue with Google
          </Button>
        </Space>
        
        <div style={{ 
          textAlign: 'center',
          marginTop: '24px',
          padding: '12px',
          background: '#f0f2f5',
          borderRadius: '6px'
        }}>
          <Text type="secondary" style={{ fontSize: '13px' }}>
            <LockOutlined /> Secured System
          </Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            Milestone Equities
          </Text>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;