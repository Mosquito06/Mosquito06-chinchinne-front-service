import React, { useEffect, useState } from 'react';
import MyDiary from 'components/item/common/MyDiary';
import { MDBRow } from 'mdb-react-ui-kit';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBBtn } from 'mdb-react-ui-kit';

function Right()
{
    return (
        <>
            <MDBRow className='m-0' style={{ height : '60%', overflow : 'overlay'}}>
                <MDBCard className='w-100 m-0 p-0'> 
                    <MDBCardBody className='p-0 '>
                        <MyDiary />
                    </MDBCardBody>
                </MDBCard>
            </MDBRow>
            {/* <MDBRow className='m-0' style={{ height : '20%'}}>
                <MDBCard className='m-0'> 
                    <MDBCardBody className='p-0 ps-3 pt-3'>
                    계산기 
                    </MDBCardBody>
                </MDBCard>

            </MDBRow> */}
            <MDBRow className='m-0' style={{ height : '40%'}}>
                <MDBCard className='m-0'> 
                    <MDBCardBody className='p-0 ps-3 pt-3'>
                        통계 
                    </MDBCardBody>
                </MDBCard>
            </MDBRow>
        </>
    )
}

export default Right;