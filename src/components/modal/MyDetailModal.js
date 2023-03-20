import React, { useRef, useState, useEffect } from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';

export default ({ isVisible, setVisible, time }) => 
{
//    const [show, setShow] = useState(isVisible)
    
    //useState(false);

    // useEffect(() =>
    // {
    //     if( !isVisible )
    //     {
    //         setVisible()
    //     }

    // }, [isVisible])
    
    return (
        <MDBModal   show={ isVisible } 
                    setShow={ setVisible }
                    closeOnEsc={ true }  
                    // onShow={ () => { console.log('show')}}
                    //onHidePrevented={ () => { console.log('hide')}}
                    //nonInvasive={true}
                    tabIndex='-1'
                    //onToggle={ () => { console.log("??")}}
        >
            <MDBModalDialog size="lg">
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>타이틀</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none'  > 
                        {/* onClick={ () => setShow( false ) } */}
                        </MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>내용</MDBModalBody>

                    <MDBModalFooter>
                        <MDBBtn color='secondary'
                                //onClick={ () => setShow( false ) }
                        >
                            Close
                        </MDBBtn>
                        {/* {
                            (() =>
                            {
                                if( GLOBAL_MODAL.modal.isConfirm )
                                {
                                    return <MDBBtn onClick={ () => { GLOBAL_MODAL.modal.callBack( true ); } } >Save changes</MDBBtn>;
                                }

                            })()
                        } */}
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    )
}