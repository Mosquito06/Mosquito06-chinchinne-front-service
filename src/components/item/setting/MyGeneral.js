import React, { useRef, useState, useContext, useEffect } from 'react';
import GeneralApi from 'api/GeneralApi';
import { GlobalContext } from 'context/GlobalContext';
import MyBudget from 'components/item/setting/MyBudget';
import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { MDBTable, MDBTableBody } from 'mdb-react-ui-kit';
import { COMMON_QUERY_KEYS, COMMON_YN, COMMON_STATUS } from 'module/CommonCode';

function MyGeneral()
{
    // Global State
    const { GLOBAL_TOKEN, GLOBAL_MONEY } = useContext(GlobalContext);

    // General State
    const [general, setGeneral] = useState(
    {
        budget : 0
    })

    // Search Query
    const SearchGeneralQuery = GeneralApi.useSearchGeneral(
    {
        queryOptions : 
        {
             keys: [ COMMON_QUERY_KEYS.SEARCH_GENERAL, { pathString : GLOBAL_TOKEN.token.uuid } ]
            ,success : ( res ) =>
            {
                setGeneral( prevState => (
                {
                     ...prevState
                    ,budget : res.data.budget
                }));
            }
            ,settle : () => {}
            ,isEnabled : true
        }
    })

    return (
        <div className='h-100 w-100 d-flex justify-content-center align-items-center'>
            <MDBCard className='h-100 w-50 m-0 p-0'>
                <MDBCardBody className='p-3 pe-2'>
                    <MDBTable className='text-center'>
                        <MDBTableBody className=''>
                            <MyBudget value={ general.budget }/>
                        </MDBTableBody>
                    </MDBTable>
                </MDBCardBody>
            </MDBCard>
        </div>        
    )
}

export default MyGeneral;