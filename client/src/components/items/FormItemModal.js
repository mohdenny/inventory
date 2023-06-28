import React, { useState } from 'react';
import { Button, Modal, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItem } from '../../actions/item';

const FormItemModal = ({ addItem }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [buyingPrice, setBuyingPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [stock, setStock] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBuyingPriceChange = (e) => {
    setBuyingPrice(e.target.value);
  };

  const handleSellingPriceChange = (e) => {
    setSellingPrice(e.target.value);
  };

  const handleStockChange = (e) => {
    setStock(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addItem({ name, buyingPrice, sellingPrice, stock, photo });

    // Reset form fields
    setName('');
    setBuyingPrice('');
    setSellingPrice('');
    setStock('');
    setPhoto(null);

    handleClose();
  };

  return (
    <div>
      <Button 
        variant="contained"
        startIcon={<AddIcon />} 
        onClick={handleOpen}>
          Add Item
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '16px', outline: 'none' }}>
          <h2>Add Item</h2>
          <form onSubmit={handleSubmit}>
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
            <TextField
              label="Name"
              value={name}
              onChange={handleNameChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Buying Price"
              value={buyingPrice}
              onChange={handleBuyingPriceChange}
              type="number"
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Selling Price"
              value={sellingPrice}
              onChange={handleSellingPriceChange}
              type="number"
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Stock"
              value={stock}
              onChange={handleStockChange}
              type="number"
              required
              fullWidth
              margin="normal"
            />
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleClose} variant="outlined" style={{ marginRight: '8px' }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Create
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

FormItemModal.propTypes = {
  addItem: PropTypes.func.isRequired
};

export default connect(
  null,
  { addItem }
)(FormItemModal);