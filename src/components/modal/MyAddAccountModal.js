import React, { useRef, useState, useEffect, useContext, Suspense } from 'react';
import AccountApi from 'api/AccountApi';
import CategoryApi from 'api/CategoryApi';
import { GlobalContext } from 'context/GlobalContext';
import { DateFormatter, CommaFormatter } from 'module/Common';
import Form from 'react-bootstrap/Form';

import { COMMON_DATE_STATUS, COMMON_QUERY_KEYS, COMMON_ACCOUNT_STATUS } from 'module/CommonCode';
import { MDBSpinner, MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import { MDBBadge, MDBListGroup, MDBListGroupItem, MDBInput, MDBTextArea } from 'mdb-react-ui-kit';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter  } from 'mdb-react-ui-kit';

export default ( { isVisible, setVisible, parentShow } ) => 
{
    // Global State
    const { GLOBAL_MODAL, GLOBAL_TOKEN } = useContext(GlobalContext);
    
    // categories State
    const [categories, setCategoreis ] = useState([]);

    const [account, setAccount] = useState(
    {
        
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
            ,settle : () =>
            {
                // setSearch( prevState => (
                // {
                //      ...prevState
                //     ,isFetch : false
                    
                // }));
            }
            ,isEnabled : isVisible ? true : false
        }
    })
    
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
                                <Form.Select>
                                    <option value={-1}>선택하세요</option>
                                    {
                                        categories.map( category =>
                                        {
                                           return <option value={category.categoryId}>{category.categoryName}</option> 
                                        })
                                    }
                                </Form.Select>
                            </MDBListGroupItem>
                        </MDBListGroup>
                        <h6 className='bg-light p-2 border-top border-bottom'>Type</h6>
                        <MDBListGroup light className='mb-4'>
                            <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                <Form.Select>
                                    <option value={-1}>선택하세요</option>
                                    <option value={COMMON_ACCOUNT_STATUS.INCOME}>수입</option>
                                    <option value={COMMON_ACCOUNT_STATUS.EXPENSE}>지출</option>
                                </Form.Select>
                            </MDBListGroupItem>
                        </MDBListGroup>
                        <h6 className='bg-light p-2 border-top border-bottom'>Amount</h6>
                        <MDBListGroup light className='mb-4'>
                            <MDBListGroupItem className=''>
                                <MDBInput className=''  label='Amount' id='typeNumber' type='number' />
                            </MDBListGroupItem>
                        </MDBListGroup>
                        <h6 className='bg-light p-2 border-top border-bottom'>Memo</h6>
                        <MDBListGroup light className='mb-4'>
                            <MDBListGroupItem className=''>
                                <MDBTextArea label='Message' id='textAreaExample' rows={4} style={{resize : 'none'}} />
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
                        <MDBBtn onClick=
                                { 
                                    () => 
                                    { 
                                        
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