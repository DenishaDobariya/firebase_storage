import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Button } from 'react-bootstrap';
import { getContactsAsync, deleteContactAsync } from '../redux/actions/contactActions';
import { useNavigate } from 'react-router-dom';

const ViewContactList = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector(state => state.contactReducer);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteContactAsync(id));
  };

  useEffect(() => {
    dispatch(getContactsAsync());
  }, [dispatch]);

  return (
    <Container>
      <h2 className="my-4">Contacts List</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td><img src={contact.avatar} alt="avatar" width="50" /></td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.address}</td>
              <td>{contact.notes}</td>
              <td>
                <Button variant="outline-primary" onClick={() => handleEdit(contact.id)}>Edit</Button>{' '}
                <Button variant="outline-danger" onClick={() => handleDelete(contact.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ViewContactList;
