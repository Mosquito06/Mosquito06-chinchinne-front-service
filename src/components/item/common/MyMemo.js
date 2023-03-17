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
                                setMemo( prevState => (
                                {
                                    ...prevState
                                    ,isComplete : !memo.isComplete
                                }))
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
                                            className="btn btn-primary"
                                            disabled={ AddMemoQuery.isLoading ? true : false }
                                            onClick=
                                            {
                                                () =>
                                                {
                                                    if( memo.isNew )
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
                                                        
                                                        
                                                        AddMemoQuery.mutate( 
                                                        {  
                                                            memo : memo.content
                                                        })
                                                    }
                                                    else
                                                    {
                                                        setMemo( prevState => (
                                                        {
                                                            ...prevState
                                                            ,isEdit : false
                                                            ,snapShop : memo.content
                                                        }))
                                                    }
                                                }
                                            }
                                    >
                                        저장
                                    </button>    
                                    <button type="button" 
                                            className="btn btn-secondary ms-1"
                                            onClick=
                                            {
                                                () =>
                                                {
                                                    if( memo.isNew )
                                                    {
                                                        onCancelClicked( memo.id );
                                                    }
                                                    else
                                                    {
                                                        setMemo( prevState => (
                                                        {
                                                            ...prevState
                                                            ,isEdit : false
                                                            ,content : prevState.snapShop
                                                        }))
                                                    }
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