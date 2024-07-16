import axios from 'axios';
import { GET_CONTACTS, EDIT_CONTACT, DELETE_CONTACT } from './actionTypes';
import generateUniqueId from 'generate-unique-id';

const API_URL = 'http://localhost:5000/contacts';

export const getContacts = (data) => {
  return {
    type: GET_CONTACTS,
    payload: data,
  };
};

export const editContact = (editData) => {
  return {
    type: EDIT_CONTACT,
    payload: editData,
  };
};

export const deleteContact = (deletedId) => {
  return {
    type: DELETE_CONTACT,
    payload: deletedId,
  };
};

export const addContactAsync = (data) => {
  return (dispatch) => {
    data.id = generateUniqueId({
      length: 3,
      useLetters: false,
    });
    axios
      .post(API_URL, data)
      .then(() => {
        dispatch(getContactsAsync());
      })
      .catch((err) => {
        console.log('error', err);
      });
  };
};

export const getContactsAsync = () => {
  return (dispatch) => {
    axios
      .get(API_URL)
      .then((res) => {
        dispatch(getContacts(res.data));
      })
      .catch((err) => {
        console.log('error', err);
      });
  };
};

export const editContactAsync = (editId, editData) => {
  return (dispatch) => {
    axios
      .patch(`${API_URL}/${editId}`, editData)
      .then((res) => {
        dispatch(editContact(res.data));
        dispatch(getContactsAsync());
      })
      .catch((err) => {
        console.log('error', err);
      });
  };
};

export const deleteContactAsync = (id) => {
  return (dispatch) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        dispatch(getContactsAsync());
      })
      .catch((err) => {
        console.log('error', err);
      });
  };
};
