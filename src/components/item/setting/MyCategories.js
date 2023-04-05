import React, { useRef, useState, useContext, useEffect } from 'react';
import CategoryApi from 'api/CategoryApi';
import { GlobalContext } from 'context/GlobalContext';
import { MDBInput, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { MDBTable, MDBTableHead, MDBTableBody, MDBCheckbox } from 'mdb-react-ui-kit';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter } from 'mdb-react-ui-kit';
import { COMMON_QUERY_KEYS, COMMON_YN, COMMON_STATUS } from 'module/CommonCode';
import MyCategory from './MyCategory';

function MyCategories()
{
    // Global State
    const { GLOBAL_TOKEN, GLOBAL_MONEY } = useContext(GlobalContext);

    // Categories State
    const [categories, setCategoreis] = useState([]);

    // Checked State
    const [isChecked, setChecked] = useState(false);

    // Search Query
    const SearchCategoryQuery = CategoryApi.useSearchCategories(
    {
        queryOptions : 
        {
             keys: [ COMMON_QUERY_KEYS.SEARCH_CATEGORIES, { pathString : GLOBAL_TOKEN.token.uuid } ]
            ,success : ( res ) =>
            {
                setCategoreis(res.data);
            }
            ,settle : () => {}
            ,isEnabled : true
        }
    })

    return (
        <MDBCard className='h-100'>
            <MDBCardHeader className='d-flex justify-content-end  align-items-center p-4'>
                {/* <MDBInput label='Amount' id='typeNumber' type='text' name='amount' value={ account.amount } onChange={ onAccountChanged } ref={ el => compRef.current[2] = el }/> */}
                <MDBInput label='검색' id='typeNumber' type='text' name='amount'/>
                <MDBBtn className='m-1'
                        onClick=
                        {
                            () =>
                            {

                            }
                        }
                >
                    <MDBIcon fab icon='plus' />
                </MDBBtn>
            </MDBCardHeader>
            <MDBCardBody >
                <MDBTable className='text-center'>
                    <MDBTableHead className='fLn_Bd'>
                        <tr>
                            <th scope='col'>
                                <MDBCheckbox checked={isChecked} onChange={ (e) => { setChecked( e.target.checked ) } } />
                            </th>
                            <th scope='col'>카테고리 ID</th>
                            <th scope='col'>카테고리 명</th>
                            <th scope='col'>색상</th>
                            <th scope='col'>등록일시</th>
                            <th scope='col'>수정일시</th>
                            <th scope='col'>수정</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody className=''>
                        {
                            categories.map( category => 
                            {
                                return (
                                    < MyCategory    key={ category.id }
                                                    checked={ isChecked }
                                                    id={ category.id }
                                                    name={ category.name }
                                                    color={ category.color }
                                                    regDate={ category.regDate }
                                                    modDate={ category.modDate }
                                    />
                                )
                            })
                        }
                    </MDBTableBody>
                </MDBTable>
            </MDBCardBody>
        </MDBCard>
    )
}

export default MyCategories;