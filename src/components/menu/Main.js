import React, { useEffect, useState } from 'react';
import Header from 'components/common/Header';
import Left from 'components/item/main/Left';
import Right from 'components/item/main/Right';

import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit';

function Main()
{
    return (
        <MDBContainer className='vh-100' fluid>
            <MDBRow style={{ height : '5%'}}>
                <Header />
            </MDBRow>
            <MDBRow className='pt-2 pt-lg-3' style={{ height : '95%'}}>
                <MDBCol className='d-flex justify-content-center m-3'>
                    <MDBCol className='col-9 me-3'>
                        <MDBCard className='w-100 h-100'> 
                            <MDBCardBody className='p-0'>
                                <Left />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol>
                        <MDBCard className='w-100 h-100'> 
                            <MDBCardBody className='p-0'>
                                <Right />
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default Main;