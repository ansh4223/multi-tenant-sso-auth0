import React from 'react';
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
  Chip,
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../components/LogoutButton';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SecurityIcon from '@mui/icons-material/Security';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #1e3c72 30%, #2a5298 90%)' }}>
        <Toolbar>
          <BusinessIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            testEnterpriseMyApp Portal
          </Typography>
          <Chip
            icon={<SecurityIcon />}
            label="SSO Authenticated"
            color="success"
            sx={{ mr: 2 }}
          />
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
                You have successfully authenticated via testSmith Enterprise SSO
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
                  <SecurityIcon color="primary" sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Authentication Method
                    </Typography>
                    <Typography variant="h6">testSmith SSO</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper
          sx={{
            p: 3,
            mt: 4,
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
          }}
        >
          <Typography variant="h6" gutterBottom>
            🎉 Multi-Tenant SSO Authentication Successful
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You have successfully logged in to testEnterpriseMyApp using
            testSmith's enterprise Single Sign-On. Your identity was verified
            through testSmith's identity provider, demonstrating a complete
            multi-tenant SSO flow.
          </Typography>
        </Paper>

        <Paper sx={{ p: 3, mt: 3, bgcolor: '#fff3e0' }}>
          <Typography variant="h6" gutterBottom color="primary">
            📋 SSO Flow Summary
          </Typography>
          <Typography variant="body2" component="div">
            <ol>
              <li>You clicked "Log in through testSmith SSO" on testEnterpriseMyApp</li>
              <li>Redirected to Auth0 with enterprise connection parameter</li>
              <li>Auth0 recognized testSmith as the identity provider</li>
              <li>Authenticated through testSmith's Azure AD SSO</li>
              <li>Redirected back to testEnterpriseMyApp with valid token</li>
              <li>Now you're viewing your dashboard with your profile info!</li>
            </ol>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Dashboard;
