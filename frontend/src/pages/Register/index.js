import React, {useState} from 'react';
import api from '../../services/api';
import {Button, Container, Form, FormGroup, Input} from 'reactstrap';

export default function Register({history}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmit = async evt => {
        evt.preventDefault();
        console.log("result of the submit", email, password, firstName, lastName)

        const response = await api.post('/user/register', {email, password, firstName, lastName})
        const userId = response.data._id || false;

        if(userId){
            localStorage.setItem('user', userId);
            history.push('/dashboard');
        } else {
            const {message} = response.data
            console.log(message);
        }
    }

    return(
        <Container>
            <h2>Register:</h2>
            <p>Please <strong>Register</strong> to create your new account</p>
            <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="text" name="firstName" id="firstName" placeholder="Your First Name" onChange={evt => setFirstName(evt.target.value)}/>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="text" name="lastName" id="lastName" placeholder="Your Last Name" onChange={evt => setLastName(evt.target.value)}/>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="email" name="email" id="email" placeholder="Your Email" onChange={evt => setEmail(evt.target.value)}/>
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="password" name="password" id="password" placeholder="Your Password" onChange={evt => setPassword(evt.target.value)}/>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </Container>

    );
}