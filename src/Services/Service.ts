import Web3 from "web3";
import ABI from './ABI.json'

class Service {
    web3 = new Web3("http://localhost:8545");
    contract = new this.web3.eth.Contract(ABI as any, "0x583b4527dB06BAFB87B18E2944eE1F32B5f84A60")
    owner = "0xB3bEf895F780E5331Bb0011A3ad27C385942cFC6";
    privateProvider = "0xd335eEDDa6D85ae0Edf670daA126d3Dae32b2df8";
    publicProvider = "0xE0FbeF2d04312289a178dFF5e80F4E6c8105bbF9"

    async register(login: string, password: string, address: string) {
        try {
            return await this.contract.methods.signUp(login, password).send({from: address})
        } catch (error) {
            alert(error);
        }
    }

    async login(login: string, password: string, address: string) {
        try {
            return await this.contract.methods.signIn(login, password).call({from: address })
        } catch (error) {
            alert(error);
        }
    }

    async getTimeStart(){
        try{
            return await this.contract.methods.getTimeStart().call({from:this.owner})
        }catch(e){
            console.log(e);
            
        }
    }

    async getBalance(address:string){
        try {
            return await this.contract.methods.getBalance().call({from: address});
        } catch (error) {
            console.log(error);
        }
    }

    async getLifeTime(address:string){
        try {
            return await this.contract.methods.getLifeTime().call({from: address});
        } catch (error) {
            console.log(error);
            
        }
    }

    async getRequests(address:string){
        try {
            return await this.contract.methods.getRequests().call({from: address});
        } catch (error) {
            console.log(error);
            
        }
    }

    async getAvailableOwnerTokens(){
        try {
            return await this.contract.methods.getAvailableOwnerTokens().send({from: this.owner});
        } catch (error) {
            console.log(error);
            
        }
    }

    async getTokenPrice(address:string){
        try {
            return await this.contract.methods.getTokenPrice().call({from: address});
        } catch (error) {
            console.log(error);
            
        }
    }

    async getWhitelist(address:string){
        try {
            return await this.contract.methods.getWhitelist().call({from: address});
        } catch (error) {
            console.log(error);
            
        }
    }

    async transferToken(wallet: string, amount: number, address:string){
        try{
            return await this.contract.methods.transferToken(wallet, BigInt(amount*10**12)).send({ from: address});
        }catch(e){
            alert(e)
        }
    }

    async getUserData(wallet: string, address:string){
        try {
            return await this.contract.methods.getUserData(wallet).call({from: address});
        } catch (error) {
            console.log(error);
        }
    }

    async getPublicTokens(wallet: string, address:string){
        try {
            return await this.contract.methods.getPublicTokens(wallet).call({from: address});
        } catch (error) {
            console.log(error);
            
        }
    }

    async getPrivateTokens(wallet: string, address:string){
        try {
            return await this.contract.methods.getPrivateTokens(wallet).call({from: address});
        } catch (error) {
            console.log(error);
            
        }
    }

    async addMinute(address:string){
        try {
            return await this.contract.methods.addMinute().send({from: address})
        } catch (error) {
            console.log(error)
        }
    }

    async takeRequest(idx: number, solut: boolean, address: string){
        try {
            return await this.contract.methods.takeRequest(idx, solut).send({from:address});
        } catch (error) {
            console.log(error)
        }
    }
    
    async sendRequest(login: string, address:string){
        try{
            return await this.contract.methods.sendRequest(login).send({from: address});
        }catch(error){
            alert(error);
        }
    }

    async transferToProvider(phase: number, address: string){
        try{
            return await this.contract.methods.transferToProvider(phase).send({from: this.owner});
        }catch(error){
            console.log(error);
            
        }
    }

    async getCounter(address: string){
        try {
            return await this.contract.methods.getCounter().call({from: address})
        } catch (error) {
            console.log(error)
        }
    }
    
    async buyToken(amount: number, tokenPrice: number, address: string){
        const value = BigInt(amount*tokenPrice).toString()

        try{
            return await this.contract.methods.buyToken(BigInt(amount*10**12)).send({from: address, value: value})
        }catch(error){
            alert(error);
            
        }
    }

    async allowance(address: string, phase?: number){
        try {
            if(phase === 2){
                return await this.contract.methods.allowance(this.privateProvider, address).call({from: this.privateProvider});
            }else if(phase === 3){
                return await this.contract.methods.allowance(this.publicProvider, address).call({from: this.publicProvider});
            }else{
                return 0
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    
    async setAvailableOwnerTokens(){
        try {
            return await this.contract.methods.setAvailableOwnerTokens().send({from: this.owner});
        } catch (error) {
            console.log(error);
            
        }
    }

    async approve(wallet: string, amount: number, address: string, phase?: number){
        try {
            if(phase === 2){
                return await this.contract.methods.approve(address, address).send({from: this.privateProvider});
            }else if(phase === 3){
                return await this.contract.methods.approve(address, address).send({from: this.publicProvider});
            }else{
                return await this.contract.methods.approve(wallet, BigInt(amount*10**12)).send({from: address})
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    async giveReward(wallet: string, amount: number, address: string){
        try {
            return await this.contract.methods.giveReward(wallet, BigInt(amount*10**12)).send({from: address});
        } catch (error) {
            console.log(error);
            
        }
    }

    async changePublicPrice(amount: number, address:string){
        try {
            return await this.contract.methods.changePublicPrice(BigInt(amount*10**18)).send({from: address})
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default new Service();