import React, { createContext, FC, useState } from 'react'
import { IProps, IRequest, IUser, IValues } from './Context.interfaces';

export const Context = createContext({} as IValues);

export const ContextWrapper: FC<IProps> = ({ children }) => {

    const initState = {
        login: "",
        wallet: "",
        seedTokens: 0,
        privateTokens: 0,
        publicTokens: 0,
        role: "",
        whitelist: false
    }

    const [user, setUser] = useState(initState);
    const [phase, setPhase] = useState<number>(1);
    const [tokenPrice, setTokenPrice] = useState<number>(0);
    const [requests, setRequests] = useState<IRequest[]>([])

    const getUser = (user: IUser) => {
        setUser(user)
    }

    const getPhase = (phase: number) => {
        setPhase(phase);
    }

    const getTokenPrice = (tokenPrice: number) => {
        setTokenPrice(tokenPrice);
    }

    const getRequests = (requests: IRequest[]) => {
        setRequests(requests);
    }

    const logout = () => {
        setUser(initState)
    }

    const values = {
        user,
        getUser,
        phase,
        tokenPrice,
        requests,
        getRequests,
        getPhase,
        getTokenPrice,
        logout
    }

    return (
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )
}
