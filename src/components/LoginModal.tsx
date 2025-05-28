import React, { useState } from 'react';
import { 
  Modal,
  Form, 
  Input, 
  Button, 
  Typography, 
  Alert,
  Tooltip
} from 'antd';
import { 
  LockOutlined, 
  KeyOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;

interface LoginModalProps {
  visible: boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ visible }) => {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form] = Form.useForm();

  const handleLogin = async (values: { password: string }) => {
    setLoading(true);
    setError(null);

    try {
      // Check if password is correct
      if (values.password !== 'golden') {
        throw new Error('Invalid password');
      }
      
      // Sign in with Doug Mino's credentials
      const { error } = await signIn('doug.mino@gmail.com', 'golden');
      
      if (error) {
        throw error;
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Invalid password. Please try again.');
    } finally {
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
          <Title level={2} style={{ marginBottom: 8 }}>Doug Mino's CRM</Title>
          <Text type="secondary">Enter Password to Access</Text>
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
            name="password"
            rules={[{ required: true, message: 'Please enter the password' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              autoComplete="current-password"
              autoFocus
              suffix={
                <Tooltip title="Hint: Jason's last name">
                  <QuestionCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
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
        </Form>
        
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