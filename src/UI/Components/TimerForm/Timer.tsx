import React, { FC, useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Context } from '../../../Context/ContextWrapper';
import { IProps } from '../../../Interfaces/Props.interfaces'
import Service from '../../../Services/Service'

export const Timer: FC<IProps> = ({ address }) => {

    const [ittr, setIttr] = useState<number>(0);
    const [localTime, setLocalTime] = useState<number>(0);
    const [privateTime, setPrivateTime] = useState<number>(0);
    const [publicTime, setPublicTime] = useState<number>(0);
    const [localPrice, setLocalPrice] = useState<number>(0);
    const { getPhase, phase, getTokenPrice, tokenPrice } = useContext(Context)



    useEffect(() => {
        (async () => {
            const time = await Service.getLifeTime(address);
            const price = await Service.getTokenPrice(address);
            const counter = await Service.getCounter(address);
            if (+counter === 0 && phase === 2) {
                const data = await Service.transferToProvider(2, address);
            } else if (+counter === 1 && phase === 3) {
                const data = await Service.transferToProvider(3, address);
                const ownerTokens = await Service.setAvailableOwnerTokens();
            }
            setLocalTime(+time);
            setLocalPrice(price);
            getTokenPrice(localPrice)
        })()
    }, [phase])

    useEffect(() => {
        const interval = setInterval(() => setIttr(ittr + 1), 1000);
        setLocalTime(localTime + 1)
        if (localTime > 300 && localTime < 900) {
            getPhase(2)
            setPrivateTime(900 - localTime - 1);
        } else if (localTime >= 900) {
            getPhase(3);
            setPublicTime(localTime - 900 + 1);
            setPrivateTime(0);
        }
        return () => clearInterval(interval);
    }, [ittr])

    const plusMinuteHandler = async () => {
        const data = await Service.addMinute(address);
        const newTime = await Service.getLifeTime(address);
        setLocalTime(+newTime);
        if (localTime > 300 && localTime < 900) {
            setPrivateTime(privateTime - 60);
        } else if (localTime > 900) {
            setPublicTime(publicTime + 60);
        }
    }

    return (
        <>
            <p>Текущее время: {localTime}</p>
            <p>Фаза: {phase}</p>
            <Button onClick={plusMinuteHandler}>Добавить минуту</Button>
            {
                publicTime !== 0 ?
                    (
                        <p>Прошло со старта открытой фазы: {publicTime}</p>
                    ) : undefined
            }
            {
                privateTime !== 0 ?
                    (
                        <p>До конца закрытой стадии: {privateTime}</p>
                    ) : undefined
            }
            <p>Цена токена: {localPrice / 10 ** 18} ETH</p>
        </>
    )
}
