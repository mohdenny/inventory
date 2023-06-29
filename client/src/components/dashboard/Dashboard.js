import { Grid, Paper, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItems } from '../../actions/item';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';

const Dashboard = ({ getItems, item: { items } }) => {

  useEffect(() => {
    getItems();
  }, [getItems]);

  // Mengambil item dengan stok terbanyak
  const getMaxStockItem = () => {
    let maxStock = 0;
    let maxStockItem = null;
    items.forEach((item) => {
      if (item.stock > maxStock) {
        maxStock = item.stock;
        maxStockItem = item;
      }
    });
    return maxStockItem;
  };

  // Data untuk Pie Chart
  const pieChartData = items.map((item) => ({
    name: item.name,
    value: item.stock,
  }));

  const maxStockItem = getMaxStockItem();

  return (
    <Grid container>
      {/* Chart */}
      <Grid item xs={12}> {/* Set xs={12} to make the card full width */}
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            padding: '16px', // Add padding for spacing
            boxSizing: 'border-box', // Include padding and border in the element's total width and height
          }}
        >
          <Typography variant="h6" gutterBottom>
            Stock Items
          </Typography>
          {items.length === 0 ? (
            <Typography variant="body1">No items</Typography>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <PieChart width={400} height={400}>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`#${(index + 2) * 333}`} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </div>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

Dashboard.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { getItems })(Dashboard);
