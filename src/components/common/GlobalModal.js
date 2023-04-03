import React, { useRef, useContext, useState, useEffect } from 'react';
import { GlobalContext } from 'context/GlobalContext';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';

export default () => 
{
    // context
    const { GLOBAL_MODAL } = useContext(GlobalContext);

    return (
        <MDBModal   show={ GLOBAL_MODAL.modal.isVisible } 
                    //setShow={ () => { setShow( GLOBAL_MODAL.modal.isVisible ) } }
                    closeOnEsc={ true }  
                    staticBackdrop={ true }
                    tabIndex='-1'
        >
            <MDBModalDialog>
            <MDBModalContent>
                <MDBModalHeader>
                <MDBModalTitle>{ GLOBAL_MODAL.modal.text.title }</MDBModalTitle>
                <MDBBtn className='btn-close' 
                        color='none' 
                        onClick=
                        {
                            () =>
                            {
                                GLOBAL_MODAL.setModal( prevState => (
                                {
                                    ...prevState
                                    ,isVisible : false
                                }))
                            }
                        }>
                </MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>{ GLOBAL_MODAL.modal.text.contents }</MDBModalBody>

                <MDBModalFooter>
                <MDBBtn color='secondary'
                        onClick={ () => { GLOBAL_MODAL.modal.callBack( false ); } }
                >
                    Close
                </MDBBtn>
                {
                    (() =>
                    {
                        if( GLOBAL_MODAL.modal.isConfirm )
                        {
                            return <MDBBtn onClick={ () => { GLOBAL_MODAL.modal.callBack( true ); } } >Save changes</MDBBtn>;
                        }

                    })()
                }
                </MDBModalFooter>
            </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    )
}