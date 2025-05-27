import React from 'react';
import { Card, Typography, Tabs, Form, Input, Button, Switch, Row, Col, Select, Divider } from 'antd';
import { SaveOutlined, SettingOutlined, UserOutlined, BellOutlined, SafetyOutlined, GlobalOutlined } from '@ant-design/icons';
import { AppSettings } from '../types';
import config from '../utils/config';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const Settings: React.FC = () => {
  const [form] = Form.useForm();

  const initialSettings: AppSettings = {
    companyName: 'Milestone Equities',
    primaryColor: config.PRIMARY_COLOR,
    secondaryColor: config.SECONDARY_COLOR,
    dateFormat: config.DATE_FORMAT,
    timeFormat: config.DATE_TIME_FORMAT,
    currencyFormat: 'USD',
    defaultLanguage: 'en',
    emailNotifications: true,
    smsNotifications: false,
    autoBackup: true,
    backupFrequency: 'daily',
    maintenanceReminders: true,
    leaseEndReminders: true,
    paymentReminders: true,
  };

  const handleSave = (values: AppSettings) => {
    console.log('Saving settings:', values);
    // In a real app, this would be saved to Supabase
  };

  return (
    <div className="settings-page">
      <div className="page-header" style={{ marginBottom: 24 }}>
        <Title level={2}>Settings</Title>
        <Text type="secondary">
          Configure your 221CRM system settings
        </Text>
      </div>

      <Card>
        <Tabs defaultActiveKey="general">
          <TabPane
            tab={
              <span>
                <SettingOutlined />
                General
              </span>
            }
            key="general"
          >
            <Form
              layout="vertical"
              initialValues={initialSettings}
              onFinish={handleSave}
              form={form}
            >
              <Title level={4}>Company Information</Title>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="companyName"
                    label="Company Name"
                    rules={[{ required: true, message: 'Please enter company name' }]}
                  >
                    <Input placeholder="Company Name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="companyLogo"
                    label="Company Logo URL"
                  >
                    <Input placeholder="https://example.com/logo.png" />
                  </Form.Item>
                </Col>
              </Row>

              <Divider />
              <Title level={4}>Display Settings</Title>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="primaryColor"
                    label="Primary Color"
                  >
                    <Input type="color" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="secondaryColor"
                    label="Secondary Color"
                  >
                    <Input type="color" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="defaultLanguage"
                    label="Default Language"
                  >
                    <Select>
                      <Option value="en">English</Option>
                      <Option value="es">Español</Option>
                      <Option value="fr">Français</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="dateFormat"
                    label="Date Format"
                  >
                    <Select>
                      <Option value="MM/DD/YYYY">MM/DD/YYYY</Option>
                      <Option value="DD/MM/YYYY">DD/MM/YYYY</Option>
                      <Option value="YYYY-MM-DD">YYYY-MM-DD</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="timeFormat"
                    label="Time Format"
                  >
                    <Select>
                      <Option value="hh:mm A">12-hour (hh:mm AM/PM)</Option>
                      <Option value="HH:mm">24-hour (HH:mm)</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="currencyFormat"
                    label="Currency Format"
                  >
                    <Select>
                      <Option value="USD">USD ($)</Option>
                      <Option value="EUR">EUR (€)</Option>
                      <Option value="GBP">GBP (£)</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Divider />
              <Title level={4}>Notification Settings</Title>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="emailNotifications"
                    label="Email Notifications"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="smsNotifications"
                    label="SMS Notifications"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="autoBackup"
                    label="Automatic Backups"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="maintenanceReminders"
                    label="Maintenance Reminders"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="leaseEndReminders"
                    label="Lease End Reminders"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="paymentReminders"
                    label="Payment Reminders"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                  Save Settings
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane
            tab={
              <span>
                <UserOutlined />
                User Management
              </span>
            }
            key="users"
          >
            <Text>User management settings will be available here.</Text>
          </TabPane>

          <TabPane
            tab={
              <span>
                <BellOutlined />
                Notifications
              </span>
            }
            key="notifications"
          >
            <Text>Notification settings will be available here.</Text>
          </TabPane>

          <TabPane
            tab={
              <span>
                <SafetyOutlined />
                Security
              </span>
            }
            key="security"
          >
            <Text>Security settings will be available here.</Text>
          </TabPane>

          <TabPane
            tab={
              <span>
                <GlobalOutlined />
                Integrations
              </span>
            }
            key="integrations"
          >
            <Text>Integrations with third-party services will be available here.</Text>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Settings;
