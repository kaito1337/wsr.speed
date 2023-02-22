import React, { FC } from 'react'
import { Button, Form } from 'react-bootstrap'
import { IProps } from '../../../Interfaces/Props.interfaces'
import Service from '../../../Services/Service'

export const SendRequest: FC<IProps> = ({ address }) => {

    const sendRequestHandler = async (e: any) => {
        e.preventDefault();
        const {target} = e;
        const data = await Service.sendRequest(target[0].value, address);
        console.log(data)
    }

    return (
        <Form onSubmit={sendRequestHandler}>
            <h2>Отправить запрос в вайтлист</h2>
            <Form.Group className="mb-3">
                <Form.Label>Логин</Form.Label>
                <Form.Control required />
            </Form.Group>

            <Button variant="primary" type="submit">
                Отправить запрос
            </Button>
        </Form>
    )
}
