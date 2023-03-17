import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { COMMON_DATE_STATUS, COMMON_COLOR_CLASS } from 'module/CommonCode';

// 친친 요구사항 
// 1. 달력 내용에 수입 총계(파랑), 지출 총계(빨강) 표현
// 2. 총계 클릭 시, 내용 팝업 표출

function MyDate( { status, date, income, expense })
{
    return (
        <MDBCol className={ status === COMMON_DATE_STATUS.CUR ? COMMON_COLOR_CLASS.BLACK : COMMON_COLOR_CLASS.BLACK_50 }>
             <MDBContainer className='h-100 position-relative text-center'>
                <MDBRow className='justify-content-center'>
                    { date }
                </MDBRow>
                {
                    (() =>
                    {
                        if( status === COMMON_DATE_STATUS.CUR )
                        {
                            return (
                                <MDBRow className='position-absolute bottom-0 text-right' style={{'cursor' : 'pointer'}}>
                                    {
                                        (() =>
                                        {
                                            const elments = [];

                                            if( income )
                                            {
                                                elments.push
                                                (
                                                    <div    key={ 'cal_date_sum' } 
                                                            className={ COMMON_COLOR_CLASS.BLUE } 
                                                            onClick=
                                                            {
                                                                () =>
                                                                {
                                                                    console.log('수입 총계!')
                                                                }
                                                            }
                                                    >
                                                        <span>{ income }</span>
                                                    </div>
                                                )
                                            }

                                            if( expense )
                                            {
                                                elments.push
                                                (
                                                    <div    key={ 'cal_date_expense' }
                                                            className={ COMMON_COLOR_CLASS.RED }
                                                            onClick=
                                                            {
                                                                () =>
                                                                {
                                                                        console.log('지출 총계!')
                                                                }
                                                            }
                                                    >
                                                        { expense }
                                                    </div>
                                                )
                                            }

                                            return elments;
                                        })()
                                    }
                                </MDBRow>
                            )
                        }

                    })()
                }
             </MDBContainer>
        </MDBCol>
    )
}

export default MyDate;