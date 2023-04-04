import React, { useEffect, useState } from 'react';
import Header from 'components/common/Header';

import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

function Main()
{
    return (
        <MDBContainer className='vh-100' fluid>
            <MDBRow style={{ height : '5%'}}>
                <Header />
            </MDBRow>
            <MDBRow className='' style={{ height : '95%'}}>
                
            </MDBRow>
        </MDBContainer>
    )
}

export default Main;