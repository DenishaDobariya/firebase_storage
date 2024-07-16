import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import AddContactForm from './components/AddContactForm';
import EditContactForm from './components/EditContactForm';
import ViewContactList from './components/ViewContactList';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ViewContactList />} />
        <Route path="/add" element={<AddContactForm />} />
        <Route path="/edit/:id" element={<EditContactForm />} />
      </Routes>
    </Router>
  );
};

export default App;
