import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

const SignUpField = ({
  handleSubmit,
  handleUsernameChange,
  handleNameChange,
  handlePasswordChange,
  handlePasswordConfirmChange,
  username,
  password,
  passwordConfirm,
  name,
  errorMessage,
  successMessage,
  loadingSend,
  show,
  onHide,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="my-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Sign up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Label>Username</Form.Label>
          <Form.Control
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your username..."
          />

          <Form.Label>Password</Form.Label>
          <Form.Control
            id="password"
            value={password}
            onChange={handlePasswordChange}
            type="password"
            placeholder="Enter your password..."
          />

          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            type="password"
            placeholder="Retype your password..."
          />

          <Form.Label>Name</Form.Label>
          <Form.Control
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name..."
          />
          {errorMessage && <p className="my-error-message">{errorMessage}</p>}
          {successMessage && <p className="my-success-message">{successMessage}</p>}
          <button className="my-button my-button-2" type="submit">
            Sign up
            {loadingSend && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                variant="light"
                className="my-spinner"
              />
            )}
          </button>
        </Form>

        {/* <div>
          <form onSubmit={handleSubmit}>
            <div>
              username
              <input
                id="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div>
              password
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit" id="login-button">
              Login
            </button>
          </form>
        </div> */}
      </Modal.Body>
    </Modal>
  );
};

export default SignUpField;
