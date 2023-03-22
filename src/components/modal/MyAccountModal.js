import React, { useRef, useState, useEffect, useContext, Suspense } from 'react';
import AccountApi from 'api/AccountApi';
import MyAddAccountModal from 'components/modal/MyAddAccountModal';
import { GlobalContext } from 'context/GlobalContext';
import { DateFormatter, CommaFormatter } from 'module/Common';
import { COMMON_DATE_STATUS, COMMON_QUERY_KEYS, COMMON_ACCOUNT_STATUS } from 'module/CommonCode';
import { MDBSpinner, MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import { MDBBadge, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter  } from 'mdb-react-ui-kit';

export default ( ) => 
{
    // Global State
    const { GLOBAL_MODAL, GLOBAL_TOKEN } = useContext(GlobalContext);

    // show State
    const [show, setShow] = useState( false );

    // add State
    const [visible, setVisible] = useState( false );

    const [detail, setDetail] = useState(
    {
         income : []
        ,expense : [] 
    });

    // Search Query
    const SearchAccountQuery = AccountApi.useSearchAccount(
    {
        queryOptions : 
        {
             keys: show ? [ COMMON_QUERY_KEYS.SEARCH_ACCOUNT, { pathString : GLOBAL_TOKEN.token.uuid + '/' + GLOBAL_MODAL.detail.time } ]  : []
            ,success : ( res ) =>
            {
                setDetail( prevState => (
                {
                     ...prevState
                    ,income :  res.data.filter( row =>
                    {
                        return row.status === COMMON_ACCOUNT_STATUS.INCOME
                    })
                    ,expense :  res.data.filter( row =>
                    {
                        return row.status === COMMON_ACCOUNT_STATUS.EXPENSE
                    })
                }));
            }
            ,settle : () =>
            {
                // setSearch( prevState => (
                // {
                //      ...prevState
                //     ,isFetch : false
                    
                // }));
            }
            ,isEnabled : show ? true : false
        }
    })

    useEffect( () =>
    {
        setShow( GLOBAL_MODAL.detail.isVisible );

    }, [ GLOBAL_MODAL.detail ])
    
    return (
        <>
            <MDBModal   show={ show }
                        setShow={ setShow }
                        closeOnEsc={ true }
                        tabIndex='-1'
                        staticBackdrop={ true }

            >
                <MDBModalDialog size="lg" >
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>{ DateFormatter(GLOBAL_MODAL.detail.time, 'YYYY년 MM월 DD일')} </MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={ () => { GLOBAL_MODAL.detail.callBack( false ); } } /> 
                        </MDBModalHeader>
                        <MDBModalBody>
                            {
                                (() =>
                                {
                                    if( show )
                                    {
                                        if ( SearchAccountQuery.isFetching )
                                        {
                                            return <span className=''>Loading...</span>
                                        }
                                        else
                                        {
                                            return (
                                                <MDBAccordion alwaysOpen initialActive={1}>
                                                    {
                                                        (() =>
                                                        {
                                                            let idx = 0;
                                                            const elements = [];

                                                            if( detail.income.length > 0 )
                                                            {
                                                                idx++;
                                                                elements.push
                                                                (
                                                                    <MDBAccordionItem collapseId={idx} headerTitle='수입' key={ COMMON_ACCOUNT_STATUS.INCOME + '_' + idx }>
                                                                        <MDBListGroup light>
                                                                            {
                                                                                detail.income.map( ( row, rowIdx ) => 
                                                                                {
                                                                                    return (
                                                                                        <MDBListGroupItem className='d-flex justify-content-between align-items-center' key={ COMMON_ACCOUNT_STATUS.INCOME + '_' + idx + '_' + rowIdx }>
                                                                                            <div>
                                                                                                <div className='fw-bold'>{ CommaFormatter(row.amount) }</div>
                                                                                                <div className='text-muted'>{ row.memo }</div>
                                                                                            </div>
                                                                                            <MDBBadge pill light color='success'>{ row.category }</MDBBadge>
                                                                                        </MDBListGroupItem>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </MDBListGroup>
                                                                    </MDBAccordionItem>
                                                                )
                                                            }

                                                            if( detail.expense.length > 0 )
                                                            {
                                                                idx++;
                                                                elements.push
                                                                (
                                                                    <MDBAccordionItem collapseId={idx} headerTitle='지출' key={ COMMON_ACCOUNT_STATUS.EXPENSE + '_' + idx }>
                                                                        <MDBListGroup light>
                                                                            {
                                                                                detail.expense.map( ( row, rowIdx ) => 
                                                                                {
                                                                                    return (
                                                                                        <MDBListGroupItem className='d-flex justify-content-between align-items-center' key={ COMMON_ACCOUNT_STATUS.EXPENSE + '_' + idx + '_' + rowIdx }>
                                                                                            <div>
                                                                                                <div className='fw-bold'>{ CommaFormatter(row.amount) }</div>
                                                                                                <div className='text-muted'>{ row.memo }</div>
                                                                                            </div>
                                                                                            <MDBBadge pill light color='success'>{ row.category }</MDBBadge>
                                                                                        </MDBListGroupItem>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </MDBListGroup>
                                                                    </MDBAccordionItem>
                                                                )
                                                            }
                                                        

                                                            return elements;
                                                        })()
                                                    }
                                                </MDBAccordion>
                                            )   
                                        }
                                    }
                                })()
                            }
                        </MDBModalBody>

                        <MDBModalFooter className='justify-content-center'>
                            {
                                (() =>
                                {
                                    if( SearchAccountQuery.isFetching )
                                    {
                                        return (
                                            <MDBBtn color='secondary'>
                                                <MDBSpinner size='sm' role='status' tag='span' />
                                            </MDBBtn>
                                        )
                                    }
                                    else
                                    {
                                        return (
                                            <MDBBtn color='secondary' onClick={ () => { GLOBAL_MODAL.detail.callBack( false ); } }>
                                                확인
                                            </MDBBtn>
                                        )
                                    }
                                })()
                            }

                            {
                                (() =>
                                {
                                    if( SearchAccountQuery.isFetching )
                                    {
                                        return (
                                            <MDBBtn>
                                                <MDBSpinner size='sm' role='status' tag='span' />
                                            </MDBBtn>
                                        )
                                    }
                                    else
                                    {
                                        return (
                                            <MDBBtn onClick=
                                                    { 
                                                        () => 
                                                        {  
                                                            setShow(false);
                                                            
                                                            setTimeout(() => 
                                                            {
                                                                setVisible(true);
                                                            }, 400);
                                                        } 
                                                    }
                                            >
                                                등록
                                            </MDBBtn>
                                        )
                                    }
                                })()
                            }
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

            <MyAddAccountModal isVisible={visible} setVisible={setVisible} parentShow={ setShow }/>
        </>
    )
}