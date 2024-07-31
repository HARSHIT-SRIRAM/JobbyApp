import React, { Component } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

import "./index.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    errorMsg: "",
    showErrorMsg: false,
    navigateToHome: false,
  };

  onSuccessLogin = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    this.setState({ navigateToHome: true });
  };

  onFailureLogin = (errorMsg) => {
    this.setState({ errorMsg, showErrorMsg: true });
  };

  onSubmitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    const url =
      "https://cors-anywhere.herokuapp.com/https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        this.onSuccessLogin(data.jwt_token);
      } else {
        this.onFailureLogin(data.error_msg || "Invalid username or password");
      }
    } catch (error) {
      console.error("Fetch error: ", error);
      this.onFailureLogin("Something went wrong. Please try again later.");
    }
  };

  updateUsername = (event) => this.setState({ username: event.target.value });

  updatePassword = (event) => this.setState({ password: event.target.value });

  renderUsernameField = () => {
    const { username } = this.state;
    return (
      <div className="input-field-container">
        <label htmlFor="username" className="login-input-label">
          USERNAME
        </label>
        <input
          type="text"
          value={username}
          className="login-input-field"
          placeholder="harshad"
          id="username"
          onChange={this.updateUsername}
        />
      </div>
    );
  };

  renderPasswordField = () => {
    const { password } = this.state;
    return (
      <div className="input-field-container">
        <label htmlFor="password" className="login-input-label">
          PASSWORD
        </label>
        <input
          type="password"
          value={password}
          className="login-input-field"
          placeholder="joy@85"
          id="password"
          onChange={this.updatePassword}
        />
      </div>
    );
  };

  render() {
    const { navigateToHome, errorMsg, showErrorMsg } = this.state;

    if (Cookies.get("jwt_token") || navigateToHome) {
      return <Navigate to="/" />;
    }

    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo-login-form"
          />
          {this.renderUsernameField()}
          {this.renderPasswordField()}
          <div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
