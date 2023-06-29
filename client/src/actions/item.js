import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_ITEMS,
  ITEM_ERROR,
  DELETE_ITEM,
  ADD_ITEM,
  GET_ITEM,
  UPDATE_ITEM
} from './types';

// Get items
export const getItems = () => async (dispatch) => {
  try {
    const res = await api.get('/items');

    dispatch({
      type: GET_ITEMS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete item
export const deleteItem = (id) => async (dispatch) => {
  try {
    await api.delete(`/items/${id}`);

    dispatch({
      type: DELETE_ITEM,
      payload: id
    });

    dispatch(setAlert('Item Removed', 'success'));
  } catch (err) {
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add item
export const addItem = (formData) => async (dispatch) => {

  try {
    const res = await api.post('/items', formData);

    dispatch({
      type: ADD_ITEM,
      payload: res.data
    });

    dispatch(setAlert('Item Created', 'success'));
  } catch (err) {
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update item
export const updateItem = (id, formData) => async (dispatch) => {
  try {
    const res = await api.put(`/items/${id}`, formData);

    dispatch({
      type: UPDATE_ITEM,
      payload: res.data
    });

    dispatch(setAlert('Item Updated', 'success'));
  } catch (err) {
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};


// Get item
export const getItem = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/items/${id}`);

    dispatch({
      type: GET_ITEM,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ITEM_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};