import React, { useEffect, useState } from "react";

import {
  Table,
  Card,
  CardBody,
  Badge,
} from "reactstrap";
import { getBookingDetailsByUser } from '../../services/BookingService'

const UserBookings = () => {

  const user = JSON.parse(localStorage.getItem("user"))
  const [bookings, setBookings] = useState([])

  const getUserBookings = () => {
    getBookingDetailsByUser(user.ID).then(rs => {
      setBookings(rs.data)
    })
  }

  useEffect(() => {
    getUserBookings()
  }, [])

  return (
    <div className="content">
      <Card>
        <CardBody>
          <div className="content">
            <h5 className="mt-4">My Bookings</h5>
            <Table responsive>
              <tr className="text-primary">
                <th>Travel Name</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Passengers</th>
                <th>Seat No</th>
                <th>Date</th>
                <th>Bill Amount</th>
                <th>Status</th>
                {/* <th>Action</th> */}
              </tr>
              <tbody>
                {bookings.map(x => (
                  <tr>
                    <td width="150px" >{x.name}</td>
                    <td width="150px" >
                      {x.source}<br />
                      <span className="text-muted">{x.pickupPoint}</span><br />
                      <span className="text-muted">{x.startTime}</span>
                    </td>
                    <td width="150px" >
                      {x.destination} <br />
                      <span className="text-muted">{x.dropPoint}</span><br />
                      <span className="text-muted">{x.endTime}</span>
                    </td>
                    <td width="150px" >
                      {x.passengersList.split(",").map((passenger, i) => <h6>{passenger}</h6>)}
                    </td>
                    <td width="150px" >{x.selectdSeats}</td>
                    <td width="150px" >{x.journeyDateTime}</td>
                    <td width="150px" >{x.billAmount} Rs.</td>
                    <td width="150px">
                    {x.bookingStatus === 'cancelled' ? 
                      <Badge color="danger">{x.bookingStatus.toUpperCase()}</Badge> : 
                      <Badge color="primary">{x.bookingStatus.toUpperCase()}</Badge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserBookings;