/**
 * Application configuration settings
 * Centralizes environment variables and configuration settings
 */

// Environment determination
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

// API URLs
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

// Application settings
const APP_NAME = '221CRM';
const APP_VERSION = '1.0.0';
const COPYRIGHT_YEAR = new Date().getFullYear();
const COMPANY_NAME = 'Milestone Equities';

// Default pagination settings
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_OPTIONS = [10, 20, 50, 100];

// Date format settings
const DATE_FORMAT = 'MM/dd/yyyy';
const DATE_TIME_FORMAT = 'MM/dd/yyyy hh:mm a';

// Theme settings
const PRIMARY_COLOR = '#2E5F85';
const SECONDARY_COLOR = '#F5F5F5';

// Feature flags
const FEATURES = {
  MAINTENANCE_MODULE: true,
  FINANCIAL_MODULE: true,
  DOCUMENT_MANAGEMENT: true,
  TENANT_PORTAL: false, // Coming soon
  ANALYTICS_DASHBOARD: true,
  PAYMENT_PROCESSING: false, // Coming soon
};

// Error messages
const ERROR_MESSAGES = {
  GENERIC: 'An error occurred. Please try again.',
  AUTHENTICATION: 'Authentication failed. Please check your credentials.',
  AUTHORIZATION: 'You do not have permission to perform this action.',
  NETWORK: 'Network error. Please check your connection.',
  VALIDATION: 'Please check the form for errors.',
  NOT_FOUND: 'The requested resource was not found.',
};

// Export configuration
export default {
  isProduction,
  isDevelopment,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  APP_NAME,
  APP_VERSION,
  COPYRIGHT_YEAR,
  COMPANY_NAME,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_OPTIONS,
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  FEATURES,
  ERROR_MESSAGES,
};
