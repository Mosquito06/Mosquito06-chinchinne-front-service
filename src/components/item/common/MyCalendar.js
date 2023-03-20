import React, { useRef, useState, useContext, useEffect } from 'react';
import AccountApi from 'api/AccountApi';
import MyDate from 'components/item/common/MyDate';
import { GlobalContext } from 'context/GlobalContext';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { COMMON_DATE_STATUS, COMMON_QUERY_KEYS, COMMON_ERROR_CODE } from 'module/CommonCode';

function MyCalendar( { year, month, time })
{
    // Global State
    const { GLOBAL_TOKEN, GLOBAL_MONEY } = useContext(GlobalContext);
    
    // Query State
    const [queryKey, setQueryKey] = useState([ COMMON_QUERY_KEYS.SEARCH_ACCOUNT, { pathString : GLOBAL_TOKEN.token.uuid + '/' + time + '/accounts'} ])

    // Search State
    const [search, setSearch] = useState(
    {
         keys : queryKey
        ,isFetch : true
    })
    
    // Date State
    const [date, setDate] = useState(
    {
         list : []
        ,data : []
    });
    
    // Search Query
    const SearchAccountQuery = AccountApi.useSearchAccount(
    {
        queryOptions : 
        {
             keys: search.keys
            ,success : ( res ) =>
            {
                const TOTAL = res.data.reduce( ( sum, cur ) =>
                {
                    return sum += cur.expenseTotal;
                }, 0 )

                GLOBAL_MONEY.setMoney( prevState => (
                {
                     ...prevState
                    ,expense : TOTAL
                }))
                
                setDate( prevState => (
                {
                     ...prevState
                    ,data : res.data
                }))
                
                createCalendar();
            }
            ,settle : () =>
            {
                // setSearch( prevState => (
                // {
                //      ...prevState
                //     ,isFetch : false
                    
                // }));
            }
            ,isEnabled : search.isFetch
        }
    })
    
    const createCalendar = () =>
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

        setDate( prevState => (
        {
             ...prevState
            ,list : list
        }));
    }

    useEffect( () =>
    {   
        setQueryKey( prevState => 
        {
            let keys = [...prevState];
            keys[1].pathString = GLOBAL_TOKEN.token.uuid + '/' + time + '/accounts';

            return keys;
        });

    }, [ time ])

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
                    const tmp = [...date.list];
                    let elments = [], list = [];
                    let isStart = false;

                    for(let i = 0; i < date.list.length; i++)
                    {
                        if( date.list[i] === 1 )
                        {
                            isStart = true;
                        }
                        
                        const displayData = date.data.filter( row => 
                        {
                            return Number(row.month) === ( month + 1 ) && Number(row.day) === date.list[i]
                        })
                        
                        list.push
                        (
                            <MyDate key={ 'cal_date_' + ( !isStart ? ( month - 1 ) : month ) + '_' + date.list[i] } 
                                    status={ !isStart ? COMMON_DATE_STATUS.PREV : COMMON_DATE_STATUS.CUR }
                                    date={ date.list[i] }
                                    time={ isStart ? new Date(year, month, date.list[i]).getTime() : 0 }
                                    income={ displayData.length > 0 ? displayData[0].incomeTotal : null }
                                    expense={ displayData.length > 0 ? displayData[0].expenseTotal : null }
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