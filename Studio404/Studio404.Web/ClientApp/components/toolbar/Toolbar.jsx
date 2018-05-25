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
        <div className='navbar navbar-expand-sm navbar-light bg-light'
            ref={(el) => {
                if (el) {
                    el.style.setProperty('background-color', muiTheme.palette.primary1Color, 'important');
                }
            }}>
            {/*<Navbar color="light" light expand="sm">*/}
                <Container>
                    <NavbarBrand onClick={() => this.props.history.push("/")}
                                className={css.button} 
                                style={{color: muiTheme.palette.alternateTextColor}}>
                        Studio 404
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink onClick={() => this.props.history.push("/about")} 
                                        className={css.button}
                                        style={{color: muiTheme.palette.alternateTextColor}}>
                                    {Labels.about}
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <ToolbarLoginInfoContainer />
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            {/*</Navbar>*/}
        </div>
        );
    }
}

export default withRouter(Toolbar);