import React, {useState} from 'react';
import {connect} from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-in.styles.scss';

import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions';


const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  
    const [userCredentials, setCredentials] = useState({email:'', password:''});
    const {email,password} = userCredentials;
    
    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStart(email, password);

    };

    const handleChange = (event) => {
        const {value, name} = event.target;
        setCredentials({...userCredentials, [name]: value});
    };

    
        return (
            <div className='sign-in'>
                <h2>l already have an Account</h2>
                <span>Sign in with Email and Password</span>

                <form onSubmit={handleSubmit}>
                    <FormInput type='email' value={email} handleChange={handleChange} name='email' label="email" required/>
                   

                    <FormInput type='password' value={password} handleChange={handleChange} label="password" name='password' required/>
                   
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign In </CustomButton>
                        <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn >Sign in With Google </CustomButton>
                    </div>
                </form>
            </div>
        )
    }


const mapDispatchToProps = dispatch =>  ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})
export default connect(null, mapDispatchToProps)(SignIn);