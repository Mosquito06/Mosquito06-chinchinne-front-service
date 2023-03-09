import React, { useEffect, useState } from 'react';

import { MDBRow } from 'mdb-react-ui-kit';

function Right()
{
    return (
        <>
            <MDBRow className='' style={{ height : '60%', overflow : 'overlay'}}>
                <MDBRow className='position-relative' style={{height : 'fit-content'}}>
                    <div className="h2">
                        <span>MEMO</span>
                        <button type="button" className="btn btn-primary position-absolute end-0">
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                    
                    <div className="form-check ms-2">
                        <input className="form-check-input" type="radio" id="flexRadioDefault1"/>
                        <label className={"form-check-label text-decoration-line-through"} htmlFor="flexRadioDefault1" > Default radio </label> 
                    </div>    
                    <div className="form-check ms-2">
                        <input className="form-check-input" type="radio" id="flexRadioDefault2"/>
                        <label className="form-check-label" htmlFor="flexRadioDefault2"> Default checked radio </label>
                    </div>
                </MDBRow>
            </MDBRow>
            <MDBRow style={{ height : '20%'}}>
                계산기

            </MDBRow>
            <MDBRow style={{ height : '20%'}}>
                통계 

            </MDBRow>
        </>
    )
}

export default Right;