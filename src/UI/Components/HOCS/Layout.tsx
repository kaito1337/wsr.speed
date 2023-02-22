import React, { FC } from 'react'
import { IProps } from '../../../Context/Context.interfaces'
import { Header } from '../Header/Header'

export const Layout: FC<IProps> = ({ children }) => {
    return (
        <>
            <Header />
            <div style={{paddingLeft: "30%", paddingRight:"30%"}}>{children}</div>
        </>
    )
}
