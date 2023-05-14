import React, { useEffect, useState } from "react";

import {
    FormGroup,
    Input,
    Form,
    Col,
    Card,
    CardBody,
    Row,
    Label
} from "reactstrap";

import { Button } from "reactstrap";
import locationLogo from '../../assets/img/Bus location logo.png'
import fullStar from '../../assets/img/01.jpeg'
import emptyStar from '../../assets/img/02.jpeg'
import Rating from 'react-rating'
import { getAllTravels } from '../../services/TravelService'
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import moment from 'moment'

const BookTravel = () => {

    const history = useHistory()
    const [travels, setTravels] = useState([])
    const [travelsCopy, setTravelsCopy] = useState([])
    const [isAC, setIsAC] = useState(false)
    const [isSleeper, setIsSleeper] = useState(false)

    const [cityList, setCityList] = useState([])

    const [details, setDetails] = useState({
        date: new Date().toISOString().split('T')[0],
        from: '',
        to: ''
    })

    const onBook = (travelId) => {
        if (!details.date || !details.from || !details.to) {
            Swal.fire({
                title: "Warning",
                text: `Please select date, from and to!`,
                icon: "warning",
            })
            return
        }
        const bookTravelData = details
        bookTravelData["travelId"] = travelId
        localStorage.setItem("bookTravel", JSON.stringify(bookTravelData))
        history.push("/user/select-seat")
    }

    const loadTravels = () => {
        getAllTravels(0).then(rs => {
            // setTravels(rs.data)
            setTravelsCopy(rs.data)
            const temp = cityList
            rs.data.forEach(x => {
                if (!cityList.includes(x.source)) {
                    temp.push(x.source)
                }
                if (!cityList.includes(x.destination)) {
                    temp.push(x.destination)
                }
            })
            setCityList(temp)
        })
    }

    const applyFilter = () => {
        let temp = []
        // apply source destination
        temp = travelsCopy.filter(x => x.source === details.from && details.to)
        
        // apply AC, non AC, 
        temp = temp.filter(x => x.isAc === isAC && x.isSleeper === isSleeper)
        setTravels(temp)

    }

    useEffect(() => {
        loadTravels()
    }, [])

    useEffect(() => {
        console.log(details)
    }, [details])

    return (
        <div className="content">
            <Card>
                <CardBody>
                    <Row>
                        <FormGroup className="col-md-3">
                            <Label for="exampleEmail">Select Date</Label>
                            <Input
                                type="date"
                                name="date"
                                defaultValue={details.date}
                                onChange={e => setDetails({ ...details, date: e.target.value })}
                                min={moment().format("YYYY-MM-DD")}
                            />
                        </FormGroup>
                        <FormGroup className="col-md-3">
                            <Label for="inputState">From</Label>
                            <Input type="select" name="select" id="inputState"
                                defaultValue={details.from}
                                onChange={e => setDetails({ ...details, from: e.target.value })} >
                                <option disabled selected>Select From</option>
                                {cityList.map(x => <option>{x}</option>)}
                            </Input>
                        </FormGroup>
                        <FormGroup className="col-md-3">
                            <Label for="inputState">To</Label>
                            <Input type="select" name="select" id="inputState"
                                defaultValue={details.to}
                                onChange={e => setDetails({ ...details, to: e.target.value })} >
                                <option disabled selected>Select From</option>
                                {cityList.map(x => <option>{x}</option>)}
                            </Input>
                        </FormGroup>
                        <FormGroup className="col-md-3">
                            <Label for="inputState">Sort By</Label>
                            <Input type="select" name="select" id="inputState" >
                                <option>Highest Rating</option>
                                <option>Low-High Price</option>
                                <option>High-Low Price</option>
                            </Input>
                        </FormGroup>
                        <FormGroup className="pt-3">
                            <div className="form-check-radio form-check-inline">
                                <Label className="form-check-label">
                                    <Input type="radio" name="isAC" id="isAC1" value="option1" onClick={() => setIsAC(true)} />
                                    AC
                                    <span className="form-check-sign"></span>
                                </Label>
                            </div>
                            <div className="form-check-radio form-check-inline">
                                <Label className="form-check-label">
                                    <Input type="radio" name="isAC" id="isAC2" value="option2" onClick={() => setIsAC(false)}/>
                                    Non AC
                                    <span className="form-check-sign"></span>
                                </Label>
                            </div>
                            <div className="form-check-radio form-check-inline">
                                <Label className="form-check-label">
                                    <Input type="radio" name="isSleeper" id="isSleeper1" value="option1" onClick={() => setIsSleeper(true)}/>
                                    Sleeper
                                    <span className="form-check-sign"></span>
                                </Label>
                            </div>
                            <div className="form-check-radio form-check-inline">
                                <Label className="form-check-label">
                                    <Input type="radio" name="isSleeper" id="isSleeper2" value="option2" onClick={() => setIsSleeper(false)}/>
                                    Seater
                                    <span className="form-check-sign"></span>
                                </Label>
                            </div>
                            <Button className="w-25 ml-5" color="danger" onClick={applyFilter}>Search Travel</Button>
                        </FormGroup>
                    </Row>
                </CardBody>
            </Card>
            <Row>
                {travels.length ? travels.map(x => (
                    <Card className="border p-3 m-2" style={{ width: '18rem' }}>
                        <p><strong>Travels Name :-  {x.name}</strong></p>
                        <p><strong>{x.source} To {x.destination} &nbsp;&nbsp;<br />
                        {/* <span className="text-success">{x.availableNoOfSeats} Seats Available</span> */}
                        </strong></p>
                        <p><span>{x.startTime}</span> - <span>{x.endTime}

                        </span></p>
                        <p><img src={locationLogo} width="30px" height="30px" />
                            <b>First Pickup</b> : {x.pickupPoints.split(",")[0]}
                        </p>
                        <p><img src={locationLogo} width="30px" height="30px" />
                            <b>Last Drop</b> : {x.dropPoints.split(",")[x.dropPoints.split(",").length - 1]}
                        </p>

                        <div className="d-flex justify-content-center"><Rating
                            initialRating={x.overallRating}
                            readonly
                            emptySymbol={<img src={emptyStar} className="icon" />}
                            fullSymbol={<img src={fullStar} className="icon" />} />
                        </div>

                        <Button cCard="primary" onClick={() => onBook(x.travelId)}>
                            Book {x.price} Rs
                        </Button>
                    </Card>)) : <h4 className="text-center">No Travels Available</h4>}
            </Row>
        </div>
    );
};

export default BookTravel;