import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Statistic,
  Typography,
  Table,
  Tag,
  Progress,
  Divider,
  Button,
  List,
  Space,
  Badge,
} from 'antd';
import {
  HomeOutlined,
  TeamOutlined,
  DollarOutlined,
  ToolOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  RiseOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import { format } from 'date-fns';
import { DashboardSummary, MaintenanceRequest, Tenant, Property } from '../types';
import { supabase } from '../utils/supabase';

// Mock chart data - would be replaced with real data from the database
const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Income',
      data: [42000, 45000, 44000, 46500, 48000, 51000],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
    {
      label: 'Expenses',
      data: [28000, 27500, 30000, 28500, 29000, 31000],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<DashboardSummary>({
    totalProperties: 11, // based on research - Joseph Betesh bought 11 buildings
    totalUnits: 42,
    occupancyRate: 92.5,
    vacantUnits: 3,
    totalTenants: 39,
    pendingMaintenance: 7,
    monthlyRevenue: 145000,
    monthlyExpenses: 87000,
    netIncome: 58000,
    upcomingLeasesEnding: 4,
  });
  
  const [recentMaintenanceRequests, setRecentMaintenanceRequests] = useState<MaintenanceRequest[]>([]);
  const [upcomingLeaseEndings, setUpcomingLeaseEndings] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  // Register Chart.js components
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ChartTitle,
    ChartTooltip,
    Legend
  );

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, fetch actual data from Supabase
        // const { data, error } = await supabase
        //   .from('dashboard_summary')
        //   .select('*')
        //   .single();
        
        // Simulating API call with timeout
        setTimeout(() => {
          // Mock maintenance requests
          setRecentMaintenanceRequests([
            {
              id: '1',
              propertyId: '219-221',
              unitId: '219-2B',
              tenantId: 'tenant1',
              title: 'Leaking faucet in bathroom',
              description: 'Constant dripping from the sink faucet in the main bathroom',
              category: 'plumbing',
              priority: 'medium',
              status: 'new',
              requestDate: new Date().toISOString(),
              notes: ['Tenant called to follow up'],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            {
              id: '2',
              propertyId: '83',
              unitId: '83-4A',
              tenantId: 'tenant2',
              title: 'Broken AC unit',
              description: 'Air conditioning not cooling properly',
              category: 'hvac',
              priority: 'high',
              status: 'assigned',
              assignedTo: 'John Technician',
              requestDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
              scheduledDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
              notes: ['Parts ordered', 'Scheduled for tomorrow'],
              createdAt: new Date(Date.now() - 86400000).toISOString(),
              updatedAt: new Date(Date.now() - 43200000).toISOString(),
            },
            {
              id: '3',
              propertyId: '221',
              unitId: '221-3C',
              tenantId: 'tenant3',
              title: 'Electrical outlet not working',
              description: 'Outlet near kitchen window has no power',
              category: 'electrical',
              priority: 'medium',
              status: 'in_progress',
              assignedTo: 'Mike Electrician',
              requestDate: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
              notes: ['Initial inspection completed', 'Needs new wiring'],
              createdAt: new Date(Date.now() - 172800000).toISOString(),
              updatedAt: new Date(Date.now() - 86400000).toISOString(),
            },
          ]);
          
          // Mock upcoming lease endings
          setUpcomingLeaseEndings([
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
          ]);
          
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const maintenanceColumns = [
    {
      title: 'Property',
      dataIndex: 'propertyId',
      key: 'property',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Unit',
      dataIndex: 'unitId',
      key: 'unit',
    },
    {
      title: 'Issue',
      dataIndex: 'title',
      key: 'issue',
    },
    {
      title: 'Priority',
      key: 'priority',
      dataIndex: 'priority',
      render: (priority: string) => {
        let color = 'green';
        if (priority === 'high') {
          color = 'orange';
        } else if (priority === 'emergency') {
          color = 'red';
        }
        return (
          <Tag color={color}>
            {priority.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status: string) => {
        const statusMap: {[key: string]: {color: string, label: string}} = {
          new: { color: 'blue', label: 'NEW' },
          assigned: { color: 'cyan', label: 'ASSIGNED' },
          in_progress: { color: 'orange', label: 'IN PROGRESS' },
          completed: { color: 'green', label: 'COMPLETED' },
          cancelled: { color: 'red', label: 'CANCELLED' },
        };
        
        const { color, label } = statusMap[status] || { color: 'default', label: status.toUpperCase() };
        
        return (
          <Tag color={color}>
            {label}
          </Tag>
        );
      },
    },
    {
      title: 'Date',
      dataIndex: 'requestDate',
      key: 'date',
      render: (date: string) => format(new Date(date), 'MMM dd, yyyy'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: MaintenanceRequest) => (
        <Button type="link" onClick={() => navigate(`/maintenance/${record.id}`)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header" style={{ marginBottom: 24 }}>
        <Title level={2}>Dashboard</Title>
        <Text type="secondary">
          Welcome to 221CRM. Overview of your real estate portfolio as of {format(new Date(), 'MMMM dd, yyyy')}
        </Text>
      </div>

      {/* Key Stats Row */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Properties"
              value={dashboardData.totalProperties}
              prefix={<HomeOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">Bowery portfolio</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Occupancy Rate"
              value={dashboardData.occupancyRate}
              suffix="%"
              prefix={<TeamOutlined />}
              valueStyle={{ color: dashboardData.occupancyRate > 90 ? '#3f8600' : '#cf1322' }}
            />
            <Progress 
              percent={dashboardData.occupancyRate} 
              showInfo={false} 
              strokeColor={dashboardData.occupancyRate > 90 ? '#3f8600' : '#cf1322'} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Monthly Revenue"
              value={dashboardData.monthlyRevenue}
              prefix={<DollarOutlined />}
              suffix="USD"
              valueStyle={{ color: '#3f8600' }}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">
                <ArrowUpOutlined /> 5.2% from last month
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Pending Maintenance"
              value={dashboardData.pendingMaintenance}
              prefix={<ToolOutlined />}
              valueStyle={{ color: dashboardData.pendingMaintenance > 10 ? '#cf1322' : '#1890ff' }}
            />
            <div style={{ marginTop: 8 }}>
              <Button type="link" onClick={() => navigate('/maintenance')} style={{ padding: 0 }}>
                View All
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Income/Expense Chart */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={16}>
          <Card 
            title={
              <Space>
                <DollarOutlined />
                <span>Financial Overview (Last 6 Months)</span>
              </Space>
            } 
            bordered={false}
          >
            <Bar 
              data={chartData}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function(value) {
                        return '$' + value.toLocaleString();
                      }
                    }
                  }
                },
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                          label += ': ';
                        }
                        if (context.parsed.y !== null) {
                          label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                        }
                        return label;
                      }
                    }
                  }
                }
              }} 
            />
            <Divider />
            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  title="Revenue"
                  value={dashboardData.monthlyRevenue}
                  prefix="$"
                  valueStyle={{ color: '#3f8600' }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Expenses"
                  value={dashboardData.monthlyExpenses}
                  prefix="$"
                  valueStyle={{ color: '#cf1322' }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Net Income"
                  value={dashboardData.netIncome}
                  prefix="$"
                  valueStyle={{ color: '#3f8600' }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        
        {/* Upcoming Lease Endings */}
        <Col xs={24} lg={8}>
          <Card 
            title={
              <Space>
                <CalendarOutlined />
                <span>Upcoming Lease Endings</span>
              </Space>
            } 
            bordered={false}
            extra={<Button type="link" onClick={() => navigate('/tenants')}>All Tenants</Button>}
          >
            <List
              itemLayout="horizontal"
              dataSource={upcomingLeaseEndings}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button type="link" onClick={() => navigate(`/tenants/${item.id}`)}>Details</Button>
                  ]}
                >
                  <List.Item.Meta
                    title={`${item.firstName} ${item.lastName}`}
                    description={
                      <Space direction="vertical" size={0}>
                        <Text>{`${item.unitId}, $${item.rentAmount}/month`}</Text>
                        <Text type="secondary">Lease ends: {format(new Date(item.leaseEndDate), 'MMM dd, yyyy')}</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Maintenance Requests */}
      <div style={{ marginTop: 24 }}>
        <Card 
          title={
            <Space>
              <ToolOutlined />
              <span>Recent Maintenance Requests</span>
            </Space>
          } 
          bordered={false}
          extra={<Button type="primary" onClick={() => navigate('/maintenance')}>Create Request</Button>}
        >
          <Table
            columns={maintenanceColumns}
            dataSource={recentMaintenanceRequests}
            rowKey="id"
            loading={loading}
            pagination={false}
          />
        </Card>
      </div>

      {/* Properties Snapshot */}
      <div style={{ marginTop: 24 }}>
        <Card 
          title={
            <Space>
              <HomeOutlined />
              <span>221 Bowery Portfolio Snapshot</span>
            </Space>
          } 
          bordered={false}
          extra={<Button type="primary" onClick={() => navigate('/properties')}>View All Properties</Button>}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card hoverable bordered onClick={() => navigate('/properties/221')}>
                <Card.Meta
                  title="221 Bowery"
                  description={
                    <Space direction="vertical" size={0}>
                      <Text>Mixed-use property</Text>
                      <Text type="secondary">4 units, 100% occupied</Text>
                      <Badge status="success" text="Excellent condition" />
                    </Space>
                  }
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card hoverable bordered onClick={() => navigate('/properties/219')}>
                <Card.Meta
                  title="219 Bowery"
                  description={
                    <Space direction="vertical" size={0}>
                      <Text>Mixed-use property</Text>
                      <Text type="secondary">5 units, 80% occupied</Text>
                      <Badge status="warning" text="1 maintenance issue" />
                    </Space>
                  }
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card hoverable bordered onClick={() => navigate('/properties/83')}>
                <Card.Meta
                  title="83 Bowery"
                  description={
                    <Space direction="vertical" size={0}>
                      <Text>Mixed-use property</Text>
                      <Text type="secondary">6 units, 100% occupied</Text>
                      <Badge status="success" text="Good condition" />
                    </Space>
                  }
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card hoverable bordered onClick={() => navigate('/properties/85')}>
                <Card.Meta
                  title="85 Bowery"
                  description={
                    <Space direction="vertical" size={0}>
                      <Text>Mixed-use property</Text>
                      <Text type="secondary">5 units, 100% occupied</Text>
                      <Badge status="success" text="Renovated 2023" />
                    </Space>
                  }
                />
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
