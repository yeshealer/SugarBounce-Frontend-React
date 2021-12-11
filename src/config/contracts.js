import sugarBounceTokenAbi from "./abi/sugarBounceToken.json";
import sugarBounceStakingAbi from "./abi/sugarBounceStaking.json";

export const CONTRACTS_TYPE = {
    SUGAR_BOUNCE_TOKEN: "SUGAR_BOUNCE_TOKEN",
    SUGAR_BOUNCE_STAKING: "SUGAR_BOUNCE_STAKING",
};

export const CONTRACTS = {
    [CONTRACTS_TYPE.SUGAR_BOUNCE_TOKEN]: {
        56: {
            address: "0x40f906e19b14100d5247686e08053c4873c66192",
            abi: sugarBounceTokenAbi,
            decimals: 18,
        },
        97: {
            address: "0xc3CBd1e850D431adC583f14f03b9B8B651e62A61",
            abi: sugarBounceTokenAbi,
            decimals: 18,
        },
    },
    [CONTRACTS_TYPE.SUGAR_BOUNCE_STAKING]: {
        56: {
            address: "0x4043A851E312339D38F8E64c555eb9E084eec207",
            abi: sugarBounceStakingAbi,
        },
        97: {
            address: "0x40f906e19B14100D5247686E08053c4873c66192",
            abi: sugarBounceStakingAbi,
        },
    },
};
