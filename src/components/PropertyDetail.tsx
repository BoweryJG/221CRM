import React from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Descriptions, 
  Tag, 
  Divider, 
  Statistic, 
  Table, 
  Space, 
  Button,
  Image,
  List,
  Timeline,
  Empty
} from 'antd';
import {
  HomeOutlined,
  DollarOutlined,
  TeamOutlined,
  CalendarOutlined,
  FileTextOutlined,
  ToolOutlined,
  BankOutlined,
  ShopOutlined,
  BuildOutlined
} from '@ant-design/icons';
import { Property, Unit, MaintenanceRequest } from '../types';
import { format } from 'date-fns';

const { Title, Text, Paragraph } = Typography;

interface PropertyDetailProps {
  property: Property;
  onClose: () => void;
}

// Mock data for units and maintenance requests
const mockUnits: Unit[] = [
  {
    id: '1',
    propertyId: '221',
    unitNumber: '1',
    floorLevel: 1,
    bedrooms: 0,
    bathrooms: 1,
    squareFeet: 800,
    monthlyRent: 3500,
    securityDeposit: 3500,
    isOccupied: true,
    status: 'occupied',
    features: ['Retail space', 'High ceilings', 'Large windows'],
    createdAt: '2013-06-10T00:00:00Z',
    updatedAt: '2023-01-15T00:00:00Z',
  },
  {
    id: '2',
    propertyId: '221',
    unitNumber: '2',
    floorLevel: 2,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 750,
    monthlyRent: 2800,
    securityDeposit: 2800,
    isOccupied: true,
    status: 'occupied',
    features: ['Hardwood floors', 'Updated kitchen', 'Exposed brick'],
    createdAt: '2013-06-10T00:00:00Z',
    updatedAt: '2023-01-15T00:00:00Z',
  },
  {
    id: '3',
    propertyId: '221',
    unitNumber: '3',
    floorLevel: 3,
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 900,
    monthlyRent: 3200,
    securityDeposit: 3200,
    isOccupied: true,
    status: 'occupied',
    features: ['Hardwood floors', 'Renovated bathroom', 'Spacious living room'],
    createdAt: '2013-06-10T00:00:00Z',
    updatedAt: '2023-01-15T00:00:00Z',
  },
  {
    id: '4',
    propertyId: '221',
    unitNumber: '4',
    floorLevel: 4,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 800,
    monthlyRent: 2900,
    securityDeposit: 2900,
    isOccupied: true,
    status: 'occupied',
    features: ['Hardwood floors', 'Stainless steel appliances', 'Exposed brick'],
    createdAt: '2013-06-10T00:00:00Z',
    updatedAt: '2023-01-15T00:00:00Z',
  },
];

const mockMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: '1',
    propertyId: '221',
    unitId: '2',
    title: 'Leaking faucet in bathroom',
    description: 'Constant dripping from the sink faucet in the main bathroom',
    category: 'plumbing',
    priority: 'medium',
    status: 'new',
    requestDate: '2023-05-15T00:00:00Z',
    notes: ['Tenant called to follow up'],
    createdAt: '2023-05-15T00:00:00Z',
    updatedAt: '2023-05-15T00:00:00Z',
  },
  {
    id: '2',
    propertyId: '221',
    unitId: '3',
    title: 'Broken light fixture',
    description: 'Light fixture in the kitchen is not working',
    category: 'electrical',
    priority: 'low',
    status: 'assigned',
    assignedTo: 'John Electrician',
    requestDate: '2023-05-10T00:00:00Z',
    scheduledDate: '2023-05-20T00:00:00Z',
    notes: ['Scheduled for next week'],
    createdAt: '2023-05-10T00:00:00Z',
    updatedAt: '2023-05-12T00:00:00Z',
  },
];

// Property history events
const propertyHistory = [
  {
    date: '2013-06-10',
    event: 'Property acquired by Milestone Equities for $5.6M as part of the Bowery Portfolio',
  },
  {
    date: '2015-03-22',
    event: 'Major renovation of retail space completed',
  },
  {
    date: '2018-09-15',
    event: 'New roof installed',
  },
  {
    date: '2020-07-08',
    event: 'HVAC system upgraded',
  },
  {
    date: '2022-04-30',
    event: 'Facade restoration completed',
  },
];

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, onClose }) => {
  // Get units for this property
  const units = mockUnits.filter(unit => unit.propertyId === property.id);
  
  // Get maintenance requests for this property
  const maintenanceRequests = mockMaintenanceRequests.filter(request => request.propertyId === property.id);
  
  // Calculate financial metrics
  const monthlyRentalIncome = units.reduce((sum, unit) => sum + (unit.isOccupied ? unit.monthlyRent : 0), 0);
  const potentialMonthlyIncome = units.reduce((sum, unit) => sum + unit.monthlyRent, 0);
  const annualRentalIncome = monthlyRentalIncome * 12;
  const vacancyRate = units.length > 0 ? (units.filter(unit => !unit.isOccupied).length / units.length) * 100 : 0;
  
  // Estimated expenses (30% of rental income)
  const estimatedMonthlyExpenses = monthlyRentalIncome * 0.3;
  const estimatedAnnualExpenses = estimatedMonthlyExpenses * 12;
  
  // Net operating income
  const monthlyNOI = monthlyRentalIncome - estimatedMonthlyExpenses;
  const annualNOI = annualRentalIncome - estimatedAnnualExpenses;
  
  // Cap rate
  const capRate = property.currentValue > 0 ? (annualNOI / property.currentValue) * 100 : 0;
  
  // ROI
  const roi = property.purchasePrice > 0 ? ((property.currentValue - property.purchasePrice) / property.purchasePrice) * 100 : 0;
  
  // Unit columns for table
  const unitColumns = [
    {
      title: 'Unit',
      dataIndex: 'unitNumber',
      key: 'unitNumber',
    },
    {
      title: 'Floor',
      dataIndex: 'floorLevel',
      key: 'floorLevel',
    },
    {
      title: 'Type',
      key: 'type',
      render: (text: string, record: Unit) => (
        <span>
          {record.bedrooms === 0 ? 'Commercial/Studio' : `${record.bedrooms}BR/${record.bathrooms}BA`}
        </span>
      ),
    },
    {
      title: 'Sq Ft',
      dataIndex: 'squareFeet',
      key: 'squareFeet',
    },
    {
      title: 'Rent',
      dataIndex: 'monthlyRent',
      key: 'monthlyRent',
      render: (rent: number) => `$${rent.toLocaleString()}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'green';
        if (status === 'available') color = 'blue';
        if (status === 'maintenance') color = 'orange';
        if (status === 'reserved') color = 'purple';
        
        return (
          <Tag color={color}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Features',
      dataIndex: 'features',
      key: 'features',
      render: (features: string[]) => (
        <>
          {features.slice(0, 2).map(feature => (
            <Tag key={feature}>{feature}</Tag>
          ))}
          {features.length > 2 && <Tag>+{features.length - 2} more</Tag>}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: Unit) => (
        <Button type="link" size="small">
          View Details
        </Button>
      ),
    },
  ];
  
  // Maintenance request columns
  const maintenanceColumns = [
    {
      title: 'Unit',
      dataIndex: 'unitId',
      key: 'unitId',
    },
    {
      title: 'Issue',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => {
        let color = 'green';
        if (priority === 'medium') color = 'blue';
        if (priority === 'high') color = 'orange';
        if (priority === 'emergency') color = 'red';
        
        return (
          <Tag color={color}>
            {priority.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'green';
        if (status === 'new') color = 'blue';
        if (status === 'assigned') color = 'purple';
        if (status === 'in_progress') color = 'orange';
        
        return (
          <Tag color={color}>
            {status.replace('_', ' ').toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Date',
      dataIndex: 'requestDate',
      key: 'requestDate',
      render: (date: string) => format(new Date(date), 'MMM dd, yyyy'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: MaintenanceRequest) => (
        <Button type="link" size="small">
          View Details
        </Button>
      ),
    },
  ];

  const getPropertyTypeIcon = (type: string) => {
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

  return (
    <div className="property-detail">
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={24}>
          <Card bordered={false}>
            <Row justify="space-between" align="middle">
              <Col>
                <Space align="start">
                  {getPropertyTypeIcon(property.propertyType)}
                  <Title level={2} style={{ margin: 0 }}>{property.name}</Title>
                </Space>
                <Paragraph type="secondary">
                  {property.address}, {property.city}, {property.state} {property.zip}
                </Paragraph>
              </Col>
              <Col>
                <Space>
                  <Button onClick={onClose}>Back to List</Button>
                  <Button type="primary">Edit Property</Button>
                </Space>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Left column - Property details and image */}
        <Col xs={24} lg={8}>
          <Card 
            title={<Space><HomeOutlined /> Property Overview</Space>} 
            bordered={false}
            style={{ marginBottom: 16 }}
          >
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              {property.imageUrl ? (
                <Image 
                  src={property.imageUrl} 
                  alt={property.name}
                  style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'cover' }}
                  fallback="https://via.placeholder.com/400x300?text=No+Image+Available"
                />
              ) : (
                <Image 
                  src={`https://via.placeholder.com/400x300?text=${property.name}`}
                  alt={property.name}
                  style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'cover' }}
                />
              )}
            </div>
            
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Property Type">
                <Tag color="blue">{property.propertyType.replace('-', ' ').toUpperCase()}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Year Built">1920</Descriptions.Item>
              <Descriptions.Item label="Total Units">{property.totalUnits}</Descriptions.Item>
              <Descriptions.Item label="Occupied Units">{property.occupiedUnits}</Descriptions.Item>
              <Descriptions.Item label="Occupancy Rate">
                {((property.occupiedUnits / property.totalUnits) * 100).toFixed(1)}%
              </Descriptions.Item>
              <Descriptions.Item label="Acquisition Date">
                {format(new Date(property.acquisitionDate), 'MMMM dd, yyyy')}
              </Descriptions.Item>
              <Descriptions.Item label="Purchase Price">
                ${property.purchasePrice.toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Current Value">
                ${property.currentValue.toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Appreciation">
                {roi.toFixed(1)}%
              </Descriptions.Item>
            </Descriptions>
            
            <Divider orientation="left">Amenities</Divider>
            <div>
              {property.amenities.map(amenity => (
                <Tag key={amenity} style={{ margin: '0 8px 8px 0' }}>{amenity}</Tag>
              ))}
            </div>
            
            <Divider orientation="left">Description</Divider>
            <Paragraph>{property.description}</Paragraph>
          </Card>
          
          <Card 
            title={<Space><CalendarOutlined /> Property History</Space>} 
            bordered={false}
          >
            <Timeline
              items={propertyHistory.map(item => ({
                children: (
                  <>
                    <Text strong>{format(new Date(item.date), 'MMM dd, yyyy')}</Text>
                    <br />
                    <Text>{item.event}</Text>
                  </>
                )
              }))}
            />
          </Card>
        </Col>
        
        {/* Right column - Financial info, units, maintenance */}
        <Col xs={24} lg={16}>
          {/* Financial metrics */}
          <Card 
            title={<Space><DollarOutlined /> Financial Overview</Space>} 
            bordered={false}
            style={{ marginBottom: 16 }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={8} md={6}>
                <Statistic 
                  title="Monthly Income" 
                  value={monthlyRentalIncome} 
                  precision={0}
                  prefix="$"
                  valueStyle={{ color: '#3f8600' }}
                />
              </Col>
              <Col xs={12} sm={8} md={6}>
                <Statistic 
                  title="Annual Income" 
                  value={annualRentalIncome} 
                  precision={0}
                  prefix="$"
                  valueStyle={{ color: '#3f8600' }}
                />
              </Col>
              <Col xs={12} sm={8} md={6}>
                <Statistic 
                  title="Monthly Expenses" 
                  value={estimatedMonthlyExpenses} 
                  precision={0}
                  prefix="$"
                  valueStyle={{ color: '#cf1322' }}
                />
              </Col>
              <Col xs={12} sm={8} md={6}>
                <Statistic 
                  title="Annual Expenses" 
                  value={estimatedAnnualExpenses} 
                  precision={0}
                  prefix="$"
                  valueStyle={{ color: '#cf1322' }}
                />
              </Col>
              <Col xs={12} sm={8} md={6}>
                <Statistic 
                  title="Monthly NOI" 
                  value={monthlyNOI} 
                  precision={0}
                  prefix="$"
                  valueStyle={{ color: '#3f8600' }}
                />
              </Col>
              <Col xs={12} sm={8} md={6}>
                <Statistic 
                  title="Annual NOI" 
                  value={annualNOI} 
                  precision={0}
                  prefix="$"
                  valueStyle={{ color: '#3f8600' }}
                />
              </Col>
              <Col xs={12} sm={8} md={6}>
                <Statistic 
                  title="Cap Rate" 
                  value={capRate} 
                  precision={2}
                  suffix="%"
                  valueStyle={{ color: capRate > 5 ? '#3f8600' : '#cf1322' }}
                />
              </Col>
              <Col xs={12} sm={8} md={6}>
                <Statistic 
                  title="Vacancy Rate" 
                  value={vacancyRate} 
                  precision={1}
                  suffix="%"
                  valueStyle={{ color: vacancyRate < 10 ? '#3f8600' : '#cf1322' }}
                />
              </Col>
            </Row>
          </Card>
          
          {/* Units */}
          <Card 
            title={<Space><TeamOutlined /> Units</Space>} 
            bordered={false}
            style={{ marginBottom: 16 }}
            extra={<Button type="primary" size="small">Add Unit</Button>}
          >
            <Table 
              columns={unitColumns} 
              dataSource={units} 
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
          
          {/* Maintenance Requests */}
          <Card 
            title={<Space><ToolOutlined /> Maintenance Requests</Space>} 
            bordered={false}
            extra={<Button type="primary" size="small">Create Request</Button>}
          >
            {maintenanceRequests.length > 0 ? (
              <Table 
                columns={maintenanceColumns} 
                dataSource={maintenanceRequests} 
                rowKey="id"
                pagination={false}
                size="small"
              />
            ) : (
              <Empty description="No maintenance requests" />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PropertyDetail;
