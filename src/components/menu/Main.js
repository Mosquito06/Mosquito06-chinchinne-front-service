import React, { useEffect, useState } from 'react';
import Header from 'components/common/Header';
import Left from 'components/item/main/Left';
import Right from 'components/item/main/Right';

import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

function Main()
{
    return (
        <MDBContainer className='vh-100' fluid>
            <MDBRow style={{ height : '5%'}}>
                <Header />
            </MDBRow>
            <MDBRow className='pt-2 pt-lg-3' style={{ height : '95%'}}>
                <MDBCol className='col-9' style={{ height : '100%'}}>
                    <Left />
                </MDBCol>
                <MDBCol>
                    <Right />
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default Main;