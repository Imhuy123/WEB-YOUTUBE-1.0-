// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';

class LoginGoogle extends Component {
  state = {
    loading: true,
    error: null,
    data: {},
  };

  componentDidMount() {
    // Lấy tất cả các tham số từ URL callback từ Google
    const queryParams = new URLSearchParams(window.location.search);

    // Gửi yêu cầu lên server với các tham số này
    fetch(`/api/auth/google/callback?${queryParams.toString()}`, {
      headers: new Headers({ accept: 'application/json' }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong!');
      })
      .then((data) => {
        this.setState({ loading: false, data });
      })
      .catch((error) => {
        this.setState({ loading: false, error });
        console.error(error);
      });
  }

  render() {
    const { loading, error, data } = this.state;
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return (
        <div>
          <p>Error:</p>
          <code>{error.toString()}</code>
        </div>
      );
    }

    return (
      <div>
        <h2>Chào mừng {data.user.name}</h2>
        <p>Thông tin của bạn:</p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }
}

export default LoginGoogle;
