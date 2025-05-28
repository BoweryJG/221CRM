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
  Col
} from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onFinish = async (values: { password: string }) => {
    setLoading(true);
    setError(null);

    try {
      // Simple password check
      if (values.password !== 'golden') {
        throw new Error('Invalid password');
      }
      
      // Sign in with Doug Mino's credentials
      const { error } = await signIn('doug.mino@gmail.com', 'golden');
      
      if (error) {
        throw error;
      }
      
      // Successful login - redirect to maintenance
      navigate('/maintenance');
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Invalid password. Please try again.');
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
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Title level={2} style={{ marginBottom: 8 }}>Doug Mino's CRM</Title>
            <Text type="secondary">221 Bowery Real Estate Management</Text>
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
            name="login"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
            size="large"
          >
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please enter the password' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Enter Password"
                autoComplete="current-password"
                autoFocus
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
                Access System
              </Button>
            </Form.Item>
            
            <Text type="secondary" style={{ display: 'block', textAlign: 'center', fontSize: '12px', marginTop: '24px' }}>
              This system is for authorized personnel only.<br />
              Unauthorized access is prohibited.
            </Text>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
