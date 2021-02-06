import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'


function preventDefault(event) {
  event.preventDefault();
}

class Flats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_API_URL + '/flats')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result['hydra:member']
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

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <CircularProgress />
    } else {
      return (
        <React.Fragment>
          <Title>Flats</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>City</TableCell>
                <TableCell>Street</TableCell>
                <TableCell>Postal code</TableCell>
                <TableCell>Usable area</TableCell>
                <TableCell>Rooms number</TableCell>
                <TableCell>Price</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.city}</TableCell>
                  <TableCell>{item.street}</TableCell>
                  <TableCell>{item.postalCode}</TableCell>
                  <TableCell>{item.usableArea}m<sup>2</sup></TableCell>
                  <TableCell>{item.roomsNumber}</TableCell>
                  <TableCell>{item.price} PLN</TableCell>
                  <TableCell align="right"><Link to={{ pathname: '/flat', search: '?id=' + item.id }}><Button variant="outlined" color="primary">Preview</Button></Link></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      );
    }
  }
}
export default Flats;