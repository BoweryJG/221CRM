import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Table,
  Button,
  Space,
  Tag,
  Input,
  Upload,
  Modal,
  Form,
  Select,
  Row,
  Col,
  Divider,
  message,
  Dropdown,
} from 'antd';
import {
  FileAddOutlined,
  SearchOutlined,
  DownloadOutlined,
  EyeOutlined,
  DeleteOutlined,
  MoreOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  FileImageOutlined,
  FileUnknownOutlined,
  HomeOutlined,
  TeamOutlined,
  ToolOutlined,
  DollarOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { format } from 'date-fns';
import { Document, Property, Tenant } from '../types';
import type { MenuProps, UploadProps } from 'antd';
import { RcFile } from 'antd/lib/upload';

const { Title, Text } = Typography;
const { Option } = Select;
const { Dragger } = Upload;

const Documents: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedRelatedTo, setSelectedRelatedTo] = useState<string | null>(null);
  const [form] = Form.useForm();

  // Mock data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call with timeout
        setTimeout(() => {
          const mockDocuments: Document[] = [
            {
              id: 'doc1',
              name: 'Lease Agreement - Robert Johnson',
              description: 'Residential lease agreement for Unit 2B',
              fileUrl: 'https://example.com/lease-tenant1.pdf',
              fileType: 'application/pdf',
              fileSize: 1024000,
              category: 'lease',
              relatedTo: 'tenant',
              relatedId: 'tenant1',
              uploadedBy: 'admin1',
              uploadDate: '2022-05-15',
              tags: ['lease', 'active'],
              isArchived: false,
              createdAt: '2022-05-15T00:00:00Z',
              updatedAt: '2022-05-15T00:00:00Z',
            },
            {
              id: 'doc2',
              name: '221 Bowery - Insurance Policy',
              description: 'Property insurance documentation',
              fileUrl: 'https://example.com/insurance-221.pdf',
              fileType: 'application/pdf',
              fileSize: 2048000,
              category: 'legal',
              relatedTo: 'property',
              relatedId: '221',
              uploadedBy: 'admin1',
              uploadDate: '2022-01-10',
              tags: ['insurance', 'property'],
              isArchived: false,
              createdAt: '2022-01-10T00:00:00Z',
              updatedAt: '2022-01-10T00:00:00Z',
            },
            {
              id: 'doc3',
              name: '219 Bowery - Property Tax Bill 2023',
              description: 'Annual property tax bill',
              fileUrl: 'https://example.com/tax-219-2023.pdf',
              fileType: 'application/pdf',
              fileSize: 512000,
              category: 'invoice',
              relatedTo: 'property',
              relatedId: '219',
              uploadedBy: 'admin1',
              uploadDate: '2023-01-05',
              tags: ['tax', 'property', '2023'],
              isArchived: false,
              createdAt: '2023-01-05T00:00:00Z',
              updatedAt: '2023-01-05T00:00:00Z',
            },
            {
              id: 'doc4',
              name: 'Plumbing Repair Invoice - Unit 2B',
              description: 'Invoice for emergency plumbing repair',
              fileUrl: 'https://example.com/invoice-plumbing-221.pdf',
              fileType: 'application/pdf',
              fileSize: 384000,
              category: 'invoice',
              relatedTo: 'maintenance',
              relatedId: 'maint1',
              uploadedBy: 'admin1',
              uploadDate: '2023-05-12',
              tags: ['invoice', 'maintenance', 'plumbing'],
              isArchived: false,
              createdAt: '2023-05-12T00:00:00Z',
              updatedAt: '2023-05-12T00:00:00Z',
            },
            {
              id: 'doc5',
              name: 'Maria Garcia - Rental Application',
              description: 'Original rental application',
              fileUrl: 'https://example.com/application-garcia.pdf',
              fileType: 'application/pdf',
              fileSize: 1536000,
              category: 'legal',
              relatedTo: 'tenant',
              relatedId: 'tenant2',
              uploadedBy: 'admin1',
              uploadDate: '2022-05-20',
              tags: ['application', 'tenant'],
              isArchived: false,
              createdAt: '2022-05-20T00:00:00Z',
              updatedAt: '2022-05-20T00:00:00Z',
            },
            {
              id: 'doc6',
              name: '221 Bowery - Building Inspection Report',
              description: 'Annual building inspection report',
              fileUrl: 'https://example.com/inspection-221.pdf',
              fileType: 'application/pdf',
              fileSize: 3072000,
              category: 'legal',
              relatedTo: 'property',
              relatedId: '221',
              uploadedBy: 'admin1',
              uploadDate: '2023-02-15',
              tags: ['inspection', 'property', 'legal'],
              isArchived: false,
              createdAt: '2023-02-15T00:00:00Z',
              updatedAt: '2023-02-15T00:00:00Z',
            },
          ];

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
          ];

          setDocuments(mockDocuments);
          setProperties(mockProperties);
          setTenants(mockTenants);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching documents:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const showUploadModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRelatedTo(null);
  };

  const handleRelatedToChange = (value: string) => {
    setSelectedRelatedTo(value);
    form.setFieldsValue({ relatedId: undefined });
  };

  const getRelatedOptions = () => {
    if (selectedRelatedTo === 'property') {
      return properties.map(property => (
        <Option key={property.id} value={property.id}>
          {property.name}
        </Option>
      ));
    } else if (selectedRelatedTo === 'tenant') {
      return tenants.map(tenant => (
        <Option key={tenant.id} value={tenant.id}>
          {tenant.firstName} {tenant.lastName}
        </Option>
      ));
    } else if (selectedRelatedTo === 'maintenance') {
      return [
        <Option key="maint1" value="maint1">Plumbing Repair - 221 Bowery Unit 2B</Option>,
        <Option key="maint2" value="maint2">HVAC Service - 219 Bowery Unit 3A</Option>,
      ];
    } else if (selectedRelatedTo === 'financial') {
      return [
        <Option key="fin1" value="fin1">Property Tax Payment - 221 Bowery</Option>,
        <Option key="fin2" value="fin2">Monthly Rent Collection - May 2023</Option>,
      ];
    }
    return [];
  };

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188', // Mock endpoint
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload: (file: RcFile) => {
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isLt20M) {
        message.error('File must be smaller than 20MB!');
      }
      return isLt20M || Upload.LIST_IGNORE;
    },
    showUploadList: true,
  };

  const handleSubmit = (values: any) => {
    // In a real app, file would be uploaded to storage
    // For now, we'll just create a mock document record
    const newDocument: Partial<Document> = {
      id: `doc${Date.now()}`,
      name: values.name,
      description: values.description || '',
      fileUrl: 'https://example.com/uploaded-file.pdf', // Mock URL
      fileType: 'application/pdf', // Assume PDF for demo
      fileSize: 1000000, // Assume 1MB for demo
      category: values.category,
      relatedTo: values.relatedTo,
      relatedId: values.relatedId,
      uploadedBy: 'admin1', // Current user in a real app
      uploadDate: new Date().toISOString().split('T')[0],
      tags: values.tags || [],
      isArchived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add to state
    setDocuments([newDocument as Document, ...documents]);
    setIsModalVisible(false);
    message.success('Document uploaded successfully');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredDocuments = documents.filter(
    doc =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.description && doc.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) {
      return <FilePdfOutlined style={{ color: '#ff4d4f', fontSize: '20px' }} />;
    } else if (fileType.includes('excel') || fileType.includes('spreadsheet')) {
      return <FileExcelOutlined style={{ color: '#52c41a', fontSize: '20px' }} />;
    } else if (fileType.includes('image')) {
      return <FileImageOutlined style={{ color: '#1890ff', fontSize: '20px' }} />;
    } else if (fileType.includes('text')) {
      return <FileTextOutlined style={{ color: '#faad14', fontSize: '20px' }} />;
    } else {
      return <FileUnknownOutlined style={{ fontSize: '20px' }} />;
    }
  };

  const getRelatedIcon = (relatedTo: string) => {
    switch (relatedTo) {
      case 'property':
        return <HomeOutlined />;
      case 'tenant':
        return <TeamOutlined />;
      case 'maintenance':
        return <ToolOutlined />;
      case 'financial':
        return <DollarOutlined />;
      default:
        return <FileTextOutlined />;
    }
  };

  const getRelatedToName = (doc: Document) => {
    if (doc.relatedTo === 'property') {
      const property = properties.find(p => p.id === doc.relatedId);
      return property ? property.name : 'Unknown Property';
    } else if (doc.relatedTo === 'tenant') {
      const tenant = tenants.find(t => t.id === doc.relatedId);
      return tenant ? `${tenant.firstName} ${tenant.lastName}` : 'Unknown Tenant';
    } else if (doc.relatedTo === 'maintenance') {
      return doc.relatedId === 'maint1' ? 'Plumbing Repair - 221 Bowery Unit 2B' : 'Unknown Maintenance';
    } else if (doc.relatedTo === 'financial') {
      return doc.relatedId === 'fin1' ? 'Property Tax Payment - 221 Bowery' : 'Unknown Financial';
    }
    return 'Unknown';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const columns = [
    {
      title: 'Document',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Document) => (
        <Space>
          {getFileIcon(record.fileType)}
          <a href={record.fileUrl} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        </Space>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => (
        <Tag color="blue">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Related To',
      key: 'relatedTo',
      render: (text: string, record: Document) => (
        <Space>
          {getRelatedIcon(record.relatedTo)}
          <span>
            {record.relatedTo.charAt(0).toUpperCase() + record.relatedTo.slice(1)}
          </span>
          <Text type="secondary">
            {getRelatedToName(record)}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: string[]) => (
        <Space size={[0, 8]} wrap>
          {tags.map(tag => (
            <Tag key={tag} color="green">
              {tag}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Size',
      dataIndex: 'fileSize',
      key: 'fileSize',
      render: (size: number) => formatFileSize(size),
    },
    {
      title: 'Upload Date',
      dataIndex: 'uploadDate',
      key: 'uploadDate',
      render: (date: string) => format(new Date(date), 'MMM dd, yyyy'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Document) => {
        const items: MenuProps['items'] = [
          {
            key: 'view',
            label: 'View Document',
            icon: <EyeOutlined />,
            onClick: () => window.open(record.fileUrl, '_blank'),
          },
          {
            key: 'download',
            label: 'Download',
            icon: <DownloadOutlined />,
            onClick: () => window.open(record.fileUrl, '_blank'),
          },
          {
            key: 'delete',
            label: 'Delete',
            icon: <DeleteOutlined />,
            onClick: () => {
              // Handle delete in a real app
              message.success('Document deleted successfully');
              setDocuments(documents.filter(doc => doc.id !== record.id));
            },
          },
        ];

        return (
          <Space>
            <Button
              icon={<DownloadOutlined />}
              onClick={() => window.open(record.fileUrl, '_blank')}
            />
            <Dropdown menu={{ items }} placement="bottomRight">
              <Button icon={<MoreOutlined />} />
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="documents-page">
      <div className="page-header" style={{ marginBottom: 24 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2}>Documents</Title>
            <Text type="secondary">
              Manage property and tenant documents
            </Text>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<FileAddOutlined />}
              onClick={showUploadModal}
            >
              Upload Document
            </Button>
          </Col>
        </Row>
      </div>

      <Card bordered={false}>
        <div style={{ marginBottom: 16 }}>
          <Input
            placeholder="Search documents..."
            prefix={<SearchOutlined />}
            onChange={handleSearch}
            style={{ width: 300 }}
          />
        </div>
        <Table
          columns={columns}
          dataSource={filteredDocuments}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Upload Document Modal */}
      <Modal
        title="Upload Document"
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
            <Col span={16}>
              <Form.Item
                name="name"
                label="Document Name"
                rules={[{ required: true, message: 'Please enter document name' }]}
              >
                <Input placeholder="Document Name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Please select category' }]}
              >
                <Select placeholder="Select category">
                  <Option value="lease">Lease</Option>
                  <Option value="invoice">Invoice</Option>
                  <Option value="receipt">Receipt</Option>
                  <Option value="contract">Contract</Option>
                  <Option value="legal">Legal</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea rows={3} placeholder="Document description" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="relatedTo"
                label="Related To"
                rules={[{ required: true, message: 'Please select what this document relates to' }]}
              >
                <Select placeholder="Select what this document relates to" onChange={handleRelatedToChange}>
                  <Option value="property">Property</Option>
                  <Option value="tenant">Tenant</Option>
                  <Option value="maintenance">Maintenance</Option>
                  <Option value="financial">Financial</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="relatedId"
                label="Select Specific Item"
                rules={[{ required: true, message: 'Please select specific item' }]}
              >
                <Select placeholder="Select specific item" disabled={!selectedRelatedTo}>
                  {getRelatedOptions()}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="tags"
            label="Tags"
          >
            <Select mode="tags" placeholder="Add tags">
              <Option value="lease">Lease</Option>
              <Option value="contract">Contract</Option>
              <Option value="invoice">Invoice</Option>
              <Option value="tax">Tax</Option>
              <Option value="maintenance">Maintenance</Option>
              <Option value="legal">Legal</Option>
              <Option value="important">Important</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="file"
            label="Upload File"
            rules={[{ required: true, message: 'Please upload a file' }]}
          >
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single file upload. File size limit: 20MB.
              </p>
            </Dragger>
          </Form.Item>

          <Divider />

          <Row justify="end">
            <Col>
              <Space>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  Upload Document
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Documents;
