import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(
      sessionActions.login({ credential, password })
    )
      .then(() => closeModal())
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoUserLogin = (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password" })
    )
      .then(() => closeModal())
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const isSubmitDisabled = credential.length < 4 || password.length < 6;

  return (
    <div className="login-modal-container">
      <h1 className="login-modal-title">Log In</h1>

      <form className="login-form" onSubmit={handleFormSubmit}>
        <div className="form-field-container">
          <label className="form-label">
            Username
            <input
              className="form-input"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="form-field-container">
          <label className="form-label">
            Password
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>

        {errors.credential && (
          <p className="form-error-message">{errors.credential}</p>
        )}

        <div className="form-buttons-container">
          <button
            type="submit"
            className="login-submit-button"
            disabled={isSubmitDisabled}
          >
            Log In
          </button>

          <button
            type="button"
            className="demo-user-button"
            onClick={handleDemoUserLogin}
          >
            Demo User
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
