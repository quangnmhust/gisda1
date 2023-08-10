import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css';

const Register = () => {
  const [regData, setRegData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChangeInput = (e) => {
    setRegData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/v1/auth/register', regData);
      if (response) {
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div id="login-page">
      <div className="login-form">
        <div className="login-panel">
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button>Sign in</button>
          </Link>
        </div>
        <form className="register-form-content" onSubmit={handleSubmitForm}>
          <h1>Create account</h1>
          <input
            type="text"
            placeholder="Username"
            value={regData.username}
            name="username"
            onChange={handleChangeInput}
          />
          <input type="text" placeholder="Email" value={regData.email} name="email" onChange={handleChangeInput} />
          <input
            type="password"
            placeholder="Password"
            value={regData.password}
            name="password"
            onChange={handleChangeInput}
          />
          {error && <div className={styles.error_msg}>{error}</div>}
          <button>Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
