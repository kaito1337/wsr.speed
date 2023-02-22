import React, { FC, useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Context } from '../../../Context/ContextWrapper';
import { IProps } from '../../../Interfaces/Props.interfaces'
import Service from '../../../Services/Service';

export const BuyToken: FC<IProps> = ({ address }) => {

    const [amount, setAmount] = useState<number>(0);
    const [allowance, setAllowance] = useState<number>(0);
    const { tokenPrice, phase, user } = useContext(Context);
    const [maxValue, setMaxValue] = useState<number>(0);

    useEffect(() => {
        (async () => {
            const allowanceData = await Service.allowance(address, phase);
            setAllowance(+allowanceData);
            if(phase === 2){
                setMaxValue(100000);    
            }else if(phase === 3){
                setMaxValue(5000);
            }
        })()
    }, [phase])

    const buyTokenHandler = async () => {
        if (amount <= maxValue ) {
        const tokenPriceData = await Service.getTokenPrice(address);
        const data = await Service.buyToken(amount, tokenPriceData, address)
        }else{
            alert(`Максимальное значение: ${maxValue}`)
        }
    }

    const approveHandler = async () => {
        if (amount <= maxValue ) {
            if(phase === 2 && !user.whitelist){
                alert('Free sale not started')
            }
            const data = await Service.approve(address, amount, address, phase);
            const newAllowance = await Service.allowance(address, phase);
            setAllowance(+newAllowance);
        }else if (maxValue === 0){
            alert(`Стадия закрытой покупки ещё не началась`)
        }else{
            alert(`Максимальное значение: ${maxValue}`)
        }
    }

    return (
        <>
            <Form>
                <h2>Купить токены</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Кол-во токенов</Form.Label>
                    <Form.Control type="number" onChange={({target}) => setAmount(+target.value)} required />
                </Form.Group>

                {
                    allowance === 0 ?
                        (
                            <Button variant="primary" onClick={approveHandler}>Подтвердить</Button>
                        ) :
                        (
                            <Button variant="primary" onClick={buyTokenHandler}>Купить</Button>
                        )
                }

            </Form>
        </>
    )
}
