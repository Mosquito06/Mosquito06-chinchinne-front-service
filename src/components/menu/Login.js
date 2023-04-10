import React, { useRef, useState, useContext } from 'react';
import LoginApi from 'api/LoginApi';
import { useNavigate } from 'react-router-dom'; 
import { GlobalContext } from 'context/GlobalContext';
import { MDBInput, MDBSpinner, MDBBtn } from 'mdb-react-ui-kit';

function Login()
{
    // Global State
    const { GLOBAL_TOKEN } = useContext(GlobalContext);
    
    // Naavigate
    const navigate = useNavigate();

    // Login Ref
    const loginRef = 
    {
         email : useRef()
        ,password : useRef()
    }
    
    // Login State
    const [login, setLogin] = useState(
    {
         email : ''
        ,password : ''
    })

    const onLoginChanged = e =>
    {
        setLogin( prevState => (
        {
             ...prevState
            ,[ e.target.name ] : e.target.value
        }))
    }
    
    // Login Query
    const SignInQuery = LoginApi.useSignIn(
    {
        queryOptions :
        {
            success : ( res ) =>
            {
                sessionStorage.setItem('ref-token', JSON.stringify( res.data ));
                GLOBAL_TOKEN.setToken( res.data );
                
                navigate('/');
            }
            ,settle : () => {}
        }
    })

    const onLoginClicked = e =>
    {
        e.preventDefault(); 
        
        for( let attr in login )
        {
            if( !login[attr] )
            {
                loginRef[attr].current.focus();
                
                return;
            }
        }
        
        SignInQuery.mutate( { username : login.email, password : login.password })
    }
    
    return (
        <div className={'w-100 d-flex align-items-center justify-content-center vh-100 '}>
            <form style={{'width' : '20rem'}}>
                <MDBInput className='mb-4' type='email' label='Email address' name='email' ref={ loginRef.email } value={ login.email } onChange={ onLoginChanged }/>
                <MDBInput className='mb-4' type='password' label='Password' name='password' ref={ loginRef.password } value={ login.password } onChange= { onLoginChanged }/>

                {/*<MDBRow className='mb-4'>*/}
                {/*    <MDBCol className='d-flex justify-content-center'>*/}
                {/*        <MDBCheckbox id='form1Example3' label='Remember me' defaultChecked />*/}
                {/*    </MDBCol>*/}
                {/*    <MDBCol>*/}
                {/*        <a href='#!'>Forgot password?</a>*/}
                {/*    </MDBCol>*/}
                {/*</MDBRow>*/}

                {
                    (() =>
                    {
                        if( SignInQuery.isLoading )
                        {
                            return (
                                <MDBBtn disabled className={'me-2 w-100'}>
                                    <MDBSpinner size='sm' role='status' tag='span' />
                                </MDBBtn>
                            )
                        }
                        else
                        {
                            return <MDBBtn block onClick={ onLoginClicked }>Sign in</MDBBtn>;
                        }

                    })()
                }
            </form>
        </div>
    )
}

export default Login;