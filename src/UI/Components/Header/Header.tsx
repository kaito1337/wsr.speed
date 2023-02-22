import React, { useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Context } from '../../../Context/ContextWrapper';

export const Header = () => {

    const { user, logout } = useContext(Context);

    return (
        <Navbar style={{ backgroundColor: "purple" }} variant="dark">
            <Container>
                <Navbar.Brand>Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    {
                        user.login ?
                            (
                                <>
                                    <Link to="/home">Личный кабинет</Link>
                                    <Link to="/login" onClick={logout}>Выйти</Link>
                                </>
                            ) :
                            (
                                <>
                                    <Link to="/">Регистрация</Link>
                                    <Link to="/login">Вход</Link>
                                </>
                            )
                    }
                </Nav>
            </Container>
        </Navbar>
    )
}
