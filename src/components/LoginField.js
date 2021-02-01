import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const LoginField = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  errorMessage,
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
        <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
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
          {errorMessage && <p className="my-error-message">{errorMessage}</p>}
          {/* <button className="my-button my-button-2" type="submit">
            Login
          </button> */}
          <button className="my-button my-button-2">
            Login
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

export default LoginField;
