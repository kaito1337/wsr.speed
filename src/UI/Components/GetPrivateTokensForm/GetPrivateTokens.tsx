import React, { FC, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { IProps } from '../../../Interfaces/Props.interfaces'
import Service from '../../../Services/Service';

export const GetPrivateTokens: FC<IProps> = ({ address }) => {

    const [privateTokens, setPrivateTokens] = useState<number>(0);

    const getPrivateTokensHandler = async (e: any) => {
        e.preventDefault();
        const { target } = e;
        const data = await Service.getPrivateTokens(target[0].value, address);
        setPrivateTokens(+data);
    }

    return (
        <>
            <Form onSubmit={getPrivateTokensHandler}>
                <h2>Узнать кол-во private CMON</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Адрес пользователя</Form.Label>
                    <Form.Control required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Отправить запрос
                </Button>
            </Form>

            {
                privateTokens !== 0 ? 
                (
                    <p>У пользователя {privateTokens/10**12} private CMON</p>
                ) : undefined
            }
        </>
    )
}
