import React, { FC } from 'react'
import { Button, Form } from 'react-bootstrap';
import { IProps } from '../../../Interfaces/Props.interfaces';
import Service from '../../../Services/Service';

export const Approve: FC<IProps> = ({ address }) => {

    const approveHandler = async (e: any) => {
        e.preventDefault()
        const { target } = e;
        const data = await Service.approve(target[0].value, target[1].value, address);
        console.log(data)
    }

    return (
        <Form onSubmit={approveHandler}>
            <h2>Дать пользование своими токенами</h2>
            <Form.Group className="mb-3">
                <Form.Label>Адрес пользователя</Form.Label>
                <Form.Control required />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Кол-во токенов</Form.Label>
                <Form.Control required />
            </Form.Group>

            <Button variant="primary" type="submit">
                Подтвердить
            </Button>
        </Form>
    )
}
