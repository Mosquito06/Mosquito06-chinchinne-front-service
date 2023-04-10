import React, { useRef, useState, useContext, useEffect } from 'react';
import { CommaFormatter } from 'module/Common';
import { GlobalContext } from 'context/GlobalContext';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { MDBTable, MDBTableHead, MDBTableBody, MDBCheckbox } from 'mdb-react-ui-kit';
import { COMMON_QUERY_KEYS, COMMON_YN, COMMON_STATUS } from 'module/CommonCode';

function MyBudget( { value })
{
    // Budget State
    const [budget, setBudget] = useState(
    {
         isEdit : false
        ,snapshot : value
        ,value : value
    })

    useEffect( () =>
    {
        setBudget( prevState => (
        {
             ...prevState
            ,snapshot : value
            ,value : value
        }))

    }, [value])

    return (
        <tr>
            <th scope='row' style={ {width : '20%', verticalAlign : 'middle'} }>
                예산
            </th>
            <td className='' style={ {verticalAlign : 'middle'} }>
                {
                    (() => 
                    {
                        if( budget.isEdit )
                        {
                            return (
                                <MDBInput label='금액' type='text' /> 
                            )
                        }
                        else
                        {
                            return (
                                <span>{ CommaFormatter( budget.value ) }</span>
                            )
                        }
                    })()
                }
            </td>
            <td className='ps-1 pe-1' style={ {width : '30%'} }>
                <div className='d-flex justify-content-center align-items-center'>
                    {
                        (() =>
                        {
                            if( budget.isEdit )
                            {
                                return (
                                    <>
                                        <MDBBtn className='ms-1 me-1' 
                                                onClick=
                                                {
                                                    () =>
                                                    {
                                                        setBudget( prevState => (
                                                        {
                                                            ...prevState
                                                            ,isEdit : false
                                                        }))
                                                    }
                                                }
                                        >
                                            저장
                                        </MDBBtn>
                                        <MDBBtn className='ms-1 me-1' 
                                                color='secondary'
                                                onClick=
                                                {
                                                    () =>
                                                    {
                                                        setBudget(prevState => (
                                                        {
                                                            ...prevState
                                                            ,isEdit : false
                                                            ,value : prevState.snapshot
                                                        }))
                                                    }
                                                }
                                        >
                                            취소
                                        </MDBBtn>  
                                    </>
                                )
                            }
                            else
                            {
                                return (
                                    <MDBBtn className='ms-1 me-1' 
                                            onClick=
                                            {
                                                () =>
                                                {
                                                    setBudget(prevState => (
                                                    {
                                                        ...prevState
                                                        ,isEdit : true
                                                    }))
                                                }
                                            }
                                    >
                                        수정
                                    </MDBBtn>  
                                )
                            }
                        })()
                    } 
                </div> 
            </td>
        </tr>
    )
}

export default MyBudget;