import React, { createContext, useState, useRef, useEffect, useLayoutEffect} from "react";

export const GlobalContext = createContext();

export default ( { children } ) => 
{
    // 토큰 정보
    const [token, setToken] = useState( JSON.parse(sessionStorage.getItem('ref-token')) );

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
        ,callBack : () => 
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

    return (
        <GlobalContext.Provider value =
        {
            {
                 GLOBAL_TOKEN : { token, setToken }
                ,GLOBAL_MODAL : { modal, setModal }
            }
        }>
            {children}
        </GlobalContext.Provider>
    )
}