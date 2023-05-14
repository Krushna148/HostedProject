import { useEffect, useState } from "react"
import { Button, Card, CardBody, Table } from "reactstrap"
import { deleteTravel } from "services/TravelService"
import { getAllTravels } from "services/TravelService"
import AddTravels from "./AddTravels"

const ManageTravels = () => {

    const user = JSON.parse(localStorage.getItem("user"))
    const [modal, setModal] = useState(false)
    const [travels, setTravels] = useState([])
    const [updateData, setUpdateData] = useState()

    const handleModal = () => {
        if (modal) {
            setUpdateData()
        }
        setModal(!modal)
    }

    const callBack = () => {
        loadTravels()
        setUpdateData()
    }

    const loadTravels = () => {
        getAllTravels(user.ID).then(rs => {
            setTravels(rs.data)
        })
    }

    const onDelete = (travel) => {
        deleteTravel(travel.travelId).then(rs => {
            alert("delete")
        })
    }

    const onEdit = (travel) => {
        setUpdateData(travel)
        handleModal()
    }

    useEffect(() => {
        loadTravels()
    }, [])

    return <div className="content">
        <Card>
            <CardBody>
                <div className="d-flex justify-content-between">
                    <h5>All Travels</h5>
                    <Button onClick={handleModal}>Add Travel</Button>
                </div>

                <Table responsive>
                    <tr className="text-primary">
                        <th>Travel Name</th>
                        <th>Source</th>
                        <th>Destination</th>
                        <th>Pickup Points</th>
                        <th>Drop Points</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Action</th>
                    </tr>
                    <tbody>
                        {travels.map(x => (
                            <tr>
                                <td width="150px" >{x.name}</td>
                                <td width="150px" >{x.source}</td>
                                <td width="150px" >{x.destination}</td>
                                <td width="150px" >{x.pickupPoints}</td>
                                <td width="150px" >{x.dropPoints}</td>
                                <td width="150px" >{x.startTime}</td>
                                <td width="150px" >{x.endTime}</td>
                                <td width="150px">
                                    <Button color="info" className="p-2" onClick={() => onEdit(x)}>Edit</Button>{' '}
                                    <Button color="danger" className="p-2" onClick={() => onDelete(x)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
        <AddTravels handleModal={handleModal} isOpen={modal} callBack={callBack} updateData={updateData} />
    </div >
}

export default ManageTravels