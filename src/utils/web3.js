import { BigNumber } from "@ethersproject/bignumber";

export const fn = (val, decimals = 4) => {
    return Number(val).toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
};