-- Create maintenance_requests table
CREATE TABLE IF NOT EXISTS maintenance_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id VARCHAR NOT NULL,
  property_name VARCHAR,
  unit_number VARCHAR NOT NULL,
  tenant_id UUID NOT NULL,
  tenant_name VARCHAR,
  category VARCHAR NOT NULL CHECK (category IN ('plumbing', 'electrical', 'hvac', 'appliance', 'structural', 'pest', 'other')),
  priority VARCHAR NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status VARCHAR NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  title VARCHAR NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  scheduled_date TIMESTAMPTZ,
  completed_date TIMESTAMPTZ,
  assigned_to VARCHAR,
  cost DECIMAL(10, 2),
  images TEXT[],
  notes TEXT
);

-- Create indexes for better performance
CREATE INDEX idx_maintenance_tenant_id ON maintenance_requests(tenant_id);
CREATE INDEX idx_maintenance_property_id ON maintenance_requests(property_id);
CREATE INDEX idx_maintenance_status ON maintenance_requests(status);
CREATE INDEX idx_maintenance_priority ON maintenance_requests(priority);
CREATE INDEX idx_maintenance_created_at ON maintenance_requests(created_at DESC);

-- Enable Row Level Security
ALTER TABLE maintenance_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for tenants
CREATE POLICY "Tenants can view their own maintenance requests"
  ON maintenance_requests
  FOR SELECT
  USING (auth.uid() = tenant_id);

CREATE POLICY "Tenants can create maintenance requests"
  ON maintenance_requests
  FOR INSERT
  WITH CHECK (auth.uid() = tenant_id);

CREATE POLICY "Tenants can update their own pending requests"
  ON maintenance_requests
  FOR UPDATE
  USING (auth.uid() = tenant_id AND status = 'pending')
  WITH CHECK (auth.uid() = tenant_id);

-- Create policies for property managers/admins
CREATE POLICY "Admins can view all maintenance requests"
  ON maintenance_requests
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_maintenance_requests_updated_at
  BEFORE UPDATE ON maintenance_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for maintenance images
INSERT INTO storage.buckets (id, name, public)
VALUES ('maintenance-images', 'maintenance-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Tenants can upload maintenance images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'maintenance-images' AND
    auth.uid() IS NOT NULL
  );

CREATE POLICY "Everyone can view maintenance images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'maintenance-images');

CREATE POLICY "Tenants can delete their own maintenance images"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'maintenance-images' AND
    auth.uid() = (storage.foldername(name))[1]::uuid
  );