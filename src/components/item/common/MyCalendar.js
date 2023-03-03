import React, { useRef, useState, useContext, useEffect } from 'react';
import MyDate from 'components/item/common/MyDate';
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

        console.log(list);

        setDate(list);
    }

    useEffect( () =>
    {   
        init();

    }, [])
    
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

                    for(let i = 0; i < date.length; i++)
                    {
                        list.push
                        (
                            <MyDate date={ date[i] }/>
                        )

                        tmp.pop();

                        if( list.length === 7 || tmp.length === 0 )
                        {
                            elments.push
                            (
                                <MDBRow className='square border-start border-bottom border-end' style={ { height : '15%'} }>
                                    {
                                        (() => 
                                        {
                                            let repeat = 7 - list.length;

                                            while( repeat > 0 )
                                            {
                                                list.push
                                                (
                                                    <MyDate />
                                                );
                                                
                                                repeat--;
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