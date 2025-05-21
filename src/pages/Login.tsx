import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Form, 
  Input, 
  Button, 
  Typography, 
  Card,
  Alert,
  Row,
  Col,
  Divider
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await signIn(values.email, values.password);
      
      if (error) {
        throw error;
      }
      
      // Successful login - redirect to dashboard
      navigate('/');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <Card 
          bordered={false} 
          style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}
          className="login-card"
        >
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <Title level={2} style={{ marginBottom: 0 }}>221CRM</Title>
            <Text type="secondary">Bowery Real Estate Management</Text>
          </div>
          
          {error && (
            <Alert
              message="Login Failed"
              description={error}
              type="error"
              showIcon
              style={{ marginBottom: 24 }}
              closable
              onClose={() => setError(null)}
            />
          )}
          
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
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
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="Email" 
                autoComplete="email"
              />
            </Form.Item>
            
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
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
              >
                Sign In
              </Button>
            </Form.Item>
            
            <div style={{ textAlign: 'center' }}>
              <a href="#forgot-password">Forgot password?</a>
            </div>
            
            <Divider plain>Admin Access Only</Divider>
            
            <Text type="secondary" style={{ display: 'block', textAlign: 'center', fontSize: '12px' }}>
              This system is for authorized personnel only.
              Unauthorized access is prohibited.
            </Text>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
