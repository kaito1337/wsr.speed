import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Service from '../../Services/Service'

export const Register = () => {

    const navigation = useHistory();

    const registerHandler = async (e: any) => {
        e.preventDefault();
        const { target } = e;
        const data = await Service.register(target[1].value, target[2].value, target[0].value);
        if (data) {
            navigation.push('/login')
        }
    }

    return (
        <Form className="text-center" style={{ fontSize: "2rem" }} onSubmit={registerHandler}>
            <h1 className="text-center">Регистрация</h1>

            <Form.Group className="mb-3">
                <Form.Label>Адрес в сети блокчейн</Form.Label>
                <Form.Control required />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Логин</Form.Label>
                <Form.Control required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control required />
            </Form.Group>
            <Button variant="primary" type="submit">
                Подтвердить
            </Button>
        </Form>
    )
}