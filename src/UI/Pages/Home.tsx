import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { start } from 'repl';
import { Context } from '../../Context/ContextWrapper';
import Service from '../../Services/Service';
import { Approve } from '../Components/ApproveForm/Approve';
import { BuyToken } from '../Components/BuyTokenForm/BuyToken';
import { ChangePublicPrice } from '../Components/ChangePublicPriceForm/ChangePublicPrice';
import { GetPrivateTokens } from '../Components/GetPrivateTokensForm/GetPrivateTokens';
import { GetPublicTokens } from '../Components/GetPublicTokensForm/GetPublicTokens';
import { GetUserData } from '../Components/GetUserDataForm/GetUserData';
import { GiveReward } from '../Components/GiveRewardForm/GiveReward';
import { SendRequest } from '../Components/SendRequestForm/SendRequest';
import { Timer } from '../Components/TimerForm/Timer';
import { TransferToken } from '../Components/TransferTokenForm/TransferToken';
import { Whitelist } from '../Components/WhitelistForm/Whitelist';
import { WhitelistRequests } from '../Components/WhitelistRequestsForm/WhitelistRequests';

interface IBalance {
    seedTokens: number;
    privateTokens: number;
    publicTokens: number;
    ethBalance: number;
}

export const Home = () => {

    const initBalance = {
        seedTokens: 0,
        privateTokens: 0,
        publicTokens: 0,
        ethBalance: 0
    }

    const { user, getTokenPrice, phase } = useContext(Context);
    const [balance, setBalance] = useState<IBalance>(initBalance);
    const [startTime, setStartTime] = useState<string>("");


    useEffect(() => {
        (async () => {
            balanceHandler()
            const startTimeData = await Service.getTimeStart();
            const time = new Date(startTimeData*1000).toString();
            setStartTime(time)
        })()
    }, [phase])

    const balanceHandler = async () => {
        const data = await Service.getBalance(user.wallet);
        const tokenPrice = await Service.getTokenPrice(user.wallet);
        setBalance({ seedTokens: data[0], privateTokens: data[1], publicTokens: data[2], ethBalance: data[3] });
        getTokenPrice(+tokenPrice);
    }
    return (
        <div className="text-center" style={{ fontSize: "2rem" }}>
            <p>?????????? ?????????????? ??????????????: {startTime}</p>
            <Timer address={user.wallet} />
            <p>?????? ??????????: {user.login}</p>
            <p>?????? ??????????: {user.wallet}</p>
            <p>???????? ????????: {user.role === "3" ? "????????????????" : user.role === "1" ? "???????????? ??????????????????" : user.role === "2" ? "???????????? ??????????????????" : "????????????????????????"}</p>
            <p>?? ??????:</p>
            <p>{balance.seedTokens / 10 ** 12} CMON Seed</p>
            <p>{balance.privateTokens / 10 ** 12} CMON Private</p>
            <p>{balance.publicTokens / 10 ** 12} CMON Public</p>
            <p>{balance.seedTokens / 10 ** 12 + balance.privateTokens / 10 ** 12 + balance.publicTokens / 10 ** 12} CMON ??????????</p>
            <p>?? ?????? {balance.ethBalance / 10 ** 18} ETH</p>
            <p>???? ?? ??????????????????: {user.whitelist ? "????" : "??????"}</p>
            <Button onClick={balanceHandler}>???????????????? ????????????</Button>
            <Approve address={user.wallet} />
            <BuyToken address={user.wallet} />
            <TransferToken address={user.wallet} />

            {!user.whitelist ? (
                <SendRequest address={user.wallet} />
            ) : undefined
            }
            {
                user.role === "2" ?
                    (
                        <>
                            <GetPrivateTokens address={user.wallet} />
                            <WhitelistRequests address={user.wallet} />
                            <Whitelist address={user.wallet} />
                        </>
                    ) : undefined
            }
            {
                user.role === "3" ?
                    (
                        <>
                            <GetUserData address={user.wallet} />

                        </>
                    ) : undefined
            }
            {
                user.role === "1" ?
                    (
                        <>
                            <ChangePublicPrice address={user.wallet} />
                            <GiveReward address={user.wallet} />
                            <GetPublicTokens address={user.wallet} />

                        </>
                    ) : undefined
            }
        </div>
    )
}
