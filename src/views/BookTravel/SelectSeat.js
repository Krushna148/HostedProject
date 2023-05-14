import { Button, Card, CardBody, Col, Input, Row } from "reactstrap"
import busNotSelected from '../../assets/bus/bus.png'
import busSelected from '../../assets/bus/selected.png'
import seatBooked from '../../assets/bus/booked.png'

import logo2 from '../../assets/img/01.jpeg'
import logo3 from '../../assets/img/02.jpeg'
import Rating from 'react-rating'
import { useEffect, useState } from "react"
import { getTravels, updateTravels } from "../../services/TravelService"
import { addBooking } from "services/BookingService"
import Swal from 'sweetalert2'
import { getBookingDetailsByTravel } from "services/BookingService"
import { useHistory } from 'react-router-dom'

const SelectSeat = () => {

   const [selectedSeats, setSelectedSeats] = useState([])
   const [passengerList, setPassengerList] = useState([])
   const [travelDetails, setTravelDetails] = useState()
   const [billAmount, setBillAmount] = useState(0)
   const [bookedSeats, setBookedSeats] = useState([])
   const [pickAndDrop, setPickAndDrop] = useState({
      pickup : "",
      drop : ""
   })

   const user = JSON.parse(localStorage.getItem("user"))
   const bookingDetails = JSON.parse(localStorage.getItem("bookTravel"))

   const history = useHistory()

   const onSelectSeat = (seatId) => {
      if (bookedSeats.includes(seatId)) {
         alert("This seat is already booked!!")
         return
      }
      let temp = []
      selectedSeats.forEach(x => {
         temp.push(x)
      })
      if (temp.includes(seatId)) {
         const t = []
         temp.forEach(x => {
            if (x !== seatId) {
               t.push(x)
            }
         })
         temp = t
      } else {
         temp.push(seatId)
      }
      setBillAmount(temp.length * travelDetails.price + 50)
      setSelectedSeats(temp)
   }

   const onInputName = (e, index) => {
      let temp = []
      passengerList.forEach(x => {
         temp.push(x)
      })

      temp[index] = e.target.value
      setPassengerList(temp)
   }

   const bookingProcess = () => {
      if (!pickAndDrop.pickup || !pickAndDrop.drop) {
         alert("Please select pickup and drop")
         return
      }
      const reqObj = {
         bookingStatus: 'confirmed',
         passengerList: passengerList.join(","),
         journeyDateTime: bookingDetails.date,
         bookingEmail: user.email,
         userId: user.ID,
         travelId: bookingDetails.travelId,
         dropPoint: pickAndDrop.drop,
         billAmount: billAmount,
         pickupPoint: pickAndDrop.pickup,
         selectedSeats: selectedSeats.join(","),
         mobileNo: user.mobileNo
      }
    
      addBooking(reqObj).then(rs => {
         updateTravels({ availableNoOfSeats: travelDetails.availableNoOfSeats - selectedSeats.length, travelId: travelDetails.travelId }).then(rs => {
            Swal.fire({
               title: "Success",
               text: `Your Booking Confirmed!`,
               icon: "success",
            }).then(e => {
               history.push("/user/userBookings")
            })
         }).catch(err => {
            Swal.fire({
               title: "Failed",
               text: "Booking Failed, please try again!",
               icon: "error",
            })
         })


      }).catch(err => {
         console.log(err)
      })
   }

   const getTravelDetails = () => {
      getTravels(bookingDetails.travelId).then(rs => {
         setTravelDetails(rs.data[0])
         getBookingDetailsByTravel(rs.data[0].travelId).then(rs => {
            const temp = []
            rs.data.forEach(booking => {
               
               if (booking.journeyDateTime === bookingDetails.date) {
                  const t = booking.selectdSeats.split(",")
                  t.forEach(x => {
                     temp.push(x)
                  })
               }
            })
            
            setBookedSeats(temp)
         })
      })
   }

   useEffect(() => {
      getTravelDetails()
   }, [])
   return <div className="content">
      <Card>
         <CardBody>
            <Row className="p-2 d-flex justify-content-center">
               <Col sm={3} style={{ height: '650px' }} className="border border-5 mx-2 ">
                  <div className="d-flex justify-content-end">
                     <img src="https://media.istockphoto.com/id/157278781/photo/grey-steering-wheel-with-circle-in-middle-on-horn.jpg?s=612x612&w=0&k=20&c=6rxGn-0AgzDo74nhYeQr0r02tiE9aLKK6O3eIVEcffk=" width="110px" height="100px" style={{ borderRadius: '20px' }} />
                  </div>
                  <Row className="p-4">
                     <div>
                        <span>
                           <img src={bookedSeats.includes('LL2') ? seatBooked : selectedSeats.includes('LL2') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('LL1')} />
                        </span>
                        <span className="pr-4" style={{ position: "absolute", right: '0' }}>
                           <img src={bookedSeats.includes('LR2') ? seatBooked : selectedSeats.includes('LR2') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('LR2')} />
                           <img src={bookedSeats.includes('LR3') ? seatBooked : selectedSeats.includes('LR3') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('LR3')} />
                        </span>
                     </div>
                  </Row>
                  <Row className="p-4">
                     <div>
                        <span>
                           <img src={bookedSeats.includes('LL4') ? seatBooked : selectedSeats.includes('LL4') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('LL4')} />
                        </span>
                        <span className="pr-4" style={{ position: "absolute", right: '0' }}>
                           <img src={bookedSeats.includes('LR5') ? seatBooked : selectedSeats.includes('LR5') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('LR5')} />
                           <img src={bookedSeats.includes('LR6') ? seatBooked : selectedSeats.includes('LR6') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('LR6')} />
                        </span>
                     </div>
                  </Row>
                  <Row className="p-4">
                     <div>
                        <span>
                           <img src={bookedSeats.includes('LL7') ? seatBooked : selectedSeats.includes('LL7') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('LL7')} />
                        </span>
                        <span className="pr-4" style={{ position: "absolute", right: '0' }}>
                           <img src={bookedSeats.includes('LR8') ? seatBooked : selectedSeats.includes('LR8') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('LR8')} />
                           <img src={bookedSeats.includes('LR9') ? seatBooked : selectedSeats.includes('LR9') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('LR9')} />
                        </span>
                     </div>
                  </Row>
                  <Row className="p-4">
                     <div>
                        <span>
                           <img src={bookedSeats.includes('LL10') ? seatBooked : selectedSeats.includes('LL10') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('LL10')} />
                        </span>
                        <span className="pr-4" style={{ position: "absolute", right: '0' }}>
                           <img src={bookedSeats.includes('LR11') ? seatBooked : selectedSeats.includes('LR11') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('LR11')} />
                           <img src={bookedSeats.includes('LL12') ? seatBooked : selectedSeats.includes('LL12') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('LL12')} />
                        </span>
                     </div>
                  </Row>
                  <Row className="p-4">
                     <div>
                        <span>
                           <img src={bookedSeats.includes('LL13') ? seatBooked : selectedSeats.includes('LL13') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('LL13')} />
                        </span>
                        <span className="pr-4" style={{ position: "absolute", right: '0' }}>
                           <img src={bookedSeats.includes('LR14') ? seatBooked : selectedSeats.includes('LR14') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('LR14')} />
                           <img src={bookedSeats.includes('LR15') ? seatBooked : selectedSeats.includes('LR15') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('LR15')} />
                        </span>
                     </div>
                  </Row>
                  <h6 style={{ position: "absolute", bottom: "0", marginLeft: "30%" }}>Lower Side</h6>
               </Col>
               <Col sm={3} style={{ height: '650px' }} className=" border border-5 mx-2">
                  <div>
                     <div className="px-4 py-2">
                        <span className="m-1" style={{ width: "20px", display: 'inline-table', height: "10px", backgroundColor: "green" }} >&nbsp;</span>&nbsp;Already Booked <br />
                        <span className="m-1" style={{ width: "20px", display: 'inline-table', height: "10px", backgroundColor: "yellow" }} >&nbsp;</span>&nbsp;Selected Seats <br />
                        <span className="m-1" style={{ width: "20px", display: 'inline-table', height: "10px", backgroundColor: "black" }} >&nbsp;</span>&nbsp;Available <br />
                     </div>
                     <Row className="p-4">
                        <div>
                           <span>
                              <img src={bookedSeats.includes('UL1') ? seatBooked : selectedSeats.includes('UL1') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('UL1')} />
                           </span>
                           <span className="pr-4" style={{ position: "absolute", right: '0' }}>
                              <img src={bookedSeats.includes('UR2') ? seatBooked : selectedSeats.includes('UR2') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('UR2')} />
                              <img src={bookedSeats.includes('UR3') ? seatBooked : selectedSeats.includes('UR3') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('UR3')} />
                           </span>
                        </div>
                     </Row>
                     <Row className="p-4">
                        <div>
                           <span>
                              <img src={bookedSeats.includes('UL4') ? seatBooked : selectedSeats.includes('UL4') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('UL4')} />
                           </span>
                           <span className="pr-4" style={{ position: "absolute", right: '0' }}>
                              <img src={bookedSeats.includes('UR5') ? seatBooked : selectedSeats.includes('UR5') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('UR5')} />
                              <img src={bookedSeats.includes('UR6') ? seatBooked : selectedSeats.includes('UR6') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('UR6')} />
                           </span>
                        </div>
                     </Row>
                     <Row className="p-4">
                        <div>
                           <span>
                              <img src={bookedSeats.includes('UL7') ? seatBooked : selectedSeats.includes('UL7') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('UL7')} />
                           </span>
                           <span className="pr-4" style={{ position: "absolute", right: '0' }}>
                              <img src={bookedSeats.includes('UR8') ? seatBooked : selectedSeats.includes('UR8') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('UR8')} />
                              <img src={bookedSeats.includes('UR9') ? seatBooked : selectedSeats.includes('UR9') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('UR9')} />
                           </span>
                        </div>
                     </Row>
                     <Row className="p-4">
                        <div>
                           <span>
                              <img src={bookedSeats.includes('UL10') ? seatBooked : selectedSeats.includes('UL10') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('UL10')} />
                           </span>
                           <span className="pr-4" style={{ position: "absolute", right: '0' }}>
                              <img src={bookedSeats.includes('UR11') ? seatBooked : selectedSeats.includes('UR11') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('UR11')} />
                              <img src={bookedSeats.includes('UR12') ? seatBooked : selectedSeats.includes('UR12') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('UR12')} />
                           </span>
                        </div>
                     </Row>
                     <Row className="p-4">
                        <div>
                           <span>
                              <img src={bookedSeats.includes('UL13') ? seatBooked : selectedSeats.includes('UL13') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('UL13')} />
                           </span>
                           <span className="pr-4" style={{ position: "absolute", right: '0' }}>
                              <img src={bookedSeats.includes('UR14') ? seatBooked : selectedSeats.includes('UR14') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('UR14')} />
                              <img src={bookedSeats.includes('UR15') ? seatBooked : selectedSeats.includes('UR15') ? busSelected : busNotSelected} width="50px" height="50px" onClick={() => onSelectSeat('UR15')} />
                           </span>
                        </div>
                     </Row>
                     <h6 style={{ position: "absolute", bottom: "0", marginLeft: "30%" }}>Upper Side</h6>
                  </div>
               </Col>
               <Col sm={5} style={{ height: '650px' }} className="border border-5 p-3 mx-1">
                  <div className="d-block">
                     <div className="d-flex justify-content-between">
                        <h4 className="p-0 m-0 font-weight-bold">{travelDetails ? travelDetails.name : 'test'}</h4>
                        <div>
                           <Rating
                              emptySymbol={<img src={logo3} className="icon" />}
                              fullSymbol={<img src={logo2} className="icon" />}
                              initialRating={travelDetails?.overallRating}
                              readonly
                           />
                           {/* <span className="d-block text-center">130 Ratings</span> */}
                        </div>
                     </div>
                     <span> {travelDetails?.agencyName}</span>
                  </div>
                  <div className="mt-4 d-flex justify-content-between">
                     <div>
                        <span className="d-block font-weight-bold">Source</span>
                        <span className="d-block">{travelDetails?.source}</span>
                        <span className="d-block">{travelDetails?.startTime}</span>

                        <span className="d-block font-weight-bold mt-4">Pickup Point</span>
                        <span className="d-block">
                           <Input type="select" name="select" id="inputState" onChange={(e) => setPickAndDrop({...pickAndDrop, pickup : e.target.value})}>
                              <option disabled selected>Pickup at</option>
                              {travelDetails?.pickupPoints.split(",").map(x => <option>{x}</option>)}
                           </Input>
                        </span>
                     </div>
                     <div>
                        <span className="d-block  font-weight-bold">Destination</span>
                        <span className="d-block">{travelDetails?.destination}</span>
                        <span className="d-block">{travelDetails?.endTime} </span>

                        <span className="d-block font-weight-bold mt-4">Drop Point</span>
                        <span className="d-block">
                           <Input type="select" name="select" id="inputState" onChange={(e) => setPickAndDrop({...pickAndDrop, drop : e.target.value})}>
                              <option disabled selected>Drop at</option>
                              {travelDetails?.dropPoints.split(",").map(x => <option>{x}</option>)}
                           </Input>
                        </span>
                     </div>
                  </div>
                  <div className="d-flex justify-content-between mt-4">
                     <span className="font-weight-bold">Journey Date : &nbsp; {bookingDetails.date}</span> <br />
                  </div>
                  <div className="border mt-4 px-3" style={{ height: "330px", overflowY: 'auto' }}>
                     <h5 className="text-center font-weight-bold">Booking Details</h5>
                     <Row>
                        {selectedSeats.map((x, i) => <Col sm={6}>
                           <span className="d-block py-1">Passenger{i + 1} <input type="text" className="d-inline w-50"
                              onChange={(e) => onInputName(e, i)}
                           /></span>
                        </Col>)}
                     </Row>
                     <span className="d-block p-1 mt-2">Email : {user.email}</span>
                     <span className="d-block p-1">Mobile No : <input type="text" onChange={e => user.mobileNo = e.target.value} /> </span>
                     <span className="d-block p-1">Selected seats : {selectedSeats.map(x => x + ", ")}</span>
                     <hr />
                     <h6 className="p-1">
                        Bill Amount
                     </h6>
                     <Row className="p-1">
                        <Col sm={4} >
                           <span className="d-block text-right">{selectedSeats.length} x {travelDetails?.price} = {billAmount - 50}</span>
                           <span className="d-block text-right">(Tax) + 50 = {billAmount}</span>
                        </Col>
                        <Col sm={8} className="d-flex justify-content-end">
                           <Button color="primary" onClick={bookingProcess}>Proceed For Payment</Button>
                        </Col>
                     </Row>
                  </div>
               </Col>
            </Row>
         </CardBody>
      </Card>
   </div>
}

export default SelectSeat