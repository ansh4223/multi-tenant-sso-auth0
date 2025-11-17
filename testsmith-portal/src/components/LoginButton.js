import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      startIcon={<LoginIcon />}
      onClick={() => loginWithRedirect()}
      sx={{ mt: 2 }}
    >
      Log in through testSmith SSO
    </Button>
  );
};

export default LoginButton;
