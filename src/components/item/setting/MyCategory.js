import React, { useRef, useState, useContext, useEffect } from 'react';
import CategoryApi from 'api/CategoryApi';
import { GlobalContext } from 'context/GlobalContext';
import { DateFormatter } from 'module/Common';
import { COMMON_QUERY_KEYS, COMMON_YN, COMMON_STATUS } from 'module/CommonCode';
import { MDBCheckbox, MDBBtn, MDBIcon, MDBInput } from 'mdb-react-ui-kit';

function MyCategory({ checked, id, name, color, regDate, modDate })
{
    // Global State
    const { GLOBAL_TOKEN, GLOBAL_MONEY } = useContext(GlobalContext);

    const [isChecked, setChecked] = useState(checked);

    useEffect( () =>
    {
        
        setChecked(checked);
    
    }, [checked])

    return (
        <tr>
            <td scope='row'><MDBCheckbox checked={isChecked} onChange={ (e) => { setChecked( e.target.checked ) }} /></td>
            <td>{id}</td>
            <td>{name}</td>
            <td>
                <div className='d-flex justify-content-center align-items-center'>
                    <div className='w-50'>
                        <MDBInput className='' type='color' value={ color ? '#' + color : '' }/>
                    </div>
                </div>
            </td>
            <td>{ DateFormatter(regDate, 'YYYY년 MM월 DD일 HH:mm') }</td>
            <td>{ modDate ? DateFormatter(modDate, 'YYYY년 MM월 DD일 HH:mm') : '' }</td>
            <td>
                <MDBBtn tag='a' color='none' className='m-1'>
                    <MDBIcon icon='edit' size='lg' />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-1'>
                    <MDBIcon icon='trash-alt' size='lg' />
                </MDBBtn>
            </td>
        </tr>
    )
}

export default MyCategory;