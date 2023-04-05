import React, { useEffect, useState, useContext } from 'react';
import MyNavbar from 'components/item/common/MyNavbar';
import { useNavigate } from 'react-router-dom'; 
import { GlobalContext } from 'context/GlobalContext';
import { MDBNavbar, MDBContainer, MDBIcon, MDBCol } from 'mdb-react-ui-kit';

function Header()
{
    // Global State
    const { GLOBAL_TOKEN } = useContext(GlobalContext);
    
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
                <MDBContainer fluid className='d-flex justify-content-center align-items-center'>
                    <MDBCol className='d-flex justify-content-end align-items-center'>
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
                                    icon='gear' 
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
                                    icon='door-open' 
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