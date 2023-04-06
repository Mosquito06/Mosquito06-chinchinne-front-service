import React, { useRef, useState, useContext, useEffect } from 'react';
import CategoryApi from 'api/CategoryApi';
import { GlobalContext } from 'context/GlobalContext';
import MyCategory from 'components/item/setting/MyCategory';
import MyAddCategoryModal from 'components/modal/MyAddCategoryModal';
import { MDBInput, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { MDBTable, MDBTableHead, MDBTableBody, MDBCheckbox } from 'mdb-react-ui-kit';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter } from 'mdb-react-ui-kit';
import { COMMON_QUERY_KEYS, COMMON_YN, COMMON_STATUS } from 'module/CommonCode';

function MyCategories()
{
    // Global State
    const { GLOBAL_TOKEN, GLOBAL_MONEY } = useContext(GlobalContext);

    // Categories State
    const [categories, setCategoreis] = useState([]);

    // Checked State
    const [checked, setChecked] = useState(
    {
         list : []
        ,isChecked : false
    });

    // Visible State
    const [visible, setVisible] = useState( false );

    // Target State
    const [target, setTarget] = useState( 0 );

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

    // CheckBox Chnaged Events
    const onCheckChanged = ( isChecked, id ) =>
    {
        if( isChecked )
        {
            const category = categories.filter( category => 
            {
                return category.id === id;
            })[0];
            
            setChecked( prevState => (
            {
                ...prevState
                ,list : [...prevState.list, category]
            }));
        }
        else
        {
            setChecked( prevState => (
            {
                ...prevState
                ,list : prevState.list.filter( category => 
                {
                    return category.id === id ? false : true;
                })
            }));
        }
    }

    // Category Click Events
    const onCategoryClicked = ( id ) =>
    {
        setVisible( true );
        setTarget( id );
    }

    return (
        <>
            <MDBCard className='h-100'>
                <MDBCardHeader className='d-flex justify-content-end  align-items-center p-4'>
                    {/* <MDBInput label='Amount' id='typeNumber' type='text' name='amount' value={ account.amount } onChange={ onAccountChanged } ref={ el => compRef.current[2] = el }/> */}
                    <MDBInput label='검색' id='typeNumber' type='text' name='amount'/>
                    <MDBBtn className='ms-1'
                            color='secondary'
                            onClick=
                            {
                                () =>
                                {

                                }
                            }
                    >
                        조회
                    </MDBBtn>
                    <MDBBtn className='ms-1 me-1' 
                            onClick=
                            {
                                () =>
                                {
                                    setVisible( true );
                                }
                            }
                    >
                        등록
                    </MDBBtn>
                    <MDBBtn className=''
                            color='danger'
                            onClick=
                            {
                                () =>
                                {
                                    console.log( checked.list )
                                }
                            }
                    >
                        삭제
                    </MDBBtn>
                </MDBCardHeader>
                <MDBCardBody className='pt-0'>
                    <MDBTable className='text-center'>
                        <MDBTableHead className='fLn_Bd'>
                            <tr>
                                <th scope='col' style={ {width : '5%'} }>
                                    <MDBCheckbox    checked={checked.isChecked} 
                                                    onChange=
                                                    { 
                                                        (e) => 
                                                        { 
                                                            setChecked( prevState => (
                                                            {
                                                                ...prevState
                                                                ,isChecked : e.target.checked
                                                                ,list : categories.filter( category =>
                                                                {
                                                                    return e.target.checked
                                                                })
                                                            }))
                                                        }
                                                    } 
                                    />
                                </th>
                                <th scope='col' style={ {width : '16.6%'} }>ID</th>
                                <th scope='col' style={ {width : '16.6%'} }>이름</th>
                                <th scope='col' style={ {width : '16.6%'} }>색상</th>
                                <th scope='col' style={ {width : '16.6%'} }>등록일시</th>
                                <th scope='col' style={ {width : '16.6%'} }>수정일시</th>
                                {/* <th scope='col'>수정</th> */}
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody className=''>
                            {
                                categories.map( category => 
                                {
                                    return (
                                        <MyCategory key={ category.id }
                                                    checked={ checked.isChecked }
                                                    id={ category.id }
                                                    name={ category.name }
                                                    color={ category.color }
                                                    regDate={ category.regDate }
                                                    modDate={ category.modDate }
                                                    onCheckChanged={ onCheckChanged }
                                                    onCategoryClicked={ onCategoryClicked }
                                        />
                                    )
                                })
                            }
                        </MDBTableBody>
                    </MDBTable>
                </MDBCardBody>
                <MDBCardFooter>
                    
                </MDBCardFooter>
            </MDBCard>

            <MyAddCategoryModal isVisible={visible} setVisible={setVisible} target={target} setTarget={ setTarget } />
        </>
    )
}

export default MyCategories;