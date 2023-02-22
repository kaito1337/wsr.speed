import React, { FC, useState } from 'react'
import { Button, Form, ListGroup } from 'react-bootstrap'
import { IUser } from '../../../Context/Context.interfaces'
import { IProps } from '../../../Interfaces/Props.interfaces'
import Service from '../../../Services/Service'

export const GetUserData: FC<IProps> = ({ address }) => {

    const initState = {
        login: "",
        wallet: "",
        seedTokens: 0,
        privateTokens: 0,
        publicTokens: 0,
        role: "",
        whitelist: false
    }

    const [user, setUser] = useState<IUser>(initState)

    const GetUserDataHandler = async (e: any) => {
        e.preventDefault();
        const { target } = e;

        const userData = await Service.getUserData(target[0].value, address)
        setUser(userData);
    }

    return (
        <>

            <Form onSubmit={GetUserDataHandler}>
                <h2>Узнать информацию о пользователе</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Адрес пользователя</Form.Label>
                    <Form.Control required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Подтвердить
                </Button>
            </Form>

            {
                user.login !== "" ?
                    (
                        <ListGroup style={{fontSize: "1.5rem", marginTop:"1rem"}}>
                            <ListGroup.Item>Логин: {user.login} </ListGroup.Item>
                            <ListGroup.Item >Адрес: {user.wallet}</ListGroup.Item>
                            <ListGroup.Item>Роль: {user.role === "3" ? "Владелец" : user.role === "2" ? "Приват провайдер" : user.role === "1" ? "Паблик провайдер" : "Пользователь"}</ListGroup.Item>
                            <ListGroup.Item>В вайтлисте: {user.whitelist ? "Да" : "Нет"}</ListGroup.Item>
                            <ListGroup.Item>{user.seedTokens / 10 ** 12} seed CMON</ListGroup.Item>
                            <ListGroup.Item>{user.privateTokens / 10 ** 12} private CMON</ListGroup.Item>
                            <ListGroup.Item>{user.publicTokens / 10 ** 12} public CMON</ListGroup.Item>
                            <ListGroup.Item>{user.seedTokens / 10 ** 12 + user.privateTokens / 10 ** 12 + user.publicTokens / 10 ** 12} всего CMON</ListGroup.Item>

                        </ListGroup>
                    ) : undefined
            }

        </>
    )
}
