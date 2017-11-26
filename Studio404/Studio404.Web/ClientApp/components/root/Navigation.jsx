import React from 'react';
import { NavLink } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink as BootstrapNavLink } from 'reactstrap';
import muiThemeable from 'material-ui/styles/muiThemeable';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);

        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Navbar color="faded" light expand="md">
                <NavbarBrand href="/">404 studio</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink to="/" exact activeStyle={{color: this.props.muiTheme.palette.primary1Color}} className="nav-link">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/booking" activeStyle={{color: this.props.muiTheme.palette.primary1Color}} className="nav-link">Booking</NavLink>
                    </NavItem>
                </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default muiThemeable()(Navigation);