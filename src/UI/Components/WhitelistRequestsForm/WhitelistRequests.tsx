import React, { FC, useContext, useEffect, useState } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { IRequest } from '../../../Context/Context.interfaces'
import { Context } from '../../../Context/ContextWrapper'
import { IProps } from '../../../Interfaces/Props.interfaces'
import Service from '../../../Services/Service'

export const WhitelistRequests: FC<IProps> = ({ address }) => {

    const [localRequests, setLocalRequests] = useState<IRequest[]>([])

    const { requests, getRequests } = useContext(Context);

    useEffect(() => {
        (async () => {
            const data = await Service.getRequests(address);
            setLocalRequests(data);
        })()
    }, [requests])

    const approveHandler = async (idx: number, solut: boolean) => {
        const data = await Service.takeRequest(idx, solut, address);
        const newWhitelistRequests = await Service.getRequests(address);
        getRequests(newWhitelistRequests);
    }

    return (
        <>
            <h2>Список запросов в вайтлист</h2>
            <ListGroup>
                {
                    localRequests?.map((el, idx) => {
                        if (el.wallet.includes("00000")) return;
                        return <ListGroup.Item key={idx}>Логин: {el.login} | Адрес: {el.wallet} | Статус: {el.status ? "Принят" : "В ожидании"}
                            {
                                !el.status ?
                                    (
                                        <>
                                            <Button style={{ margin: "5px" }} onClick={() => approveHandler(idx, true)}>Принять</Button>
                                            <Button onClick={() => approveHandler(idx, false)}>Отклонить</Button>
                                        </>

                                    ) : undefined
                            }
                        </ListGroup.Item>
                    })
                }
            </ListGroup>
        </>
    )
}
