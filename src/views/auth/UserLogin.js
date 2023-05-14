import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import {
  FormGroup,
  Label,
  Input,
  FormText,
  Row
} from "reactstrap";

import { Button } from "reactstrap";
import logo2 from '../../assets/logo2.jpeg'
import logo from '../../assets/logo1.png'
import { login, forgotPassword } from '../../services/UserService'
import Swal from 'sweetalert2'

const UserLogin = () => {

  const [type, setType] = useState("user")
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const history = useHistory()

  const goToCreateAccount = () => {
    history.push("/signup")
  }

  const onSubmit = (e) => {
    e.preventDefault()
    login(data.email, data.password, type === 'agency').then(rs => {
      if (rs.data.length) {
        localStorage.setItem("user", JSON.stringify(rs.data[0]))
        if (rs.data[0].isAgency) {
          history.push("/user/dashboard")
        } else {
          history.push("/user/book-travel")
        }
      } else {
        Swal.fire({
          title: 'Failed',
          text: 'Incorrect email and password',
          icon: 'error',
        })
      }
    })
  }

  const onForgot = async () => {
    const { value: email } = await Swal.fire({
      title: 'Enter your Email address',
      input: 'text',
      inputLabel: 'Your Email address',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
      }
    })

    if (email) {
      forgotPassword(email).then(async rs => {
        if (rs.data.length) {
          const { value: answer } = await Swal.fire({
            title: 'Enter answer for security question',
            input: 'text',
            inputLabel: rs.data[0].securityQ + " ?",
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return 'You need to write something!'
              }
            }
          })

          if (answer) {
            if (answer === rs.data[0].answer) {
              Swal.fire({
                title: 'Your Password',
                text: rs.data[0].password
              })
            } else {
              Swal.fire({
                title: 'Wrong Answer',
                icon: "warning",
                text: "Please Enter correct answer"
              })
            }
          }
        } else {
          Swal.fire({
            text: "Email Id not found!! Please try to create an account.",
            icon: "info"
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }

  useEffect(() => {
    if (localStorage.getItem("user")) {
      if (JSON.parse(localStorage.getItem("user"))?.isAgency) {
        history.push("/user/dashboard")
      } else {
        history.push("/user/book-travel")
      }
    }
  }, [])

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="border border-dark p-4">
        {type !== 'user' ? <h6 className="text-center bg-white text-dark rounded" style={{ cursor: "pointer" }}>Loggin as Travel Agency</h6> :
          <h6 className="text-center bg-white text-dark rounded" style={{ cursor: "pointer" }}>Loggin as User</h6>}
        <form onSubmit={onSubmit}>
          {type !== 'user' ? <img src={logo2} width="300px" height="200px" /> :
            <img src={logo} width="300px" height="200px" />}
          <FormGroup>
            <Label for="exampleEmail">Email address</Label>
            <Input
              required
              type="email"
              defaultValue={data.email}
              onChange={e => setData({ ...data, email: e.target.value })}
              name="email"
              id="exampleEmail"
              placeholder="Enter email"
            />
          </FormGroup>
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
          <Label className="float-right mt-2 text-primary" onClick={onForgot}>Forgot Password ?</Label>
          <Button color="primary" type="submit">
            Submit
          </Button>
        </form>
        <hr />
        <div className="d-flex justify-content-center">
          Don't have account ? <Label className="text-primary" style={{ cursor: "pointer" }} onClick={goToCreateAccount}>&nbsp;Create Account</Label><br />
        </div>
        {type === 'user' ? <h6 className="text-center bg-primary text-white rounded py-2" style={{ cursor: "pointer" }} onClick={() => setType('agency')}>Login as Travel Agency</h6> :
          <h6 className="text-center bg-primary text-white rounded py-2" style={{ cursor: "pointer" }} onClick={() => setType('user')}>Login as User</h6>}
      </div>
    </div>
  );
};

export default UserLogin;