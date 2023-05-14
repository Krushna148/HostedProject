import React, { useEffect, useState } from "react";

import {
  Table,
  Card,
  CardBody,
  Input,
  Button,
  Label,
  Badge

} from "reactstrap";
import { getAllTravels } from "services/TravelService";
import { getBookingDetailsByTravel } from "services/BookingService";
import Swal from 'sweetalert2'
import { updateBookingStatus } from "services/BookingService";

const Booking = () => {

  const [dateFilter, setDateFilter] = useState()
  const [travels, setTravels] = useState([])
  const [passengerList, setPassengerList] = useState([])
  const [revenueByTravel, setRevenueByTravel] = useState(0)

  const user = JSON.parse(localStorage.getItem('user'))

  const loadData = () => {
    getAllTravels(user.ID).then(rs => {
      setTravels(rs.data)
    })
  }

  const updateStatus = (e, travel) => {
    updateBookingStatus(travel.travelId, e.target.value, dateFilter).then(rs => {
      Swal.fire({
        title: 'Success',
        text: 'Travel Status updated successfully!',
        icon: 'success',
      }).then(e => {
        onAccordianClick({ target: { ariaExpanded: "true" } }, travel)
      })
    }).catch(e => {
      Swal.fire({
        title: 'Failed',
        text: 'Failed to update travel status!',
        icon: 'success',
      })
    })
  }
  const onAccordianClick = (e, travel) => {
    if (e.target.ariaExpanded === "true") {
      if (!dateFilter) {
        Swal.fire({
          title: 'Warning',
          text: 'Please select the date to view passenger list',
          icon: 'error',
        })
        return
      }

      getBookingDetailsByTravel(travel.travelId).then(rs => {
        const list = []
        let revenue = 0
        rs.data.forEach(booking => {

          if (dateFilter === booking.journeyDateTime) {
            const p = booking.passengersList.split(",")
            const s = booking.selectdSeats.split(",")
            
            if (booking.bookingStatus !== "cancelled") {
              revenue += parseInt(booking.billAmount)
            }
            p.forEach((x, i) => {
              list.push({
                name: x,
                seat: s[i],
                bookedBy: booking.bookedBy,
                billAmount: booking.billAmount,
                ID: booking.bookingId,
                mobileNo: booking.mobileNo,
                pickup: booking.pickupPoint,
                drop: booking.dropPoint,
                status: booking.bookingStatus
              })
            })
          }
        })
        setRevenueByTravel(revenue)
        setPassengerList(list)
      })
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (

    <div className="content">
      <Card>
        <CardBody>
          <div className="content">
            <h5 className="d-flex justify-content-between">
              <span>Booking</span>
              <span class="text-right">
                <Input
                  type="date"
                  name="date"
                  defaultValue={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </span>
            </h5>
            <div>
              {dateFilter ? <div class="accordion" id="accordionExample">
                {travels.map((x, i) => <div class="accordion-item">
                  <h2 class="accordion-header" id={`${i}`} onClick={(e) => onAccordianClick(e, x)}>
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseTwo${i}`} aria-expanded="false" aria-controls={`collapseTwo${i}`} >
                      <span style={{ width: "25%" }}>{x.name}</span>
                      <span style={{ width: "25%" }}>{x.source} - {x.startTime}</span>
                      <span style={{ width: "25%" }}>{x.destination} - {x.endTime}</span>
                    </button>
                  </h2>
                  <div id={`collapseTwo${i}`} class="accordion-collapse collapse" aria-labelledby={`${i}`} data-bs-parent="#accordionExample">
                    <div class="accordion-body p-1 m-0">
                      <div className="d-flex justify-content-between p-2 mx-4">
                        <div className="w-25 p-2">
                          <span className="font-weight-bold">Revenue from this Trip <br /> <span style={{ fontSize: "30px" }}>{revenueByTravel} Rs.</span> </span>
                        </div>
                        <div className="w-25 p-2">
                          <span className="font-weight-bold">Travel Status <br /> <span style={{ fontSize: "30px" }}>
                            {passengerList[0]?.status === 'cancelled' ? <Badge color="danger">{passengerList[0]?.status}</Badge> : <Badge color="primary">{passengerList[0]?.status.toUpperCase()}</Badge>}
                          </span> </span>
                        </div>
                        <div className="w-50">
                          <Label for="exampleSelect1" ><h6 className="m-0 p-0">Update Travel Stauts</h6></Label>
                          <Input type="select" name="select" id="exampleSelect1" placeholder="Update Travel Status" onChange={e => updateStatus(e, x)}>
                            <option selected disabled>Update Status</option>
                            <option value="started">Journey Started</option>
                            <option value="ended">Journey End</option>
                            <option value="cancelled">Cancel Travel</option>
                          </Input>
                        </div>
                      </div>
                      <hr/>
                      {passengerList.length ? <Table>
                        <thead>
                          <tr>
                            <th>Booking ID</th>
                            <th>Passenger Name</th>
                            <th>Pickup point</th>
                            <th>Drop point</th>
                            <th>Seat No</th>
                            <th>Booked By <br />Mobile No</th>
                            <th>Bill Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {passengerList.map(p => <tr>
                            <td># {p.ID}</td>
                            <td>{p.name}</td>
                            <td>{p.pickup}</td>
                            <td>{p.drop}</td>
                            <td>{p.seat}</td>
                            <td>{p.bookedBy}<br />{p.mobileNo}</td>
                            <td>{p.billAmount} Rs.</td>
                          </tr>)}
                        </tbody>
                      </Table> : <h6 className="text-center">No Records Found</h6>}
                    </div>
                  </div>
                </div>)}
              </div> : <><hr/><h5 className="text-center">Please select the date</h5> </>}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Booking;