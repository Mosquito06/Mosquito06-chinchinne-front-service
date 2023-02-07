import React from 'react';
import { MDBInput, MDBCol, MDBRow, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';

function Login()
{
    return (
        <div className={'d-flex align-items-center justify-content-center vh-100'}>
            <form>
                <MDBInput className='mb-4' type='email' id='form1Example1' label='Email address' />
                <MDBInput className='mb-4' type='password' id='form1Example2' label='Password' />

                <MDBRow className='mb-4'>
                    <MDBCol className='d-flex justify-content-center'>
                        <MDBCheckbox id='form1Example3' label='Remember me' defaultChecked />
                    </MDBCol>
                    <MDBCol>
                        <a href='#!'>Forgot password?</a>
                    </MDBCol>
                </MDBRow>

                <MDBBtn type='submit' block>
                    Sign in
                </MDBBtn>
            </form>
        </div>

        // <Container className={'vh-100'}>
        //     <Row className={'vh-100'}>
        //         <Col className={'d-flex align-items-center justify-content-center'}>
        //             <Form>
        //                 <Form.Group className="mb-3" controlId="formBasicEmail">
        //                     <Form.Label>Email address</Form.Label>
        //                     <Form.Control type="email" placeholder="Enter email" />
        //                     <Form.Text className="text-muted">
        //                         We'll never share your email with anyone else.
        //                     </Form.Text>
        //                 </Form.Group>
        //
        //                 <Form.Group className="mb-3" controlId="formBasicPassword">
        //                     <Form.Label>Password</Form.Label>
        //                     <Form.Control type="password" placeholder="Password" />
        //                 </Form.Group>
        //                 <Form.Group className="mb-3" controlId="formBasicCheckbox">
        //                     <Form.Check type="checkbox" label="Check me out" />
        //                 </Form.Group>
        //                 <Button > {/*variant="primary" type="submit"*/}
        //                     Submit
        //                 </Button>
        //             </Form>
        //         </Col>
        //     </Row>
        // </Container>
    )
}

export default Login;