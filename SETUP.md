# 221CRM Setup Guide

## Overview
221CRM is a mobile-optimized property management system with a fully functional maintenance request system that integrates with Supabase.

## Features
- ✅ **Mobile-Optimized UI**: Responsive design that works seamlessly on all devices
- ✅ **Maintenance Management**: Tenants can submit live maintenance requests
- ✅ **Real-time Updates**: Live updates for maintenance request status changes
- ✅ **Supabase Integration**: Can connect to your existing Sphere OS Supabase instance
- ✅ **Multi-tenant Support**: Secure tenant isolation with Row Level Security

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:

```env
# Option 1: Use your existing Sphere OS Supabase instance
REACT_APP_SUPABASE_URL=your-sphere-os-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-sphere-os-supabase-anon-key

# Option 2: Create separate instances for different services
REACT_APP_SUPABASE_URL=your-221crm-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-221crm-supabase-anon-key
REACT_APP_SPHERE_OS_SUPABASE_URL=your-sphere-os-supabase-url
REACT_APP_SPHERE_OS_SUPABASE_ANON_KEY=your-sphere-os-supabase-anon-key
```

### 3. Set Up Database Tables
Run the SQL scripts in your Supabase project:

1. Run the main schema: `supabase/schema.sql`
2. Run the maintenance schema: `supabase/maintenance_schema.sql`

### 4. Start the Development Server
```bash
npm start
```

## Mobile Features

### Responsive Design
- Collapsible sidebar on desktop, drawer navigation on mobile
- Touch-optimized buttons and forms
- Mobile-specific layouts for tables and lists
- Full-screen modals on mobile devices

### Maintenance Request System
- **Submit Requests**: Tenants can submit maintenance requests with:
  - Property and unit selection
  - Issue categorization (Plumbing, Electrical, HVAC, etc.)
  - Priority levels (Low, Medium, High, Urgent)
  - Detailed descriptions
  - Photo uploads
  
- **Track Requests**: View all maintenance requests with:
  - Status tracking (Pending, In Progress, Completed)
  - Request history
  - Mobile-optimized list view
  - Detailed request view in drawer

## API Integration

The maintenance system connects to your Supabase backend with:
- Real-time updates using Supabase subscriptions
- Secure Row Level Security policies
- Image upload support
- Automatic timestamp management

## Customization

### Update Menu Labels
All menu items and buttons use clear, contextual labels:
- Dashboard → Overview of properties and stats
- Properties → Manage your properties
- Tenants → View and manage tenants
- Maintenance → Submit and track maintenance requests
- Financial → Track income and expenses
- Documents → Store and manage documents
- Settings → Configure your account

### Connect to Your Backend
The system is configured to connect to your Sphere OS Supabase instance. Simply add your credentials to the `.env` file.

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy to your preferred hosting service (Netlify, Vercel, etc.)

3. Set environment variables in your hosting platform

## Security Notes

- All maintenance requests are secured with Row Level Security
- Tenants can only view and edit their own requests
- Admin users have full access to all requests
- Images are stored securely in Supabase Storage

## Support

For issues or questions:
- Check the console for error messages
- Verify your Supabase credentials
- Ensure all required tables are created
- Check network connectivity to Supabase