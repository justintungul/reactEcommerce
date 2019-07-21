import React, { Component } from 'react';
import SigninForm from '../../components/presentation/forms/signin';

class Signin extends Component {
    render() {
        return (
            <div className="col-4 offset-4">
                <SigninForm />
            </div>
        )
    }
}

export default Signin;