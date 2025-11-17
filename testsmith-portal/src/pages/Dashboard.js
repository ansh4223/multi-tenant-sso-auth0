import React, { useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Avatar,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const Dashboard = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const handleReturn = async () => {
      const returnToApp = sessionStorage.getItem('returnToApp');
      if (returnToApp && isAuthenticated) {
        // Get token to pass back
        try {
          const token = await getAccessTokenSilently();
          sessionStorage.removeItem('returnToApp');
          // Redirect back to the calling app with token
          window.location.href = `${returnToApp}?token=${token}`;
        } catch (error) {
          console.error('Error getting token:', error);
        }
      }
    };

    handleReturn();
  }, [isAuthenticated, getAccessTokenSilently]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static">
        <Toolbar>
          <BusinessIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            testSmith Enterprise Portal
          </Typography>
          <LogoutButton />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              mb: 3,
            }}
          >
            <Avatar
              src={user.picture}
              alt={user.name}
              sx={{ width: 80, height: 80 }}
            />
            <Box>
              <Typography variant="h4" gutterBottom>
                Welcome, {user.name}!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                You have successfully authenticated via Azure AD SSO
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Your Profile Information
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <PersonIcon color="primary" sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Full Name
                    </Typography>
                    <Typography variant="h6">{user.name}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <EmailIcon color="primary" sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Email Address
                    </Typography>
                    <Typography variant="h6">{user.email}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <VerifiedUserIcon color="success" sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Email Verified
                    </Typography>
                    <Typography variant="h6">
                      {user.email_verified ? 'Yes' : 'No'}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <BusinessIcon color="primary" sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Organization
                    </Typography>
                    <Typography variant="h6">testSmith Enterprise</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper sx={{ p: 3, mt: 4, bgcolor: '#e3f2fd' }}>
          <Typography variant="h6" gutterBottom>
            🎉 SSO Authentication Successful
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You are now logged in to the testSmith Enterprise Portal using Azure
            AD Single Sign-On. Your session is secure and managed by your
            organization's identity provider.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Dashboard;
