import React from "react";
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faUserCircle, faChartBar, faListAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";


//TODO: need to make the post-login routes secure

const Navbar = (props) => {
    console.log(props)
    // const history = useHistory()
    return (
        <React.Fragment>
            
                <Nav className="justify-content-end" activeKey="/">
                    <Nav.Item>
                        <Nav.Link href="/map"><FontAwesomeIcon icon={faMapMarkerAlt} /></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/profile">
                            <FontAwesomeIcon icon={faUserCircle} />
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/needsfeed">
                            <FontAwesomeIcon icon={faListAlt} />
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/analytics">
                            <FontAwesomeIcon icon={faChartBar} />
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                {props.children}
        </React.Fragment>
    );
};

export default Navbar;