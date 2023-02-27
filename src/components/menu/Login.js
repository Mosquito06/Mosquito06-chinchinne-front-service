import React, { useState, useContext } from 'react';
import LoginApi from 'api/LoginApi';
import { useNavigate } from 'react-router-dom'; 
import { GlobalContext } from 'context/GlobalContext';
import { MDBInput, MDBCol, MDBRow, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';

function Login()
{
    // context
    const { GLOBAL_TOKEN, GLOBAL_MODAL } = useContext(GlobalContext);
    
    // Naavigate
    const navigate = useNavigate();

    // login State
    const [login, setLogin] = useState(
    {
         email : ''
        ,password : ''
    })
    
    // 로그인 Query
    const SignInQuery = LoginApi.useSignIn(
    {
        queryOptions :
        {
            success : ( res ) =>
            {
                sessionStorage.setItem('ref-token', JSON.stringify( res.data.response ));
                //GLOBAL_LOGIN.setLoginInfo( res.data.response );
                
                navigate('/');
            }
            ,settle : () => {}
        }
    })

    const onLoginClicked = e =>
    {
        e.preventDefault(); 
        
        GLOBAL_MODAL.setModal( prevState => (
        {
             isVisible : true
            ,isConfirm : false
        }))

        
        //SignInQuery.mutate( { username : 'user', password : 'user1'})
    }
    
    return (
        <div className={'w-100 d-flex align-items-center justify-content-center vh-100 '}>
            <form style={{'width' : '20rem'}}>
                <MDBInput className='mb-4' type='email' id='form1Example1' label='Email address' />
                <MDBInput className='mb-4' type='password' id='form1Example2' label='Password' />

                {/*<MDBRow className='mb-4'>*/}
                {/*    <MDBCol className='d-flex justify-content-center'>*/}
                {/*        <MDBCheckbox id='form1Example3' label='Remember me' defaultChecked />*/}
                {/*    </MDBCol>*/}
                {/*    <MDBCol>*/}
                {/*        <a href='#!'>Forgot password?</a>*/}
                {/*    </MDBCol>*/}
                {/*</MDBRow>*/}

                <MDBBtn block onClick={ onLoginClicked }>
                    Sign in
                </MDBBtn>
            </form>
        </div>
    )
}

export default Login;