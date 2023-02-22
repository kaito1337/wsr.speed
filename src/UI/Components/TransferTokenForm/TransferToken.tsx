import React, { FC } from 'react'
import { Button, Form } from 'react-bootstrap'
import { IProps } from '../../../Interfaces/Props.interfaces'
import Service from '../../../Services/Service'

export const TransferToken: FC<IProps> = ({ address }) => {

    const transferTokenHandler = async (e: any) => {
        e.preventDefault()
        const {target} = e;
        const data = await Service.transferToken(target[0].value, target[1].value, address);
    }

    return (
        <Form onSubmit={transferTokenHandler}>
            <h2>Перевести токены</h2>
            <Form.Group className="mb-3">
                <Form.Label>Адрес пользователя</Form.Label>
                <Form.Control required />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Кол-во токенов</Form.Label>
                <Form.Control required />
            </Form.Group>

            <Button variant="primary" type="submit">
                Перевести токены
            </Button>
        </Form>
    )
}
