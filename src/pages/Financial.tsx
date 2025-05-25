import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Statistic,
  Row,
  Col,
  Tabs,
  Table,
  Tag,
  Button,
  Dropdown,
  Space,
  DatePicker,
  Select,
  Modal,
  Form,
  Input,
  Divider,
  Tooltip,
} from 'antd';
import {
  DollarOutlined,
  AreaChartOutlined,
  FileExcelOutlined,
  PlusOutlined,
  FilterOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  MoreOutlined,
  CalendarOutlined,
  HomeOutlined,
  AppstoreOutlined,
  BankOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import { Bar } from 'react-chartjs-2';
import { format } from 'date-fns';
import { Property, Transaction } from '../types';
import type { MenuProps } from 'antd';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

const Financial: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income');
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(new Date().setMonth(new Date().getMonth() - 1)),
    new Date(),
  ]);
  const [form] = Form.useForm();

  // Mock financial summary data
  const financialSummary = {
    monthlyRevenue: 145000,
    monthlyExpenses: 87000,
    netIncome: 58000,
    occupancyRate: 92.5,
    yearToDateRevenue: 870000,
    yearToDateExpenses: 522000,
    yearToDateNetIncome: 348000,
    outstandingRent: 8500,
    upcomingExpenses: 34000,
  };

  // Mock chart data
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: [142000, 145000, 144000, 146500, 148000, 151000],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenses',
        data: [88000, 87500, 90000, 88500, 89000, 91000],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Mock transactions data
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
          ];

          const mockTransactions: Transaction[] = [
            {
              id: 'tr001',
              amount: 2400,
              type: 'income',
              category: 'rent',
              description: 'Monthly rent: Unit 2B',
              date: '2023-05-01',
              propertyId: '221',
              unitId: '221-2B',
              tenantId: 'tenant1',
              paymentMethod: 'bank_transfer',
              recurring: true,
              frequency: 'monthly',
              notes: 'Paid on time',
              createdAt: '2023-05-01T09:30:00Z',
              updatedAt: '2023-05-01T09:30:00Z',
            },
            {
              id: 'tr002',
              amount: 2200,
              type: 'income',
              category: 'rent',
              description: 'Monthly rent: Unit 3A',
              date: '2023-05-02',
              propertyId: '219',
              unitId: '219-3A',
              tenantId: 'tenant2',
              paymentMethod: 'check',
              recurring: true,
              frequency: 'monthly',
              notes: 'Paid on time',
              createdAt: '2023-05-02T10:15:00Z',
              updatedAt: '2023-05-02T10:15:00Z',
            },
            {
              id: 'tr003',
              amount: 850,
              type: 'expense',
              category: 'maintenance',
              description: 'Plumbing repair: Unit 2B',
              date: '2023-05-10',
              propertyId: '221',
              unitId: '221-2B',
              paymentMethod: 'card',
              recurring: false,
              notes: 'Emergency repair',
              createdAt: '2023-05-10T14:00:00Z',
              updatedAt: '2023-05-10T14:00:00Z',
            },
            {
              id: 'tr004',
              amount: 2300,
              type: 'income',
              category: 'rent',
              description: 'Monthly rent: Unit 2A',
              date: '2023-05-03',
              propertyId: '83',
              unitId: '83-2A',
              tenantId: 'tenant3',
              paymentMethod: 'card',
              recurring: true,
              frequency: 'monthly',
              notes: 'Paid on time',
              createdAt: '2023-05-03T11:45:00Z',
              updatedAt: '2023-05-03T11:45:00Z',
            },
            {
              id: 'tr005',
              amount: 3200,
              type: 'expense',
              category: 'taxes',
              description: 'Property tax payment',
              date: '2023-05-15',
              propertyId: '221',
              paymentMethod: 'bank_transfer',
              recurring: true,
              frequency: 'quarterly',
              notes: 'Quarterly payment',
              createdAt: '2023-05-15T09:00:00Z',
              updatedAt: '2023-05-15T09:00:00Z',
            },
            {
              id: 'tr006',
              amount: 1200,
              type: 'expense',
              category: 'utilities',
              description: 'Electricity bill',
              date: '2023-05-20',
              propertyId: '219',
              paymentMethod: 'bank_transfer',
              recurring: true,
              frequency: 'monthly',
              notes: 'Common area electricity',
              createdAt: '2023-05-20T10:30:00Z',
              updatedAt: '2023-05-20T10:30:00Z',
            },
          ];

          setProperties(mockProperties);
          setTransactions(mockTransactions);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching financial data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddTransaction = () => {
    setIsModalVisible(true);
    form.resetFields();
    // Default to income transaction
    setTransactionType('income');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values: any) => {
    const newTransaction: Partial<Transaction> = {
      ...values,
      id: `tr${Date.now()}`,
      type: transactionType,
      date: values.date.format('YYYY-MM-DD'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // In a real app, this would be an API call to Supabase
    setTransactions([newTransaction as Transaction, ...transactions]);
    setIsModalVisible(false);
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleTransactionTypeChange = (type: 'income' | 'expense') => {
    setTransactionType(type);
    // Reset form when changing transaction type
    form.resetFields();
  };

  const getFormFields = () => {
    if (transactionType === 'income') {
      return (
        <>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select placeholder="Select category">
              <Option value="rent">Rent</Option>
              <Option value="security_deposit">Security Deposit</Option>
              <Option value="late_fee">Late Fee</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="tenantId"
            label="Tenant"
          >
            <Select placeholder="Select tenant">
              <Option value="tenant1">Robert Johnson</Option>
              <Option value="tenant2">Maria Garcia</Option>
              <Option value="tenant3">David Kim</Option>
              <Option value="tenant4">Emily Chen</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="paymentMethod"
            label="Payment Method"
            rules={[{ required: true, message: 'Please select payment method' }]}
          >
            <Select placeholder="Select payment method">
              <Option value="cash">Cash</Option>
              <Option value="check">Check</Option>
              <Option value="card">Credit/Debit Card</Option>
              <Option value="bank_transfer">Bank Transfer</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </>
      );
    } else {
      return (
        <>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select placeholder="Select category">
              <Option value="maintenance">Maintenance</Option>
              <Option value="utilities">Utilities</Option>
              <Option value="taxes">Taxes</Option>
              <Option value="insurance">Insurance</Option>
              <Option value="mortgage">Mortgage</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="paymentMethod"
            label="Payment Method"
            rules={[{ required: true, message: 'Please select payment method' }]}
          >
            <Select placeholder="Select payment method">
              <Option value="cash">Cash</Option>
              <Option value="check">Check</Option>
              <Option value="card">Credit/Debit Card</Option>
              <Option value="bank_transfer">Bank Transfer</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </>
      );
    }
  };

  const transactionColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => format(new Date(date), 'MMM dd, yyyy'),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: 'income' | 'expense') => (
        <Tag color={type === 'income' ? 'green' : 'red'}>
          {type === 'income' ? 'Income' : 'Expense'}
        </Tag>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => (
        <Tag color="blue">
          {category.charAt(0).toUpperCase() + category.slice(1).replace('_', ' ')}
        </Tag>
      ),
    },
    {
      title: 'Property',
      dataIndex: 'propertyId',
      key: 'property',
      render: (propertyId: string) => {
        const property = properties.find(p => p.id === propertyId);
        return property ? property.name : 'N/A';
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number, record: Transaction) => (
        <Text style={{ color: record.type === 'income' ? '#3f8600' : '#cf1322' }}>
          {record.type === 'income' ? '+' : '-'}${amount.toLocaleString()}
        </Text>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Transaction) => {
        const items: MenuProps['items'] = [
          {
            key: 'view',
            label: 'View Details',
            onClick: () => console.log('View transaction:', record.id),
          },
          {
            key: 'edit',
            label: 'Edit',
            onClick: () => console.log('Edit transaction:', record.id),
          },
          {
            key: 'delete',
            label: 'Delete',
            onClick: () => console.log('Delete transaction:', record.id),
          },
        ];

        return (
          <Dropdown menu={{ items }}>
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="financial-page">
      <div className="page-header" style={{ marginBottom: 24 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2}>Financial Management</Title>
            <Text type="secondary">
              Track income, expenses, and financial performance
            </Text>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddTransaction}
            >
              Add Transaction
            </Button>
          </Col>
        </Row>
      </div>

      {/* Financial Summary Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false}>
            <Statistic
              title="Monthly Revenue"
              value={financialSummary.monthlyRevenue}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<DollarOutlined />}
              suffix="USD"
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">
                <ArrowUpOutlined /> 3.2% from last month
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false}>
            <Statistic
              title="Monthly Expenses"
              value={financialSummary.monthlyExpenses}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
              prefix={<DollarOutlined />}
              suffix="USD"
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">
                <ArrowDownOutlined /> 1.5% from last month
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false}>
            <Statistic
              title="Net Income"
              value={financialSummary.netIncome}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<DollarOutlined />}
              suffix="USD"
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">
                <ArrowUpOutlined /> 5.8% from last month
              </Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Financial Tabs */}
      <Card bordered={false}>
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane
            tab={
              <span>
                <AreaChartOutlined />
                Overview
              </span>
            }
            key="overview"
          >
            <div style={{ marginBottom: 24 }}>
              <Title level={4}>Financial Performance</Title>
              <Bar
                data={revenueData}
                options={{
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
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: function(value) {
                          return '$' + value.toLocaleString();
                        }
                      }
                    }
                  }
                }}
              />
            </div>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Year to Date Summary" bordered={false}>
                  <Row gutter={[16, 16]}>
                    <Col span={8}>
                      <Statistic
                        title="Revenue"
                        value={financialSummary.yearToDateRevenue}
                        precision={0}
                        valueStyle={{ color: '#3f8600' }}
                        prefix="$"
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic
                        title="Expenses"
                        value={financialSummary.yearToDateExpenses}
                        precision={0}
                        valueStyle={{ color: '#cf1322' }}
                        prefix="$"
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic
                        title="Net Income"
                        value={financialSummary.yearToDateNetIncome}
                        precision={0}
                        valueStyle={{ color: '#3f8600' }}
                        prefix="$"
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Additional Metrics" bordered={false}>
                  <Row gutter={[16, 16]}>
                    <Col span={8}>
                      <Statistic
                        title="Occupancy Rate"
                        value={financialSummary.occupancyRate}
                        precision={1}
                        valueStyle={{ color: '#3f8600' }}
                        suffix="%"
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic
                        title="Outstanding Rent"
                        value={financialSummary.outstandingRent}
                        precision={0}
                        valueStyle={{ color: '#cf1322' }}
                        prefix="$"
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic
                        title="Upcoming Expenses"
                        value={financialSummary.upcomingExpenses}
                        precision={0}
                        valueStyle={{ color: '#1890ff' }}
                        prefix="$"
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </TabPane>

          <TabPane
            tab={
              <span>
                <DollarOutlined />
                Transactions
              </span>
            }
            key="transactions"
          >
            <div style={{ marginBottom: 16 }}>
              <Row gutter={16} align="middle">
                <Col>
                  <RangePicker 
                    defaultValue={[
                      // @ts-ignore - TypeScript doesn't like this but it works fine
                      dateRange[0], 
                      // @ts-ignore
                      dateRange[1]
                    ]} 
                    onChange={(dates) => {
                      if (dates) {
                        setDateRange([dates[0]!.toDate(), dates[1]!.toDate()]);
                      }
                    }}
                  />
                </Col>
                <Col>
                  <Select 
                    placeholder="Transaction Type" 
                    style={{ width: 150 }}
                    allowClear
                  >
                    <Option value="income">Income</Option>
                    <Option value="expense">Expense</Option>
                  </Select>
                </Col>
                <Col>
                  <Select 
                    placeholder="Property" 
                    style={{ width: 200 }}
                    allowClear
                    onChange={(value) => setSelectedProperty(value)}
                  >
                    {properties.map(property => (
                      <Option key={property.id} value={property.id}>
                        {property.name}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col>
                  <Button type="primary" icon={<FilterOutlined />}>
                    Filter
                  </Button>
                </Col>
                <Col>
                  <Button icon={<FileExcelOutlined />}>
                    Export
                  </Button>
                </Col>
              </Row>
            </div>

            <Table
              columns={transactionColumns}
              dataSource={transactions}
              rowKey="id"
              loading={loading}
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* Add Transaction Modal */}
      <Modal
        title={`Add ${transactionType === 'income' ? 'Income' : 'Expense'} Transaction`}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        <div style={{ marginBottom: 16 }}>
          <Button.Group>
            <Button
              type={transactionType === 'income' ? 'primary' : 'default'}
              onClick={() => handleTransactionTypeChange('income')}
            >
              Income
            </Button>
            <Button
              type={transactionType === 'expense' ? 'primary' : 'default'}
              onClick={() => handleTransactionTypeChange('expense')}
            >
              Expense
            </Button>
          </Button.Group>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="amount"
                label="Amount"
                rules={[{ required: true, message: 'Please enter amount' }]}
              >
                <Input prefix="$" type="number" placeholder="Amount" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="date"
                label="Date"
                rules={[{ required: true, message: 'Please select date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input placeholder="Description" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="propertyId"
                label="Property"
                rules={[{ required: true, message: 'Please select property' }]}
              >
                <Select placeholder="Select property">
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
              >
                <Select placeholder="Select unit">
                  <Option value="221-2B">221 Bowery - 2B</Option>
                  <Option value="219-3A">219 Bowery - 3A</Option>
                  <Option value="83-2A">83 Bowery - 2A</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {getFormFields()}

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="recurring"
                label="Recurring"
                valuePropName="checked"
              >
                <Select placeholder="Select if recurring">
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="frequency"
                label="Frequency"
              >
                <Select placeholder="Select frequency">
                  <Option value="one_time">One Time</Option>
                  <Option value="daily">Daily</Option>
                  <Option value="weekly">Weekly</Option>
                  <Option value="bi_weekly">Bi-Weekly</Option>
                  <Option value="monthly">Monthly</Option>
                  <Option value="quarterly">Quarterly</Option>
                  <Option value="annually">Annually</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="notes"
            label="Notes"
          >
            <Input.TextArea rows={4} placeholder="Additional notes" />
          </Form.Item>

          <Divider />

          <Row justify="end">
            <Col>
              <Space>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  Add Transaction
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Financial;
