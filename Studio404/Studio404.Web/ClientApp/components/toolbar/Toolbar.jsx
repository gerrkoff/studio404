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
    DropdownItem,
    Container } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Labels from '../../modules/Labels';
import ToolbarLoginInfoContainer from '../../containers/ToolbarLoginInfoContainer';
import css from '../../styles/toolbar.css';
import { muiTheme } from '../../modules/MaterialTheme';

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
        <div style={divStyle}>
            <Navbar color="light" light expand="sm">
                <Container>
                    <NavbarBrand onClick={() => this.props.history.push("/")}
                                className={css.button} 
                                style={{color: muiTheme.palette.primary3Color}}>
                        Studio 404
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink onClick={() => this.props.history.push("/about")} 
                                        className={css.button}
                                        style={{color: muiTheme.palette.accent1Color}}>
                                    {Labels.about}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <ToolbarLoginInfoContainer />
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        );
    }
}

export default withRouter(Toolbar);