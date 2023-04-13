import React, { useRef, useState, useContext, useLayoutEffect } from 'react';
import AccountApi from 'api/AccountApi';
import CategoryApi from 'api/CategoryApi';
import { useQueryClient   } from 'react-query';
import { GlobalContext } from 'context/GlobalContext';
import Form from 'react-bootstrap/Form';

import { COMMON_QUERY_KEYS, COMMON_ACCOUNT_STATUS } from 'module/CommonCode';
import { MDBListGroup, MDBListGroupItem, MDBInput, MDBTextArea } from 'mdb-react-ui-kit';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter  } from 'mdb-react-ui-kit';

export default ( { isVisible, setVisible, target, setTarget, parentShow } ) => 
{
    // Global State
    const { GLOBAL_MODAL, GLOBAL_TOKEN } = useContext(GlobalContext);

    // Query Client
    const queryClient = useQueryClient();

    // Component Ref
    const compRef = useRef([]);
    
    // Categories State
    const [categories, setCategoreis ] = useState([]);

    // Account State
    const [account, setAccount] = useState(
    {
         accountId : 0
        ,category : -1
        ,status : -1
        ,memo : ''
        ,amount : ''
    });
    
    // Search Query
    const SearchCategoryQuery = CategoryApi.useSearchCategories(
    {
        queryOptions : 
        {
             keys: isVisible ? [ COMMON_QUERY_KEYS.SEARCH_CATEGORIES, { pathString : GLOBAL_TOKEN.token.uuid + '/all' } ] : []
            ,success : ( res ) =>
            {
                setCategoreis(res.data);
            }
            ,settle : () => {}
            ,isEnabled : isVisible ? true : false
        }
    })

    const SearchAccountQuery = AccountApi.useSearchAccountDetail(
    {
        queryOptions : 
        {
             keys: isVisible ? [ COMMON_QUERY_KEYS.SEARCH_ACCOUNT_DETAIL, { pathString : GLOBAL_TOKEN.token.uuid + '/' + GLOBAL_MODAL.detail.time + '/account/' + target } ] : []
            ,success : ( res ) =>
            {
                setAccount( prevState => (
                {
                     ...prevState
                    ,category : Number(res.data.category)
                    ,status : res.data.status
                    ,memo : res.data.memo
                    ,amount : res.data.amount
                }))
            }
            ,settle : () => {}
            ,isEnabled : isVisible && target > 0
        }
    })

    // Add Account Query
    const AddAccountQuery = AccountApi.useAddAccount(
    {
        queryOptions :
        {
            success : ( res ) =>
            {
                onCommandSuccess();
            }
            ,settle : () => {}
        }
    })

    // Update Account Query
    const UpdateAccountQuery = AccountApi.useUpdateAccount(
    {
        queryOptions :
        {
            success : ( res ) =>
            {
                onCommandSuccess();
            }
            ,settle : () => {}
        }
    })

    // Delete Account Query
    const DeleteAccountQuery = AccountApi.useDeleteAccount(
    {
        queryOptions :
        {
            success : ( res ) =>
            {
                onCommandSuccess();
            }
            ,settle : () => {}
        }
    })

    // Account Changed Events
    const onAccountChanged = (e) => 
    {
        const value = (() =>
        {
            if( e.target.name === 'amount' )
            {
                return Number(e.target.value.replace(/[^0-9]/g, ''));
            }
            else if( e.target.name === 'memo')
            {
                return e.target.value;
            }
            else
            {
                return isNaN(e.target.value) ? e.target.value : Number( e.target.value );
            }
        })();
        
        setAccount( prevState => (
        {
             ...prevState
            ,[ e.target.name ] : value
        }))
    }

    // Command Success Events
    const onCommandSuccess = () =>
    {
        const lastAccountKey = queryClient.getQueriesData( {queryKey : [COMMON_QUERY_KEYS.SEARCH_ACCOUNTS]} ).slice(-1)[0][0];
        const lastChartKey = queryClient.getQueriesData( {queryKey : [COMMON_QUERY_KEYS.SEARCH_CHART]} ).slice(-1)[0][0];
        
        queryClient.refetchQueries(lastAccountKey);
        queryClient.refetchQueries(lastChartKey);

        setVisible(false);
                                    
        setTimeout(() => 
        {
            parentShow(true);
        }, 400);
    }

    useLayoutEffect(() =>
    {
        if( !isVisible )
        {
            setAccount(
            {
                 accountId : 0
                ,category : -1
                ,status : -1
                ,memo : ''
                ,amount : ''
            });

            setTarget( 0 );
        }
        else
        {
            if( target )
            {
                setAccount( prevState => (
                {
                    ...prevState
                    ,accountId : target
                }))
            }
        }

    }, [ isVisible ])
    
    return (
        <MDBModal   show={ isVisible }
                    setShow={ setVisible }
                    closeOnEsc={ true }
                    tabIndex='-1'
                    staticBackdrop={ true }

        >
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>등록</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' 
                                onClick=
                                { 
                                    () => 
                                    { 
                                        setVisible(false);
                                            
                                        setTimeout(() => 
                                        {
                                            parentShow(true);
                                        }, 400);
                                    } 
                                }
                        /> 
                    </MDBModalHeader>
                    <MDBModalBody>
                        <h6 className='bg-light p-2 border-top border-bottom fLn_Bd'>카테고리</h6>
                        <MDBListGroup light className='mb-4'>
                            <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                <Form.Select name='category' value={ account.category } onChange={ onAccountChanged } ref={ el => compRef.current[0] = el }>
                                    <option value={-1}>선택하세요</option>
                                    {
                                        categories.map( category =>
                                        {
                                           return <option key={category.id} value={category.id}>{category.name}</option> 
                                        })
                                    }
                                </Form.Select>
                            </MDBListGroupItem>
                        </MDBListGroup>
                        <h6 className='bg-light p-2 border-top border-bottom fLn_Bd'>타입</h6>
                        <MDBListGroup light className='mb-4'>
                            <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                <Form.Select name='status' value={ account.status } onChange={ onAccountChanged } ref={ el => compRef.current[1] = el }>
                                    <option value={''}>선택하세요</option>
                                    <option value={COMMON_ACCOUNT_STATUS.INCOME}>수입</option>
                                    <option value={COMMON_ACCOUNT_STATUS.EXPENSE}>지출</option>
                                </Form.Select>
                            </MDBListGroupItem>
                        </MDBListGroup>
                        <h6 className='bg-light p-2 border-top border-bottom fLn_Bd'>금액</h6>
                        <MDBListGroup light className='mb-4'>
                            <MDBListGroupItem className=''>
                                <MDBInput label='금액' id='typeNumber' type='text' name='amount' value={ account.amount } onChange={ onAccountChanged } ref={ el => compRef.current[2] = el }/>
                            </MDBListGroupItem>
                        </MDBListGroup>
                        <h6 className='bg-light p-2 border-top border-bottom fLn_Bd'>메모</h6>
                        <MDBListGroup light className='mb-4'>
                            <MDBListGroupItem className=''>
                                <MDBTextArea label='메모' id='textAreaExample' rows={4} style={{resize : 'none'}} name='memo' value={ account.memo } onChange={ onAccountChanged } ref={ el => compRef.current[3] = el }/>
                            </MDBListGroupItem>
                        </MDBListGroup>
                    </MDBModalBody>
                    <MDBModalFooter className='justify-content-center'>
                        <MDBBtn color='secondary'
                                onClick=
                                { 
                                    () => 
                                    { 
                                        setVisible(false);
                                            
                                        setTimeout(() => 
                                        {
                                            parentShow(true);
                                        }, 400);
                                    } 
                                }
                        >
                            취소
                        </MDBBtn>
                        {
                            (() =>
                            {
                                // 수정
                                if( target > 0 )
                                {
                                    return (
                                        <>
                                            <MDBBtn color='danger'
                                                    disabled={ AddAccountQuery.isLoading ? true : false }
                                                    onClick=
                                                    { 
                                                        () => 
                                                        { 
                                                            DeleteAccountQuery.mutate( 
                                                            {
                                                                accountId : account.accountId
                                                            })
                                                        } 
                                                    }
                                            >
                                                삭제
                                            </MDBBtn>
                                            <MDBBtn disabled={ AddAccountQuery.isLoading ? true : false }
                                                    onClick=
                                                    { 
                                                        () => 
                                                        { 
                                                            if( account.category === -1 )
                                                            {
                                                                compRef.current[0].focus();
                                                                
                                                                return;
                                                            }

                                                            if( account.status === -1 )
                                                            {
                                                                compRef.current[1].focus();
                                                                
                                                                return;
                                                            }

                                                            if( !account.amount )
                                                            {
                                                                compRef.current[2].focus();
                                                                
                                                                return;
                                                            }

                                                            UpdateAccountQuery.mutate( 
                                                            {
                                                                accountId : account.accountId
                                                                ,category : account.category
                                                                ,status : account.status
                                                                ,memo : account.memo
                                                                ,amount : account.amount
                                                            })
                                                        } 
                                                    }
                                            >
                                                수정
                                            </MDBBtn>
                                        </>
                                    )
                                }
                                // 등록
                                else
                                {
                                    return (
                                        <MDBBtn disabled={ AddAccountQuery.isLoading ? true : false }
                                                onClick=
                                                { 
                                                    () => 
                                                    { 
                                                        if( account.category === -1 )
                                                        {
                                                            compRef.current[0].focus();
                                                            
                                                            return;
                                                        }

                                                        if( account.status === -1 )
                                                        {
                                                            compRef.current[1].focus();
                                                            
                                                            return;
                                                        }

                                                        if( !account.amount )
                                                        {
                                                            compRef.current[2].focus();
                                                            
                                                            return;
                                                        }
                                                        
                                                        AddAccountQuery.mutate( 
                                                        {
                                                            category : account.category
                                                            ,status : account.status
                                                            ,memo : account.memo
                                                            ,amount : account.amount
                                                        })
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
    )
}