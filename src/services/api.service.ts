import { supabase } from '../utils/supabase';
import { Property, Unit, Tenant, MaintenanceRequest, Document, Transaction, User } from '../types';
import config from '../utils/config';

/**
 * API Service for CRM operations
 * Provides a centralized interface for all Supabase API calls
 */
class ApiService {
  // PROPERTIES
  
  async getAllProperties() {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data as Property[];
  }
  
  async getPropertyById(id: string) {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Property;
  }
  
  async createProperty(property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('properties')
      .insert(property)
      .select()
      .single();
    
    if (error) throw error;
    return data as Property;
  }
  
  async updateProperty(id: string, updates: Partial<Property>) {
    const { data, error } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Property;
  }
  
  // UNITS
  
  async getUnitsForProperty(propertyId: string) {
    const { data, error } = await supabase
      .from('units')
      .select('*')
      .eq('property_id', propertyId)
      .order('unit_number');
    
    if (error) throw error;
    return data as Unit[];
  }
  
  async getUnitById(id: string) {
    const { data, error } = await supabase
      .from('units')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Unit;
  }
  
  async createUnit(unit: Omit<Unit, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('units')
      .insert(unit)
      .select()
      .single();
    
    if (error) throw error;
    return data as Unit;
  }
  
  async updateUnit(id: string, updates: Partial<Unit>) {
    const { data, error } = await supabase
      .from('units')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Unit;
  }
  
  async getAvailableUnits() {
    const { data, error } = await supabase
      .from('units')
      .select('*, properties(name)')
      .eq('status', 'available')
      .order('unit_number');
    
    if (error) throw error;
    return data as (Unit & { properties: { name: string } })[];
  }
  
  // TENANTS
  
  async getAllTenants() {
    const { data, error } = await supabase
      .from('tenants')
      .select('*, properties(name), units(unit_number)')
      .order('last_name');
    
    if (error) throw error;
    return data as (Tenant & { properties: { name: string }, units: { unit_number: string } })[];
  }
  
  async getTenantById(id: string) {
    const { data, error } = await supabase
      .from('tenants')
      .select('*, properties(name), units(unit_number)')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as (Tenant & { properties: { name: string }, units: { unit_number: string } });
  }
  
  async createTenant(tenant: Omit<Tenant, 'id' | 'createdAt' | 'updatedAt' | 'paymentHistory' | 'documents'>) {
    const { data, error } = await supabase
      .from('tenants')
      .insert(tenant)
      .select()
      .single();
    
    if (error) throw error;
    return data as Tenant;
  }
  
  async updateTenant(id: string, updates: Partial<Tenant>) {
    const { data, error } = await supabase
      .from('tenants')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Tenant;
  }
  
  async getUpcomingLeaseEndings(daysThreshold: number = 90) {
    const today = new Date();
    const thresholdDate = new Date();
    thresholdDate.setDate(today.getDate() + daysThreshold);
    
    const { data, error } = await supabase
      .from('tenants')
      .select('*, properties(name), units(unit_number)')
      .eq('status', 'active')
      .lte('lease_end_date', thresholdDate.toISOString())
      .gte('lease_end_date', today.toISOString())
      .order('lease_end_date');
    
    if (error) throw error;
    return data as (Tenant & { properties: { name: string }, units: { unit_number: string } })[];
  }
  
  // MAINTENANCE
  
  async getAllMaintenanceRequests() {
    const { data, error } = await supabase
      .from('maintenance_requests')
      .select('*, properties(name), units(unit_number), tenants(first_name, last_name)')
      .order('request_date', { ascending: false });
    
    if (error) throw error;
    return data as (MaintenanceRequest & { 
      properties: { name: string }, 
      units: { unit_number: string },
      tenants: { first_name: string, last_name: string } | null
    })[];
  }
  
  async getMaintenanceRequestById(id: string) {
    const { data, error } = await supabase
      .from('maintenance_requests')
      .select('*, properties(name), units(unit_number), tenants(first_name, last_name)')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as (MaintenanceRequest & { 
      properties: { name: string }, 
      units: { unit_number: string },
      tenants: { first_name: string, last_name: string } | null
    });
  }
  
  async createMaintenanceRequest(request: Omit<MaintenanceRequest, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('maintenance_requests')
      .insert(request)
      .select()
      .single();
    
    if (error) throw error;
    return data as MaintenanceRequest;
  }
  
  async updateMaintenanceRequest(id: string, updates: Partial<MaintenanceRequest>) {
    const { data, error } = await supabase
      .from('maintenance_requests')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as MaintenanceRequest;
  }
  
  // DOCUMENTS
  
  async getDocuments(relatedTo: string, relatedId: string) {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('related_to', relatedTo)
      .eq('related_id', relatedId)
      .order('upload_date', { ascending: false });
    
    if (error) throw error;
    return data as Document[];
  }
  
  async uploadDocument(
    file: File, 
    documentDetails: Omit<Document, 'id' | 'file_url' | 'file_size' | 'createdAt' | 'updatedAt'>
  ) {
    // 1. Upload file to storage
    const filePath = `${documentDetails.relatedTo}/${documentDetails.relatedId}/${file.name}`;
    const { data: fileData, error: fileError } = await supabase
      .storage
      .from('documents')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (fileError) throw fileError;
    
    // 2. Get public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('documents')
      .getPublicUrl(filePath);
    
    // 3. Store document record
    const documentRecord = {
      ...documentDetails,
      file_url: publicUrl,
      file_size: file.size,
      upload_date: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('documents')
      .insert(documentRecord)
      .select()
      .single();
    
    if (error) throw error;
    return data as Document;
  }
  
  async deleteDocument(id: string) {
    // First get the document to get the file path
    const { data: document, error: getError } = await supabase
      .from('documents')
      .select('file_url')
      .eq('id', id)
      .single();
    
    if (getError) throw getError;
    
    // Extract path from URL
    const url = new URL(document.file_url);
    const filePath = url.pathname.split('/').slice(2).join('/');
    
    // Delete from storage
    const { error: storageError } = await supabase
      .storage
      .from('documents')
      .remove([filePath]);
    
    if (storageError) throw storageError;
    
    // Delete record
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
  
  // FINANCIAL
  
  async getTransactions(filters: {
    type?: 'income' | 'expense';
    propertyId?: string;
    startDate?: string;
    endDate?: string;
  } = {}) {
    let query = supabase
      .from('transactions')
      .select('*, properties(name), units(unit_number), tenants(first_name, last_name)');
    
    if (filters.type) {
      query = query.eq('type', filters.type);
    }
    
    if (filters.propertyId) {
      query = query.eq('property_id', filters.propertyId);
    }
    
    if (filters.startDate) {
      query = query.gte('date', filters.startDate);
    }
    
    if (filters.endDate) {
      query = query.lte('date', filters.endDate);
    }
    
    const { data, error } = await query.order('date', { ascending: false });
    
    if (error) throw error;
    return data as (Transaction & { 
      properties: { name: string } | null, 
      units: { unit_number: string } | null,
      tenants: { first_name: string, last_name: string } | null
    })[];
  }
  
  async createTransaction(transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('transactions')
      .insert(transaction)
      .select()
      .single();
    
    if (error) throw error;
    return data as Transaction;
  }
  
  async getFinancialSummary(propertyId?: string, period: 'month' | 'quarter' | 'year' = 'month') {
    let startDate = new Date();
    if (period === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
    } else if (period === 'quarter') {
      startDate.setMonth(startDate.getMonth() - 3);
    } else {
      startDate.setFullYear(startDate.getFullYear() - 1);
    }
    
    let query = supabase
      .from('transactions')
      .select('type, amount')
      .gte('date', startDate.toISOString());
    
    if (propertyId) {
      query = query.eq('property_id', propertyId);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    const income = data
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const expenses = data
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    return {
      income,
      expenses,
      netIncome: income - expenses,
      period,
      startDate,
      endDate: new Date()
    };
  }
  
  // DASHBOARD
  
  async getDashboardSummary() {
    // This would be a specialized API endpoint in a real application
    // Here we'll simulate by making multiple queries
    
    // 1. Get property count
    const { data: properties, error: propertiesError } = await supabase
      .from('properties')
      .select('id, total_units, occupied_units');
    
    if (propertiesError) throw propertiesError;
    
    const totalProperties = properties.length;
    const totalUnits = properties.reduce((sum, p) => sum + p.total_units, 0);
    const occupiedUnits = properties.reduce((sum, p) => sum + p.occupied_units, 0);
    const occupancyRate = totalUnits > 0 ? (occupiedUnits / totalUnits) * 100 : 0;
    
    // 2. Get tenant count
    const { count: totalTenants, error: tenantsError } = await supabase
      .from('tenants')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'active');
    
    if (tenantsError) throw tenantsError;
    
    // 3. Get pending maintenance count
    const { count: pendingMaintenance, error: maintenanceError } = await supabase
      .from('maintenance_requests')
      .select('id', { count: 'exact', head: true })
      .in('status', ['new', 'assigned', 'in_progress']);
    
    if (maintenanceError) throw maintenanceError;
    
    // 4. Get financial data
    const financialSummary = await this.getFinancialSummary();
    
    // 5. Get upcoming lease endings
    const { data: leases, error: leasesError } = await supabase
      .from('tenants')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'active')
      .lte('lease_end_date', new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString());
    
    if (leasesError) throw leasesError;
    
    return {
      totalProperties,
      totalUnits,
      occupiedUnits,
      occupancyRate,
      vacantUnits: totalUnits - occupiedUnits,
      totalTenants: totalTenants || 0,
      pendingMaintenance: pendingMaintenance || 0,
      monthlyRevenue: financialSummary.income,
      monthlyExpenses: financialSummary.expenses,
      netIncome: financialSummary.netIncome,
      upcomingLeasesEnding: leases?.length || 0
    };
  }
}

export default new ApiService();
