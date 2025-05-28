-- Drop existing table if needed (be careful with this in production!)
-- DROP TABLE IF EXISTS maintenance_requests CASCADE;

-- Create maintenance_requests table
CREATE TABLE IF NOT EXISTS maintenance_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  property_id TEXT NOT NULL,
  property_name TEXT,
  unit_number TEXT NOT NULL,
  tenant_id TEXT NOT NULL,
  tenant_name TEXT,
  category TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  scheduled_date TIMESTAMP WITH TIME ZONE,
  completed_date TIMESTAMP WITH TIME ZONE,
  assigned_to TEXT,
  cost DECIMAL(10,2),
  images TEXT[],
  notes TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_maintenance_tenant_id ON maintenance_requests(tenant_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_property_id ON maintenance_requests(property_id);
CREATE INDEX IF NOT EXISTS idx_maintenance_status ON maintenance_requests(status);
CREATE INDEX IF NOT EXISTS idx_maintenance_created_at ON maintenance_requests(created_at DESC);

-- IMPORTANT: For now, we'll disable RLS since we're not using Supabase Auth
ALTER TABLE maintenance_requests DISABLE ROW LEVEL SECURITY;

-- Insert some sample data for Doug Mino
INSERT INTO maintenance_requests (
  property_id,
  property_name,
  unit_number,
  tenant_id,
  tenant_name,
  category,
  priority,
  status,
  title,
  description
) VALUES 
(
  '221-bowery',
  '221 Bowery',
  '4A',
  'doug-mino-001',
  'John Smith',
  'Plumbing',
  'high',
  'pending',
  'Leaking faucet in kitchen',
  'The kitchen faucet has been dripping constantly for the past 3 days. Water is pooling under the sink.'
),
(
  '221-bowery',
  '221 Bowery',
  '2B',
  'doug-mino-001',
  'Sarah Johnson',
  'HVAC',
  'medium',
  'in_progress',
  'AC not cooling properly',
  'The air conditioning unit is running but not cooling the apartment. Temperature stays at 78°F even when set to 68°F.'
),
(
  '221-bowery',
  '221 Bowery',
  '7C',
  'doug-mino-001',
  'Mike Chen',
  'Electrical',
  'urgent',
  'pending',
  'Power outlet sparking',
  'The outlet in the living room near the TV is sparking when anything is plugged in. This seems dangerous.'
);

-- Create storage bucket for maintenance images (if not exists)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('maintenance-images', 'maintenance-images', true)
ON CONFLICT (id) DO NOTHING;