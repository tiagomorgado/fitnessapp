import React, {useState, useMemo} from 'react';
import api from '../../services/api';
import { Container, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import cameraIcon from '../../assets/camera.png';
import './events.css';

//EventsPage will show all the events
export default function EventsPage() {
    const [title, setTitle ]= useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [sport, setSport] = useState('');
    const [date, setDate] = useState('');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail): null;
    }, [thumbnail])


    console.log(title, description, price, sport);


    const submitHandler = async (evt) => {
        const user_id = localStorage.getItem('user');

        const eventData = new FormData();

        eventData.append('thumbnail', thumbnail);
        eventData.append('sport', sport);
        eventData.append('title', title);
        eventData.append('price', price);
        eventData.append('description', description);
        eventData.append('date', date);


        if(title !== '' && description !== '' && price !== '' && sport !== '' && date !== '' && thumbnail !== null) {
            await api.post('/event', eventData, {headers: {user_id}})
        }

        evt.preventDefault()
        return ""
    }

    return(
        <Container>
            <h1>Create your content</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <Label>Upload Image: </Label>
                    <Label id="thumbnail" style={{backgroundImage : `url(${preview})`}} className={thumbnail ? "has-thumbnail": ''}>
                    <Input type="file" onChange={(evt) => setThumbnail(evt.target.files[0])}/>
                    <img src={cameraIcon} style={{maxWidth: "50px"}} alt="Upload Icon"/>
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>Sport: </Label>
                    <Input id="sport" type="text" value={sport} placeholder={"Sport name"} onChange={(evt) => setSport(evt.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Title: </Label>
                    <Input id="title" type="text" value={title} placeholder={"Event Title"} onChange={(evt) => setTitle(evt.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Event Description: </Label>
                    <Input id="description" type="text" value={description} placeholder={"Event Description"} onChange={(evt) => setDescription(evt.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Event Price: </Label>
                    <Input id="price" type="text" value={price} placeholder={"Event Price 0.00€"} onChange={(evt) => setPrice(evt.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Label>Event Date: </Label>
                    <Input id="date" type="date" value={date} placeholder={"Event Price 0.00€"} onChange={(evt) => setDate(evt.target.value)}/>
                </FormGroup>
                <Button type="submit">
                    Create Event
                </Button>
            </Form>
        </Container>
    )
}