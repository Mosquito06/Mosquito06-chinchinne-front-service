import { useEffect, useState, useContext } from 'react';
import MemoApi from 'api/MemoApi';
import { useQueryClient   } from 'react-query';
import { GlobalContext } from 'context/GlobalContext';
import { COMMON_YN, COMMON_STATUS, COMMON_QUERY_KEYS } from 'module/CommonCode';

function MyMemo({ id, contents, isComplete, onCancelClicked })
{
    // Global State
    const { GLOBAL_MODAL } = useContext(GlobalContext);
    
    // Query Client
    const queryClient = useQueryClient();

    // Memo State
    const [memo, setMemo] = useState(
    {
         id : id ?? ''
        ,isNew : id.toString().split('_')[0] === COMMON_STATUS.CREATE ? true : false
        ,isEdit : id.toString().split('_')[0] === COMMON_STATUS.CREATE ? true : false
        ,isComplete : isComplete ?? false 
        ,content : contents ?? ''
        ,snapShop : contents ?? ''
    })

    // Add Memo Query
    const AddMemoQuery = MemoApi.useAddMemo(
    {
        queryOptions :
        {
            success : ( res ) =>
            {
                queryClient.refetchQueries([COMMON_QUERY_KEYS.SEARCH_MEMO]);
            }
            ,settle : () => {}
        }
    })

    // Update Memo Query
    const UpdateMemoQuery = MemoApi.useUpdateMemo(
    {
        queryOptions :
        {
            success : ( res ) =>
            {
                queryClient.refetchQueries([COMMON_QUERY_KEYS.SEARCH_MEMO]);
                
                setMemo( prevState => (
                {
                    ...prevState
                    ,id : res.data.memoId
                    ,isNew : false
                    ,isEdit : false
                    ,isComplete : res.data.completeYn === COMMON_YN.YES ? true : false
                    ,content : res.data.memo
                    ,snapShop : res.data.memo
                }))
            }
            ,settle : () => {}
        }
    })

    // Update Complete Query
    const UpdateCompleteQuery = MemoApi.useUpdateComplete(
    {
        queryOptions :
        {
            success : ( res ) =>
            {
                queryClient.refetchQueries([COMMON_QUERY_KEYS.SEARCH_MEMO]);
                
                setMemo( prevState => (
                {
                    ...prevState
                    ,id : res.data.memoId
                    ,isNew : false
                    ,isEdit : false
                    ,isComplete : res.data.completeYn === COMMON_YN.YES ? true : false
                }))
            }
            ,settle : () => {}
        }
    })

    // Delete Memo Query
    const DeleteMemoQuery = MemoApi.useDeleteMemo(
    {
        queryOptions :
        {
            success : ( res ) =>
            {
                queryClient.refetchQueries([COMMON_QUERY_KEYS.SEARCH_MEMO]);
            }
            ,settle : () => {}
        }
    })

    return (
        <div className="form-check ms-2 d-flex align-items-center position-relative">
            <input  id={ 'memo_' + memo.id }
                    className="form-check-input" 
                    type="radio"  
                    checked={ memo.isComplete } 
                    onChange={()=>{}}
                    onClick=
                    {
                        () =>
                        {
                            if( !memo.isEdit )
                            {
                                UpdateCompleteQuery.mutate(
                                {
                                     memoId : memo.id
                                    ,completeYn : COMMON_YN.YES
                                })
                            }
                        }
                    }
            />
            {
                (() =>
                {
                    if( memo.isEdit )
                    {
                        return (
                            <div className="d-flex" >
                                <input  className='form-control ms-2 d-inline-block w-auto' 
                                        type='text' 
                                        maxLength={25}
                                        value={ memo.content }
                                        onChange=
                                        {
                                            (e) =>
                                            {
                                                setMemo( prevState => (
                                                {
                                                    ...prevState
                                                    ,content : e.target.value
                                                }))
                                            }
                                        }
                                />
                                <div className='w-auto position-absolute end-0'>
                                    <button type="button" 
                                            className="btn btn-primary p-2 ps-3 pe-3"
                                            disabled={ AddMemoQuery.isLoading ? true : false }
                                            onClick=
                                            {
                                                () =>
                                                {
                                                    if( !memo.content )
                                                    {
                                                        GLOBAL_MODAL.setModal( prevState => (
                                                        {
                                                                ...prevState
                                                            ,isVisible : true
                                                            ,text : 
                                                            {
                                                                ...prevState.text
                                                                ,title : 'Alert'
                                                                ,contents : '저장할 내용을 입력하세요.'
                                                            }
                                                            ,isConfirm : false
                                                            ,callBack : ( res ) => { GLOBAL_MODAL.setModal( prevState => ({ ...prevState, isVisible : false })); }
                                                        }))

                                                        return;
                                                    }
                                                    
                                                    if( memo.isNew )
                                                    {
                                                        AddMemoQuery.mutate( 
                                                        {  
                                                            memo : memo.content
                                                        })
                                                    }
                                                    else
                                                    {
                                                        UpdateMemoQuery.mutate(
                                                        {
                                                             memoId : memo.id
                                                            ,memo : memo.content
                                                        })
                                                    }
                                                }
                                            }
                                    >
                                        { memo.isNew ? '저장' : '수정' }
                                    </button>
                                    {
                                        (()=>
                                        {
                                            if( !memo.isNew )
                                            {
                                                return (
                                                    <button type="button" 
                                                            className="btn btn-danger p-2 ps-3 pe-3 ms-1"
                                                            onClick=
                                                            {
                                                                () =>
                                                                {
                                                                    DeleteMemoQuery.mutate( 
                                                                    {
                                                                        memoId : memo.id
                                                                    })
                                                                }
                                                            }
                                                    >
                                                        삭제
                                                    </button>
                                                )
                                            }

                                        })()
                                    }
                                    <button type="button" 
                                            className="btn btn-secondary p-2 ps-3 pe-3 ms-1"
                                            onClick=
                                            {
                                                () =>
                                                {
                                                    // if( memo.isNew )
                                                    // {
                                                    //     onCancelClicked( memo.id );
                                                    // }
                                                    // else
                                                    // {
                                                        setMemo( prevState => (
                                                        {
                                                            ...prevState
                                                            ,isEdit : false
                                                            ,content : prevState.snapShop
                                                        }))
                                                    //}
                                                }
                                            }
                                    >
                                        취소
                                    </button>
                                </div>
                            </div>
                        )
                    }
                    else
                    {
                        return (
                            <label  className={"form-check-label" + ( memo.isComplete ? ' text-decoration-line-through' : '' )} 
                                    onClick=
                                    {
                                        () =>
                                        {
                                            if( !memo.isComplete )
                                            {
                                                setMemo( prevState => (
                                                {
                                                    ...prevState
                                                    ,isEdit : true
                                                }))
                                            }
                                        }
                                    }
                            > 
                                { memo.content } 
                            </label>
                        )

                        // htmlFor={ 'memo_' + memo.id } 

                        
                    }
                })()
            }
        </div>
    )
}

export default MyMemo;