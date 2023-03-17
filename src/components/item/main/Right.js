import React, { useEffect, useState } from 'react';
import MyDiary from 'components/item/common/MyDiary';
import { MDBRow } from 'mdb-react-ui-kit';

function Right()
{
    return (
        <>
            <MDBRow className='' style={{ height : '60%', overflow : 'overlay'}}>
                <MyDiary />
            </MDBRow>
            <MDBRow style={{ height : '20%'}}>
                계산기

            </MDBRow>
            <MDBRow style={{ height : '20%'}}>
                통계 

            </MDBRow>
        </>
    )
}

export default Right;