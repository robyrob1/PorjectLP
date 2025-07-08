// SignupFormModal.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!email) e.email = "Email is required";
    if (username.length < 4) e.username = "Username must be at least 4 characters";
    if (!firstName) e.firstName = "First name is required";
    if (!lastName) e.lastName = "Last name is required";
    if (password.length < 6) e.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) e.confirmPassword = "Passwords must match";
    return e;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const valErrs = validate();
    if (Object.keys(valErrs).length) return setErrors(valErrs);

    try {
      await dispatch(sessionActions.signup({
        email,
        username,
        firstName,
        lastName,
        password
      }));
      closeModal();
    } catch (res) {
      const data = await res.json();
      if (data?.errors) setErrors(data.errors);
    }
  };

  const isDisabled = !!Object.keys(validate()).length;

  return (
    <div className="signup-modal-container">
      <h1 className="signup-modal-title">Sign Up</h1>

      <form className="signup-form" onSubmit={handleSubmit}>
        {/* EMAIL */}
        <label className="form-label">
          Email
          <input
            className="form-input"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        {errors.email && <p className="form-error-message">{errors.email}</p>}

        {/* USERNAME */}
        <label className="form-label">
          Username
          <input
            className="form-input"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </label>
        {errors.username && <p className="form-error-message">{errors.username}</p>}

        {/* FIRST / LAST */}
        <label className="form-label">
          First Name
          <input
            className="form-input"
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </label>
        {errors.firstName && <p className="form-error-message">{errors.firstName}</p>}

        <label className="form-label">
          Last Name
          <input
            className="form-input"
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </label>
        {errors.lastName && <p className="form-error-message">{errors.lastName}</p>}

        {/* PASSWORDS */}
        <label className="form-label">
          Password
          <input
            className="form-input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        {errors.password && <p className="form-error-message">{errors.password}</p>}

        <label className="form-label">
          Confirm Password
          <input
            className="form-input"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </label>
        {errors.confirmPassword && (
          <p className="form-error-message">{errors.confirmPassword}</p>
        )}

        <button
          type="submit"
          className="signup-submit-button"
          disabled={isDisabled}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
