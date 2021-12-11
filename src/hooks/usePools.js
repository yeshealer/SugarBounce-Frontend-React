import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import config from "../config/app";
import { CONTRACTS_TYPE } from "../config/contracts";
import { SUGAR_BOUNCE_PER_BLOCK, SECOND_PER_BLOCK } from "../config/constants";
import { useContract } from "./useContract";
import { ethers } from "ethers";

const defaultPools = [
    {
        pid: 0,
        apy: 0,
        title: "Standard",
        description:
            "All users staking more than 500 $TIP in this pool will get access to Standard package on our SugarStreams app.",
    },
    {
        pid: 1,
        apy: 0,
        title: "Premium",
        description:
            "All users staking more than 500 $TIP in this pool will get access to Premium package on our SugarStreams app.",
    },
    {
        pid: 2,
        apy: 0,
        title: "VIP",
        description:
            "All users staking more than 500 $TIP in this pool will get access to VIP package on our SugarStreams app.",
    },
];
const usePools = () => {
    const { account, library, chainId } = useWeb3React();
    const sugarBounceStaking = useContract(CONTRACTS_TYPE.SUGAR_BOUNCE_STAKING);

    const [pools, setPools] = useState(defaultPools);

    useEffect(() => {
        if (
            chainId === config.netId &&
            account &&
            library &&
            sugarBounceStaking
        ) {
            (async () => {
                const sugarBouncePerBlock = await sugarBounceStaking.methods
                    .sugarBouncePerBlock()
                    .call();
                let pools = [];
                for (let pid = 0; pid < 3; pid++) {
                    const pool = await sugarBounceStaking.methods
                        .poolInfo(pid)
                        .call();
                    const allocPoint = parseInt(pool.allocPoint, 10);
                    const dailyRewards =
                        (ethers.utils.formatEther(sugarBouncePerBlock) *
                            allocPoint *
                            24 *
                            3600) /
                        SECOND_PER_BLOCK;
                    const depositedAmount = ethers.utils.formatEther(
                        pool.depositedAmount
                    );
                    const apy =
                        depositedAmount > 0
                            ? Number(
                                  (dailyRewards * 365) / depositedAmount
                              ).toFixed(2)
                            : 0;
                    pools.push({
                        ...pool,
                        ...defaultPools[pid],
                        pid,
                        apy,
                    });
                }
                setPools(pools);
            })();
        }
    }, [chainId, account, library, sugarBounceStaking]);

    return { pools };
};

export default usePools;
