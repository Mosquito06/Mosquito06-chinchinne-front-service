import React, { useRef, useState, useContext, useEffect } from 'react';
import { DateFormatter } from 'module/Common';
import { MDBCheckbox } from 'mdb-react-ui-kit';

function MyCategory({ checked, id, name, backColor, textColor, regDate, modDate, onCheckChanged, onCategoryClicked })
{
    // Checked State
    const [isChecked, setChecked] = useState(checked);

    useEffect( () =>
    {
        setChecked(checked);

    }, [checked])

    return (
        <tr>
            <td scope='row'>
                <MDBCheckbox    checked={isChecked} 
                                onChange=
                                { 
                                    (e) => 
                                    { 
                                        setChecked( e.target.checked ) 
                                        onCheckChanged( e.target.checked, id );
                                    }
                                }
                />
            </td>
            <td onClick={ () => onCategoryClicked(id) } style={ { cursor : 'pointer' }}>
                {id}
            </td>
            <td onClick={ () => onCategoryClicked(id) } style={ { cursor : 'pointer' }}>
                {name}
            </td>
            <td onClick={ () => onCategoryClicked(id) } style={ { cursor : 'pointer' }}>
                <div className='d-flex justify-content-center align-items-center'>
                    <div>
                        <span   className='d-block square rounded-circle' 
                                style={ { height : '25px', width : '25px', backgroundColor : backColor ? backColor : '#000000'  } }
                        />
                    </div>
                </div>
            </td>
            <td onClick={ () => onCategoryClicked(id) } style={ { cursor : 'pointer' }}>
                <div className='d-flex justify-content-center align-items-center'>
                    <div>
                        <span   className='d-block square rounded-circle' 
                                style={ { height : '25px', width : '25px', backgroundColor : textColor ? textColor : '#000000'  } }
                        />
                    </div>
                </div>
            </td>
            <td onClick={ () => onCategoryClicked(id) } style={ { cursor : 'pointer' }}>
                { DateFormatter(regDate, 'YYYY년 MM월 DD일 HH:mm') }
            </td>
            <td onClick={ () => onCategoryClicked(id) } style={ { cursor : 'pointer' }}>
                { modDate ? DateFormatter(modDate, 'YYYY년 MM월 DD일 HH:mm') : '' }
            </td>
            {/* <td>
                <MDBBtn tag='a' color='none' className='m-1'>
                    <MDBIcon icon='edit' size='lg' />
                </MDBBtn>
                <MDBBtn tag='a' color='none' className='m-1'>
                    <MDBIcon icon='trash-alt' size='lg' />
                </MDBBtn>
            </td> */}
        </tr>
    )
}

export default MyCategory;