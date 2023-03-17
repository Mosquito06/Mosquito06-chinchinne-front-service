import React, { useEffect, useState, useContext } from 'react';
import { CommaFormatter } from 'module/Common';
import { GlobalContext } from 'context/GlobalContext';
import { MDBIcon, MDBInput, MDBInputGroup, MDBCol } from 'mdb-react-ui-kit';

function Header()
{
    const { GLOBAL_MONEY } = useContext(GlobalContext);
    
    return (
        <>
            <MDBCol className='col-9 d-flex justify-content-center align-items-center'>
                <div>
                    <MDBInputGroup className=''>
                        {/* <span className="h4">생활비</span> */}
                        <span className='input-group-text'>잔액</span>
                        <input className='form-control' placeholder='' type='number' disabled/>
                        <span className='input-group-text'>지출</span>
                        <input className='form-control text-end' type='text' value={ CommaFormatter(GLOBAL_MONEY.money.expense) } disabled/>
                    </MDBInputGroup>
                </div>
            </MDBCol>
            <MDBCol className='d-flex justify-content-end align-items-center'>
                <MDBIcon className='' icon='tools' size='lg' style={{ opacity : '70%', cursor : 'pointer' }} 
                         onMouseOver={ ( { target } ) => target.style.opacity = '100%' }
                         onMouseLeave={ ( { target } ) => target.style.opacity = '70%' }
                         onClick=
                         { 
                            () =>
                            {
                                console.log('설정 페이지!');
                            }
                         }
                />
                
                <button type="button" className="btn btn-primary ms-3">
                    LogOut
                </button>    
            </MDBCol>
        </> 
    )
}

export default Header;