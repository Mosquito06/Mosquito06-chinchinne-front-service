import React, { useRef, useState, useContext, useLayoutEffect } from 'react';
import CategoryApi from 'api/CategoryApi';
import { useQueryClient   } from 'react-query';
import { GlobalContext } from 'context/GlobalContext';
import { COMMON_QUERY_KEYS, COMMON_STATUS } from 'module/CommonCode';

import { MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';

export default ( { isVisible, setVisible, target, setTarget, onCategoriesChanged } ) => 
{
    // Global State
    const { GLOBAL_MODAL, GLOBAL_TOKEN } = useContext(GlobalContext);

    // Query Client
    const queryClient = useQueryClient();

    // Component Ref
    const compRef = useRef([]);

    // Category State
    const [category, setCategory] = useState(
    {
         id : 0
        ,name : ''
        ,backColor : '#000000'
        ,textColor : '#000000'
    });

    // Search Category Query
    const SearchCategoryQuery = CategoryApi.useSearchCategoryDetail(
    {
        queryOptions : 
        {
             keys: isVisible ? [ COMMON_QUERY_KEYS.SEARCH_CATEGORY, { pathString : GLOBAL_TOKEN.token.uuid + '/category/' + target  } ] : []
            ,success : ( res ) =>
            {
                setCategory( prevState => (
                {
                     ...prevState
                    ,id : res.data.id
                    ,name : res.data.name
                    ,backColor : res.data.backColor
                    ,textColor : res.data.textColor
                }))
            }
            ,settle : () => {}
            ,isEnabled : isVisible && target > 0
        }
    })

    // Add Category Query
    const AddCategoryQuery = CategoryApi.useAddCategory(
    {
        queryOptions :
        {
            success : ( res ) =>
            {
                onCategoriesChanged( COMMON_STATUS.CREATE, 1 );
                setVisible(false);
            }
            ,settle : () => {}
        }
    })

    // Update Category Query
    const UpdateCategoryQuery = CategoryApi.useUpdateCategory(
    {
        queryOptions :
        {
            success : ( res ) =>
            {
                onCategoriesChanged( COMMON_STATUS.UPDATE );
                setVisible(false);
            }
            ,settle : () => {}
        }
    })

     // Delete Category Query
     const DeleteCategoryQuery = CategoryApi.useDeleteCategory(
    {
        queryOptions :
        {
            success : ( res ) =>
            {
                onCategoriesChanged( COMMON_STATUS.DELETE, 1 );
                setVisible(false);
            }
            ,settle : () => {}
        }
    })
    
    // Account Changed Events
    const onCategoryChanged = (e) => 
    {
        setCategory( prevState => (
        {
             ...prevState
            ,[ e.target.name ] : e.target.value
        }))
    }

    useLayoutEffect(() =>
    {
        if( !isVisible )
        {
            setCategory(
            {
                 id : 0
                ,name : ''
                ,backColor : '#000000'
                ,textColor : '#000000'
            });

            setTarget( 0 );
        }
        else
        {
            if( target )
            {
                setCategory( prevState => (
                {
                    ...prevState
                    ,id : target
                }))
            }
        }

    }, [ isVisible ])
    
    return (
        <MDBModal   show={ isVisible }
                    setShow={ setVisible }
                    closeOnEsc={ true }
                    tabIndex='-1'
                    staticBackdrop={ true }

        >
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>카테고리 등록</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' 
                                onClick=
                                { 
                                    () => 
                                    { 
                                        setVisible(false);
                                    } 
                                }
                        /> 
                    </MDBModalHeader>
                    <MDBModalBody>
                        <MDBTable className='text-center'>
                            <MDBTableHead className='fLn_Bd' light>
                                <tr>
                                    <th scope='col' className='w-50'>이름</th>
                                    <th scope='col' className='w-25'>배경색상</th>
                                    <th scope='col' className='w-25'>텍스트색상</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody className=''>
                                <tr>
                                    <td>
                                        <MDBInput label='이름' type='text' name='name' value={ category.name } onChange={ onCategoryChanged } ref={ el => compRef.current[0] = el }/>
                                    </td>
                                    <td>
                                        <MDBInput className='' type='color' name='backColor' value={category.backColor} onChange={ onCategoryChanged } ref={ el => compRef.current[1] = el }/>     
                                    </td>
                                    <td>
                                        <MDBInput className='' type='color' name='textColor' value={category.textColor} onChange={ onCategoryChanged } ref={ el => compRef.current[2] = el }/>     
                                    </td>
                                </tr>
                            </MDBTableBody>
                        </MDBTable>
                    </MDBModalBody>
                    <MDBModalFooter className='justify-content-center'>
                        <MDBBtn color='secondary'
                                onClick=
                                { 
                                    () => 
                                    { 
                                        setVisible(false);
                                    } 
                                }
                        >
                            취소
                        </MDBBtn>
                        {
                            (() =>
                            {
                                // 수정
                                if( target > 0 )
                                {
                                    return (
                                        <>
                                            <MDBBtn color='danger'
                                                    disabled={ AddCategoryQuery.isLoading ? true : false }
                                                    onClick=
                                                    { 
                                                        () => 
                                                        { 
                                                            DeleteCategoryQuery.mutate(
                                                            [
                                                                {
                                                                    id : category.id
                                                                }
                                                            ])
                                                        } 
                                                    }
                                            >
                                                삭제
                                            </MDBBtn>
                                            <MDBBtn disabled={ AddCategoryQuery.isLoading ? true : false }
                                                    onClick=
                                                    { 
                                                        () => 
                                                        { 
                                                            if( !category.name )
                                                            {
                                                                compRef.current[0].focus();
                                                                
                                                                return;
                                                            }
    
                                                            UpdateCategoryQuery.mutate( 
                                                            {
                                                                 id : category.id
                                                                ,name : category.name
                                                                ,backColor : category.backColor
                                                                ,textColor : category.textColor
                                                            })
                                                        } 
                                                    }
                                            >
                                                수정
                                            </MDBBtn>
                                        </>
                                    )
                                }
                                // 등록
                                else
                                {
                                    return (
                                        <MDBBtn disabled={ AddCategoryQuery.isLoading ? true : false }
                                                onClick=
                                                { 
                                                    () => 
                                                    { 
                                                        if( !category.name )
                                                        {
                                                            compRef.current[0].focus();
                                                            
                                                            return;
                                                        }

                                                        AddCategoryQuery.mutate( 
                                                        {
                                                             name : category.name
                                                            ,backColor : category.backColor
                                                            ,textColor : category.textColor
                                                        })
                                                    }
                                                }
                                        >
                                            등록
                                        </MDBBtn>
                                    )
                                }

                            })()
                        }
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    )
}