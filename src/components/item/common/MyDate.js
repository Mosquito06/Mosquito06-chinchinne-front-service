import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { COMMON_DATE_STATUS, COMMON_COLOR_CLASS } from 'module/CommonCode';

// 친친 요구사항 
// 1. 달력 내용에 수입 총계(파랑), 지출 총계(빨강) 표현
// 2. 총계 클릭 시, 내용 팝업 표출

function MyDate( { status, date })
{
    return (
        <MDBCol className={ status === COMMON_DATE_STATUS.CUR ? COMMON_COLOR_CLASS.BLACK : COMMON_COLOR_CLASS.BLACK_50 }>
             <MDBContainer className='h-100 position-relative'>
                <MDBRow className='justify-content-center'>
                    { date }
                </MDBRow>
                {
                    (() =>
                    {
                        if( status === COMMON_DATE_STATUS.CUR )
                        {
                            return (
                                <MDBRow className='position-absolute bottom-0' style={{'cursor' : 'pointer'}}>
                                    <div className={ 'justify-content-center ' + COMMON_COLOR_CLASS.BLUE } 
                                         onClick=
                                         {
                                            () =>
                                            {
                                                console.log('수입 총계!')
                                            }
                                         }
                                    >
                                        { 10000 }
                                    </div>
                                    <div className={ 'justify-content-center ' + COMMON_COLOR_CLASS.RED }
                                         onClick=
                                         {
                                           () =>
                                           {
                                                console.log('지출 총계!')
                                           }
                                         }
                                    >
                                        { 5000 }
                                    </div>
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