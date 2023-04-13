import React, { createContext, useState, useRef, useEffect, useLayoutEffect} from "react";

export const GlobalContext = createContext();

export default ( { children } ) => 
{
    // Token State
    const [token, setToken] = useState( JSON.parse(sessionStorage.getItem('ref-token')) );

    // Money State
    const [money, setMoney] = useState(
    {
         budget : 0
        ,balance : 0
        ,expense : 0
    })

    // date State
    const [date, setDate] = useState(
    {
         year : new Date().getFullYear()
        ,month : new Date().getMonth()
        ,time : new Date().getTime()
    })

    // Common Popup State
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

    // Common Popup Detail State
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
                ,GLOBAL_DATE : { date, setDate }
            }
        }>
            {children}
        </GlobalContext.Provider>
    )
}