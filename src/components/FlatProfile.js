import React from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Card, Grid, Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { LocationCity, Home, Delete, Link, Mail, AttachMoney, Apartment, Equalizer, GpsFixed, TimeToLeave, Timer} from '@material-ui/icons';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class FlatProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            item: null,
            flatDeleted: false
        };
    }

    componentDidMount() {
        let flatId = (queryString.parse(this.props.location.search, { ignoreQueryPrefix: true }).id);
        fetch(process.env.REACT_APP_API_URL + '/flats/' + flatId)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        item: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handleDelete(flatId) {
        fetch(process.env.REACT_APP_API_URL + '/flats/' + flatId, {
            method: 'DELETE'
        }).then(() => {
            this.setState({
                flatDeleted: true
            })
        }).catch(err => {
            console.error(err)
        });
    }

    render() {
        const { error, isLoaded, item, flatDeleted } = this.state;
        if (flatDeleted) {
            return <Redirect to='/' />;
        }
        if (error) {
            console.log(error);
            return <div>Error: {error}</div>;
        } else if (!isLoaded) {
            return <CircularProgress />
        } else {
            return (
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Card style={{ 'padding': 10, 'marginBottom': 10 }}>
                                <h1>{item.city} {item.street} flat profile</h1>
                                <Button variant="contained" color="primary" startIcon={<Link />} href={item.offerUrl} disabled={item.offerUrl ? "true" : "false"} target="_blank">Offer</Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    startIcon={<Delete />}
                                    onClick={() => { this.handleDelete(item.id) }}
                                >
                                    Delete
                            </Button>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card style={{ 'padding': 10 }}>
                                <List component="nav" aria-label="mailbox folders">
                                    <ListItem>
                                        <ListItemIcon>
                                            <LocationCity />
                                        </ListItemIcon>
                                        <ListItemText primary="City:" />
                                        <h3>{item.city}</h3>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Home />
                                        </ListItemIcon>
                                        <ListItemText primary="Street:" />
                                        <h3>{item.street}</h3>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Mail />
                                        </ListItemIcon>
                                        <ListItemText primary="Postal code:" />
                                        <h3>{item.postalCode}</h3>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <GpsFixed />
                                        </ListItemIcon>
                                        <ListItemText primary="Coordinates:" />
                                        <h3>{item.latitude},{item.longitude}</h3>
                                    </ListItem>
                                </List>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card style={{ 'padding': 10 }}>
                                <List component="nav" aria-label="mailbox folders">
                                    <ListItem>
                                        <ListItemIcon>
                                            <AttachMoney />
                                        </ListItemIcon>
                                        <ListItemText primary="Price:" />
                                        <h3>{item.price}PLN</h3>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <AttachMoney />
                                        </ListItemIcon>
                                        <ListItemText primary="Price per square meter:" />
                                        <h3>{Math.round((item.price / item.usableArea) * 100) / 100}PLN</h3>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Apartment />
                                        </ListItemIcon>
                                        <ListItemText primary="Usable area:" />
                                        <h3>{item.usableArea}m<sup>2</sup></h3>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Equalizer />
                                        </ListItemIcon>
                                        <ListItemText primary="Number of rooms:" />
                                        <h3>{item.roomsNumber}</h3>
                                    </ListItem>
                                </List>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card style={{ 'padding': 10 }}>
                                <List component="nav" aria-label="mailbox folders">
                                    <ListItem>
                                        <ListItemIcon>
                                            <TimeToLeave />
                                        </ListItemIcon>
                                        <ListItemText primary="Work distance:" />
                                        <h3>{item.travelInfo.workDistance}m</h3>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Timer />
                                        </ListItemIcon>
                                        <ListItemText primary="Work travel time:" />
                                        <h3>{Math.round(item.travelInfo.workTime/60)}min</h3>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <TimeToLeave />
                                        </ListItemIcon>
                                        <ListItemText primary="City center distance:" />
                                        <h3>{item.travelInfo.cityCenterDistance}m</h3>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Timer />
                                        </ListItemIcon>
                                        <ListItemText primary="City center travel time:" />
                                        <h3>{Math.round(item.travelInfo.cityCenterTime/60)}min</h3>
                                    </ListItem>
                                </List>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card style={{ 'padding': 10 }}>
                                <TableContainer>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Place name</TableCell>
                                                <TableCell>Distance</TableCell>
                                                <TableCell>Category</TableCell>                                     
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {item.places.map(place => (
                                                <TableRow>
                                                    <TableCell>{place.name}</TableCell>
                                                    <TableCell>{place.distance}</TableCell>
                                                    <TableCell>{place.category}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Card>
                        </Grid>
                    </Grid>
                </div >
            )
        }
    }
}

export default FlatProfile;