import React, { useEffect, useState } from 'react';
import Left from 'components/item/main/Left';
import Right from 'components/item/main/Right';

import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

function Main()
{
    return (
        <MDBContainer className='vh-100' fluid>
            <MDBRow style={{ height : '5%'}}>
                header
            </MDBRow>
            <MDBRow className='' style={{ height : '95%'}}>
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