import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import InputAdornment from '@material-ui/core/InputAdornment';
import SaveIcon from '@material-ui/icons/Save';

class AddFlat extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        var object = {};
        data.forEach((value, key) => { object[key] = isNaN(value) ? value : parseInt(value) });
        var json = JSON.stringify(object);
       
        fetch(process.env.REACT_APP_API_URL + '/flats', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: json,
        });
    }

    render() {
        return (
            <Container maxWidth="200">
                <Card >
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <TextField
                                    name="city"
                                    label="City"
                                    required
                                    style={{ margin: 8 }}
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete="off"
                                />
                                <TextField
                                    name="street"
                                    required
                                    style={{ margin: 8 }}
                                    label="Street"
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete='off'
                                />
                                <TextField
                                    name="postalCode"
                                    required
                                    style={{ margin: 8 }}
                                    label="Postal code"
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete='off'
                                />
                            </div>
                            <div>
                                <TextField
                                    name="price"
                                    required
                                    type="number"
                                    style={{ margin: 8 }}
                                    label="Price"
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete='off'
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">PLN</InputAdornment>,
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    name="usableArea"
                                    required
                                    type="number"
                                    style={{ margin: 8 }}
                                    label="Usable area"
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete='off'
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">m<sup>2</sup></InputAdornment>,
                                    }}
                                />
                                <TextField
                                    name="roomsNumber"
                                    type="number"
                                    required
                                    style={{ margin: 8 }}
                                    label="Rooms number"
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete='off'
                                />
                            </div>
                            <div>
                                <TextField
                                    name="offerUrl"
                                    style={{ margin: 8 }}
                                    label="Offer URL"
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete='off'
                                />
                            </div>
                            <Button style={{ margin: 8 }} variant="contained" color="primary" type="submit" startIcon={<SaveIcon />}>Add</Button>
                        </form>
                    </div>
                </Card>
            </Container>
        );
    }
}

export default AddFlat;