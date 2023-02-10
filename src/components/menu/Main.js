import React from 'react';
import Axios from 'axios';
import { SignIn } from 'api/LoginApi';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { MDBInput, MDBCol, MDBRow, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';

function Login()
{
    const signInMutation = useMutation( SignIn,
    {
        onError: (error, variable, context) => 
        {
            // error
        }
        ,onSuccess: (data, variables, context) => 
        {
            
        }
    });
    
    return (
        <div >
            Main
        </div>
    )
}

export default Login;