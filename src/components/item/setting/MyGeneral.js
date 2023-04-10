import React, { useRef, useState, useContext, useEffect } from 'react';
import { CommaFormatter } from 'module/Common';
import { GlobalContext } from 'context/GlobalContext';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { MDBTable, MDBTableHead, MDBTableBody, MDBCheckbox } from 'mdb-react-ui-kit';
import { COMMON_QUERY_KEYS, COMMON_YN, COMMON_STATUS } from 'module/CommonCode';

function MyGeneral()
{
    // Global State
    const { GLOBAL_TOKEN, GLOBAL_MONEY } = useContext(GlobalContext);

    const [general, setGeneral] = useState(
    {
        budget : 
        {
             isEdit : false
            ,value : 0
        }
    })

    return (
        <div className='h-100 w-100 d-flex justify-content-center align-items-center'>
            <MDBCard className='h-100 w-50 m-0 p-0'>
                <MDBCardHeader className='d-flex justify-content-end align-items-center p-4'>
                    <MDBBtn className='ms-1 me-1' 
                                // onClick=
                                // {
                                //     () =>
                                //     {
                                //         setVisible( true );
                                //     }
                                // }
                        >
                            저장
                        </MDBBtn>    
                </MDBCardHeader>
                <MDBCardBody className='p-3 pe-2'>
                    <MDBTable className='text-center'>
                        <MDBTableBody className=''>
                            <tr>
                                <th scope='row' className='border-end' style={ {width : '20%'} }>
                                    예산
                                </th>
                                <td className=''>
                                    {
                                        (() => 
                                        {
                                            if( general.budget.isEdit )
                                            {
                                                return (
                                                    <MDBInput label='금액' type='text' /> 
                                                )
                                            }
                                            else
                                            {
                                                return (

                                                    
                                                    CommaFormatter(300000)
                                                )
                                            }
                                        })()
                                    }
                                </td>
                            </tr>
                        </MDBTableBody>
                    </MDBTable>
                </MDBCardBody>
            </MDBCard>
        </div>        
    )
}

export default MyGeneral;