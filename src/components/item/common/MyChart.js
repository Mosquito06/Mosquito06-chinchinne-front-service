import React, { useState, useContext, useEffect } from 'react';
import AccountApi from 'api/AccountApi';
import { ResponsivePie } from '@nivo/pie'; 
import { CommaFormatter } from 'module/Common';
import { GlobalContext } from 'context/GlobalContext';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBCheckbox } from 'mdb-react-ui-kit';
import { COMMON_QUERY_KEYS, COMMON_ACCOUNT_STATUS  } from 'module/CommonCode';

function MyChart()
{
    // Global State
    const { GLOBAL_TOKEN, GLOBAL_DATE } = useContext(GlobalContext);

    // Search State
    const [search, setSearch] = useState(
    {
         keys : []
        ,enabled : false
    })

    // Chart State
    const [chart, setChart] = useState(
    {
         data : []
        ,dataType : COMMON_ACCOUNT_STATUS.EXPENSE
    })
    
    // Search Chart Query
    const SearchChartQuery = AccountApi.useSearchChart(
    {
        queryOptions : 
        {
             keys: search.keys
            ,success : ( res ) =>
            {
                const data = res.data;

                setChart( prevState => (
                {
                     ...prevState
                    ,data : data.filter( row => 
                    {
                        return row.expenseTotal > 0;
                    }).map( ( row, idx ) => 
                    {
                        return {
                             id : row.category
                            ,label : row.category
                            ,value : row.expenseTotal
                            ,color : row.backColor
                        }
                    })
                }))

            }
            ,settle : () =>
            {
                setSearch( prevState => (
                {
                     ...prevState
                    ,enabled : false
                }));
            }
            ,isEnabled : search.enabled
        }
    })

    useEffect( () =>
    {
        if( GLOBAL_DATE.date.time )
        {
            setSearch( prevState => (
            {
                 ...prevState
                ,keys : [ COMMON_QUERY_KEYS.SEARCH_CHART, { pathString : GLOBAL_TOKEN.token.uuid + '/' + GLOBAL_DATE.date.time } ]
                ,enabled : true
            }));    
        }
    }, [ GLOBAL_DATE.date.time ])

    return (
        <MDBCard className='h-100 m-0 p-0'>
            <MDBCardBody className='p-3 pe-2'>
                <ResponsivePie  data={chart.data}
                                valueFormat={ ( value ) => CommaFormatter(value) }
                                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                                innerRadius={0.5}
                                padAngle={0.7}
                                cornerRadius={3}
                                activeOuterRadiusOffset={8}
                                borderWidth={1}
                                borderColor=
                                {
                                    {
                                        from: 'color'
                                        ,modifiers: 
                                        [
                                            [
                                                'darker'
                                                ,0.2
                                            ]
                                        ]
                                    }
                                }
                                arcLinkLabelsSkipAngle={10}
                                arcLinkLabelsTextColor="#333333"
                                arcLinkLabelsThickness={2}
                                arcLinkLabelsColor={{ from: 'color' }}
                                arcLabelsSkipAngle={10}
                                arcLabelsTextColor=
                                {
                                    {
                                         from: 'color'
                                        ,modifiers: 
                                        [
                                            [
                                                'darker'
                                                ,2
                                            ]
                                        ]
                                    }
                                }
                                legends=
                                {
                                    [
                                        {
                                             anchor: 'bottom'
                                            ,direction: 'row'
                                            ,justify: false
                                            ,translateX: 0
                                            ,translateY: 56
                                            ,itemsSpacing: 100 / chart.data.length
                                            ,itemWidth: 50
                                            ,itemHeight: 18
                                            ,itemTextColor: '#999'
                                            ,itemDirection: 'left-to-right'
                                            ,itemOpacity: 1
                                            ,symbolSize: 18
                                            ,symbolShape: 'circle'
                                            ,effects: 
                                            [
                                                {
                                                    on: 'hover'
                                                    ,style: 
                                                    {
                                                        itemTextColor: '#000'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                
                />
            </MDBCardBody>
        </MDBCard>
    )
}

export default MyChart;