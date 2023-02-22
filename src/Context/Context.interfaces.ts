interface IProps{
    children: React.ReactNode;
}

interface IUser{
        login: string,
        wallet: string,
        seedTokens: number,
        privateTokens: number,
        publicTokens: number,
        role: string,
        whitelist: boolean
}

interface IRequest{
    login: string,
    wallet: string,
    status: boolean
}

interface IValues{
    user: IUser;
    getUser(user: IUser): void;
    getRequests(array: IRequest[]): void;
    logout(): void;
    getTokenPrice(price: number): void;
    tokenPrice: number;
    phase: number;
    getPhase(phase: number): void;
    requests: IRequest[]
}
export type{
    IProps,
    IValues,
    IRequest,
    IUser
}