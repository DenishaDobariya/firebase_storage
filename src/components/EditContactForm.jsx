import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editContactAsync } from '../redux/actions/contactActions';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';

const EditContactForm = () => {
  const { id } = useParams();
  const { contacts } = useSelector(state => state.contactReducer);
  const [edit, setEdit] = useState({});
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const contact = contacts.find(contact => contact.id === id);
    if (contact) {
      setEdit(contact);
    } else {
      navigate('/');
    }
  }, [id, contacts, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'avatar') {
      setAvatar(e.target.files[0]);
    } else {
      setEdit({ ...edit, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let avatarUrl = edit.avatar;
    if (avatar) {
      const avatarRef = ref(storage, `avatars/${avatar.name}`);
      await uploadBytes(avatarRef, avatar);
      avatarUrl = await getDownloadURL(avatarRef);
    }
    dispatch(editContactAsync(id, { ...edit, avatar: avatarUrl }));
    navigate('/');
  };

  return (
    <Container>
      <h2 className="my-4">Edit Contact Details</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Avatar</Form.Label>
          <Form.Control type="file" name="avatar" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={edit.name || ''} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={edit.email || ''} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" name="phone" value={edit.phone || ''} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" name="address" value={edit.address || ''} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control as="textarea" rows={3} name="notes" value={edit.notes || ''} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default EditContactForm;
