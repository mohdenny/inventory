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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('name', name);
    formData.append('buyingPrice', buyingPrice);
    formData.append('sellingPrice', sellingPrice);
    formData.append('stock', stock);

    addItem(formData);
        
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
        onClick={handleOpen}
        size="large"
      >
        <AddIcon />
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '16px', outline: 'none' }}>
          <h2>Add Item</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
            <TextField
              label="Name"
              value={name}
              onChange={(e => setName(e.target.value))}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Buying Price"
              value={buyingPrice}
              onChange={(e => setBuyingPrice(e.target.value))}
              type="number"
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Selling Price"
              value={sellingPrice}
              onChange={(e => setSellingPrice(e.target.value))}
              type="number"
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Stock"
              value={stock}
              onChange={(e => setStock(e.target.value))}
              type="number"
              required
              fullWidth
              margin="normal"
            />
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleClose} variant="outlined" size="large" style={{ marginRight: '8px' }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" size="large" color="primary">
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
