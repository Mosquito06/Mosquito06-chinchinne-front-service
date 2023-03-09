import React, { useRef, useState, useContext, useEffect } from 'react';
import MyDate from 'components/item/common/MyDate';
import { COMMON_DATE_STATUS } from 'module/CommonCode';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

function MyCalendar( { year, month })
{
    const [date, setDate] = useState([]);
    
    const init = () =>
    {
        const lastM = new Date(year, month, 0);
        const curStart = new Date(year, month, 1);
        const curEnd = new Date(year, month + 1, 0);
        const list = [];

        let pos = curStart.getDay();
        
        for(let i = 0; pos > 0; pos--, i++)
        {
            list[pos - 1] = lastM.getDate() - i;
        }

        for(let i = 0; i < curEnd.getDate(); i++)
        {
            list.push(i + 1);
        }

        setDate(list);
    }

    useEffect( () =>
    {   
        init();

    }, [ year, month ])

    return (
        <MDBContainer className={'h-100 square border-top'}>
            <MDBRow className='text-center square border-start border-bottom border-end' >
                <MDBCol>Sun</MDBCol>
                <MDBCol>Mon</MDBCol>
                <MDBCol>Tue</MDBCol>
                <MDBCol>Wed</MDBCol>
                <MDBCol>Thu</MDBCol>
                <MDBCol>Fri</MDBCol>
                <MDBCol>Sat</MDBCol>
            </MDBRow>
            {
                (() =>
                {
                    const tmp = [...date];
                    let elments = [], list = [];
                    let isStart = false;

                    for(let i = 0; i < date.length; i++)
                    {
                        if( date[i] === 1 )
                        {
                            isStart = true;
                        }                        
                        
                        list.push
                        (
                            <MyDate key={ 'cal_date_' + ( !isStart ? ( month - 1 ) : month ) + '_' + date[i] } 
                                    status={ !isStart ? COMMON_DATE_STATUS.PREV : COMMON_DATE_STATUS.CUR }
                                    date={ date[i] }
                            />
                        )

                        tmp.pop();

                        if( list.length === 7 || tmp.length === 0 )
                        {
                            elments.push
                            (
                                <MDBRow key={ 'cal_row_' + elments.length } className='square border-start border-bottom border-end' style={ { height : '15.5%'} }>
                                    {
                                        (() => 
                                        {
                                            let repeat = 7 - list.length;
                                            let next = 1;

                                            while( repeat > 0 )
                                            {
                                                list.push
                                                (
                                                    <MyDate key={ 'cal_date_' + ( month + 1 ) + '_' + next } 
                                                            status={ COMMON_DATE_STATUS.NEXT } 
                                                            date={ next }
                                                    />
                                                );
                                                
                                                repeat--;
                                                next++;
                                            }

                                            return list.map( myDate =>
                                            {
                                                return myDate;
                                            })
                                        })()
                                    }
                                </MDBRow>
                            )

                            list = [];
                        }
                    }

                    return elments;
                })()
            }
        </MDBContainer>
    )
}

export default MyCalendar;