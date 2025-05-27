import { theme } from 'antd';
import type { ThemeConfig } from 'antd';

export const lightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // Modern color palette
    colorPrimary: '#4F46E5', // Modern indigo
    colorSuccess: '#10B981',
    colorWarning: '#F59E0B',
    colorError: '#EF4444',
    colorInfo: '#3B82F6',
    
    // Typography
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontSize: 14,
    
    // Borders and radius
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 6,
    
    // Layout
    controlHeight: 40,
    lineWidth: 1,
    
    // Motion
    motionDurationMid: '0.2s',
    motionEaseInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    
    // Component tokens
    colorBgContainer: '#ffffff',
    colorBgElevated: '#ffffff',
    colorBgLayout: '#f8fafc',
    colorBorder: '#e5e7eb',
    colorBorderSecondary: '#f3f4f6',
    
    // Shadows
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    boxShadowSecondary: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  components: {
    Button: {
      controlHeight: 40,
      borderRadius: 8,
      paddingContentHorizontal: 20,
      defaultBg: '#ffffff',
      defaultBorderColor: '#e5e7eb',
      defaultShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      primaryShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    Card: {
      borderRadiusLG: 12,
      boxShadowTertiary: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      paddingLG: 24,
      paddingContentHorizontal: 24,
    },
    Table: {
      borderRadiusLG: 12,
      headerBg: '#f8fafc',
      headerColor: '#374151',
      rowHoverBg: '#f3f4f6',
      headerSortActiveBg: '#e5e7eb',
      bodySortBg: '#f9fafb',
    },
    Menu: {
      itemBorderRadius: 8,
      itemMarginInline: 8,
      itemHeight: 44,
      collapsedWidth: 80,
      itemPaddingInline: 16,
      horizontalItemSelectedBg: '#e0e7ff',
      horizontalItemSelectedColor: '#4F46E5',
    },
    Layout: {
      headerBg: '#ffffff',
      headerHeight: 64,
      headerPadding: '0 24px',
      siderBg: '#ffffff',
      bodyBg: '#f8fafc',
      footerBg: '#ffffff',
    },
    Input: {
      controlHeight: 40,
      borderRadius: 8,
      paddingContentHorizontal: 16,
      hoverBorderColor: '#4F46E5',
      activeShadow: '0 0 0 2px rgba(79, 70, 229, 0.1)',
    },
    Select: {
      controlHeight: 40,
      borderRadius: 8,
      optionSelectedBg: '#e0e7ff',
    },
    Progress: {
      remainingColor: '#f3f4f6',
      defaultColor: '#4F46E5',
      circleTextFontSize: '16px',
    },
    Statistic: {
      titleFontSize: 14,
      contentFontSize: 24,
    },
    Tag: {
      borderRadiusSM: 6,
      defaultBg: '#f3f4f6',
      defaultColor: '#374151',
    },
    Badge: {
      dotSize: 8,
      statusSize: 8,
    },
    Divider: {
      colorSplit: '#e5e7eb',
    },
  },
};

export const darkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    // Modern color palette for dark mode
    colorPrimary: '#6366F1', // Lighter indigo for dark mode
    colorSuccess: '#34D399',
    colorWarning: '#FBBF24',
    colorError: '#F87171',
    colorInfo: '#60A5FA',
    
    // Typography
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontSize: 14,
    
    // Borders and radius
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 6,
    
    // Layout
    controlHeight: 40,
    lineWidth: 1,
    
    // Motion
    motionDurationMid: '0.2s',
    motionEaseInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    
    // Component tokens for dark mode
    colorBgContainer: '#1f2937',
    colorBgElevated: '#374151',
    colorBgLayout: '#111827',
    colorBorder: '#374151',
    colorBorderSecondary: '#1f2937',
    
    // Shadows for dark mode
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    boxShadowSecondary: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
  },
  components: {
    Button: {
      controlHeight: 40,
      borderRadius: 8,
      paddingContentHorizontal: 20,
      primaryShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    },
    Card: {
      borderRadiusLG: 12,
      colorBgContainer: '#1f2937',
      boxShadowTertiary: '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
      paddingLG: 24,
      paddingContentHorizontal: 24,
    },
    Table: {
      borderRadiusLG: 12,
      headerBg: '#374151',
      rowHoverBg: '#374151',
      headerSortActiveBg: '#4b5563',
      bodySortBg: '#1f2937',
    },
    Menu: {
      itemBorderRadius: 8,
      itemMarginInline: 8,
      itemHeight: 44,
      collapsedWidth: 80,
      itemPaddingInline: 16,
      darkItemSelectedBg: '#4F46E5',
      darkItemBg: 'transparent',
    },
    Layout: {
      headerBg: '#1f2937',
      headerHeight: 64,
      headerPadding: '0 24px',
      siderBg: '#1f2937',
      bodyBg: '#111827',
      footerBg: '#1f2937',
    },
    Input: {
      controlHeight: 40,
      borderRadius: 8,
      paddingContentHorizontal: 16,
      hoverBorderColor: '#6366F1',
      activeShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)',
    },
    Select: {
      controlHeight: 40,
      borderRadius: 8,
      optionSelectedBg: '#4F46E5',
    },
    Progress: {
      remainingColor: '#374151',
      defaultColor: '#6366F1',
      circleTextFontSize: '16px',
    },
    Statistic: {
      titleFontSize: 14,
      contentFontSize: 24,
    },
    Tag: {
      borderRadiusSM: 6,
      defaultBg: '#374151',
      defaultColor: '#e5e7eb',
    },
    Badge: {
      dotSize: 8,
      statusSize: 8,
    },
    Divider: {
      colorSplit: '#374151',
    },
  },
};