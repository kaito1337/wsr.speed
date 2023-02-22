import React, { FC } from 'react'
import { Button, Form } from 'react-bootstrap';
import { IProps } from '../../../Interfaces/Props.interfaces';
import Service from '../../../Services/Service';

export const GiveReward: FC<IProps> = ({address}) => {
    const giveRewardHandler = async (e: any) => {
        e.preventDefault()
        const {target} = e;
        const data = await Service.giveReward(target[0].value, target[1].value, address);
    }

    return (
        <Form onSubmit={giveRewardHandler}>
            <h2>Наградить пользователя</h2>
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
