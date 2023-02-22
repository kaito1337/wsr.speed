import React, { useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { Context } from '../../Context/ContextWrapper';
import Service from '../../Services/Service';

export const Login = () => {

    const navigation = useHistory();

    const { getUser } = useContext(Context);

    const loginHandler = async (e: any) => {
        e.preventDefault();
        const { target } = e;
        const data = await Service.login(target[0].value, target[1].value, "");
        if (data) {
            console.log(data)
            getUser(data);
            navigation.push('/home');
        }
    }
    return (
        <Form className="text-center" style={{ fontSize: "2rem" }} onSubmit={loginHandler}>
            <h1>Авторизация</h1>
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
