// Property-related types
export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  imageUrl?: string;
  acquisitionDate: string;
  purchasePrice: number;
  currentValue: number;
  description: string;
  totalUnits: number;
  occupiedUnits: number;
  propertyType: 'residential' | 'commercial' | 'mixed-use';
  amenities: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Unit {
  id: string;
  propertyId: string;
  unitNumber: string;
  floorLevel: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  monthlyRent: number;
  securityDeposit: number;
  isOccupied: boolean;
  occupiedSince?: string;
  vacantSince?: string;
  tenantId?: string;
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  features: string[];
  createdAt: string;
  updatedAt: string;
}

// Tenant-related types
export interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  moveInDate: string;
  leaseEndDate: string;
  rentAmount: number;
  securityDeposit: number;
  propertyId: string;
  unitId: string;
  emergencyContact?: EmergencyContact;
  status: 'active' | 'past' | 'prospective';
  paymentHistory: PaymentRecord[];
  documents: Document[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
  email?: string;
}

export interface PaymentRecord {
  id: string;
  tenantId: string;
  amount: number;
  date: string;
  dueDate: string;
  type: 'rent' | 'deposit' | 'fee' | 'refund';
  status: 'paid' | 'pending' | 'overdue' | 'partial';
  method: 'cash' | 'check' | 'card' | 'bank_transfer' | 'other';
  notes?: string;
  createdAt: string;
}

// Maintenance-related types
export interface MaintenanceRequest {
  id: string;
  propertyId: string;
  unitId: string;
  tenantId?: string;
  title: string;
  description: string;
  category: 'plumbing' | 'electrical' | 'hvac' | 'appliance' | 'structural' | 'other';
  priority: 'emergency' | 'high' | 'medium' | 'low';
  status: 'new' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  assignedTo?: string;
  estimatedCost?: number;
  actualCost?: number;
  requestDate: string;
  scheduledDate?: string;
  completionDate?: string;
  attachments?: string[];
  notes: string[];
  createdAt: string;
  updatedAt: string;
}

// Document-related types
export interface Document {
  id: string;
  name: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  category: 'lease' | 'invoice' | 'receipt' | 'contract' | 'legal' | 'other';
  relatedTo: 'property' | 'tenant' | 'maintenance' | 'financial';
  relatedId: string;
  uploadedBy: string;
  uploadDate: string;
  tags: string[];
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

// Financial-related types
export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: string;
  propertyId?: string;
  unitId?: string;
  tenantId?: string;
  paymentMethod?: string;
  recurring: boolean;
  frequency?: 'one_time' | 'daily' | 'weekly' | 'bi_weekly' | 'monthly' | 'quarterly' | 'annually';
  documentId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// User-related types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'property_manager' | 'maintenance' | 'accountant' | 'viewer';
  phone?: string;
  avatar?: string;
  lastLogin?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Dashboard-related types
export interface DashboardSummary {
  totalProperties: number;
  totalUnits: number;
  occupancyRate: number;
  vacantUnits: number;
  totalTenants: number;
  pendingMaintenance: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  netIncome: number;
  upcomingLeasesEnding: number;
}

// Settings-related types
export interface AppSettings {
  companyName: string;
  companyLogo?: string;
  primaryColor: string;
  secondaryColor: string;
  dateFormat: string;
  timeFormat: string;
  currencyFormat: string;
  defaultLanguage: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  autoBackup: boolean;
  backupFrequency?: string;
  maintenanceReminders: boolean;
  leaseEndReminders: boolean;
  paymentReminders: boolean;
}
