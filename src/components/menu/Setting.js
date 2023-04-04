import React, { useEffect, useState } from 'react';
import Header from 'components/common/Header';

import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBBtn } from 'mdb-react-ui-kit';
import {
    MDBIcon,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
  } from 'mdb-react-ui-kit';

function Setting()
{
    const [iconsActive, setIconsActive] = useState('tab1');

    const handleIconsClick = (value) => {
      if (value === iconsActive) {
        return;
      }
  
      setIconsActive(value);
    };
    
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
                            <MDBTabs className='mb-3'>
                                <MDBTabsItem>
                                <MDBTabsLink onClick={() => handleIconsClick('tab1')} active={iconsActive === 'tab1'}>
                                    <MDBIcon fas icon='chart-pie' className='me-2' /> Sales
                                </MDBTabsLink>
                                </MDBTabsItem>
                                <MDBTabsItem>
                                <MDBTabsLink onClick={() => handleIconsClick('tab2')} active={iconsActive === 'tab2'}>
                                    <MDBIcon fas icon='chart-line' className='me-2' /> Subscriptions
                                </MDBTabsLink>
                                </MDBTabsItem>
                                <MDBTabsItem>
                                <MDBTabsLink onClick={() => handleIconsClick('tab3')} active={iconsActive === 'tab3'}>
                                    <MDBIcon fas icon='cogs' className='me-2' /> Settings
                                </MDBTabsLink>
                                </MDBTabsItem>
                            </MDBTabs>
                        </MDBCardHeader>
                        <MDBCardBody>
                            <MDBTabsContent>
                                <MDBTabsPane show={iconsActive === 'tab1'}>Tab 1 content</MDBTabsPane>
                                <MDBTabsPane show={iconsActive === 'tab2'}>Tab 2 content</MDBTabsPane>
                                <MDBTabsPane show={iconsActive === 'tab3'}>Tab 3 content</MDBTabsPane>
                            </MDBTabsContent>
                            {/* <MDBCardTitle>Special title treatment</MDBCardTitle>
                            <MDBCardText>With supporting text below as a natural lead-in to additional content.</MDBCardText>
                            <MDBBtn href='#'>Go somewhere</MDBBtn> */}
                        </MDBCardBody>
                        <MDBCardFooter>2 days ago</MDBCardFooter>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default Setting;