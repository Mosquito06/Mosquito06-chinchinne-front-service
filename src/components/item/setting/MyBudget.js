import React, { useRef, useState, useEffect, useContext } from 'react';
import GeneralApi from 'api/GeneralApi';
import EventApi from 'api/EventApi';
import { CommaFormatter } from 'module/Common';
import { useQueryClient   } from 'react-query';
import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { GlobalContext } from 'context/GlobalContext';
import { COMMON_QUERY_KEYS, COMMON_EVENT_TYPE } from 'module/CommonCode';

function MyBudget( { value })
{
    // Global State
    const { GLOBAL_MONEY } = useContext(GlobalContext);
    
    // Query Client
    const queryClient = useQueryClient();
    
    // Component Ref
    const compRef = useRef([]);
    
    // Budget State
    const [budget, setBudget] = useState(
    {
         isEdit : false
        ,snapshot : value
        ,value : value
    })

    // Update General Query
    const UpdateGeneralQuery = GeneralApi.useUpdateGeneral(
    {
        queryOptions :
        {
            success : ( res ) =>
            {
                queryClient.refetchQueries([ COMMON_QUERY_KEYS.SEARCH_GENERAL ]);

                setBudget( prevState => (
                {
                    ...prevState
                    ,isEdit : false
                }))
            }
            ,settle : () => {}
        }
    })

    // Send Event Query
    const SendEventQuery = EventApi.useSendEvent(
    {
        queryOptions :
        {
             success : ( res ) => {}
            ,settle : () => {}
        }
    })

    useEffect( () =>
    {
        GLOBAL_MONEY.setMoney( prevState => (
        {
             ...prevState
            ,budget : value
            ,balance : value - prevState.expense
        }))
        
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
                                <MDBInput   label='금액' 
                                            type='text' 
                                            ref={ el => compRef.current[0] = el }
                                            value={ budget.value }
                                            onChange=
                                            {
                                                (e) =>
                                                {
                                                    setBudget( prevState => (
                                                    {
                                                         ...prevState
                                                        ,value : Number(e.target.value.replace(/[^0-9]/g, ''))
                                                    }))
                                                }
                                            } 
                                /> 
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
                                                        if( !budget.value )
                                                        {
                                                            compRef.current[0].focus();

                                                            return;
                                                        }
                                                        
                                                        UpdateGeneralQuery.mutate(
                                                        {
                                                            budget : budget.value
                                                        })

                                                        SendEventQuery.mutate(
                                                        {
                                                             eventCode : COMMON_EVENT_TYPE.BUDGET
                                                            ,budget : budget.value
                                                        })
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