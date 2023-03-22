import React, { useRef, useState, useEffect, useContext, Suspense } from 'react';
import AccountApi from 'api/AccountApi';
import { GlobalContext } from 'context/GlobalContext';
import { DateFormatter, CommaFormatter } from 'module/Common';
import { COMMON_DATE_STATUS, COMMON_QUERY_KEYS, COMMON_ACCOUNT_STATUS } from 'module/CommonCode';
import { MDBSpinner, MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import { MDBBadge, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter  } from 'mdb-react-ui-kit';

export default ( { isVisible, setVisible, parentShow } ) => 
{
    
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