import React from 'react';
import './SignInStyle.css';
import logo from '../../../assets/shared/logo.png';


const SignIn =()=>{
    return(
        <div>
            <form autoComplete='off' className="formFields" >
                <div className="formField">
                     <div className='logoContainer'>
                        <img src={logo} className='logo'/>
                     </div>

                        
                    <div className='formInput'>
                             <h1 className='loginTitle'>Login</h1>
                            <input type='email' placeholder='Enter your email..'/>
                            <input type='password' placeholder='Enter your Password..'/>
                            <button>Login</button>    
                    </div> 
                    
                </div>
            </form>
        </div>
    );
}

export default SignIn;