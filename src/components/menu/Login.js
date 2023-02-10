import React from 'react';
import Axios from 'axios';
import { SignIn } from 'api/LoginApi';
import { useNavigate } from 'react-router-dom'; 
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { MDBInput, MDBCol, MDBRow, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';

function Login()
{
    const navigate = useNavigate();
    
    const signInMutation = useMutation( SignIn,
    {
        onError: (error, variable, context) => 
        {
            // error
        }
        ,onSuccess: (data, variables, context) => 
        {
            localStorage.setItem('ref-token', JSON.stringify(data));
            navigate('/');
        }
    });
    
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

                <MDBBtn block onClick={ (e) => { e.preventDefault(); signInMutation.mutate( { username : 'user', password : 'user'}) }}>
                    Sign in
                </MDBBtn>
            </form>
        </div>
    )
}

export default Login;