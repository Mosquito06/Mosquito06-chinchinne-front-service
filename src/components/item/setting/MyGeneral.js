import React, { useRef, useState, useContext, useEffect } from 'react';
import { GlobalContext } from 'context/GlobalContext';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBBtn } from 'mdb-react-ui-kit';
import { COMMON_QUERY_KEYS, COMMON_YN, COMMON_STATUS } from 'module/CommonCode';

function MyGeneral()
{
    // Global State
    const { GLOBAL_TOKEN, GLOBAL_MONEY } = useContext(GlobalContext);

    return (
        <MDBCard className='h-100 m-0 p-0'>
            {/* <MDBCardHeader className='d-flex align-items-center p-2'>
                
            </MDBCardHeader> */}
            <MDBCardBody className='p-3 pe-2'>
                
            </MDBCardBody>
        </MDBCard>
    )
}

export default MyGeneral;