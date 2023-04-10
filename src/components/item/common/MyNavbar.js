import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBIcon } from 'mdb-react-ui-kit';
import { COMMON_COLOR_CLASS } from 'module/CommonCode';

function MyNavbar({ })
{
   
// <MDBNavbar expand='lg' light className='bg-white'>
    return (
        <MDBDropdown   className="dropdown">
            <MDBDropdownToggle tag='a' className='hidden-arrow'>
                <MDBIcon    className='' 
                            icon='user-alt' 
                            size='lg' 
                            style={{ opacity : '50%', color: COMMON_COLOR_CLASS.BLACK, cursor : 'pointer' }} 
                            onMouseOver={ ( { target } ) => target.style.opacity = '100%' }
                            onMouseLeave={ ( { target } ) => target.style.opacity = '50%' }
                            onClick=
                            { 
                                () =>
                                {
                                    console.log('설정 페이지!');
                                }
                            }
                />
            </MDBDropdownToggle>
            <MDBDropdownMenu  className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><a className="dropdown-item" href="#">Logout</a></li>
            </MDBDropdownMenu>
        </MDBDropdown>
    )
}

export default MyNavbar;