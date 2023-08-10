import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useState } from 'react';
import { useContext } from 'react';
import { ApiContext } from '../../context/ApiProvider';

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const { login } = useContext(ApiContext);
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setLoginData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const res = await login(loginData);
    if (res) {
      navigate('/');
    }
  };

  return (
    <div id="login-page">
      <div className="login-form">
        <form className="login-form-content" onSubmit={handleSubmitForm}>
          <h1>Login to your account</h1>
          <input
            type="text"
            placeholder="Username"
            value={loginData.username}
            name="username"
            onChange={handleChangeInput}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            name="password"
            onChange={handleChangeInput}
          />
          <button>Sign in</button>
        </form>
        <div className="register-panel">
          <h1>New Here ?</h1>
          <Link to="/register">
            <button>Sign up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
