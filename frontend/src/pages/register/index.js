import React from 'react';
import { connect } from 'react-redux';
import RegisterForm from '../../components/presentation/forms/register';

const Register = ({dispatch}) => {
    const handleSubmit = (user) => {
        dispatch({
            type: 'GET_USER',
            user
        })
    };
    return (
        <div className="col-6 offset-3">
            <RegisterForm onSubmit={handleSubmit}/>
        </div>
    )
}

export default connect()(Register);
