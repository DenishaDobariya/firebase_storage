import { GET_CONTACTS, EDIT_CONTACT, DELETE_CONTACT } from '../actions/actionTypes';

const initialState = {
  contacts: [],
  contact: null,
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    case EDIT_CONTACT:
      const updatedContacts = state.contacts.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
      return {
        ...state,
        contacts: updatedContacts,
        contact: action.payload,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== action.payload),
      };
    default:
      return state;
  }
};

export default contactReducer;
