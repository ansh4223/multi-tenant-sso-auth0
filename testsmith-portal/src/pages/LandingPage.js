import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../components/LoginButton';
import BusinessIcon from '@mui/icons-material/Business';

const LandingPage = () => {
  const { isAuthenticated } = useAuth0();
  const [returnUrl, setReturnUrl] = useState(null);

  useEffect(() => {
    // Check if redirected from test-enterprise-my-app
    const params = new URLSearchParams(window.location.search);
    const returnTo = params.get('returnTo');
    if (returnTo) {
      setReturnUrl(returnTo);
      // Store in sessionStorage for after login
      sessionStorage.setItem('returnToApp', returnTo);
    }
  }, []);

  if (isAuthenticated) {
    return null; // Will be redirected to dashboard
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            p: 6,
            borderRadius: 4,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <BusinessIcon sx={{ fontSize: 80, color: 'primary.main' }} />
          </Box>
          
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            testSmith
          </Typography>
          
          <Typography
            variant="h6"
            color="text.secondary"
            paragraph
            sx={{ mb: 4 }}
          >
            Enterprise Portal
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            {returnUrl 
              ? 'Please sign in with your testSmith credentials to continue to the application.'
              : 'Welcome to testSmith Enterprise Portal. Please sign in with your organization credentials to continue.'
            }
          </Typography>
          
          <LoginButton />
          
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', mt: 4 }}
          >
            Secured by Azure AD SSO
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default LandingPage;
