import React,{ useState } from 'react';
import { Redirect } from 'react-router-dom';
import { registerUser } from '../actions/auth';
import Navbar from './Navbar';
import { connect } from 'react-redux';
import './registercss/register.css';

const Register = ({ registerUser,auth: { isAuthenticated } }) => {
    if(isAuthenticated){
        return <Redirect to="/"/>
    }
    const [ userData,setUserData ] = useState({
        name: '',
        email: '',
        password: '',
        secondPassword: ''
    });
    const { name,email,password,secondPassword } = userData;
    
    const onSubmit = e => {
        e.preventDefault();
        if(password !== secondPassword){
            return alert(`Passwords don't match`)
        } else {
            registerUser(name,email,password);
        }
    }
    
    const onChange = e => setUserData({ ...userData,[e.target.name]: e.target.value });
    
    return (
        <div className="sign-in-page-all-wrapper">
        <Navbar register="register"/>
            <section className="main-section-sign-in">
                    <div className="info">
                        <span>Sign In</span>
                    </div>
                    <form onSubmit={e => onSubmit(e)}>
                    <div className="inputs-wrapper">
                                <input type="text" 
                                value={name}
                                name="name"
                                placeholder="Name" 
                                onChange={ e => {
                                    onChange(e)
                                }}
                                />
                                <input type="email" 
                                value={email}
                                name="email"
                                placeholder="E-mail"
                                onChange={(e) =>  {
                                    onChange(e)
                                }}
                                />
                                <input type="password" 
                                value={password}
                                name="password"
                                placeholder="Password"
                                onChange={(e) => {
                                    onChange(e)
                                }}
                                />
                                <input type="password" 
                                value={secondPassword}
                                name="secondPassword"
                                placeholder="Type Again Password"
                                onChange={(e) => {
                                    onChange(e)
                                }}
                                />
                            <div className="button-wrapper" 
                            onClick={(e) => {
                                onSubmit(e)
                            }}>
                                <div>
                                    <span>Sign Up</span>
                                </div>
                            </div>
                    </div>
                    </form>
            </section>
    </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { registerUser })(Register);
