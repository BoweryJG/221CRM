import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Typography,
  Button,
  Table,
  Tag,
  Input,
  Space,
  Modal,
  Form,
  Select,
  Divider,
  Statistic,
  Badge,
  Tooltip,
  notification,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  HomeOutlined,
  ShopOutlined,
  BuildOutlined,
  TeamOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { Property } from '../types';
import { supabase } from '../utils/supabase';
import { format } from 'date-fns';

const { Title, Text } = Typography;
const { Option } = Select;

const Properties: React.FC = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Mock portfolio data for demonstration
  // In a real app, this would be fetched from Supabase
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Simulating API call with timeout
        setTimeout(() => {
          const mockProperties: Property[] = [
            {
              id: '221',
              name: '221 Bowery',
              address: '221 Bowery',
              city: 'New York',
              state: 'NY',
              zip: '10002',
              imageUrl: 'https://example.com/221-bowery.jpg',
              acquisitionDate: '2013-06-10',
              purchasePrice: 5600000,
              currentValue: 7400000,
              description: 'Mixed-use property with retail space on ground floor and residential units above.',
              totalUnits: 4,
              occupiedUnits: 4,
              propertyType: 'mixed-use',
              amenities: ['Elevator', 'Roof access', 'Storage'],
              createdAt: '2013-06-10T00:00:00Z',
              updatedAt: '2023-01-15T00:00:00Z',
            },
            {
              id: '219',
              name: '219 Bowery',
              address: '219 Bowery',
              city: 'New York',
              state: 'NY',
              zip: '10002',
              imageUrl: 'https://example.com/219-bowery.jpg',
              acquisitionDate: '2013-06-10',
              purchasePrice: 5100000,
              currentValue: 6800000,
              description: 'Mixed-use building with retail on ground floor and 5 residential units.',
              totalUnits: 5,
              occupiedUnits: 4,
              propertyType: 'mixed-use',
              amenities: ['Roof access', 'Storage'],
              createdAt: '2013-06-10T00:00:00Z',
              updatedAt: '2022-11-10T00:00:00Z',
            },
            {
              id: '83',
              name: '83 Bowery',
              address: '83 Bowery',
              city: 'New York',
              state: 'NY',
              zip: '10002',
              imageUrl: 'https://example.com/83-bowery.jpg',
              acquisitionDate: '2013-06-10',
              purchasePrice: 4800000,
              currentValue: 6500000,
              description: 'Mixed-use property with commercial space on ground floor and residential units.',
              totalUnits: 6,
              occupiedUnits: 6,
              propertyType: 'mixed-use',
              amenities: ['Laundry', 'Storage', 'Security system'],
              createdAt: '2013-06-10T00:00:00Z',
              updatedAt: '2023-02-20T00:00:00Z',
            },
            {
              id: '85',
              name: '85 Bowery',
              address: '85 Bowery',
              city: 'New York',
              state: 'NY',
              zip: '10002',
              imageUrl: 'https://example.com/85-bowery.jpg',
              acquisitionDate: '2013-06-10',
              purchasePrice: 5200000,
              currentValue: 7100000,
              description: 'Renovated mixed-use building with prime retail and residential units.',
              totalUnits: 5,
              occupiedUnits: 5,
              propertyType: 'mixed-use',
              amenities: ['Elevator', 'Laundry', 'Renovated interiors'],
              createdAt: '2013-06-10T00:00:00Z',
              updatedAt: '2023-04-05T00:00:00Z',
            },
            {
              id: '88',
              name: '88 Bowery',
              address: '88 Bowery',
              city: 'New York',
              state: 'NY',
              zip: '10002',
              imageUrl: 'https://example.com/88-bowery.jpg',
              acquisitionDate: '2013-06-10',
              purchasePrice: 6100000,
              currentValue: 8200000,
              description: 'Corner mixed-use building with excellent retail visibility and residential units.',
              totalUnits: 7,
              occupiedUnits: 6,
              propertyType: 'mixed-use',
              amenities: ['Elevator', 'Security system', 'Storage'],
              createdAt: '2013-06-10T00:00:00Z',
              updatedAt: '2023-03-12T00:00:00Z',
            },
            {
              id: '103',
              name: '103 Bowery',
              address: '103 Bowery',
              city: 'New York',
              state: 'NY',
              zip: '10002',
              imageUrl: 'https://example.com/103-bowery.jpg',
              acquisitionDate: '2013-06-10',
              purchasePrice: 5500000,
              currentValue: 7300000,
              description: 'Mixed-use property with high-ceiling retail space and residential units.',
              totalUnits: 4,
              occupiedUnits: 3,
              propertyType: 'mixed-use',
              amenities: ['Storage', 'Roof access'],
              createdAt: '2013-06-10T00:00:00Z',
              updatedAt: '2022-10-18T00:00:00Z',
            },
            {
              id: '105',
              name: '105 Bowery',
              address: '105 Bowery',
              city: 'New York',
              state: 'NY',
              zip: '10002',
              imageUrl: 'https://example.com/105-bowery.jpg',
              acquisitionDate: '2013-06-10',
              purchasePrice: 5300000,
              currentValue: 7000000,
              description: 'Mixed-use building with prime retail space and well-maintained residential units.',
              totalUnits: 5,
              occupiedUnits: 5,
              propertyType: 'mixed-use',
              amenities: ['Laundry', 'Storage'],
              createdAt: '2013-06-10T00:00:00Z',
              updatedAt: '2023-01-30T00:00:00Z',
            },
            {
              id: '262',
              name: '262 Bowery',
              address: '262 Bowery',
              city: 'New York',
              state: 'NY',
              zip: '10012',
              imageUrl: 'https://example.com/262-bowery.jpg',
              acquisitionDate: '2013-06-10',
              purchasePrice: 5900000,
              currentValue: 7800000,
              description: 'Mixed-use property with gallery/retail space and residential lofts above.',
              totalUnits: 3,
              occupiedUnits: 3,
              propertyType: 'mixed-use',
              amenities: ['High ceilings', 'Freight elevator', 'Storage'],
              createdAt: '2013-06-10T00:00:00Z',
              updatedAt: '2022-12-07T00:00:00Z',
            },
            {
              id: '276',
              name: '276 Bowery',
              address: '276 Bowery',
              city: 'New York',
              state: 'NY',
              zip: '10012',
              imageUrl: 'https://example.com/276-bowery.jpg',
              acquisitionDate: '2013-06-10',
              purchasePrice: 6000000,
              currentValue: 8000000,
              description: 'Historic mixed-use building with restaurant space and residential units.',
              totalUnits: 4,
              occupiedUnits: 4,
              propertyType: 'mixed-use',
              amenities: ['Original details', 'High ceilings', 'Storage'],
              createdAt: '2013-06-10T00:00:00Z',
              updatedAt: '2023-02-14T00:00:00Z',
            },
            {
              id: '280',
              name: '280 Bowery',
              address: '280 Bowery',
              city: 'New York',
              state: 'NY',
              zip: '10012',
              imageUrl: 'https://example.com/280-bowery.jpg',
              acquisitionDate: '2013-06-10',
              purchasePrice: 6200000,
              currentValue: 8300000,
              description: 'Mixed-use corner property with excellent retail visibility.',
              totalUnits: 4,
              occupiedUnits: 3,
              propertyType: 'mixed-use',
              amenities: ['Elevator', 'Roof access', 'Storage'],
              createdAt: '2013-06-10T00:00:00Z',
              updatedAt: '2022-09-22T00:00:00Z',
            },
            {
              id: '284',
              name: '284 Bowery',
              address: '284 Bowery',
              city: 'New York',
              state: 'NY',
              zip: '10012',
              imageUrl: 'https://example.com/284-bowery.jpg',
              acquisitionDate: '2013-06-10',
              purchasePrice: 5800000,
              currentValue: 7600000,
              description: 'Mixed-use property with restaurant space and residential lofts.',
              totalUnits: 3,
              occupiedUnits: 3,
              propertyType: 'mixed-use',
              amenities: ['High ceilings', 'Original details', 'Roof access'],
              createdAt: '2013-06-10T00:00:00Z',
              updatedAt: '2023-03-05T00:00:00Z',
            },
          ];
          setProperties(mockProperties);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(
    property =>
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.zip.includes(searchTerm)
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const showAddPropertyModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values: any) => {
    const newProperty: Partial<Property> = {
      ...values,
      id: `property-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // In a real app, this would be an API call to Supabase
    setProperties([...properties, newProperty as Property]);
    setIsModalVisible(false);
    notification.success({
      message: 'Property Added',
      description: `${newProperty.name} has been added to your portfolio.`,
    });
  };

  const handleViewProperty = (id: string) => {
    navigate(`/properties/${id}`);
  };

  // Property summary stats
  const totalProperties = properties.length;
  const totalUnits = properties.reduce((sum, property) => sum + property.totalUnits, 0);
  const occupiedUnits = properties.reduce((sum, property) => sum + property.occupiedUnits, 0);
  const occupancyRate = totalUnits > 0 ? (occupiedUnits / totalUnits) * 100 : 0;
  const totalValue = properties.reduce((sum, property) => sum + property.currentValue, 0);

  const propertyTypeIcon = (type: string) => {
    switch (type) {
      case 'residential':
        return <HomeOutlined />;
      case 'commercial':
        return <ShopOutlined />;
      case 'mixed-use':
        return <BuildOutlined />;
      default:
        return <HomeOutlined />;
    }
  };

  const columns = [
    {
      title: 'Property',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Property) => (
        <Space>
          {propertyTypeIcon(record.propertyType)}
          <a onClick={() => handleViewProperty(record.id)}>{text}</a>
        </Space>
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (text: string, record: Property) => (
        <span>{`${text}, ${record.city}, ${record.state} ${record.zip}`}</span>
      ),
    },
    {
      title: 'Units',
      key: 'units',
      render: (text: string, record: Property) => (
        <span>
          {record.occupiedUnits}/{record.totalUnits} (
          {((record.occupiedUnits / record.totalUnits) * 100).toFixed(0)}%)
        </span>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'propertyType',
      key: 'propertyType',
      render: (type: string) => (
        <Tag color={type === 'mixed-use' ? 'green' : type === 'commercial' ? 'blue' : 'purple'}>
          {type.replace('-', ' ').toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Current Value',
      dataIndex: 'currentValue',
      key: 'currentValue',
      render: (value: number) => (
        <span>${value.toLocaleString()}</span>
      ),
    },
    {
      title: 'Acquisition Date',
      dataIndex: 'acquisitionDate',
      key: 'acquisitionDate',
      render: (date: string) => (
        <span>{format(new Date(date), 'MMM dd, yyyy')}</span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Property) => (
        <Space size="middle">
          <Tooltip title="View Details">
            <Button 
              type="primary" 
              shape="circle" 
              icon={<EyeOutlined />} 
              onClick={() => handleViewProperty(record.id)} 
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button 
              shape="circle" 
              icon={<EditOutlined />} 
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="properties-page">
      <div className="page-header" style={{ marginBottom: 24 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2}>Properties</Title>
            <Text type="secondary">
              Manage your Bowery real estate portfolio of {totalProperties} properties
            </Text>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showAddPropertyModal}
            >
              Add Property
            </Button>
          </Col>
        </Row>
      </div>

      {/* Properties Summary */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Properties"
              value={totalProperties}
              prefix={<HomeOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Units"
              value={totalUnits}
              prefix={<BuildOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Statistic
              title="Occupancy Rate"
              value={occupancyRate.toFixed(1)}
              suffix="%"
              prefix={<TeamOutlined />}
              valueStyle={{ color: occupancyRate > 90 ? '#3f8600' : '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Statistic
              title="Portfolio Value"
              value={totalValue}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#3f8600' }}
              formatter={value => `$${Number(value).toLocaleString()}`}
            />
          </Card>
        </Col>
      </Row>

      {/* Properties Table */}
      <Card bordered={false}>
        <div style={{ marginBottom: 16 }}>
          <Input
            placeholder="Search properties..."
            prefix={<SearchOutlined />}
            onChange={handleSearch}
            style={{ width: 300 }}
          />
        </div>
        <Table
          columns={columns}
          dataSource={filteredProperties}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Add Property Modal */}
      <Modal
        title="Add New Property"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            propertyType: 'mixed-use',
            city: 'New York',
            state: 'NY',
            amenities: [],
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Property Name"
                rules={[{ required: true, message: 'Please enter property name' }]}
              >
                <Input placeholder="e.g. 221 Bowery" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="propertyType"
                label="Property Type"
                rules={[{ required: true, message: 'Please select property type' }]}
              >
                <Select>
                  <Option value="residential">Residential</Option>
                  <Option value="commercial">Commercial</Option>
                  <Option value="mixed-use">Mixed-Use</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="address"
                label="Street Address"
                rules={[{ required: true, message: 'Please enter street address' }]}
              >
                <Input placeholder="Street address" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, message: 'Please enter city' }]}
              >
                <Input placeholder="City" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="state"
                label="State"
                rules={[{ required: true, message: 'Please enter state' }]}
              >
                <Input placeholder="State" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="zip"
                label="ZIP Code"
                rules={[{ required: true, message: 'Please enter ZIP code' }]}
              >
                <Input placeholder="ZIP Code" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="purchasePrice"
                label="Purchase Price"
                rules={[{ required: true, message: 'Please enter purchase price' }]}
              >
                <Input prefix="$" type="number" placeholder="Purchase Price" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="currentValue"
                label="Current Value"
                rules={[{ required: true, message: 'Please enter current value' }]}
              >
                <Input prefix="$" type="number" placeholder="Current Value" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="totalUnits"
                label="Total Units"
                rules={[{ required: true, message: 'Please enter total units' }]}
              >
                <Input type="number" placeholder="Total Units" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="occupiedUnits"
                label="Occupied Units"
                rules={[{ required: true, message: 'Please enter occupied units' }]}
              >
                <Input type="number" placeholder="Occupied Units" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter property description' }]}
          >
            <Input.TextArea rows={4} placeholder="Property description" />
          </Form.Item>

          <Form.Item
            name="acquisitionDate"
            label="Acquisition Date"
            rules={[{ required: true, message: 'Please enter acquisition date' }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            name="amenities"
            label="Amenities"
          >
            <Select mode="tags" placeholder="Select amenities">
              <Option value="Elevator">Elevator</Option>
              <Option value="Laundry">Laundry</Option>
              <Option value="Storage">Storage</Option>
              <Option value="Roof access">Roof access</Option>
              <Option value="High ceilings">High ceilings</Option>
              <Option value="Security system">Security system</Option>
              <Option value="Renovated interiors">Renovated interiors</Option>
              <Option value="Original details">Original details</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="Property Image URL"
          >
            <Input placeholder="https://example.com/property-image.jpg" />
          </Form.Item>

          <Divider />

          <Row justify="end">
            <Col>
              <Space>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  Add Property
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Properties;
