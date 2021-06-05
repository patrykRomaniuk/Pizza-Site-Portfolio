import React,{ useState } from 'react';
import './logincss/login.css';
import { Redirect,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import { loginUser } from '../actions/auth';

const Login = ({ loginUser,auth: { isAuthenticated } }) => {
    if(isAuthenticated){
        return <Redirect to="/"/>
    }
    const [ userData,setUserData ] = useState({
        email: '',
        password: ''
    });
    const { email,password } = userData;
    const onChange = e => setUserData({ ...userData,[e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        loginUser({ email,password });
    }

    return (
        <div className="login-page-wrapper">
            <Navbar login="login"/>
        <main className="login-section">
            <header className="login-info">
                <h1>Login</h1>
            </header>
            <section className="login-inputs-wrapper">
                <form onSubmit={e => onSubmit(e)}>
                    <div>
                        <label>Email:</label>
                        <input
                        type="email"
                        name="email"
                        value={ email }
                        onChange={e => onChange(e)}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                        type="password"
                        name="password"
                        value={ password }
                        onChange={e => onChange(e)}
                        />
                    </div>
                    <button 
                    className="login-btn"
                    type="submit" 
                    onSubmit={e => onSubmit(e)}>
                        <span>Login</span>
                    </button>
                    <div className="btns-wrapper">
                        <div className="btns">
                        <Link to="/">Change Password</Link>
                        <Link to="/register">Register</Link>
                        </div>
                    </div>
                </form>
            </section>
        </main>
    </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { loginUser })(Login);
