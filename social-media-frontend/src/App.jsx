import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import './App.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [formType, setFormType] = useState('login');
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleAuth = async () => {
    const url = formType === 'register'
      ? 'http://localhost:5000/api/auth/register'
      : 'http://localhost:5000/api/auth/login';

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      alert('Logged in successfully');
    } else {
      alert(data.message || 'Auth failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  if (!token) {
    return (
      <div className="container">
        <h2>{formType === 'register' ? 'Register' : 'Login'}</h2>
        {formType === 'register' && (
          <input
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        )}
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button onClick={handleAuth}>
          {formType === 'register' ? 'Register' : 'Login'}
        </button>
        <small onClick={() => setFormType(formType === 'register' ? 'login' : 'register')}>
          {formType === 'register' ? 'Already have an account? Login' : 'New user? Register'}
        </small>
      </div>
    );
  }

  return (
    <Router>
      <div className="container">
        <nav style={{ marginBottom: 20 }}>
          <Link to="/create">Create</Link> | <Link to="/posts">Posts</Link> | <button onClick={handleLogout}>Logout</button>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/create" />} />
          <Route path="/create" element={<CreatePost token={token} />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </div>
    </Router>
  );
};

const CreatePost = ({ token }) => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', image);

    const res = await fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <>
      <h2>Create a Post</h2>
      <input
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </>
  );
};

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('http://localhost:5000/api/posts');
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Uploaded Posts</h2>
      <div className="posts-container">
        {posts.map((post, idx) => (
          <div key={idx} style={{ marginBottom: 10 }}>
            <p>{post.caption}</p>
            <img
              src={post.imageUrl}
              alt="post"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
