import React, { useEffect, useState, useContext } from 'react';
import MyNavbar from 'components/item/common/MyNavbar';
import { CommaFormatter } from 'module/Common';
import { useNavigate } from 'react-router-dom'; 
import { GlobalContext } from 'context/GlobalContext';
import { MDBNavbar, MDBContainer, MDBIcon, MDBInputGroup, MDBCol } from 'mdb-react-ui-kit';
import { MDBCard, MDBCardHeader } from 'mdb-react-ui-kit';

function Header()
{
    // Global State
    const { GLOBAL_TOKEN, GLOBAL_MONEY } = useContext(GlobalContext);
    
    // Naavigate
    const navigate = useNavigate();
    
    const onLogOutClicked = () =>
    {
        // 추후 token 만료 처리 요청 필요(임시 로그아웃 구현)

        sessionStorage.setItem('ref-token', null );
        GLOBAL_TOKEN.setToken( null );

        navigate('/');
    }

    return (
        <>
            <MDBNavbar expand='lg' light bgColor='white' className='h-100'>
                <MDBContainer fluid className=''>
                    <MDBCol className='d-flex justify-content-center align-items-center' >
                        <MDBCard className='w-25'> 
                            {
                                (() =>
                                {
                                    const PATH_NAME = window.location.pathname.replace('/', '');
                                    
                                    if( PATH_NAME !== 'setting')
                                    {
                                        return (
                                            <MDBCardHeader className='p-0'>
                                                <MDBInputGroup className=''>
                                                    <span className='input-group-text'>잔액</span>
                                                    <input className='form-control' placeholder='' type='number' disabled/>
                                                    <span className='input-group-text'>지출</span>
                                                    <input className='form-control text-end' type='text' value={ CommaFormatter(GLOBAL_MONEY.money.expense) } disabled/>
                                                </MDBInputGroup>
                                            </MDBCardHeader>
                                            // <div>
                                            //     <MDBInputGroup className=''>
                                            //         {/* <span className="h4">생활비</span> */}
                                            //         <span className='input-group-text'>잔액</span>
                                            //         <input className='form-control' placeholder='' type='number' disabled/>
                                            //         <span className='input-group-text'>지출</span>
                                            //         <input className='form-control text-end' type='text' value={ CommaFormatter(GLOBAL_MONEY.money.expense) } disabled/>
                                            //     </MDBInputGroup>
                                            // </div>
                                        )
                                    }
                                })()
                            }
                        </MDBCard>
                    </MDBCol>
                    <MDBCol className='col-1 d-flex justify-content-end align-items-center'>
                        <MDBIcon    className='me-3' 
                                    icon='home' 
                                    size='lg' 
                                    style={{ opacity : '70%', cursor : 'pointer' }} 
                                    onMouseOver={ ( { target } ) => target.style.opacity = '100%' }
                                    onMouseLeave={ ( { target } ) => target.style.opacity = '70%' }
                                    onClick=
                                    { 
                                        () =>
                                        {
                                            navigate('/')
                                        }
                                    }
                        />
                        <MDBIcon    className='me-3' 
                                    icon='cogs' 
                                    size='lg' 
                                    style={{ opacity : '70%', cursor : 'pointer' }} 
                                    onMouseOver={ ( { target } ) => target.style.opacity = '100%' }
                                    onMouseLeave={ ( { target } ) => target.style.opacity = '70%' }
                                    onClick=
                                    { 
                                        () =>
                                        {
                                            navigate('/setting')
                                        }
                                    }
                        />
                        <MDBIcon    className='' 
                                    icon='walking' 
                                    size='lg' 
                                    style={{ opacity : '70%', cursor : 'pointer' }} 
                                    onMouseOver={ ( { target } ) => target.style.opacity = '100%' }
                                    onMouseLeave={ ( { target } ) => target.style.opacity = '70%' }
                                    onClick={onLogOutClicked}
                        />
                    </MDBCol>
                </MDBContainer>
            </MDBNavbar>
        </> 
    )
}

export default Header;