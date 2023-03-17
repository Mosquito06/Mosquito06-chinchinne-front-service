import React, { useRef, useState, useContext, useEffect } from 'react';
import MemoApi from 'api/MemoApi';
import MyMemo from 'components/item/common/MyMemo';
import { GlobalContext } from 'context/GlobalContext';
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { COMMON_QUERY_KEYS, COMMON_YN, COMMON_STATUS } from 'module/CommonCode';

function MyDiary()
{
    // Global State
    const { GLOBAL_TOKEN, GLOBAL_MONEY } = useContext(GlobalContext);
    
    // Query State
    const [queryKey, setQueryKey] = useState([ COMMON_QUERY_KEYS.SEARCH_MEMO, { pathString : GLOBAL_TOKEN.token.uuid + '/memo'} ])

    // Diary State
    const [diary, setDiary] = useState([]);

    // Search State
    const [search, setSearch] = useState(
    {
         keys : queryKey
        ,isFetch : true
    })
    
    // Search Query
    const SearchMemoQuery = MemoApi.useSearchMemo(
    {
        queryOptions : 
        {
             keys: search.keys
            ,success : ( res ) =>
            {
                setDiary(res.data);
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

    const onCancelClicked = (id) =>
    {
        setDiary
        (
            diary.filter( memo =>
            {
                return memo.memoId === id ? false : true
            })
        );
    }

    return (
        <MDBRow className='position-relative' style={{height : 'fit-content'}}>
            <div className="h2">
                <span>MEMO</span>
                <button type="button" 
                        className="btn btn-primary position-absolute end-0"
                        onClick=
                        {
                            () =>
                            {
                                setDiary( prevState => ( [...prevState, { memoId : COMMON_STATUS.CREATE + '_' + new Date().getTime() , memo : '', completeYn : COMMON_YN.NO }]))
                            }
                        }
                >
                    <i className="fas fa-plus"></i>
                </button>
            </div>
            
            {
                diary.map( memo =>
                {
                    return (
                        <MyMemo key={ memo.memoId }
                                id={ memo.memoId }
                                contents={ memo.memo }
                                isComplete={ memo.completeYn === COMMON_YN.YES ? true : false }
                                onCancelClicked={onCancelClicked}
                        />
                    )
                })
            }

            {/* <div className="form-check ms-2">
                <input className="form-check-input" type="radio" id="flexRadioDefault1"/>
                <label className={"form-check-label text-decoration-line-through"} htmlFor="flexRadioDefault1" > Default radio </label> 
            </div>    
            <div className="form-check ms-2">
                <input className="form-check-input" type="radio" id="flexRadioDefault2"/>
                <label className="form-check-label" htmlFor="flexRadioDefault2"> Default checked radio </label>
            </div> */}
        </MDBRow>
    )
}

export default MyDiary;