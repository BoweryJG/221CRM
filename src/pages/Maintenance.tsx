import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Typography,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  message,
  Row,
  Col,
  Drawer,
  List,
  Badge,
  Divider,
  Alert,
} from 'antd';
import {
  PlusOutlined,
  ToolOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
  CalendarOutlined,
  UserOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { maintenanceService } from '../services/maintenance.service';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

import type { MaintenanceRequest as MaintenanceRequestType } from '../services/maintenance.service';

type MaintenanceRequest = MaintenanceRequestType & { id: string };

const Maintenance: React.FC = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    fetchMaintenanceRequests();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchMaintenanceRequests = async () => {
    setLoading(true);
    try {
      const data = await maintenanceService.getRequests();
      // Filter out any requests without an id
      const validRequests = data.filter((req): req is MaintenanceRequest => !!req.id);
      setRequests(validRequests);
    } catch (error) {
      console.error('Error fetching maintenance requests:', error);
      message.error('Failed to load maintenance requests');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const requestData = {
        ...values,
        tenant_id: user?.id,
        property_name: values.property_id, // This would be updated with actual property name
        unit_number: values.unit_number || '101', // This would come from the form
        tenant_name: user?.email || 'Tenant',
      };

      await maintenanceService.createRequest(requestData);

      message.success('Maintenance request submitted successfully!');
      setIsModalVisible(false);
      form.resetFields();
      fetchMaintenanceRequests();
    } catch (error) {
      console.error('Error submitting request:', error);
      message.error('Failed to submit maintenance request');
    }
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'blue',
      medium: 'gold',
      high: 'orange',
      urgent: 'red',
    };
    return colors[priority as keyof typeof colors];
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: <ClockCircleOutlined />,
      in_progress: <ToolOutlined />,
      completed: <CheckCircleOutlined />,
      cancelled: <ExclamationCircleOutlined />,
    };
    return icons[status as keyof typeof icons];
  };

  const columns: ColumnsType<MaintenanceRequest> = [
    {
      title: 'Request ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => <Text copyable>{id.slice(0, 8)}</Text>,
      responsive: ['md'],
    },
    {
      title: 'Property',
      dataIndex: 'property_name',
      key: 'property_name',
      render: (name: string, record: MaintenanceRequest) => (
        <Space direction="vertical" size={0}>
          <Text strong>{name}</Text>
          <Text type="secondary">Unit {record.unit_number}</Text>
        </Space>
      ),
    },
    {
      title: 'Issue',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, record: MaintenanceRequest) => (
        <Space direction="vertical" size={0}>
          <Text strong>{title}</Text>
          <Text type="secondary">{record.category}</Text>
        </Space>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => (
        <Tag color={getPriorityColor(priority)}>
          {priority.toUpperCase()}
        </Tag>
      ),
      responsive: ['sm'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Space>
          {getStatusIcon(status)}
          <Text>{status.replace('_', ' ').toUpperCase()}</Text>
        </Space>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => dayjs(date).format('MMM DD, YYYY'),
      responsive: ['md'],
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            setSelectedRequest(record);
            setDrawerVisible(true);
          }}
        >
          View Details
        </Button>
      ),
    },
  ];

  const mobileListItem = (item: MaintenanceRequest) => (
    <List.Item
      onClick={() => {
        setSelectedRequest(item);
        setDrawerVisible(true);
      }}
      style={{ cursor: 'pointer' }}
    >
      <List.Item.Meta
        title={
          <Space>
            <Text strong>{item.title}</Text>
            <Tag color={getPriorityColor(item.priority)} size="small">
              {item.priority}
            </Tag>
          </Space>
        }
        description={
          <Space direction="vertical" size={0}>
            <Text type="secondary">
              <HomeOutlined /> {item.property_name} - Unit {item.unit_number}
            </Text>
            <Text type="secondary">
              <CalendarOutlined /> {dayjs(item.created_at).format('MMM DD, YYYY')}
            </Text>
            <Space>
              {getStatusIcon(item.status)}
              <Text type="secondary">{item.status.replace('_', ' ')}</Text>
            </Space>
          </Space>
        }
      />
    </List.Item>
  );

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12}>
          <Title level={isMobile ? 3 : 2}>Maintenance Requests</Title>
        </Col>
        <Col xs={24} sm={12} style={{ textAlign: isMobile ? 'center' : 'right' }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
            size={isMobile ? 'large' : 'middle'}
            block={isMobile}
          >
            Submit New Request
          </Button>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={6}>
          <Card>
            <Badge status="processing" text="Active Requests" />
            <Title level={3} style={{ margin: '8px 0' }}>
              {requests.filter(r => r.status === 'pending' || r.status === 'in_progress').length}
            </Title>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Badge status="warning" text="High Priority" />
            <Title level={3} style={{ margin: '8px 0' }}>
              {requests.filter(r => r.priority === 'high' || r.priority === 'urgent').length}
            </Title>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Badge status="success" text="Completed This Month" />
            <Title level={3} style={{ margin: '8px 0' }}>
              {requests.filter(r => 
                r.status === 'completed' && 
                dayjs(r.completed_date).month() === dayjs().month()
              ).length}
            </Title>
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card>
            <Badge status="default" text="Average Resolution" />
            <Title level={3} style={{ margin: '8px 0' }}>
              3.5 days
            </Title>
          </Card>
        </Col>
      </Row>

      {isMobile ? (
        <List
          loading={loading}
          dataSource={requests}
          renderItem={mobileListItem}
        />
      ) : (
        <Card>
          <Table
            columns={columns}
            dataSource={requests}
            loading={loading}
            rowKey="id"
            pagination={{ pageSize: 10, responsive: true }}
          />
        </Card>
      )}

      <Modal
        title="Submit Maintenance Request"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={isMobile ? '100%' : 600}
        style={isMobile ? { top: 0, margin: 0, height: '100vh' } : {}}
      >
        <Alert
          message="Quick Response Guarantee"
          description="We respond to all maintenance requests within 24 hours."
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
        
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark="optional"
        >
          <Form.Item
            name="property_id"
            label="Property"
            rules={[{ required: true, message: 'Please select a property' }]}
          >
            <Select
              placeholder="Select your property"
              size={isMobile ? 'large' : 'middle'}
            >
              <Option value="prop1">221 S Olive St - Unit 101</Option>
              <Option value="prop2">221 S Olive St - Unit 202</Option>
              <Option value="prop3">221 S Olive St - Unit 303</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select
              placeholder="What type of issue?"
              size={isMobile ? 'large' : 'middle'}
            >
              <Option value="plumbing">Plumbing</Option>
              <Option value="electrical">Electrical</Option>
              <Option value="hvac">HVAC / Temperature</Option>
              <Option value="appliance">Appliance</Option>
              <Option value="structural">Structural</Option>
              <Option value="pest">Pest Control</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="priority"
            label="Priority Level"
            rules={[{ required: true, message: 'Please select priority' }]}
          >
            <Select
              placeholder="How urgent is this?"
              size={isMobile ? 'large' : 'middle'}
            >
              <Option value="low">Low - Can wait a few days</Option>
              <Option value="medium">Medium - Within 48 hours</Option>
              <Option value="high">High - Within 24 hours</Option>
              <Option value="urgent">Urgent - Emergency (ASAP)</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="title"
            label="Brief Description"
            rules={[{ required: true, message: 'Please provide a brief description' }]}
          >
            <Input
              placeholder="e.g., Kitchen sink is leaking"
              size={isMobile ? 'large' : 'middle'}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Detailed Description"
            rules={[{ required: true, message: 'Please provide details' }]}
          >
            <TextArea
              rows={4}
              placeholder="Please describe the issue in detail. Include any relevant information that might help us resolve it faster."
              size={isMobile ? 'large' : 'middle'}
            />
          </Form.Item>

          <Form.Item
            name="images"
            label="Upload Photos (Optional)"
          >
            <Upload
              listType="picture-card"
              multiple
              beforeUpload={() => false}
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => {
                setIsModalVisible(false);
                form.resetFields();
              }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" size={isMobile ? 'large' : 'middle'}>
                Submit Request
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Drawer
        title="Request Details"
        placement={isMobile ? 'bottom' : 'right'}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={isMobile ? '100%' : 500}
        height={isMobile ? '90%' : 'auto'}
      >
        {selectedRequest && (
          <div>
            <Title level={4}>{selectedRequest.title}</Title>
            <Divider />
            
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Text type="secondary">Status:</Text>
                <div>
                  <Space>
                    {getStatusIcon(selectedRequest.status)}
                    <Text strong>{selectedRequest.status.replace('_', ' ').toUpperCase()}</Text>
                  </Space>
                </div>
              </div>

              <div>
                <Text type="secondary">Priority:</Text>
                <div>
                  <Tag color={getPriorityColor(selectedRequest.priority)}>
                    {selectedRequest.priority.toUpperCase()}
                  </Tag>
                </div>
              </div>

              <div>
                <Text type="secondary">Property:</Text>
                <div>
                  <Text strong>{selectedRequest.property_name} - Unit {selectedRequest.unit_number}</Text>
                </div>
              </div>

              <div>
                <Text type="secondary">Category:</Text>
                <div>
                  <Text strong>{selectedRequest.category}</Text>
                </div>
              </div>

              <div>
                <Text type="secondary">Submitted:</Text>
                <div>
                  <Text strong>{dayjs(selectedRequest.created_at).format('MMMM DD, YYYY h:mm A')}</Text>
                </div>
              </div>

              <div>
                <Text type="secondary">Description:</Text>
                <Paragraph>{selectedRequest.description}</Paragraph>
              </div>

              {selectedRequest.notes && (
                <div>
                  <Text type="secondary">Notes:</Text>
                  <Paragraph>{selectedRequest.notes}</Paragraph>
                </div>
              )}

              {selectedRequest.scheduled_date && (
                <div>
                  <Text type="secondary">Scheduled For:</Text>
                  <div>
                    <Text strong>{dayjs(selectedRequest.scheduled_date).format('MMMM DD, YYYY')}</Text>
                  </div>
                </div>
              )}

              {selectedRequest.completed_date && (
                <div>
                  <Text type="secondary">Completed On:</Text>
                  <div>
                    <Text strong>{dayjs(selectedRequest.completed_date).format('MMMM DD, YYYY')}</Text>
                  </div>
                </div>
              )}

              {selectedRequest.cost && (
                <div>
                  <Text type="secondary">Cost:</Text>
                  <div>
                    <Text strong>${selectedRequest.cost.toFixed(2)}</Text>
                  </div>
                </div>
              )}
            </Space>

            {selectedRequest.status === 'pending' && (
              <div style={{ marginTop: 24 }}>
                <Button type="primary" danger block>
                  Cancel Request
                </Button>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Maintenance;