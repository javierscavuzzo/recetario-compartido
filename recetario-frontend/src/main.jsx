import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import RecipeForm from "./pages/RecipeForm.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/recipes/create" element={<RecipeForm />} />
        <Route path="/recipes/edit/:id" element={<RecipeForm />} />
        <Route path="/recipe-form" element={<RecipeForm />} />
        <Route path="/recipe-form/:id" element={<RecipeForm />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
