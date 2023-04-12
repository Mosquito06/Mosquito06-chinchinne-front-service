import React, { useRef, useState, useContext } from 'react';
import CategoryApi from 'api/CategoryApi';
import { GlobalContext } from 'context/GlobalContext';
import MyCategory from 'components/item/setting/MyCategory';
import MyAddCategoryModal from 'components/modal/MyAddCategoryModal';
import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { MDBTable, MDBTableHead, MDBTableBody, MDBCheckbox } from 'mdb-react-ui-kit';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBCardFooter } from 'mdb-react-ui-kit';
import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
import { COMMON_QUERY_KEYS } from 'module/CommonCode';

function MyCategories()
{
    // Global State
    const { GLOBAL_TOKEN } = useContext(GlobalContext);

    // Search State
    const [search, setSearch] = useState(
    {
         keys : [ COMMON_QUERY_KEYS.SEARCH_CATEGORIES, { pathString : GLOBAL_TOKEN.token.uuid, queryString : 'page=' + 1 } ]
        ,enabled : true 
        ,keywords : '' 
        ,compRef : useRef([])
    })
    
    // Categories State
    const [categories, setCategories] = useState(
    {
         list : []
        ,total : 0
        ,totalPage : 0
        ,page : 1
        ,perPage : 10
    });

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
             keys: search.keys
            ,success : ( res ) =>
            {
                console.log( res) ;
                
                setCategories( prevState => (
                {
                     ...prevState
                    ,list : res.data.categories
                    ,total : res.data.total
                    ,totalPage : res.data.totalPage
                    ,page : res.data.page
                    ,perPage : res.data.perPage
                }));
            }
            ,settle : () => 
            {
                setSearch( prevState => (
                {
                     ...prevState
                    ,enabled : false
                }))
            }
            ,isEnabled : search.enabled
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

    // Paging Click Events
    const onPagingClicked = ( e ) =>
    {
        const page = e.target.getAttribute('page') ?? 1;
        
        setSearch( prevState => (
        {
                ...prevState
            ,keys : [ COMMON_QUERY_KEYS.SEARCH_CATEGORIES, { pathString : GLOBAL_TOKEN.token.uuid, queryString : 'keywords=' + search.keywords + '&page=' + page } ]
            ,enabled : true
        }))
    }

    return (
        <>
            <MDBCard className='h-100'>
                <MDBCardHeader className='d-flex justify-content-end align-items-center p-4'>
                    <MDBInput   label='검색' 
                                type='text' 
                                value={ search.keywords } 
                                ref={ el => search.compRef.current[0] = el }
                                onChange=
                                {
                                    (e) =>
                                    {
                                        setSearch( prevState => (
                                        {
                                             ...prevState
                                            ,keywords : e.target.value
                                        }))  
                                    }
                                }
                    />
                    <MDBBtn className='ms-1'
                            color='secondary'
                            onClick=
                            {
                                () =>
                                {
                                   setSearch( prevState => (
                                    {
                                         ...prevState
                                        ,keys : [ COMMON_QUERY_KEYS.SEARCH_CATEGORIES, { pathString : GLOBAL_TOKEN.token.uuid, queryString : 'keywords=' + search.keywords + '&page=' + 1 } ]
                                        ,enabled : true
                                    }))
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
                                categories.list.map( category => 
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
                <MDBCardFooter className=''>
                    <MDBPagination end className='mb-0'>
                        <MDBPaginationItem  disabled={ categories.page > 1 ? false : true } 
                                            style={{cursor : categories.page > 1 ? 'pointer' : 'not-allowed'}}
                        >
                            <MDBPaginationLink  aria-disabled={ categories.page > 1 ? 'false' : 'true' }
                                                onClick={ onPagingClicked }
                                                page={ categories.page - 1 }
                            >
                                Previous
                            </MDBPaginationLink>
                        </MDBPaginationItem>
                        {
                            (() =>
                            {
                                const elments = [];
                                
                                for(var i = 1; i <= categories.totalPage; i++ )
                                {
                                    if( i === categories.page )
                                    {
                                        elments.push
                                        (
                                            <MDBPaginationItem key={i} active aria-current='page' style={{cursor : 'pointer'}}>
                                                <MDBPaginationLink page={ i } onClick={ onPagingClicked }>
                                                    {i} <span className='visually-hidden'>(current)</span>
                                                </MDBPaginationLink>
                                            </MDBPaginationItem>
                                        )   
                                    }
                                    else
                                    {
                                        elments.push
                                        (
                                            <MDBPaginationItem key={i} style={{cursor : 'pointer'}}>
                                                <MDBPaginationLink page={ i } onClick={ onPagingClicked }>{i}</MDBPaginationLink>
                                            </MDBPaginationItem>
                                        )
                                    }
                                }

                                return elments;
                            })()
                        }
                        <MDBPaginationItem  disabled={ categories.page < categories.totalPage ? false : true } 
                                            style={{cursor : categories.page < categories.totalPage ? 'pointer' : 'not-allowed'}}
                        >
                            <MDBPaginationLink  aria-disabled={ categories.page < categories.totalPage ? 'false' : 'true' }
                                                onClick={ onPagingClicked }
                                                page={ categories.page + 1 }
                            >
                                Next
                            </MDBPaginationLink>
                        </MDBPaginationItem>
                    </MDBPagination>
                </MDBCardFooter>
            </MDBCard>

            <MyAddCategoryModal isVisible={visible} setVisible={setVisible} target={target} setTarget={ setTarget } />
        </>
    )
}

export default MyCategories;