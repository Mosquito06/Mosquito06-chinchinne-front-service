import React, { useEffect, useState } from 'react';
import Header from 'components/common/Header';
import MyGeneral from 'components/item/setting/MyGeneral';
import MyCategories from 'components/item/setting/MyCategories';

import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBBtn } from 'mdb-react-ui-kit';
import { MDBIcon, MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit';

function Setting()
{
    // Activie Const
    const ACTIVE = 
    {
         GENARAL : 1
        ,CATEGORIES : 2
    }
    
    // Tab State
    const [tab, setTab] = useState(ACTIVE.GENARAL);
    
    return (
        <MDBContainer className='vh-100' fluid>
            <MDBRow style={{ height : '5%'}}>
                <Header />
            </MDBRow>
            <MDBRow className='' style={{ height : '95%'}}>
                <MDBCol className='d-flex justify-content-center m-3'>
                    <MDBCard className='w-100'> 
                        {/* alignment='center' */}
                        <MDBCardHeader>
                            <MDBTabs className=''>
                                <MDBTabsItem>
                                    <MDBTabsLink onClick={() => setTab(ACTIVE.GENARAL)} active={tab === ACTIVE.GENARAL}>
                                        <MDBIcon fas icon='cogs' className='me-2' /> General
                                    </MDBTabsLink>
                                </MDBTabsItem>
                                <MDBTabsItem>
                                    <MDBTabsLink onClick={() => setTab(ACTIVE.CATEGORIES)} active={tab === ACTIVE.CATEGORIES}>
                                        <MDBIcon fas icon='folder-tree' className='me-2' /> Categories
                                    </MDBTabsLink>
                                </MDBTabsItem>
                            </MDBTabs>
                        </MDBCardHeader>
                        <MDBCardBody>
                            <MDBTabsContent className='h-100'>
                                <MDBTabsPane show={tab === ACTIVE.GENARAL} className='h-100'>
                                    <MyGeneral />
                                </MDBTabsPane>
                                <MDBTabsPane show={tab === ACTIVE.CATEGORIES} className='h-100'>
                                    <MyCategories />
                                </MDBTabsPane>
                            </MDBTabsContent>
                        </MDBCardBody>
                        {/* <MDBCardFooter>2 days ago</MDBCardFooter> */}
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default Setting;