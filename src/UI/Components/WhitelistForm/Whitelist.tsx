import React, { FC, useContext, useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { IRequest } from '../../../Context/Context.interfaces'
import { Context } from '../../../Context/ContextWrapper'
import { IProps } from '../../../Interfaces/Props.interfaces'
import Service from '../../../Services/Service'

export const Whitelist: FC<IProps> = ({ address }) => {

    const [whitelist, setWhitelist] = useState<IRequest[]>([])
    const { requests } = useContext(Context);

    useEffect(() => {
        (async () => {
            const data = await Service.getWhitelist(address);
            setWhitelist(data);
        })()
    }, [requests])

    return (
        <>
            <h2>Список пользователей в вайтлисте</h2>
            <ListGroup>
                {
                    whitelist?.map((el, idx) => (
                        <ListGroup.Item key={idx}>Логин: {el.login} | Адрес: {el.wallet}</ListGroup.Item>
                    ))
                }
            </ListGroup>
        </>
    )
}
