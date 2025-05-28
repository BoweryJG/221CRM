import { createClient } from '@supabase/supabase-js';
import { getSupabaseConfig } from '../config/supabase.config';

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

class MaintenanceService {
  private supabase;

  constructor() {
    const config = getSupabaseConfig('sphereOs');
    this.supabase = createClient(config.url, config.anonKey);
  }

  async createRequest(request: Omit<MaintenanceRequest, 'id'>): Promise<MaintenanceRequest> {
    const { data, error } = await this.supabase
      .from('maintenance_requests')
      .insert([{
        ...request,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getRequests(filters?: {
    tenant_id?: string;
    property_id?: string;
    status?: string;
  }): Promise<MaintenanceRequest[]> {
    let query = this.supabase
      .from('maintenance_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.tenant_id) {
      query = query.eq('tenant_id', filters.tenant_id);
    }
    if (filters?.property_id) {
      query = query.eq('property_id', filters.property_id);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async getRequestById(id: string): Promise<MaintenanceRequest> {
    const { data, error } = await this.supabase
      .from('maintenance_requests')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async updateRequest(id: string, updates: Partial<MaintenanceRequest>): Promise<MaintenanceRequest> {
    const { data, error } = await this.supabase
      .from('maintenance_requests')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async uploadImage(file: File, requestId: string): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${requestId}/${Date.now()}.${fileExt}`;
    
    const { data, error } = await this.supabase.storage
      .from('maintenance-images')
      .upload(fileName, file);

    if (error) throw error;

    const { data: publicURL } = this.supabase.storage
      .from('maintenance-images')
      .getPublicUrl(fileName);

    return publicURL.publicUrl;
  }

  async deleteRequest(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('maintenance_requests')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Real-time subscription for maintenance updates
  subscribeToUpdates(callback: (payload: any) => void) {
    return this.supabase
      .channel('maintenance_updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'maintenance_requests',
        },
        callback
      )
      .subscribe();
  }
}

export const maintenanceService = new MaintenanceService();