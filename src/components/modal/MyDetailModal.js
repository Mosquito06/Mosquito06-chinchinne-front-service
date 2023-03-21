import React, { useRef, useState, useEffect, useContext } from 'react';
import { DateFormatter } from 'module/Common';
import { GlobalContext } from 'context/GlobalContext';
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import { MDBBadge, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter  } from 'mdb-react-ui-kit';

export default ( ) => 
{
    // context
    const { GLOBAL_MODAL } = useContext(GlobalContext);

    // show State
    const [show, setShow] = useState( false );

    const [detail, setDetail] = useState(
    {
         income : []
        ,expense : [] 
    });

    useEffect( () =>
    {
        setShow( GLOBAL_MODAL.detail.isVisible );

    }, [ GLOBAL_MODAL.detail ])
    
    return (
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
                                    return (
                                        <MDBAccordion alwaysOpen initialActive={1}>
                                            <MDBAccordionItem collapseId={1} headerTitle='수입'>
                                                <MDBListGroup light>
                                                    <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                                        <div>
                                                            <div className='fw-bold'>30,000</div>
                                                            <div className='text-muted'>NC 장보기</div>
                                                        </div>
                                                        <MDBBadge pill light color='success'>장보기</MDBBadge>
                                                    </MDBListGroupItem>
                                                    <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                                        <div>
                                                        <div className='fw-bold'>12,786</div>
                                                        <div className='text-muted'>톨비</div>
                                                        </div>
                                                        <MDBBadge pill light color='primary'>나들이</MDBBadge>
                                                    </MDBListGroupItem>
                                                    <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                                        <div>
                                                            <div className='fw-bold'>입장료</div>
                                                            <div className='text-muted'>12,000</div>
                                                        </div>
                                                        <MDBBadge pill light color='warning'>나들이</MDBBadge>
                                                    </MDBListGroupItem>
                                                </MDBListGroup>
                                                
                                                
                                                {/* <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse
                                                plugin adds the appropriate classes that we use to style each element. These classes control the overall
                                                appeara */}
                                            </MDBAccordionItem>
                                            <MDBAccordionItem collapseId={2} headerTitle='지출'>
                                                <MDBListGroup light>
                                                    <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                                        <div>
                                                            <div className='fw-bold'>30,000</div>
                                                            <div className='text-muted'>NC 장보기</div>
                                                        </div>
                                                        <MDBBadge pill light color='success'>장보기</MDBBadge>
                                                    </MDBListGroupItem>
                                                    <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                                        <div>
                                                        <div className='fw-bold'>12,786</div>
                                                        <div className='text-muted'>톨비</div>
                                                        </div>
                                                        <MDBBadge pill light color='primary'>나들이</MDBBadge>
                                                    </MDBListGroupItem>
                                                    <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                                        <div>
                                                            <div className='fw-bold'>입장료</div>
                                                            <div className='text-muted'>12,000</div>
                                                        </div>
                                                        <MDBBadge pill light color='warning'>나들이</MDBBadge>
                                                    </MDBListGroupItem>
                                                </MDBListGroup>
                                            </MDBAccordionItem>
                                        </MDBAccordion>
                                    )
                                }
                            })()
                        }
                    </MDBModalBody>

                    <MDBModalFooter className='justify-content-center'>
                        <MDBBtn color='secondary' onClick={ () => { GLOBAL_MODAL.detail.callBack( false ); } }>
                            확인
                        </MDBBtn>
                        <MDBBtn onClick={ () => {  } }>
                            등록
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    )
}