import React, { useRef, useState, useEffect, useContext, Suspense, useLayoutEffect } from 'react';
import AccountApi from 'api/AccountApi';
import CategoryApi from 'api/CategoryApi';
import { useQueryClient   } from 'react-query';
import { GlobalContext } from 'context/GlobalContext';
import { DateFormatter, CommaFormatter } from 'module/Common';
import Form from 'react-bootstrap/Form';

import { COMMON_DATE_STATUS, COMMON_QUERY_KEYS, COMMON_ACCOUNT_STATUS } from 'module/CommonCode';
import { MDBListGroup, MDBListGroupItem, MDBInput, MDBTextArea } from 'mdb-react-ui-kit';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter  } from 'mdb-react-ui-kit';

export default ( { isVisible, setVisible, parentShow } ) => 
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
         category : -1
        ,status : -1
        ,memo : ''
        ,amount : ''
    });
    
    // Search Query
    const SearchCategoryQuery = CategoryApi.useSearchCategories(
    {
        queryOptions : 
        {
             keys: isVisible ? [ COMMON_QUERY_KEYS.SEARCH_CATEGORIES, { pathString : GLOBAL_TOKEN.token.uuid } ] : []
            ,success : ( res ) =>
            {
                setCategoreis(res.data);
            }
            ,settle : () => {}
            ,isEnabled : isVisible ? true : false
        }
    })

    // Add Account Query
    const AddAccountQuery = AccountApi.useAddAccount(
    {
        queryOptions :
        {
            success : ( res ) =>
            {
                queryClient.refetchQueries([COMMON_QUERY_KEYS.SEARCH_ACCOUNT]);
                queryClient.refetchQueries([COMMON_QUERY_KEYS.SEARCH_ACCOUNTS]);

                setVisible(false);
                                            
                setTimeout(() => 
                {
                    parentShow(true);
                }, 400);
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

    useLayoutEffect(() =>
    {
        if( !isVisible )
        {
            setAccount(
            {
                 category : -1
                ,status : -1
                ,memo : ''
                ,amount : ''
            });
        }

    }, [ isVisible ])
    
    return (
        <MDBModal   show={ isVisible }
                    setShow={ setVisible }
                    closeOnEsc={ true }
                    tabIndex='-1'
                    // staticBackdrop={ true }

        >
            <MDBModalDialog size="lg" >
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
                        <h6 className='bg-light p-2 border-top border-bottom'>Category</h6>
                        <MDBListGroup light className='mb-4'>
                            <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                <Form.Select name='category' value={ account.category } onChange={ onAccountChanged } ref={ el => compRef.current[0] = el }>
                                    <option value={-1}>선택하세요</option>
                                    {
                                        categories.map( category =>
                                        {
                                           return <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option> 
                                        })
                                    }
                                </Form.Select>
                            </MDBListGroupItem>
                        </MDBListGroup>
                        <h6 className='bg-light p-2 border-top border-bottom'>Type</h6>
                        <MDBListGroup light className='mb-4'>
                            <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                <Form.Select name='status' value={ account.status } onChange={ onAccountChanged } ref={ el => compRef.current[1] = el }>
                                    <option value={''}>선택하세요</option>
                                    <option value={COMMON_ACCOUNT_STATUS.INCOME}>수입</option>
                                    <option value={COMMON_ACCOUNT_STATUS.EXPENSE}>지출</option>
                                </Form.Select>
                            </MDBListGroupItem>
                        </MDBListGroup>
                        <h6 className='bg-light p-2 border-top border-bottom'>Amount</h6>
                        <MDBListGroup light className='mb-4'>
                            <MDBListGroupItem className=''>
                                <MDBInput label='Amount' id='typeNumber' type='text' name='amount' value={ account.amount } onChange={ onAccountChanged } ref={ el => compRef.current[2] = el }/>
                            </MDBListGroupItem>
                        </MDBListGroup>
                        <h6 className='bg-light p-2 border-top border-bottom'>Memo</h6>
                        <MDBListGroup light className='mb-4'>
                            <MDBListGroupItem className=''>
                                <MDBTextArea label='Message' id='textAreaExample' rows={4} style={{resize : 'none'}} name='memo' value={ account.memo } onChange={ onAccountChanged } ref={ el => compRef.current[3] = el }/>
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
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    )
}