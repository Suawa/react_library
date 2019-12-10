import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import userpng from './user.png';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm" light>
          <Container>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
                <NavItem className>
                    <img src={userpng} width={25, 25} />
                    <b> </b>
                    <NavbarBrand>Ivanov Ivan</NavbarBrand>
                </NavItem>
                            <NavItem>
                                <NavbarBrand>{new Date().toLocaleDateString()}</NavbarBrand>
                </NavItem>
            </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
