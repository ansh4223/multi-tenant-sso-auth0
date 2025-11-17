import React from 'react';
import { Container, Box, Typography, Paper, Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import BusinessIcon from '@mui/icons-material/Business';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const LoginPage = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return null;
  }

  const handleTestSmithLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        connection: 'testsmith-sso',
      },
    });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
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
            testEnterpriseMyApp
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            paragraph
            sx={{ mb: 4 }}
          >
            Enterprise Application Portal
          </Typography>

          <Typography variant="body1" color="text.secondary" paragraph>
            Welcome! Please authenticate through your organization's SSO to
            access the application.
          </Typography>

          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={handleTestSmithLogin}
            sx={{
              mt: 3,
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
              background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #764ba2 30%, #667eea 90%)',
              },
            }}
          >
            Log in through testSmith SSO to continue to testEnterpriseMyApp
            portal
          </Button>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', mt: 4 }}
          >
            Secured by Enterprise SSO Authentication
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
