// Query Keys
export const COMMON_QUERY_KEYS = 
{
     SEARCH_ACCOUNTS : 'search_accounts'
    ,SEARCH_ACCOUNT : 'search_account'
    ,SEARCH_ACCOUNT_DETAIL : 'search_account_detail'
    ,SEARCH_CATEGORIES : 'search_categories'
    ,SEARCH_MEMO : 'search_memo'
}

// 공통 텍스트
export const COMMON_TEXT = 
{
     YEAR : '년'
    ,MONTH : '월'
}

// 공통 YN
export const COMMON_YN = 
{
     YES : 'YES'
    ,NO : 'NO'
}

// 공통 상태
export const COMMON_STATUS = 
{
     CREATE : 'create'
    ,UPDATE : 'update'
    ,DELETE : 'delete'
}

// 수입/지출 공통 코드
export const COMMON_ACCOUNT_STATUS = 
{
     INCOME : 'INCOME'
    ,EXPENSE : 'EXPENSE'
}

// 공통 색상 클래스
export const COMMON_COLOR_CLASS =
{
     BLUE : 'text-primary'
    ,GRAY : 'text-secondary'
    ,GREEN :'text-success'
    ,RED : 'text-danger'
    ,YELLOW : 'text-warning'
    ,SKY : 'text-info'
    ,BLACK : 'text-black'
    ,BLACK_50 : 'text-black-50'
}

// 일자 상태
export const COMMON_DATE_STATUS =
{
     PREV : -1  // 지난 월의 일
    ,CUR : 0    // 현재 월의 일
    ,NEXT : 1   // 다음 월의 일
}

// 공통 에러 코드
export const COMMON_ERROR_CODE =
{
     NOT_FOUND_TOKEN : 1000
    ,EXPIRE_TOKEN : 1001
    ,UNKNOWN_MEMBER : 1010
    ,INCORRECT_PASSWORD : 1011
    ,BAD_REQUEST : 400
}

// 공통 표현식 타입
export const COMMON_REG_EXP_CODE =
{
    ONLY_NUM : 1
}