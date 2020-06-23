import React, { Component } from "react";
import axios from "axios";

export default class AuthenticatedComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
    };
  }

  // when component loads, retrieve the saved token, which is only saved if the login was successful
  // & the server sends back a valid token
  componentDidMount() {
    let jwt = localStorage.getItem("authorization");
    // if not logged in valid, push to login
    if (!jwt) {
      this.props.history.push("/login");
    }

    // if user is logged in, access the auth route from the server, which simply allows us to get some data if valid JWT
    axios
      .get("api/posts", { headers: { Authorization:`${jwt}` } })
      .then((res) =>
        this.setState({
          user: res.data,
        })
      )
      .catch((err) => this.props.history.push("/login"));
  }

  render() {
    return (
      <div>
        <h1>Hello World - Authenticated Component</h1>
      </div>
    );
  }
}
