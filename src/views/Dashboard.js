import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Table,
  Input,
  Label,
  Badge
} from "reactstrap";
import { getAllTravels } from "services/TravelService";
import { getBookingDetailsByAgency, getBookingDetailsByTravel } from "services/BookingService";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"))
  const [totalTravles, setTotalTravels] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [completedJourney, setCompletedJourney] = useState(0)
  const [highRated, setHighRated] = useState()
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0])
  const [travels, setTravels] = useState([])
  const [passengerList, setPassengerList] = useState([])
  const [revenueByTravel, setRevenueByTravel] = useState(0)

  const history = useHistory()

  const loadDashboardData = () => {
    getAllTravels(user.ID).then(rs => {
      setTotalTravels(rs.data.length)
      let temp = rs.data[0]
      rs.data.forEach(x => {
        if (x.overallRating > temp.overallRating) {
          temp = x
        }
      })
      setHighRated(temp)
    })
    getBookingDetailsByAgency(user.ID).then(rs => {
      let total = 0
      let count = 0

      rs.data.forEach(x => {

        if (x.bookingStatus === 'ended') {
          total += parseInt(x.billAmount)
          count++
        }
      })
      setTotalRevenue(total)
      setCompletedJourney(count)
    })
  }

  useEffect(() => {
    loadDashboardData()
    loadData()
  }, [])

  const loadData = () => {
    getAllTravels(user.ID).then(rs => {
      setTravels(rs.data)
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

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Travels</p>
                      <CardTitle tag="p">{totalTravles}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats" onClick={e => history.push("/user/manage-travels")}>
                  Go to Manage Travels
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Revenue</p>
                      <CardTitle tag="p">{totalRevenue} Rs.</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats" onClick={e => history.push("/user/bookings")}>
                  Go to Bookings
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="3" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="9" xs="7">
                    <div className="numbers">
                      <p className="card-category">Completed Journey</p>
                      <CardTitle tag="p">{completedJourney}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats" onClick={e => history.push("/user/bookings")}>
                  Go to Bookings
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>

                  <Col md="12" xs="7">
                    <div className="numbers">
                      <p className="card-category">High Rated Travel</p>
                      <CardTitle tag="p">{highRated?.name}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats" onClick={e => history.push("/user/manage-travels")}>
                  Go to manage Travels
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <div className="content">
                  <h5 className="d-flex justify-content-between">
                    <span>Today's Bookings</span>
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
                              {/* <div className="w-50">
                                <Label for="exampleSelect1" ><h6 className="m-0 p-0">Update Travel Stauts</h6></Label>
                                <Input type="select" name="select" id="exampleSelect1" placeholder="Update Travel Status" onChange={e => updateStatus(e, x)}>
                                  <option selected disabled>Update Status</option>
                                  <option value="started">Journey Started</option>
                                  <option value="ended">Journey End</option>
                                  <option value="cancelled">Cancel Travel</option>
                                </Input>
                              </div> */}
                            </div>
                            <hr />
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
                    </div> : <><hr /><h5 className="text-center">Please select the date</h5> </>}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
