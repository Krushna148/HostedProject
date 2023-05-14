import React from "react";
import {
  FormGroup,
  Label,
  Input,
  FormText,
  Card,
  CardBody
} from "reactstrap";

import { Button } from "reactstrap";
import { useHistory } from 'react-router-dom'
const Setting = () => {

  const history = useHistory()

  const onSignOut = () => {
    localStorage.clear()
    history.push("/login")
  }
  return (
    <div className="content">
      <Card>
        <CardBody>
          <Button color="primary" className="px-2 m-2" onClick={onSignOut} >SignOut</Button>
          <Button color="danger" className="px-2 m-2">Delete Account</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Setting;