import React, { useState, useContext } from 'react';
import MemoApi from 'api/MemoApi';
import MyMemo from 'components/item/common/MyMemo';
import { GlobalContext } from 'context/GlobalContext';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBCheckbox } from 'mdb-react-ui-kit';
import { COMMON_QUERY_KEYS, COMMON_YN, COMMON_STATUS } from 'module/CommonCode';

function MyDiary()
{
    // Global State
    const { GLOBAL_TOKEN } = useContext(GlobalContext);

    // Diary State
    const [diary, setDiary] = useState([]);

    // Visible State
    const [isVisible, setVisible] = useState(false);
    
    // Search Query
    const SearchMemoQuery = MemoApi.useSearchMemo(
    {
        queryOptions : 
        {
             keys: [ COMMON_QUERY_KEYS.SEARCH_MEMO, { pathString : GLOBAL_TOKEN.token.uuid } ]
            ,success : ( res ) =>
            {
                setDiary(res.data);
            }
            ,settle : () => {}
            ,isEnabled : true
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
        <MDBCard className='h-100 m-0 p-0'>
            <MDBCardHeader className='d-flex align-items-center p-2'>
                <div className="h2 m-0">
                    <span>MEMO</span>
                </div>
                <div className='d-flex align-items-center position-absolute end-0 me-3'>
                    <div className='me-3'>
                        <MDBCheckbox    id='completeView' 
                                        checked={ isVisible } 
                                        label='완료된 항목 보기'
                                        onChange= { ( e ) => { setVisible( e.target.checked ) } }
                        />
                    </div>
                    <button type="button" 
                            className="btn btn-primary"
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
            </MDBCardHeader>
            <MDBCardBody className='p-3 pe-2' style={ {overflowY : 'scroll'}}>
                {
                    diary.filter( memo => 
                    {
                        return isVisible ? true : memo.completeYn === COMMON_YN.YES ? false : true;
                    }).map( memo =>
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
            </MDBCardBody>
        </MDBCard>
    )
}

export default MyDiary;