
import React, { useState } from "react";

import {
  FormGroup,
  Label,
  Input,
  Row,
  Col
} from "reactstrap";

import { Button } from "reactstrap";
import logo2 from '../../assets/logo2.jpeg'
import logo from '../../assets/logo1.png'
import { useHistory } from "react-router-dom";
import { createUser } from "services/UserService";
import Swal from 'sweetalert2'

const UserSignUp = () => {

  const [isAgency, setIsAgency] = useState(false)
  const [agencyName, setAgencyName] = useState("")
  const [data, setData] = useState({
    question: "",
    answer: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  })
  const history = useHistory()

  const onSubmit = (e) => {
    e.preventDefault()
    const temp = data
    if (isAgency) {
      temp.firstName = agencyName
      temp["isAgency"] = true      
    } else {
      temp["isAgency"] = false
    }

    createUser(temp).then(rs => {
      Swal.fire({
        title: "Success",
        text: `Account created successfully!`,
        icon: "success",
      }).then(x => {
        history.push("/login")
      })
    }).catch(err => {
      Swal.fire({
        title: "Failed",
        text: "Failed to create account please try again!",
        icon: "error",
      })
    })
  }


  return (
    <><div className="d-flex justify-content-center mt-5">
      <div className="border border-dark p-4">
        <div className="d-flex justify-content-center">
          {!isAgency ? <img src={logo} width="300px" height="200px" /> :
            <img src={logo2} width="300px" height="200px" />}
        </div>
        <form onSubmit={onSubmit}>
          <Row>
            {!isAgency ? <> <Col>
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                  required={!isAgency}
                  type="text"
                  defaultValue={data.firstName}
                  onChange={e => setData({ ...data, firstName: e.target.value })}
                  id="firstName"
                  placeholder="Enter First Name"
                />
              </FormGroup>
            </Col>
              <Col>
                <FormGroup>
                  <Label for="LastName">Last Name</Label>
                  <Input
                    required={!isAgency}
                    type="text"
                    defaultValue={data.lastName}
                    onChange={e => setData({ ...data, lastName: e.target.value })}
                    name="LastName"
                    id="LastName"
                    placeholder="Enter Last Name"
                  />
                </FormGroup>
              </Col></> :
              <Col>
                <FormGroup>
                  <Label for="agencyname">Agency Name</Label>
                  <Input
                    required={isAgency}
                    defaultValue={agencyName}
                    onChange={e => setAgencyName(e.target.value)}
                    type="text"
                    name="agencyName"
                    id="agencyname"
                    placeholder="Enter Agency Name"
                  />
                </FormGroup>
              </Col>}
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  required
                  type="email"
                  defaultValue={data.email}
                  onChange={e => setData({ ...data, email: e.target.value })}
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  required
                  type="password"
                  defaultValue={data.password}
                  onChange={e => setData({ ...data, password: window.btoa(e.target.value) })}
                  name="password"
                  id="examplePassword"
                  placeholder="Password"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="securityQ">Security Question</Label>
                <Input
                  required
                  type="text"
                  defaultValue={data.question}
                  onChange={e => setData({ ...data, question: e.target.value })}
                  name="securityQ"
                  id="securityQ"
                  placeholder="Entler Security Question"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="answer">Answer</Label>
                <Input
                  required
                  type="text"
                  defaultValue={data.answer}
                  onChange={e => setData({ ...data, answer: e.target.value })}
                  name="answer"
                  id="answer"
                  placeholder="Enter Answer"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Label for="answer" className="d-block">Do you want to create account as Agency?</Label>
              <div className="form-check-radio form-check-inline">
                <Label className="form-check-label">
                  <Input type="radio" name="exampleRadios1" onClick={e => setIsAgency(true)} id="exampleRadios11" value="option1" />
                  Yes
                  <span className="form-check-sign"></span>
                </Label>
              </div>
              <div className="form-check-radio form-check-inline">
                <Label className="form-check-label">
                  <Input type="radio" name="exampleRadios1" onClick={e => setIsAgency(false)} id="exampleRadios12" value="option2" defaultChecked />
                  No
                  <span className="form-check-sign"></span>
                </Label>
              </div>
            </Col>
          </Row>
          <Button color="primary" type="submit" >
            Submit
          </Button>
          <Label className="text-primary float-right mt-3" style={{ cursor: "pointer" }} onClick={() => history.push("/login")}>&nbsp;Already have account ? Login</Label><br />
        </form>
      </div>
    </div >
    </>
  );
};


export default UserSignUp