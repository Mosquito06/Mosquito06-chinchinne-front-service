import React, { useEffect, useState } from 'react';
import { COMMON_TEXT } from 'module/CommonCode';
import MyCalendar from 'components/item/common/MyCalendar';
import { MDBRow, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle  } from 'mdb-react-ui-kit';

function Left()
{
    const [calendar, setCalendar] = useState(
    {
         year : new Date().getFullYear()
        ,month : new Date().getMonth()
        ,time : new Date().getTime()
    })

    // 달력 변경 이벤트
    const onCalendarChanged = e =>
    {
        
    }
    
    return (
        <>
            <MDBRow style={{ height : '5%'}} >
                <div style={{ display : 'inline-flex'}}>
                    <MDBDropdown>
                        <MDBDropdownToggle>{ calendar.year  + COMMON_TEXT.YEAR }</MDBDropdownToggle>
                        <MDBDropdownMenu>
                            <MDBDropdownItem childTag='button' className='dropdown-item'>Action</MDBDropdownItem>
                            <MDBDropdownItem childTag='button' className='dropdown-item'>Another action</MDBDropdownItem>
                            <MDBDropdownItem childTag='button' className='dropdown-item'>Something else here</MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                    <MDBDropdown style={{marginLeft : '0.5rem'}}>
                        <MDBDropdownToggle>{ ( calendar.month + 1 ) + COMMON_TEXT.MONTH }</MDBDropdownToggle>
                        <MDBDropdownMenu onClick=
                                         {
                                            e =>
                                            {
                                                const curDate = new Date(new Date().setMonth(Number(e.target.value)));
                                                
                                                setCalendar( prevState => (
                                                {
                                                     ...prevState
                                                    ,month : curDate.getMonth()
                                                    ,time : curDate.getTime()
                                                }))
                                            }
                                         }
                        >
                            {
                                (() =>
                                {
                                    const month = [];
                                    
                                    for(let i = 0; i < 12; i++)
                                    {
                                        month.push
                                        (
                                            <MDBDropdownItem key={i} childTag='button' className={'dropdown-item' + ( calendar.month === i ? ' active' : '' ) } value={i}>{ i + 1 + COMMON_TEXT.MONTH }</MDBDropdownItem>
                                        )
                                    }

                                    return month;
                                })()
                            }
                        </MDBDropdownMenu>
                    </MDBDropdown>
                </div>
            </MDBRow>
            
            <MDBRow className='' style={{ height : '95%'}}>
                <MyCalendar year={ calendar.year } month={ calendar.month } time={ calendar.time }/>
            </MDBRow>
        </>
    )
}

export default Left;
