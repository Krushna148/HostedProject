import { useEffect, useState } from "react"
import { Button, Card, CardBody, Col, FormGroup, Input, Label, Row } from "reactstrap"
import { updateUser } from "services/UserService"
import Swal from "sweetalert2"

const UpdateProfile = () => {


    const [data, setData] = useState({})

    const onSubmit = (e) => {
        e.preventDefault()
        if (data.password) {
            if (data.password !== data.cpassword) {
                Swal.fire({
                    title: 'Warning',
                    text: 'Passwords are not matching',
                    icon: 'warning',
                })
                return
            } 
        }
        const obj = {
            name: data.name,
            password: data.password ? data.password : null,
            email: data.email,
            profileImg: data.profileImg,
            userId: data.ID,
            mobileNo: data.mobileNo
        }
        updateUser(obj).then(rs => {
            localStorage.setItem("user", JSON.stringify(rs.data[0]))
            Swal.fire({
                title: 'Success',
                text: 'Profile Updated Successfully!',
                icon: 'success',
            })
        }).catch(err => {
            Swal.fire({
                title: 'Failed',
                text: 'Failed to Update Profile!' + err,
                icon: 'error',
            })
        })
    }

    const onFileChoose = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setData({ ...data, profileImg: reader.result });
        };
        reader.onerror = () => {
            console.error('Error while reading file');
        };
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        setData({ ...user, password: "" })
    }, [])

    return <div className="content">
        <Row>
            <Col sm={2}>
                <img width="200" height={200} className="rounded" src={data.profileImg ? data.profileImg : "https://upload.wikimedia.org/wikipedia/commons/e/e0/Userimage.png"} />
                <Button className="px-2 py-2" onClick={() => document.getElementById("fileChoose").click()}>Change Profile Image</Button>
                <Input type="file" id="fileChoose" hidden onChange={onFileChoose} accept="image/*" />
            </Col>
            <Col sm={10}>
                <Card>
                    <CardBody>
                        <form onSubmit={onSubmit}>
                            <Row>
                                <FormGroup className="col-sm-6">
                                    <Label for="name">{data?.isAgency ? 'Agency' : 'User'} Name</Label>
                                    <Input type="text" defaultValue={data.name} onChange={e => setData({ ...data, name: e.target.value })} />
                                </FormGroup>
                                <FormGroup className="col-sm-6">
                                    <Label for="email"> Email</Label>
                                    <Input type="email" defaultValue={data.email} onChange={e => setData({ ...data, email: e.target.value })} />
                                </FormGroup>
                                <FormGroup className="col-sm-6">
                                    <Label for="mobileNo">Mobile Number</Label>
                                    <Input type="text" defaultValue={data.mobileNo} onChange={e => setData({ ...data, mobileNo: e.target.value })} />
                                </FormGroup>
                                <FormGroup className="col-sm-6">
                                    <Label for="password">Password</Label>
                                    <Input type="password" defaultValue={data.password} onChange={e => setData({ ...data, password: window.btoa(e.target.value) })} />
                                </FormGroup>
                                <FormGroup className="col-sm-6">
                                    <Label for="cpassword" >Confirm Password</Label>
                                    <Input type="password" defaultValue={data.cpassword} onChange={e => setData({ ...data, cpassword: window.btoa(e.target.value) })}/>
                                </FormGroup>
                            </Row>
                            <Button type="submit" >Update</Button>
                        </form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </div>
}

export default UpdateProfile