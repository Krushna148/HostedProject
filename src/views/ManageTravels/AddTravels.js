import { useEffect, useState } from "react"
import { Modal, Form, FormGroup, Label, Input, FormText, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap"
import { addTravels, updateTravels } from "../../services/TravelService"
import Swal from 'sweetalert2'

const AddTravels = ({ isOpen, handleModal, callBack, updateData }) => {

    const user = JSON.parse(localStorage.getItem("user"))

    const [travelData, setTravelData] = useState({
        travelName: "", sourceCity: "", destinationCity: "",
        pickupPoints: "", dropPoints: "", startTime: "",
        endTime: "", ticketPrice: "", id: "", isAC: null, isSleeper : null
    })

    const onAdd = (e) => {
        e.preventDefault()
        const reqObj = {
            name: travelData.travelName,
            destination: travelData.destinationCity,
            source: travelData.sourceCity,
            startTime: travelData.startTime,
            endTime: travelData.endTime,
            availableNoOfSeats: 30,
            pickUpPoints: travelData.pickupPoints,
            price: travelData.ticketPrice,
            overAllRatings: 0,
            dropPoints: travelData.dropPoints,
            status: 'not-started',
            userId: user.ID,
            isAC: travelData.isAC,
            isSleeper: travelData.isSleeper
        }

        if (updateData) {
            reqObj.availableNoOfSeats = null
            reqObj.overAllRatings = null
            reqObj.status = null
            reqObj.travelId = updateData.travelId
            updateTravels(reqObj).then(rs => {
                Swal.fire({
                    title: "Success",
                    text: `Travel updated successfully!`,
                    icon: "success",
                }).then(x => {
                    handleModal()
                    callBack()
                })
            }).catch(err => {
                Swal.fire({
                    title: "Failed",
                    text: "Failed to update travel please try again!",
                    icon: "error",
                })
            })
        } else {
            addTravels(reqObj).then(rs => {
                Swal.fire({
                    title: "Success",
                    text: `Travel Added successfully!`,
                    icon: "success",
                }).then(x => {
                    handleModal()
                    callBack()
                })
            }).catch(err => {
                Swal.fire({
                    title: "Failed",
                    text: "Failed to add travel please try again!",
                    icon: "error",
                })
            })
        }
    }

    useEffect(() => {
        setTravelData({
            travelName: "", sourceCity: "", destinationCity: "",
            pickupPoints: "", dropPoints: "", startTime: "",
            endTime: "", ticketPrice: "", id: "", isAC: null, isSleeper : null
        })
        if (updateData) {
            
            setTravelData({
                travelName: updateData.name, sourceCity: updateData.source, destinationCity: updateData.destination,
                pickupPoints: updateData.pickupPoints, dropPoints: updateData.dropPoints, startTime: updateData.startTime,
                endTime: updateData.endTime, ticketPrice: updateData.price, id: updateData.travelId, isAC: updateData.isAC, isSleeper : updateData.isSleeper
            })
        }
    }, [updateData])

    return <Modal isOpen={isOpen} toggle={handleModal} >
        <Form onSubmit={onAdd}>
            <ModalHeader toggle={handleModal}>{updateData ? 'Update' : 'Add New'} Travel</ModalHeader>
            <ModalBody style={{ height: "400px", overflowY: "auto" }}>
                <FormGroup>
                    <Label>Travel Name</Label>
                    <Input type="text" required defaultValue={travelData.travelName} onChange={e => setTravelData({ ...travelData, travelName: e.target.value })} placeholder="Enter Travel Name" />
                </FormGroup>
                <FormGroup>
                    <Label>Source</Label>
                    <Input type="text" required defaultValue={travelData.sourceCity} onChange={e => setTravelData({ ...travelData, sourceCity: e.target.value })} placeholder="Enter Source City" />
                </FormGroup>
                <FormGroup>
                    <Label>Destination</Label>
                    <Input type="text" required defaultValue={travelData.destinationCity} onChange={e => setTravelData({ ...travelData, destinationCity: e.target.value })} placeholder="Enter Destination City" />
                </FormGroup>
                <FormGroup>
                    <Label>Pickup Points</Label>
                    <Input type="textarea" required defaultValue={travelData.pickupPoints} onChange={e => setTravelData({ ...travelData, pickupPoints: e.target.value })} placeholder="Enter Pickup Points (with comma separated) Ex : Kharadi,Wagholi,Baner,Wakad" />
                </FormGroup>
                <FormGroup>
                    <Label>Drop Points</Label>
                    <Input type="textarea" required defaultValue={travelData.dropPoints} onChange={e => setTravelData({ ...travelData, dropPoints: e.target.value })} placeholder="Enter Drop Points (with comma separated) Ex : Kharadi,Wagholi,Baner,Wakad" />
                </FormGroup>
                <FormGroup>
                    <Label>Start Time</Label>
                    <Input type="time" required defaultValue={travelData.startTime} onChange={e => setTravelData({ ...travelData, startTime: e.target.value })} placeholder="Enter Start Time" />
                </FormGroup>
                <FormGroup>
                    <Label>End Time</Label>
                    <Input type="time" required defaultValue={travelData.endTime} onChange={e => setTravelData({ ...travelData, endTime: e.target.value })} placeholder="Enter End Time" />
                </FormGroup>
                <FormGroup>
                    <Label>Ticket Price</Label>
                    <Input type="number" required defaultValue={travelData.ticketPrice} onChange={e => setTravelData({ ...travelData, ticketPrice: e.target.value })} placeholder="Enter Ticket Price" />
                </FormGroup>
                <FormGroup className="py-2">
                    <div className="form-check-radio form-check-inline">
                        <Label className="form-check-label">
                            <Input type="radio" name="isAC" id="isAC1" value="option1" onClick={e => setTravelData({...travelData, isAC : true})}/>
                            AC
                            <span className="form-check-sign"></span>
                        </Label>
                    </div>
                    <div className="form-check-radio form-check-inline">
                        <Label className="form-check-label">
                            <Input type="radio" name="isAC" id="isAC2" value="option2"  onClick={e => setTravelData({...travelData, isAC : false})}/>
                            Non AC
                            <span className="form-check-sign"></span>
                        </Label>
                    </div>
                    <div className="form-check-radio form-check-inline">
                        <Label className="form-check-label">
                            <Input type="radio" name="isSleeper" id="isSleeper1" value="option1"  onClick={e => setTravelData({...travelData, isSleeper : true})}/>
                            Sleeper 
                            <span className="form-check-sign"></span>
                        </Label>
                    </div>
                    <div className="form-check-radio form-check-inline">
                        <Label className="form-check-label">
                            <Input type="radio" name="isSleeper" id="isSleeper2" value="option2"  onClick={e => setTravelData({...travelData, isSleeper : false})}/>
                            Seater
                            <span className="form-check-sign"></span>
                        </Label>
                    </div>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" type="submit" >Add Travel</Button>{' '}
                <Button color="secondary" onClick={handleModal}>Cancel</Button>
            </ModalFooter>
        </Form>
    </Modal>
}

export default AddTravels