import { useMemo } from "react";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { CONTRACTS } from "../config/contracts";

export function getContract(address, ABI, library) {
    const web3 = new Web3(library.provider);
    return new web3.eth.Contract(ABI, address);
}

export function useContract(contractType) {
    const { library, account, chainId } = useWeb3React();

    
    return useMemo(() => {
        if (account && library) {
            const address = CONTRACTS[contractType][chainId].address;
            const ABI = CONTRACTS[contractType][chainId].abi;
            try {
                const contract = getContract(address, ABI, library);
                return contract || null;
            } catch (error) {
                return null;
            }
        }
    }, [library, account]);
}
