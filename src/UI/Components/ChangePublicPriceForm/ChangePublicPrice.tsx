import React, { FC } from 'react'
import { Button, Form } from 'react-bootstrap'
import { IProps } from '../../../Interfaces/Props.interfaces'
import Service from '../../../Services/Service'

export const ChangePublicPrice:FC<IProps> = ({address}) => {

    const changePriceHandler = async (e:any) => {
        e.preventDefault();
        const { target } = e;
        const data = await Service.changePublicPrice(target[0].value, address);
    }
  return (
    <Form onSubmit={changePriceHandler}>
    <h2>Поменять цену открытой покупки токена</h2>
    <Form.Group className="mb-3">
        <Form.Label>Кол-во ETH</Form.Label>
        <Form.Control required />
    </Form.Group>

    <Button variant="primary" type="submit">
        Поменять цену
    </Button>
</Form>
  )
}
