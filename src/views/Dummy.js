import { Button, Card, CardBody, Col, FormGroup, Input, Label, Row } from "reactstrap"

const Dummy = () => {

    return <div className="content">
        <Row>
            <Col sm={2}>
                <img width="200" height={200} className="rounded" src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600" />
                <Button>upload Image</Button>
            </Col>
            <Col sm={10}>
                <Card>
                    <CardBody> 
                        <form>
                            <FormGroup>
                                <Label for="exampleEmail1">Email address</Label>
                                <Input type="email" name="email" id="exampleEmai1l" placeholder="name@example.com" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelect1">Example select</Label>
                                <Input type="select" name="select" id="exampleSelect1">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleSelectMulti1">Example multiple select</Label>
                                <Input type="select" name="selectMulti" id="exampleSelectMulti1" multiple>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleText">Example textarea</Label>
                                <Input type="textarea" name="text" id="exampleText" />
                            </FormGroup>
                        </form>
                        <Button >Update</Button>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </div>
}

export default Dummy