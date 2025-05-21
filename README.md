# 221CRM - Bowery Real Estate Management System

An iconic, best-in-class tenant CRM and real estate management system developed for 221 Bowery and other properties in the Milestone Equities portfolio.

## Features

- **Property Management**: Track all properties in the portfolio with details on units, amenities, and maintenance history
- **Tenant Management**: Comprehensive tenant profiles with lease agreements, payment history, and communication logs
- **Financial Dashboard**: Real-time analytics for rent collection, expenses, and revenue forecasting
- **Maintenance Requests**: Streamlined system for handling tenant maintenance requests
- **Document Management**: Secure storage for contracts, lease agreements, and important property documentation
- **Analytics & Reporting**: Advanced insights into occupancy rates, tenant turnover, and financial performance

## Tech Stack

- **Frontend**: React with TypeScript, Ant Design UI framework
- **State Management**: Zustand for lightweight state management
- **Backend**: Supabase for authentication, database, and storage
- **Deployment**: Frontend on Netlify, Backend on Render

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Configure environment variables
4. Run the development server with `npm start`

## Project Structure

```
src/
  ├── components/       # Reusable UI components
  ├── pages/            # Application pages
  ├── services/         # API and external service integrations
  ├── hooks/            # Custom React hooks
  ├── utils/            # Utility functions
  ├── assets/           # Static assets (images, icons)
  ├── contexts/         # React context providers
  └── types/            # TypeScript interfaces and types
```

## Deployment

The application is configured for easy deployment:
- Frontend: Netlify
- Backend: Supabase hosted on Render
