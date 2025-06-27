import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatchFunction = useDispatch();
  const { closeModalFunction } = useModal();

  const [userCredential, setUserCredential] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setFormErrors({});
    
    return dispatchFunction(
      sessionActions.login({ 
        credential: userCredential, 
        password: userPassword 
      })
    )
    .then(closeModalFunction)
    .catch(async (response) => {
      const errorData = await response.json();
      if (errorData && errorData.errors) {
        setFormErrors(errorData.errors);
      }
    });
  };

  const handleDemoUserLogin = (event) => {
    event.preventDefault();
    setFormErrors({});
    
    return dispatchFunction(
      sessionActions.login({ 
        credential: "Demo-lition", 
        password: "password" 
      })
    )
    .then(closeModalFunction)
    .catch(async (response) => {
      const errorData = await response.json();
      if (errorData && errorData.errors) {
        setFormErrors(errorData.errors);
      }
    });
  };

  const isSubmitDisabled = userCredential.length < 4 || userPassword.length < 6;

  return (
    <div className="login-modal-container">
      <h1 className="login-modal-title">Log In</h1>
      
      <form className="login-form" onSubmit={handleFormSubmit}>
        <div className="form-field-container">
          <label className="form-label">
            Email
            <input
              className="form-input"
              type="text"
              value={userCredential}
              onChange={(event) => setUserCredential(event.target.value)}
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
              value={userPassword}
              onChange={(event) => setUserPassword(event.target.value)}
              required
            />
          </label>
        </div>

        {formErrors.credential && (
          <p className="form-error-message">
            {formErrors.credential}
          </p>
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