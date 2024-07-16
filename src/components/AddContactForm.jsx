import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addContactAsync } from '../redux/actions/contactActions';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';

const AddContactForm = () => {
  const [input, setInput] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    avatar: null
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'avatar') {
      setInput({ ...input, avatar: e.target.files[0] });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.name && input.email && input.phone) {
      let avatarUrl = '';
      if (input.avatar) {
        const avatarRef = ref(storage, `avatars/${input.avatar.name}`);
        await uploadBytes(avatarRef, input.avatar);
        avatarUrl = await getDownloadURL(avatarRef);
      }
      dispatch(addContactAsync({ ...input, avatar: avatarUrl }));
      navigate('/');
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <Container>
      <h2 className="my-4">Add New Contact</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Avatar</Form.Label>
          <Form.Control type="file" name="avatar" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={input.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={input.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" name="phone" value={input.phone} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" name="address" value={input.address} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control as="textarea" rows={3} name="notes" value={input.notes} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default AddContactForm;
