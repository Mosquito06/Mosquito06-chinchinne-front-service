import React, { createContext, useState, useRef, useEffect, useLayoutEffect} from "react";

export const GlobalContext = createContext();

export default ( { children } ) => 
{
    // 토큰 정보
    const [token, setToken] = useState( JSON.parse(sessionStorage.getItem('ref-token')) );

    // 금액 State
    const [money, setMoney] = useState(
    {
         balance : 0
        ,expense : 0
    })

    // 공통 팝업 State
    const [modal, setModal] = useState(
    { 
         isVisible : false
        ,text : 
        {
             title : ''
            ,contents : ''
        } 
        ,isConfirm : false
        ,callBack : ( res ) => 
        { 
            setModal( prevState => (
            {
                ...prevState
                ,isVisible : false
                ,text : 
                { 
                    ...prevState.text
                    ,title : ''
                    ,contents : '' 
                }
                ,isConfirm : false 
                ,callBack : ( res ) => {}
            }))
        }
    });

    // 상세 팝업 State
    const [detail, setDetail] = useState(
    { 
         isVisible : false
        ,time : new Date().getTime()
        ,callBack : ( res ) => 
        { 
            setDetail( prevState => (
            {
                ...prevState
                ,isVisible : false
                ,time : new Date().getTime()
                //,callBack : ( res ) => {}
            }))
        }
    });

    return (
        <GlobalContext.Provider value =
        {
            {
                 GLOBAL_TOKEN : { token, setToken }
                ,GLOBAL_MONEY : { money, setMoney }
                ,GLOBAL_MODAL : { modal, setModal, detail, setDetail }
            }
        }>
            {children}
        </GlobalContext.Provider>
    )
}