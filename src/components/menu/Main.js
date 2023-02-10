import React from 'react';
import Axios from 'axios';
import { SignIn } from 'api/LoginApi';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { MDBContainer, MDBRow, MDBCol, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle  } from 'mdb-react-ui-kit';

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
        <MDBContainer className='vh-100' fluid>
            <MDBRow style={{ height : '5%'}}>
                header
            </MDBRow>
            <MDBRow className='' style={{ height : '95%'}}>
                <MDBCol className='col-9' style={{ height : '100%'}}>
                    <MDBRow style={{ height : '5%'}} >
                        <MDBDropdown>
                            <MDBDropdownToggle>2023</MDBDropdownToggle>
                            <MDBDropdownMenu>
                                <MDBDropdownItem childTag='button' className='dropdown-item'>Action</MDBDropdownItem>
                                <MDBDropdownItem childTag='button' className='dropdown-item'>Another action</MDBDropdownItem>
                                <MDBDropdownItem childTag='button' className='dropdown-item'>Something else here</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBRow>
                    <MDBRow className='' style={{ height : '95%'}}>
                        ??                        
                        

                    </MDBRow>
                </MDBCol>
                <MDBCol>
                    right
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default Login;