import React, { useRef, useState, useContext, useEffect } from 'react';
import GeneralApi from 'api/GeneralApi';
import AccountApi from 'api/AccountApi';
import MyDate from 'components/item/common/MyDate';
import { GlobalContext } from 'context/GlobalContext';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { COMMON_DATE_STATUS, COMMON_QUERY_KEYS, COMMON_ERROR_CODE } from 'module/CommonCode';

function MyCalendar( { year, month, time })
{
    // Global State
    const { GLOBAL_TOKEN, GLOBAL_MONEY } = useContext(GlobalContext);

    // Const Variables
    const LAST_MONTH = new Date(year, month, 0);
    const CURRENT_MONTH_START = new Date(year, month, 1);
    const CURRENT_MONTH_END = new Date(year, month + 1, 0);
    const NEXT_MONTH = new Date(year, month + 1, 1);

    // Search State
    const [search, setSearch] = useState(
    {
         keys : [ COMMON_QUERY_KEYS.SEARCH_ACCOUNTS, { pathString : GLOBAL_TOKEN.token.uuid + '/' + time } ]
        ,isFetch : false
    })
    
    // Date State
    const [date, setDate] = useState(
    {
         list : []
        ,data : []
    });

    // Search General Query
    const SearchGeneralQuery = GeneralApi.useSearchGeneral(
    {
        queryOptions : 
        {
             keys: [ COMMON_QUERY_KEYS.SEARCH_GENERAL, { pathString : GLOBAL_TOKEN.token.uuid } ]
            ,success : ( res ) =>
            {
                GLOBAL_MONEY.setMoney( prevState => (
                {
                     ...prevState
                    ,budget : res.data.budget 
                    ,balance : res.data.budget - prevState.expense
                }))
            }
            ,settle : () => {}
            ,isEnabled : true
        }
    })
    
    // Search Account Query
    const SearchAccountQuery = AccountApi.useSearchAccounts(
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
                    ,balance : prevState.budget - TOTAL 
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
        const list = [];

        let pos = CURRENT_MONTH_START.getDay();
        
        for(let i = 0; pos > 0; pos--, i++)
        {
            list[pos - 1] = LAST_MONTH.getDate() - i;
        }

        for(let i = 0; i < CURRENT_MONTH_END.getDate(); i++)
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
        setSearch(
        {
             keys : [ COMMON_QUERY_KEYS.SEARCH_ACCOUNTS, { pathString : GLOBAL_TOKEN.token.uuid + '/' + time } ]
            ,isFetch : true
        })

    }, [ time ])

    return (
        <MDBContainer className={'w-100 h-100 m-0 p-0'}>
            <MDBRow className='text-center square border' >
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
                                    time={ isStart ? new Date(year, month, date.list[i]).getTime() : new Date(LAST_MONTH.getFullYear(), LAST_MONTH.getMonth(), date.list[i]).getTime() }
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
                                                            time={ new Date(NEXT_MONTH.getFullYear(), NEXT_MONTH.getMonth(), next).getTime()}
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