import React, { FC, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { IProps } from '../../../Interfaces/Props.interfaces';
import Service from '../../../Services/Service';

export const GetPublicTokens: FC<IProps> = ({address}) => {
    const [publicTokens, setPublicTokens] = useState<number>(0);

    const getPublicTokensHandler = async (e: any) => {
        e.preventDefault();
        const { target } = e;
        const data = await Service.getPublicTokens(target[0].value, address);
        setPublicTokens(+data);
    }

    return (
        <>
            <Form onSubmit={getPublicTokensHandler}>
                <h2>Узнать кол-во public CMON</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Адрес пользователя</Form.Label>
                    <Form.Control required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Отправить запрос
                </Button>
            </Form>

            {
                publicTokens !== 0 ? 
                (
                    <p>У пользователя {publicTokens/10**12} public CMON</p>
                ) : undefined
            }
        </>
    )
}
