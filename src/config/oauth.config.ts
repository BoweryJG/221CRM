// OAuth Configuration for Social Login
// In production, these would be environment variables

export const oauthConfig = {
  google: {
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || 'demo-google-client-id',
    redirectUri: process.env.REACT_APP_GOOGLE_REDIRECT_URI || window.location.origin + '/auth/callback/google',
    scope: 'openid profile email',
    authEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  },
  facebook: {
    appId: process.env.REACT_APP_FACEBOOK_APP_ID || 'demo-facebook-app-id',
    redirectUri: process.env.REACT_APP_FACEBOOK_REDIRECT_URI || window.location.origin + '/auth/callback/facebook',
    scope: 'public_profile,email',
    authEndpoint: 'https://www.facebook.com/v12.0/dialog/oauth',
  },
};

// Helper function to generate OAuth URL
export const getOAuthUrl = (provider: 'google' | 'facebook') => {
  if (provider === 'google') {
    const config = oauthConfig.google;
    const params = new URLSearchParams({
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      response_type: 'code',
      scope: config.scope,
      access_type: 'offline',
      prompt: 'consent',
    });
    return `${config.authEndpoint}?${params.toString()}`;
  }
  
  if (provider === 'facebook') {
    const config = oauthConfig.facebook;
    const params = new URLSearchParams({
      client_id: config.appId,
      redirect_uri: config.redirectUri,
      response_type: 'code',
      scope: config.scope,
    });
    return `${config.authEndpoint}?${params.toString()}`;
  }
  
  return '';
};