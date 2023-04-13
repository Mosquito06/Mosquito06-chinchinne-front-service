import React from 'react';
import MyDiary from 'components/item/common/MyDiary';
import MyChart from 'components/item/common/MyChart';
import { MDBRow } from 'mdb-react-ui-kit';
import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit';

function Right()
{
    return (
        <>
            <MDBRow className='m-0' style={{ height : '60%'}}>
                <MyDiary />
            </MDBRow>
            {/* <MDBRow className='m-0' style={{ height : '20%'}}>
                <MDBCard className='m-0'> 
                    <MDBCardBody className='p-0 ps-3 pt-3'>
                    계산기 
                    </MDBCardBody>
                </MDBCard>

            </MDBRow> */}
            <MDBRow className='m-0 pt-3' style={{ height : '40%'}}>
                <MyChart />
            </MDBRow>
        </>
    )
}

export default Right;