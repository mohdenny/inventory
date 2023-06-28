import React from 'react';
import { connect } from 'react-redux';
import { Box, Alert } from '@mui/material';
import PropTypes from 'prop-types';

const AlertBox = ({ alerts }) => (
  <Box sx={{ marginBottom: '20px' }}>
    {alerts.map((alert) => (
      <Alert key={alert.id} severity={alert.alertType}>
        {alert.msg}
      </Alert>
    ))}
  </Box>
);

AlertBox.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      alertType: PropTypes.string.isRequired,
      msg: PropTypes.string.isRequired
    })
  ).isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(AlertBox);
