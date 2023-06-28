import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import AlertBox from '../layout/AlertBox';
import {
  Container,
  Paper,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Button,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = ({ login, isAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Paper sx={{ padding: '2rem' }} elevation={3}>
        <Typography variant="h4" align="center" sx={{ marginBottom: '2rem' }}>
          NUTECH INVENTORY
        </Typography>
        <Typography variant="h5" align="center" sx={{ marginBottom: '2rem' }}>
          Sign In
        </Typography>
        <AlertBox/>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            sx={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ marginBottom: '1rem' }}
          />
          <Button type="submit" variant="contained" size="large" fullWidth>
            Login
          </Button>
          <p className="my-1" style={{ textAlign: 'center' }}>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </form>
      </Paper>
    </Container>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);