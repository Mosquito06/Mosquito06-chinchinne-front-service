import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

// 친친 요구사항 
// 1. 달력 내용에 수입 총계(파랑), 지출 총계(빨강) 표현
// 2. 총계 클릭 시, 내용 팝업 표출

function MyDate( { date })
{
    return (
        <MDBCol className=''>
             <MDBContainer >
                <MDBRow className='justify-content-center'>
                    { date }
                </MDBRow>
             </MDBContainer>
        </MDBCol>
    )
}

export default MyDate;