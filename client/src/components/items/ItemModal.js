import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, CardMedia, IconButton, Box, TextField, Button } from '@mui/material';
import { Edit, Delete, Cancel, Update } from '@mui/icons-material';
import { updateItem, deleteItem } from '../../actions/item';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ItemModal = ({ isOpen, onClose, item, updateItem, deleteItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(item.name);
  const [buyingPrice, setBuyingPrice] = useState(item.buyingPrice);
  const [sellingPrice, setSellingPrice] = useState(item.sellingPrice);
  const [stock, setStock] = useState(item.stock);
  const [photo, setPhoto] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setName(item.name);
    setBuyingPrice(item.buyingPrice);
    setSellingPrice(item.sellingPrice);
    setStock(item.stock);
    setPhoto(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleUpdate = (id) => {
    const formData = new FormData();

    if (photo !== null) {
      formData.append('photo', photo);
    }

    formData.append('name', name);
    formData.append('buyingPrice', buyingPrice);
    formData.append('sellingPrice', sellingPrice);
    formData.append('stock', stock);

    updateItem(id, formData);
    setIsEditing(false);
    onClose(); // Close the modal
  };

  const handleDelete = () => {
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = () => {
    deleteItem(item._id);
    setDeleteConfirmationOpen(false)
    onClose(); // Close the modal
  };

  const cancelDelete = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    onClose(); // Close the modal
  };

  return (
    <Dialog open={isOpen} onClose={handleCloseModal}>
      <DialogTitle sx={{ fontWeight: 'bold', fontSize: '24px' }}>{isEditing ? 'Edit Item' : item.name}</DialogTitle>
      <DialogContent>
        {isEditing ? (
          <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
        ) : (
          <CardMedia component="img" height="300" image={`http://localhost:5000/${item.path}`} alt={item.name} />
        )}
        <Typography variant="body1">
          Harga beli:{' '}
          {isEditing ? (
            <TextField value={buyingPrice} onChange={(e) => setBuyingPrice(e.target.value)} fullWidth />
          ) : (
            `Rp. ${item.buyingPrice}`
          )}
        </Typography>
        <Typography variant="body1">
          Harga jual:{' '}
          {isEditing ? (
            <TextField value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} fullWidth />
          ) : (
            `Rp. ${item.sellingPrice}`
          )}
        </Typography>
        <Typography variant="body1">
          Jumlah stock:{' '}
          {isEditing ? (
            <TextField value={stock} onChange={(e) => setStock(e.target.value)} fullWidth />
          ) : (
            item.stock
          )}
        </Typography>
      </DialogContent>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px', marginRight: '16px' }}>
        {isEditing ? (
          <>
            <IconButton onClick={() => handleUpdate(item._id)} color="primary" aria-label="Update">
              <Update />
            </IconButton>
            <IconButton onClick={handleCancel} color="secondary" aria-label="Cancel">
              <Cancel />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={handleEdit} color="primary" aria-label="Edit">
              <Edit />
            </IconButton>
            <IconButton onClick={handleDelete} color="secondary" aria-label="Delete">
              <Delete />
            </IconButton>
          </>
        )}
      </Box>

      <Dialog open={deleteConfirmationOpen} onClose={cancelDelete}>
        <DialogTitle>Delete Item</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete this item?</Typography>
        </DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px', marginRight: '16px' }}>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </Box>
      </Dialog>
    </Dialog>
  );
};

ItemModal.propTypes = {
  updateItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default connect(null, { updateItem, deleteItem })(ItemModal);
