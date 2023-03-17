import { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { COMMON_YN } from 'module/CommonCode';

function MyMemo({ id, contents, isComplete })
{
    // Memo State
    const [memo, setMemo] = useState(
    {
         id : id ?? ''
        ,isEdit : id ? false : true
        ,isComplete : isComplete ?? false 
        ,content : contents ?? ''
        ,snapShop : contents ?? ''
    })

    const onMemoChanged = () =>
    {

    }

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
                                            onClick=
                                            {
                                                () =>
                                                {
                                                    setMemo( prevState => (
                                                    {
                                                        ...prevState
                                                        ,isEdit : false
                                                        ,snapShop : memo.content
                                                    })) 
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
                                                    setMemo( prevState => (
                                                    {
                                                        ...prevState
                                                        ,isEdit : false
                                                        ,content : prevState.snapShop
                                                    }))
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