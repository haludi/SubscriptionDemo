﻿import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

const NavMenu = ({ }) => {
    return (
        <Navbar inverse fixedTop fluid collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to={'/'}>Demo</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <LinkContainer to={'/'} exact>
                        <NavItem>
                            <Glyphicon glyph='home' /> Home
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to={'/counter'}>
                        <NavItem>
                            <Glyphicon glyph='education' /> Counter
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to={'/fetchdata'}>
                        <NavItem>
                            <Glyphicon glyph='th-list' /> Fetch data
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to={'/products'}>
                        <NavItem>
                            <Glyphicon glyph='th-list' /> Products
                        </NavItem>
                    </LinkContainer>
                    <LinkContainer to={'/orders'}>
                        <NavItem>
                            <Glyphicon glyph='th-list' /> Orders
                        </NavItem>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavMenu;
