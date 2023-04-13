import React, { useState, useContext, useLayoutEffect } from 'react';
import { CommaFormatter } from 'module/Common';
import { COMMON_TEXT } from 'module/CommonCode';
import { GlobalContext } from 'context/GlobalContext';
import MyCalendar from 'components/item/common/MyCalendar';
import MyAccountModal from 'components/modal/MyAccountModal';

import { MDBCard, MDBCardHeader, MDBCardBody } from 'mdb-react-ui-kit';
import { MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBInputGroup } from 'mdb-react-ui-kit';

function Left()
{
    // Global State
    const { GLOBAL_MONEY, GLOBAL_DATE } = useContext(GlobalContext);
    
    // Calendar State
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

    useLayoutEffect( () =>
    {
        GLOBAL_DATE.setDate( prevState => (
        {
             ...prevState
            ,year : calendar.year
            ,month : calendar.month
            ,time : calendar.time
        }))

    }, [ calendar ])
    
    return (
        <>
            <MDBCard className='w-100 h-100 m-0'> 
                <MDBCardHeader className='d-flex align-items-center position-relative'>
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
                                                    const curDate = new Date( calendar.year, Number(e.target.value));
                                                    
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
                    <MDBInputGroup className='w-50 me-4 position-absolute end-0'>
                        <span className='input-group-text'>잔액</span>
                        <input className='form-control text-end' placeholder='' type='text' value={ CommaFormatter(GLOBAL_MONEY.money.balance) } disabled/>
                        <span className='input-group-text'>지출</span>
                        <input className='form-control text-end' type='text' value={ CommaFormatter(GLOBAL_MONEY.money.expense) } disabled/>
                    </MDBInputGroup>
                </MDBCardHeader>
                <MDBCardBody className='d-flex justify-content-center'>
                    <MyCalendar year={ calendar.year } month={ calendar.month } time={ calendar.time }/>
                </MDBCardBody>
            </MDBCard>
            <MyAccountModal />
        </>
    )
}

export default Left;
