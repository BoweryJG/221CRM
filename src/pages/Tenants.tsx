import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  Card,
  Button,
  Input,
  Space,
  Tag,
  Typography,
  Row,
  Col,
  Dropdown,
  Modal,
  Form,
  Select,
  DatePicker,
  notification,
  Badge,
  Tooltip,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  MoreOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { format } from 'date-fns';
import { Tenant, Property, Unit } from '../types';
import { supabase } from '../utils/supabase';
import type { MenuProps } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

const Tenants: React.FC = () => {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [availableUnits, setAvailableUnits] = useState<Unit[]>([]);

  // Mock data for demonstration purposes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call with timeout
        setTimeout(() => {
          const mockProperties: Property[] = [
            {
              id: '221',
              name: '221 Bowery',
              address: '221 Bowery',
              city: 'New York',
              state: 'NY',
              zip: '10002',
              acquisitionDate: '2013-06-10',
              purchasePrice: 5600000,
              currentValue: 7400000,
              description: 'Mixed-use property with retail space on ground floor and residential units.',
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
          ];

          const mockUnits: Unit[] = [
            {
              id: '221-2B',
              propertyId: '221',
              unitNumber: '2B',
              floorLevel: 2,
              bedrooms: 2,
              bathrooms: 1,
              squareFeet: 850,
              monthlyRent: 2400,
              securityDeposit: 2400,
              isOccupied: true,
              occupiedSince: '2022-06-01',
              status: 'occupied',
              features: ['Hardwood floors', 'Updated kitchen'],
              createdAt: '2013-06-10T00:00:00Z',
              updatedAt: '2022-06-01T00:00:00Z',
            },
            {
              id: '219-3A',
              propertyId: '219',
              unitNumber: '3A',
              floorLevel: 3,
              bedrooms: 1,
              bathrooms: 1,
              squareFeet: 650,
              monthlyRent: 2200,
              securityDeposit: 2200,
              isOccupied: true,
              occupiedSince: '2022-06-15',
              status: 'occupied',
              features: ['Exposed brick', 'High ceilings'],
              createdAt: '2013-06-10T00:00:00Z',
              updatedAt: '2022-06-15T00:00:00Z',
            },
            {
              id: '219-4B',
              propertyId: '219',
              unitNumber: '4B',
              floorLevel: 4,
              bedrooms: 2,
              bathrooms: 1,
              squareFeet: 900,
              monthlyRent: 2600,
              securityDeposit: 2600,
              isOccupied: false,
              vacantSince: '2023-03-15',
              status: 'available',
              features: ['Renovated bathroom', 'Skylight'],
              createdAt: '2013-06-10T00:00:00Z',
              updatedAt: '2023-03-15T00:00:00Z',
            },
            {
              id: '83-2A',
              propertyId: '83',
              unitNumber: '2A',
              floorLevel: 2,
              bedrooms: 1,
              bathrooms: 1,
              squareFeet: 700,
              monthlyRent: 2300,
              securityDeposit: 2300,
              isOccupied: true,
              occupiedSince: '2022-09-01',
              status: 'occupied',
              features: ['Modern appliances', 'Recessed lighting'],
              createdAt: '2013-06-10T00:00:00Z',
              updatedAt: '2022-09-01T00:00:00Z',
            },
            {
              id: '83-3B',
              propertyId: '83',
              unitNumber: '3B',
              floorLevel: 3,
              bedrooms: 2,
              bathrooms: 2,
              squareFeet: 950,
              monthlyRent: 2800,
              securityDeposit: 2800,
              isOccupied: true,
              occupiedSince: '2022-08-15',
              status: 'occupied',
              features: ['In-unit washer/dryer', 'Balcony'],
              createdAt: '2013-06-10T00:00:00Z',
              updatedAt: '2022-08-15T00:00:00Z',
            },
          ];

          const mockTenants: Tenant[] = [
            {
              id: 'tenant1',
              firstName: 'Robert',
              lastName: 'Johnson',
              email: 'robert.j@example.com',
              phone: '212-555-1234',
              moveInDate: '2022-06-01',
              leaseEndDate: '2023-06-01',
              rentAmount: 2400,
              securityDeposit: 2400,
              propertyId: '221',
              unitId: '221-2B',
              status: 'active',
              paymentHistory: [],
              documents: [],
              notes: 'Good tenant, always pays on time',
              createdAt: '2022-05-15T00:00:00Z',
              updatedAt: '2022-05-15T00:00:00Z',
            },
            {
              id: 'tenant2',
              firstName: 'Maria',
              lastName: 'Garcia',
              email: 'maria.g@example.com',
              phone: '212-555-5678',
              moveInDate: '2022-06-15',
              leaseEndDate: '2023-06-15',
              rentAmount: 2200,
              securityDeposit: 2200,
              propertyId: '219',
              unitId: '219-3A',
              status: 'active',
              paymentHistory: [],
              documents: [],
              notes: 'Interested in lease renewal',
              createdAt: '2022-06-01T00:00:00Z',
              updatedAt: '2022-06-01T00:00:00Z',
            },
            {
              id: 'tenant3',
              firstName: 'David',
              lastName: 'Kim',
              email: 'david.k@example.com',
              phone: '212-555-9012',
              moveInDate: '2022-09-01',
              leaseEndDate: '2023-09-01',
              rentAmount: 2300,
              securityDeposit: 2300,
              propertyId: '83',
              unitId: '83-2A',
              status: 'active',
              paymentHistory: [],
              documents: [],
              notes: 'Has requested minor repairs',
              createdAt: '2022-08-15T00:00:00Z',
              updatedAt: '2022-08-15T00:00:00Z',
            },
            {
              id: 'tenant4',
              firstName: 'Emily',
              lastName: 'Chen',
              email: 'emily.c@example.com',
              phone: '212-555-3456',
              moveInDate: '2022-08-15',
              leaseEndDate: '2023-08-15',
              rentAmount: 2800,
              securityDeposit: 2800,
              propertyId: '83',
              unitId: '83-3B',
              status: 'active',
              paymentHistory: [],
              documents: [],
              notes: 'Has a small dog (approved pet)',
              createdAt: '2022-08-01T00:00:00Z',
              updatedAt: '2022-08-01T00:00:00Z',
            },
            {
              id: 'tenant5',
              firstName: 'Michael',
              lastName: 'Brown',
              email: 'michael.b@example.com',
              phone: '212-555-7890',
              moveInDate: '2022-02-01',
              leaseEndDate: '2023-02-01',
              rentAmount: 2500,
              securityDeposit: 2500,
              propertyId: '219',
              unitId: '219-4B',
              status: 'past',
              paymentHistory: [],
              documents: [],
              notes: 'Moved out on 2023-03-15, apartment needs minor repairs',
              createdAt: '2022-01-15T00:00:00Z',
              updatedAt: '2023-03-15T00:00:00Z',
            },
          ];

          setProperties(mockProperties);
          setUnits(mockUnits);
          setTenants(mockTenants);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewTenant = (id: string) => {
    navigate(`/tenants/${id}`);
  };

  const showAddTenantModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedPropertyId(null);
  };

  const handlePropertyChange = (value: string) => {
    setSelectedPropertyId(value);
    // Filter available units for the selected property
    const filteredUnits = units.filter(
      unit => unit.propertyId === value && unit.status === 'available'
    );
    setAvailableUnits(filteredUnits);
  };

  const handleSubmit = (values: any) => {
    const newTenant: Partial<Tenant> = {
      ...values,
      id: `tenant-${Date.now()}`,
      status: 'active',
      paymentHistory: [],
      documents: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // In a real app, this would be an API call to Supabase
    setTenants([...tenants, newTenant as Tenant]);
    setIsModalVisible(false);
    notification.success({
      message: 'Tenant Added',
      description: `${newTenant.firstName} ${newTenant.lastName} has been added as a tenant.`,
    });
  };

  const filteredTenants = tenants.filter(
    tenant =>
      tenant.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.phone.includes(searchTerm)
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getTenantActions = (tenant: Tenant): MenuProps['items'] => [
    {
      key: 'view',
      label: 'View Details',
      onClick: () => handleViewTenant(tenant.id),
    },
    {
      key: 'contact',
      label: 'Contact Tenant',
      onClick: () => {
        // Implement contact functionality
        window.location.href = `mailto:${tenant.email}`;
      },
    },
    {
      key: 'edit',
      label: 'Edit Tenant',
      onClick: () => {
        // Implement edit functionality
        navigate(`/tenants/${tenant.id}/edit`);
      },
    },
    {
      key: 'lease',
      label: 'Manage Lease',
      onClick: () => {
        // Implement lease management
        navigate(`/tenants/${tenant.id}/lease`);
      },
    },
  ];

  const getUnitDetails = (unitId: string) => {
    const unit = units.find(unit => unit.id === unitId);
    if (!unit) return 'Unknown';
    return `${unit.unitNumber} (${unit.bedrooms}BR/${unit.bathrooms}BA)`;
  };

  const getPropertyName = (propertyId: string) => {
    const property = properties.find(property => property.id === propertyId);
    return property ? property.name : 'Unknown';
  };

  const getRemainingDays = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - today.getTime();
    return Math.ceil(differenceInTime / (1000 * 3600 * 24));
  };

  const getLeaseStatusTag = (endDate: string, status: string) => {
    if (status === 'past') return <Tag color="default">Past Tenant</Tag>;
    
    const daysRemaining = getRemainingDays(endDate);
    
    if (daysRemaining < 0) {
      return <Tag color="red">Expired</Tag>;
    } else if (daysRemaining < 30) {
      return <Tag color="orange">Expiring Soon</Tag>;
    } else if (daysRemaining < 90) {
      return <Tag color="blue">Renewal Due</Tag>;
    } else {
      return <Tag color="green">Active</Tag>;
    }
  };

  const columns = [
    {
      title: 'Tenant',
      dataIndex: 'firstName',
      key: 'name',
      render: (_: string, record: Tenant) => (
        <Space>
          <UserOutlined />
          <a onClick={() => handleViewTenant(record.id)}>
            {record.firstName} {record.lastName}
          </a>
        </Space>
      ),
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (_: string, record: Tenant) => (
        <Space direction="vertical" size={0}>
          <Space>
            <MailOutlined />
            <Text>{record.email}</Text>
          </Space>
          <Space>
            <PhoneOutlined />
            <Text>{record.phone}</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: 'Property',
      dataIndex: 'propertyId',
      key: 'property',
      render: (propertyId: string, record: Tenant) => (
        <Space direction="vertical" size={0}>
          <Space>
            <HomeOutlined />
            <Text>{getPropertyName(propertyId)}</Text>
          </Space>
          <Text type="secondary">{getUnitDetails(record.unitId)}</Text>
        </Space>
      ),
    },
    {
      title: 'Rent',
      dataIndex: 'rentAmount',
      key: 'rent',
      render: (rent: number) => (
        <Space>
          <DollarOutlined />
          <Text>${rent.toLocaleString()}/month</Text>
        </Space>
      ),
    },
    {
      title: 'Lease Status',
      key: 'leaseStatus',
      render: (_: string, record: Tenant) => (
        <Space direction="vertical" size={0}>
          {getLeaseStatusTag(record.leaseEndDate, record.status)}
          <Text type="secondary">
            Ends: {format(new Date(record.leaseEndDate), 'MMM dd, yyyy')}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Move-in Date',
      dataIndex: 'moveInDate',
      key: 'moveIn',
      render: (date: string) => format(new Date(date), 'MMM dd, yyyy'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: string, record: Tenant) => (
        <Dropdown menu={{ items: getTenantActions(record) }}>
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="tenants-page">
      <div className="page-header" style={{ marginBottom: 24 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2}>Tenants</Title>
            <Text type="secondary">
              Manage your tenants across all Bowery properties
            </Text>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showAddTenantModal}
            >
              Add Tenant
            </Button>
          </Col>
        </Row>
      </div>

      {/* Tenants Table */}
      <Card bordered={false}>
        <div style={{ marginBottom: 16 }}>
          <Input
            placeholder="Search tenants..."
            prefix={<SearchOutlined />}
            onChange={handleSearch}
            style={{ width: 300 }}
          />
        </div>
        <Table
          columns={columns}
          dataSource={filteredTenants}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Add Tenant Modal */}
      <Modal
        title="Add New Tenant"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: 'Please enter first name' }]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: 'Please enter last name' }]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[{ required: true, message: 'Please enter phone number' }]}
              >
                <Input placeholder="Phone Number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="propertyId"
                label="Property"
                rules={[{ required: true, message: 'Please select a property' }]}
              >
                <Select 
                  placeholder="Select Property" 
                  onChange={handlePropertyChange}
                >
                  {properties.map(property => (
                    <Option key={property.id} value={property.id}>
                      {property.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="unitId"
                label="Unit"
                rules={[{ required: true, message: 'Please select a unit' }]}
              >
                <Select placeholder="Select Unit" disabled={!selectedPropertyId}>
                  {availableUnits.map(unit => (
                    <Option key={unit.id} value={unit.id}>
                      {unit.unitNumber} - {unit.bedrooms}BR/{unit.bathrooms}BA (${unit.monthlyRent}/mo)
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="moveInDate"
                label="Move-in Date"
                rules={[{ required: true, message: 'Please select move-in date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="leaseEndDate"
                label="Lease End Date"
                rules={[{ required: true, message: 'Please select lease end date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="rentAmount"
                label="Monthly Rent"
                rules={[{ required: true, message: 'Please enter monthly rent' }]}
              >
                <Input prefix="$" type="number" placeholder="Monthly Rent" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="securityDeposit"
                label="Security Deposit"
                rules={[{ required: true, message: 'Please enter security deposit' }]}
              >
                <Input prefix="$" type="number" placeholder="Security Deposit" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="notes"
            label="Notes"
          >
            <Input.TextArea rows={4} placeholder="Additional notes about the tenant" />
          </Form.Item>

          <Form.Item>
            <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Add Tenant
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Tenants;
