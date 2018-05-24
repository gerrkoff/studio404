import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Labels from '../../modules/Labels';
import ToolbarLoginInfoContainer from '../../containers/ToolbarLoginInfoContainer';
import css from '../../styles/toolbar.css';

class Toolbar extends Component {
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
        <div>
            <Navbar color="light" light expand="md">
            <NavbarBrand onClick={() => this.props.history.push("/")} className={css.button}>Studio 404</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink onClick={() => this.props.history.push("/about")} className={css.button}>{Labels.about}</NavLink>
                    </NavItem>
                    <NavItem>
                        <ToolbarLoginInfoContainer />
                    </NavItem>
                </Nav>
            </Collapse>
            </Navbar>
        </div>
        );
    }
}

export default withRouter(Toolbar);