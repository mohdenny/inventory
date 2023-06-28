import { useState } from 'react';
import { Typography, Container, TextField, Button, Paper, IconButton, InputAdornment } from '@mui/material';
import AlertBox from '../layout/AlertBox';
import { Link, Navigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const RegisterForm = ({ setAlert, register, isAuthenticated }) => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleNamaChange = (event) => {
    setNama(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePassword2Change = (event) => {
    setPassword2(event.target.value);
  };

  const handleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'error');
    } else {
      register({ name: nama, email, password });
    }
    // Reset nilai input field setelah submit
    setNama('');
    setEmail('');
    setPassword('');
    setPassword2('');
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
          Sign Up
        </Typography>
        <AlertBox/>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nama"
            variant="outlined"
            value={nama}
            onChange={handleNamaChange}
            fullWidth
            sx={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            sx={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword1 ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            sx={{ marginBottom: '1rem' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword1}>
                    {showPassword1 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type={showPassword2 ? 'text' : 'password'}
            value={password2}
            onChange={handlePassword2Change}
            fullWidth
            sx={{ marginBottom: '1rem' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword2}>
                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" size="large" fullWidth>
            Register
          </Button>
          <p className="my-1" style={{ textAlign: 'center' }}>
            Already have an account? <Link to="/">Sign In</Link>
          </p>
        </form>
      </Paper>
    </Container>
  );
};

RegisterForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(RegisterForm);