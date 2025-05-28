// Mock Maintenance Service - No external database connections
import { v4 as uuidv4 } from 'uuid';

export interface MaintenanceRequest {
  id?: string;
  property_id: string;
  property_name?: string;
  unit_number: string;
  tenant_id: string;
  tenant_name?: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  title: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  scheduled_date?: string;
  completed_date?: string;
  assigned_to?: string;
  cost?: number;
  images?: string[];
  notes?: string;
}

// Mock data storage
let mockRequests: MaintenanceRequest[] = [
  {
    id: '1',
    property_id: '221-bowery',
    property_name: '221 Bowery',
    unit_number: '4A',
    tenant_id: 'tenant-001',
    tenant_name: 'John Smith',
    category: 'Plumbing',
    priority: 'high',
    status: 'pending',
    title: 'Leaking faucet in kitchen',
    description: 'The kitchen faucet has been dripping constantly for the past 3 days. Water is pooling under the sink.',
    created_at: new Date('2024-01-15T10:30:00').toISOString(),
    updated_at: new Date('2024-01-15T10:30:00').toISOString(),
  },
  {
    id: '2',
    property_id: '221-bowery',
    property_name: '221 Bowery',
    unit_number: '2B',
    tenant_id: 'tenant-002',
    tenant_name: 'Sarah Johnson',
    category: 'HVAC',
    priority: 'medium',
    status: 'in_progress',
    title: 'AC not cooling properly',
    description: 'The air conditioning unit is running but not cooling the apartment. Temperature stays at 78°F even when set to 68°F.',
    created_at: new Date('2024-01-14T14:20:00').toISOString(),
    updated_at: new Date('2024-01-16T09:15:00').toISOString(),
    assigned_to: 'Mike (HVAC Tech)',
    scheduled_date: new Date('2024-01-17T10:00:00').toISOString(),
  },
  {
    id: '3',
    property_id: '221-bowery',
    property_name: '221 Bowery',
    unit_number: '7C',
    tenant_id: 'tenant-003',
    tenant_name: 'Mike Chen',
    category: 'Electrical',
    priority: 'urgent',
    status: 'pending',
    title: 'Power outlet sparking',
    description: 'The outlet in the living room near the TV is sparking when anything is plugged in. This seems dangerous and needs immediate attention.',
    created_at: new Date('2024-01-16T16:45:00').toISOString(),
    updated_at: new Date('2024-01-16T16:45:00').toISOString(),
  },
  {
    id: '4',
    property_id: '156-broadway',
    property_name: '156 Broadway',
    unit_number: '12F',
    tenant_id: 'tenant-004',
    tenant_name: 'Emily Davis',
    category: 'Appliance',
    priority: 'low',
    status: 'completed',
    title: 'Dishwasher not draining',
    description: 'Dishwasher completes cycle but water remains at the bottom. Dishes are clean but standing water is an issue.',
    created_at: new Date('2024-01-10T11:00:00').toISOString(),
    updated_at: new Date('2024-01-13T15:30:00').toISOString(),
    completed_date: new Date('2024-01-13T15:30:00').toISOString(),
    assigned_to: 'Tom (Maintenance)',
    cost: 125.00,
    notes: 'Cleared drain blockage and replaced drain filter. Issue resolved.',
  },
  {
    id: '5',
    property_id: '312-madison',
    property_name: '312 Madison Ave',
    unit_number: '8A',
    tenant_id: 'tenant-005',
    tenant_name: 'Robert Wilson',
    category: 'General',
    priority: 'medium',
    status: 'pending',
    title: 'Window seal broken',
    description: 'Master bedroom window seal is broken, causing drafts and increased heating costs. Can hear street noise clearly.',
    created_at: new Date('2024-01-16T08:00:00').toISOString(),
    updated_at: new Date('2024-01-16T08:00:00').toISOString(),
  }
];

class MockMaintenanceService {
  async createRequest(request: Omit<MaintenanceRequest, 'id'>): Promise<MaintenanceRequest> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newRequest: MaintenanceRequest = {
      ...request,
      id: uuidv4(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    mockRequests.unshift(newRequest);
    return newRequest;
  }

  async getRequests(filters?: {
    tenant_id?: string;
    property_id?: string;
    status?: string;
  }): Promise<MaintenanceRequest[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filtered = [...mockRequests];
    
    if (filters?.tenant_id) {
      filtered = filtered.filter(r => r.tenant_id === filters.tenant_id);
    }
    if (filters?.property_id) {
      filtered = filtered.filter(r => r.property_id === filters.property_id);
    }
    if (filters?.status) {
      filtered = filtered.filter(r => r.status === filters.status);
    }
    
    return filtered;
  }

  async getRequestById(id: string): Promise<MaintenanceRequest> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const request = mockRequests.find(r => r.id === id);
    if (!request) {
      throw new Error('Request not found');
    }
    return request;
  }

  async updateRequest(id: string, updates: Partial<MaintenanceRequest>): Promise<MaintenanceRequest> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const index = mockRequests.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Request not found');
    }
    
    mockRequests[index] = {
      ...mockRequests[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    
    return mockRequests[index];
  }

  async uploadImage(file: File, requestId: string): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return a mock image URL
    return `https://via.placeholder.com/400x300/2E5F85/ffffff?text=Maintenance+Photo`;
  }

  async deleteRequest(id: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = mockRequests.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Request not found');
    }
    
    mockRequests.splice(index, 1);
  }

  // Mock real-time subscription
  subscribeToUpdates(callback: (payload: any) => void) {
    // Simulate occasional updates
    const interval = setInterval(() => {
      if (Math.random() > 0.8 && mockRequests.length > 0) {
        const randomRequest = mockRequests[Math.floor(Math.random() * mockRequests.length)];
        callback({
          eventType: 'UPDATE',
          new: randomRequest,
          old: randomRequest,
        });
      }
    }, 10000);

    // Return unsubscribe function
    return {
      unsubscribe: () => clearInterval(interval),
    };
  }
}

export const maintenanceService = new MockMaintenanceService();