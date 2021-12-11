import React, { useEffect, useState, useCallback, useMemo } from "react";

// ** Web3
import { useWeb3React } from "@web3-react/core";

// ** Import Material Components
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Skeleton from "@mui/material/Skeleton";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper/core";

import ConnectWallet from "../../components/ConnectWallet";

import useStyles from "../../assets/styles";

import { useContract } from "../../hooks/useContract";

import config from "../../config/app";
import { CONTRACTS_TYPE } from "../../config/contracts";
import { fn } from "../../utils/web3";
import Crown from "../../assets/img/crown.png";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { tokenImg, Logo } from "../../config/constants";
import { ethers } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";

import usePools from "../../hooks/usePools";

import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
SwiperCore.use([Navigation, Autoplay]);

const Pool = () => {
    const classes = useStyles.pool();
    const isMobile = useMediaQuery("(max-width:600px)");
    const { pools } = usePools();

    const [selectedPool, setSelectedPool] = useState({ pid: 0 });

    const [tab, setTab] = useState(0);
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [openWalletModal, setOpenWalletModal] = useState(false);

    const [walletBalance, setWalletBalance] = useState(0);
    const [stakedBalance, setStakedBalance] = useState(0);
    const [pendingRewards, setPendingRewards] = useState(0);
    const [lastClaim, setLastClaim] = useState();
    const { account, library, chainId } = useWeb3React();

    const sugarBounceStaking = useContract(CONTRACTS_TYPE.SUGAR_BOUNCE_STAKING);
    const sugarBounceToken = useContract(CONTRACTS_TYPE.SUGAR_BOUNCE_TOKEN);

    const switchTab = (e, nt) => {
        setTab(nt);
        setAmount(0);
    };

    const smb = async (bmax, wmax) => {
        switch (tab) {
            case 0: {
                setAmount(bmax.toString());
                break;
            }
            case 1: {
                setAmount(wmax.toString());
            }
        }
    };

    const claim = async () => {
        try {
            setLoading(true);
            await sugarBounceStaking.methods
                .claim(selectedPool.pid)
                .send({ from: account });
            await updateData();
        } catch {
            await updateData();
        }
    };

    const deposit = async () => {
        if (Number(amount) > Number(walletBalance)) {
            alert("Your balance is not enough to deposit.", "info");
            return;
        } else if (!amount) {
            alert("Please input valid amount.", "info");
            return;
        } else {
            try {
                setLoading(true);
                const depositAmount = ethers.utils.parseEther(amount);
                const allowance = await sugarBounceToken.methods
                    .allowance(account, sugarBounceStaking._address)
                    .call();
                if (depositAmount.gt(BigNumber.from(allowance))) {
                    await sugarBounceToken.methods
                        .approve(
                            sugarBounceStaking._address,
                            ethers.constants.MaxUint256
                        )
                        .send({ from: account });
                }
                await sugarBounceStaking.methods
                    .deposit(selectedPool.pid, depositAmount)
                    .send({ from: account });
                await updateData();
            } catch (error) {
                console.error("error when depositing...", error);
                await updateData();
            }
        }
    };
    const withdraw = async () => {
        if (Number(amount) > Number(stakedBalance)) {
            alert("Your balance is not enough to withdraw.", "info");
            return;
        } else if (!amount) {
            alert("Please input valid am.", "info");
            return;
        } else if (
            lastClaim + selectedPool.lockupDuration >
            new Date().getTime()
        ) {
            alert("You cannot withdraw yet.", "info");
            return;
        } else {
            try {
                setLoading(true);
                const withdrawAmount = ethers.utils.parseEther(amount);
                await sugarBounceStaking.methods
                    .withdraw(selectedPool.pid, withdrawAmount)
                    .send({ from: account });
                await updateData();
            } catch {
                await updateData();
            }
        }
    };

    const withdrawAll = async () => {
        try {
            setLoading(true);
            await sugarBounceStaking.methods
                .emergencyWithdraw(selectedPool.pid)
                .send({ from: account });
            await updateData();
        } catch {
            await updateData();
        }
    };

    const updateData = useCallback(async () => {
        if (!selectedPool) return;
        try {
            setLoading(true);
            setAmount(0);

            const walletBalance = await sugarBounceToken.methods
                .balanceOf(account)
                .call();
            setWalletBalance(ethers.utils.formatEther(walletBalance));
            const poolDetail = await sugarBounceStaking.methods
                .userInfo(selectedPool.pid, account)
                .call();
            const stakedBalance = poolDetail?.amount || 0;
            setStakedBalance(ethers.utils.formatEther(stakedBalance));
            const lastClaim = poolDetail?.lastClaim || 0;
            setLastClaim(lastClaim);
            const pendingRewards = await sugarBounceStaking.methods
                .pendingRewards(selectedPool.pid, account)
                .call();
            setPendingRewards(ethers.utils.formatEther(pendingRewards));
            setLoading(false);
        } catch (e) {
            console.log("something went wrong! see detail here", e);
            setLoading(false);
        }
    }, [library, account, chainId, selectedPool]);

    const swn = () => {};

    useEffect(() => {
        if (chainId === config.netId && account && library) {
            updateData();
        }
    }, [updateData, chainId, account, library]);

    const [openWithdrawConfirmModal, setOpenWithdrawConfirmModal] =
        useState(false);
    const handleOpenWithdrawConfirmModal = () => {
        setOpenWithdrawConfirmModal(true);
    };
    const handleCloseWithdrawConfirmModal = () => {
        setOpenWithdrawConfirmModal(false);
    };

    const [openMemshipPlanModal, setOpenMemshipPlanModal] = useState(false);
    const handleOpenMemshipPlanModal = () => {
        setOpenMemshipPlanModal(true);
    };
    const handleCloseMemshipPlanModal = () => {
        setOpenMemshipPlanModal(false);
    };

    useEffect(() => {
        if (pools.length > 0) setSelectedPool(pools[0]);
    }, [pools]);

    const renderPool = (pool) => {
        const pid = pool.pid;
        return (
            <Grid
                id={pid}
                key={pid}
                className={selectedPool.pid === pid ? "lp-pools selected" : "lp-pools"}
                item
                xs={12}
                sm={6}
                md={4}
            >
                <Card
                    className="card"
                    onClick={() => {
                        setSelectedPool(pool);
                    }}
                >
                    <CardContent className="card-content">
                        <Box className="pool-img">
                            <img key={pid} src={tokenImg} alt={tokenImg} />
                        </Box>
                        <Box className="pool-title">
                            <Typography className="title">
                                {`${pool.title}`}
                            </Typography>
                        </Box>
                        <Typography className="percentage">
                            {`APR ${fn(pool.apy, 2)}%`}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    };

    const renderMemshipPlan = () => {
        return (
            <Modal
                open={openMemshipPlanModal}
                onClose={handleCloseMemshipPlanModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box className={classes.memshipPlan}>
                    <div className="modal-logo">
                        <Link
                            href="https://www.sugarbounce.com"
                            underline="none"
                        >
                            <img
                                className={classes.logo}
                                src={Logo}
                                alt="logo"
                                width={180}
                            />
                        </Link>
                    </div>
                    {/* <div className="membership-group"> */}
                    <a
                        className="close-button"
                        onClick={handleCloseMemshipPlanModal}
                    >
                        &#x2715;
                    </a>
                    <Swiper
                        navigation={true}
                        loop={false}
                        className="membership-group"
                        breakpoints={{
                            1400: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                            1060: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            740: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            400: {
                                slidesPerView: 1,
                                spaceBetween: 80,
                            },
                            200: {
                                slidesPerView: 1,
                                spaceBetween: 80,
                            },
                        }}
                    >
                        <SwiperSlide>
                            <div className="membership-card free">
                                <p className="card-title free-title">
                                    FREE ACCESS
                                </p>
                                <div className="percent-group">
                                    <p className="percent-title free-per">0%</p>
                                    <p>APR</p>
                                </div>
                                <p className="description">Free User</p>
                                <div className="detail-section">
                                    <HighlightOffIcon
                                        sx={{ color: "#979797" }}
                                    />
                                    <span className="gradient-text-free">
                                        No Private Chat Allowed
                                    </span>
                                </div>
                                <div className="detail-section">
                                    <HighlightOffIcon
                                        sx={{ color: "#979797" }}
                                    />
                                    <span className="gradient-text-free">
                                        Can&apos;t Record Live
                                    </span>
                                </div>
                                <div className="detail-section">
                                    <HighlightOffIcon
                                        sx={{ color: "#979797" }}
                                    />
                                    <span className="gradient-text-free">
                                        No Private Show
                                    </span>
                                </div>
                                <div className="detail-section">
                                    <HighlightOffIcon
                                        sx={{ color: "#979797" }}
                                    />
                                    <span className="gradient-text-free">
                                        No Stories
                                    </span>
                                </div>
                                <div className="detail-section">
                                    <HighlightOffIcon
                                        sx={{ color: "#979797" }}
                                    />
                                    <span className="gradient-text-free">
                                        No Suuport
                                    </span>
                                </div>
                                <div className="detail-section">
                                    <HighlightOffIcon
                                        sx={{ color: "#979797" }}
                                    />
                                    <span className="gradient-text-free">
                                        No Lovense Feature
                                    </span>
                                </div>
                                <div className="detail-section">
                                    <HighlightOffIcon
                                        sx={{ color: "#979797" }}
                                    />
                                    <span className="gradient-text-free">
                                        No Suger Badge
                                    </span>
                                </div>
                                <div className="detail-section">
                                    <HighlightOffIcon
                                        sx={{ color: "#979797" }}
                                    />
                                    <span className="gradient-text-free">
                                        No Anonymous Tipping
                                    </span>
                                </div>
                                <div className="detail-section">
                                    <HighlightOffIcon
                                        sx={{ color: "#979797" }}
                                    />
                                    <span className="gradient-text-free">
                                        Ads
                                    </span>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div
                                className={`${
                                    selectedPool.pid === 0 ? "frame-spacer" : ""
                                }`}
                            >
                                <div
                                    className={`${
                                        selectedPool.pid === 0
                                            ? "membership-card-extend standard"
                                            : "membership-card standard"
                                    }`}
                                >
                                    <span
                                        className={`${
                                            selectedPool.pid === 0
                                                ? "onsale-section"
                                                : ""
                                        }`}
                                    >
                                        <span
                                            className={`${
                                                selectedPool.pid === 0
                                                    ? "onsale"
                                                    : ""
                                            }`}
                                        >
                                            <FavoriteBorderIcon
                                                sx={{ fontSize: 40 }}
                                                className={`${
                                                    selectedPool.pid === 0
                                                        ? "star-display"
                                                        : "star-none"
                                                }`}
                                            />
                                        </span>
                                    </span>
                                    <p className="card-title standard-title">
                                        STANDARD
                                    </p>
                                    <div className="percent-group">
                                        <p className="percent-title standard-title">
                                            30%
                                        </p>
                                        <p>APR</p>
                                    </div>
                                    <p className="description standard-description">
                                        Stake $TIP for 1 Month & get upto 30%
                                        APR & these Advantages
                                    </p>
                                    <div className="detail-section">
                                        <HighlightOffIcon
                                            sx={{ color: "#979797" }}
                                        />
                                        <span className="gradient-text-free">
                                            Buy Messages to Chat
                                        </span>
                                    </div>
                                    <div className="detail-section">
                                        <HighlightOffIcon
                                            sx={{ color: "#979797" }}
                                        />
                                        <span className="gradient-text-free">
                                            Can&apos;t Record Live
                                        </span>
                                    </div>
                                    <div className="detail-section">
                                        <CheckCircleOutlineIcon
                                            sx={{ color: "#ff3c3c" }}
                                        />
                                        <span className="gradient-text-premium">
                                            5 Private Shows (Spying Allowed)
                                        </span>
                                    </div>
                                    <div className="detail-section">
                                        <CheckCircleOutlineIcon
                                            sx={{ color: "#ff3c3c" }}
                                        />
                                        <span className="gradient-text-premium">
                                            5 Premium Stories
                                        </span>
                                    </div>
                                    <div className="detail-section">
                                        <CheckCircleOutlineIcon
                                            sx={{ color: "#ff3c3c" }}
                                        />
                                        <span className="gradient-text-premium">
                                            Email Support
                                        </span>
                                    </div>
                                    <div className="detail-section">
                                        <HighlightOffIcon
                                            sx={{ color: "#979797" }}
                                        />
                                        <span className="gradient-text-free">
                                            No Lovense Feature
                                        </span>
                                    </div>
                                    <div className="detail-section">
                                        <HighlightOffIcon
                                            sx={{ color: "#979797" }}
                                        />
                                        <span className="gradient-text-free">
                                            No Suger Badge
                                        </span>
                                    </div>
                                    <div className="detail-section">
                                        <HighlightOffIcon
                                            sx={{ color: "#979797" }}
                                        />
                                        <span className="gradient-text-free">
                                            No Anonymous Tipping
                                        </span>
                                    </div>
                                    <div className="detail-section">
                                        <HighlightOffIcon
                                            sx={{ color: "#979797" }}
                                        />
                                        <span className="gradient-text-free">
                                            Ads
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div
                                className={`${
                                    selectedPool.pid === 1 ? "frame-spacer" : ""
                                }`}
                            >
                                <div
                                    className={`${
                                        selectedPool.pid === 1
                                            ? "membership-card-extend premium"
                                            : "membership-card premium"
                                    }`}
                                >
                                    <span
                                        className={`${
                                            selectedPool.pid === 1
                                                ? "onsale-section"
                                                : ""
                                        }`}
                                    >
                                        <span
                                            className={`${
                                                selectedPool.pid === 1
                                                    ? "onsale"
                                                    : ""
                                            }`}
                                        >
                                            <FavoriteBorderIcon
                                                sx={{ fontSize: 40 }}
                                                className={`${
                                                    selectedPool.pid === 1
                                                        ? "star-display"
                                                        : "star-none"
                                                }`}
                                            />
                                        </span>
                                    </span>
                                    <img
                                        className={classes.crown}
                                        src={Crown}
                                        alt="logo"
                                        width={60}
                                    />
                                    <p className="card-title premium-title">
                                        PREMIUM
                                    </p>
                                    <div className="percent-group">
                                        <p className="percent-title premium-title">
                                            100%
                                        </p>
                                        <p>APR</p>
                                    </div>
                                    <p className="description standard-title premium-description">
                                        Stake $TIP for <b>4 MONTHS</b> & get
                                        upto 100% APR & these Advantages
                                    </p>
                                    <div className="detail-section">
                                        <CheckCircleOutlineIcon
                                            sx={{ color: "#ff3c3c" }}
                                        />
                                        <span className="gradient-text-premium">
                                            100 Free Messages
                                        </span>
                                    </div>
                                    <div className="detail-section">
                                        <CheckCircleOutlineIcon
                                            sx={{ color: "#ff3c3c" }}
                                        />
                                        <span className="gradient-text-premium">
                                            10 Hours of recording storage
                                        </span>
                                    </div>
                                    <div className="detail-section">
                                        <CheckCircleOutlineIcon
                                            sx={{ color: "#ff3c3c" }}
                                        />
                                        <span className="gradient-text-premium">
                                            unlimited (Spying Allowed)
                                        </span>
                                    </div>
                                    <div className="detail-section">
                                        <CheckCircleOutlineIcon
                                            sx={{ color: "#ff3c3c" }}
                                        />
                                        <span className="gradient-text-premium">
                                            15 Premium Stories
                                        </span>
                                    </div>
                                    <div className="detail-section">
                                        <CheckCircleOutlineIcon
                                            sx={{ color: "#ff3c3c" }}
                                        />
                                        <span className="gradient-text-premium">
                                            Chat & Email Support
                                        </span>
                                    </div>
                                    <div className="detail-section">
                                        <CheckCircleOutlineIcon
                                            sx={{ color: "#ff3c3c" }}
                                        />
                                        <span className="gradient-text-premium">
                                            Lovense Allowed
                                        </span>
                                    </div>
                                    <div className="detail-section">
                                        <HighlightOffIcon
                                            sx={{ color: "#979797" }}
                                        />
                                        <span className="gradient-text-free">
                                            No Suger Badge
                                        </span>
                                    </div>
                                    <div className="detail-section">
                                        <CheckCircleOutlineIcon
                                            sx={{ color: "#ff3c3c" }}
                                        />
                                        <span className="gradient-text-premium">
                                            Tip Anonymously
                                        </span>
                                    </div>
                                    <div className="detail-section">
                                        <HighlightOffIcon
                                            sx={{ color: "#979797" }}
                                        />
                                        <span className="gradient-text-free">
                                            Ads
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div
                                className={`${
                                    selectedPool.pid === 2 ? "frame-spacer" : ""
                                }`}
                            >
                                <div
                                    className={`${
                                        selectedPool.pid === 2
                                            ? "membership-card-extend VIP"
                                            : "membership-card VIP"
                                    }`}
                                >
                                    <span
                                        className={`${
                                            selectedPool.pid === 2
                                                ? "onsale-section"
                                                : ""
                                        }`}
                                    >
                                        <span
                                            className={`${
                                                selectedPool.pid === 2
                                                    ? "onsale"
                                                    : ""
                                            }`}
                                        >
                                            <FavoriteBorderIcon
                                                sx={{ fontSize: 40 }}
                                                className={`${
                                                    selectedPool.pid === 2
                                                        ? "star-display"
                                                        : "star-none"
                                                }`}
                                            />
                                        </span>
                                    </span>
                                    <p className="card-title VIP-title">VIP</p>
                                    <div className="percent-group">
                                        <p className="percent-title VIP-title">
                                            250%
                                        </p>
                                        <p>APR</p>
                                    </div>
                                    <p className="description VIP-description">
                                        Stake $TIP for 8 MONTH & get upto 250%
                                        APR & these Advantages
                                    </p>
                                    <div className="detail-section">
                                        <CheckCircleOutlineIcon
                                            sx={{ color: "#83009b" }}
                                        />
                                        <span className="gradient-text-vip">
                                            Unlimited Messages
                                        </span>
                                    </div>
                                    <div className="detail-section">
                                        <CheckCircleOutlineIcon
                                            sx={{ color: "#83009b" }}
                                        />
                                        <span className="gradient-text-vip">
                                            Unlimited Storage
                                        </span>
                                    </div>
                                    <div className="detail-section">
                                        <CheckCircleOutlineIcon
                                            sx={{ color: "#83009b" }}
                                        />
                                        <span className="gradient-text-vip">
                                            Unlimited (No spying allowed)
                                        </span>
                                    </div>
                                    <div className="detail-section">
                                        <CheckCircleOutlineIcon
                                            sx={{ color: "#83009b" }}
                                        />
                                        <span className="gradient-text-vip">
                                            Unlimited Stories
                                        </span>
                                    </div>
                                    <div className="detail-section">
                                        <CheckCircleOutlineIcon
                                            sx={{ color: "#83009b" }}
                                        />
                                        <span className="gradient-text-vip">
                                            Chat & Email Support
                                        </span>
                                    </div>
                                    <div className="detail-section">
                                        <CheckCircleOutlineIcon
                                            sx={{ color: "#83009b" }}
                                        />
                                        <span className="gradient-text-vip">
                                            Lovense Allowed
                                        </span>
                                    </div>
                                    <div className="detail-section">
                                        <CheckCircleOutlineIcon
                                            sx={{ color: "#83009b" }}
                                        />
                                        <span className="gradient-text-vip">
                                            Suger Badge
                                        </span>
                                    </div>
                                    <div className="detail-section">
                                        <CheckCircleOutlineIcon
                                            sx={{ color: "#83009b" }}
                                        />
                                        <span className="gradient-text-vip">
                                            Tip Anonymous
                                        </span>
                                    </div>
                                    <div className="detail-section">
                                        <CheckCircleOutlineIcon
                                            sx={{ color: "#83009b" }}
                                        />
                                        <span className="gradient-text-vip">
                                            Record Live Streams
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        {/* </div> */}
                    </Swiper>
                </Box>
            </Modal>
        );
    };

    return (
        <Container maxWidth="md">
            <Card className={classes.root}>
                <CardContent>
                    <Grid id="pool-list" container justify="center" spacing={3}>
                        {pools.map((pool, pid) => {
                            return renderPool(pool);
                        })}
                    </Grid>
                </CardContent>
                <Typography className="pool-descripton">
                    {selectedPool ? selectedPool.description : ""}
                    &nbsp;Learn more by{" "}
                    <Button
                        color="primary"
                        onClick={handleOpenMemshipPlanModal}
                    >
                        {" "}
                        clicking here{" "}
                    </Button>
                </Typography>
                <Table className="table" aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCell>Lockup Period</TableCell>
                            <TableCell
                                colSpan={2}
                                style={{ textAlign: "right" }}
                            >
                                <Box>{selectedPool ? selectedPool.lockupDuration / (24 * 3600 * 30) : 0} Month</Box>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>APR</TableCell>
                            <TableCell
                                colSpan={2}
                                style={{ textAlign: "right" }}
                                className="apr_value"
                            >
                                <Box>{`${fn(
                                    selectedPool ? selectedPool.apy : 0,
                                    2
                                )}%`}</Box>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Deposit</TableCell>
                            <TableCell>
                                {(() => {
                                    if (!isNaN(stakedBalance)) {
                                        if (
                                            stakedBalance > 0 &&
                                            stakedBalance < 0.0001
                                        ) {
                                            if (stakedBalance < 10 ** -7) {
                                                return (
                                                    <Tooltip
                                                        arrow
                                                        title={stakedBalance}
                                                    >
                                                        <Typography>
                                                            {fn(
                                                                stakedBalance,
                                                                7
                                                            )}
                                                        </Typography>
                                                    </Tooltip>
                                                );
                                            } else {
                                                return (
                                                    <Tooltip
                                                        arrow
                                                        title={stakedBalance}
                                                    >
                                                        <Typography>
                                                            {fn(
                                                                stakedBalance,
                                                                4
                                                            )}
                                                        </Typography>
                                                    </Tooltip>
                                                );
                                            }
                                        } else {
                                            return (
                                                <Typography>
                                                    {fn(stakedBalance, 4)}
                                                </Typography>
                                            );
                                        }
                                    } else {
                                        return (
                                            <Typography className="skelton">
                                                <Skeleton animation="wave" />
                                            </Typography>
                                        );
                                    }
                                })()}
                            </TableCell>
                            <TableCell>{`TIP`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Profits</TableCell>
                            <TableCell>{`${fn(
                                pendingRewards,
                                4
                            )} TIP`}</TableCell>
                            <TableCell>
                                {(() => {
                                    return (
                                        <Button
                                            onClick={() => claim()}
                                            color="primary"
                                            variant="outlined"
                                            disabled={
                                                chainId === 56 ? false : true
                                            }
                                        >
                                            Claim
                                        </Button>
                                    );
                                })()}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Tabs
                    value={tab}
                    className="tabs"
                    indicatorColor="primary"
                    variant="fullWidth"
                    onChange={switchTab}
                >
                    <Tab label="Deposit" />
                    <Tab label="Withdraw" />
                </Tabs>
                <TextField
                    id="am"
                    variant="outlined"
                    fullWidth
                    value={amount}
                    color="secondary"
                    className="input"
                    InputProps={{
                        placeholder: "0",
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                className="max-pattern"
                            >
                                <Typography>{`TIP`}</Typography>
                                <Button
                                    onClick={() =>
                                        smb(walletBalance, stakedBalance)
                                    }
                                    color="primary"
                                    variant="contained"
                                    disabled={loading ? true : false}
                                >
                                    {loading ? (
                                        <CircularProgress size={24} />
                                    ) : (
                                        "MAX"
                                    )}
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                    onChange={(e) => setAmount(e.target.value)}
                    helperText={(() => {
                        return <>Wallet Balance : {fn(walletBalance, 4)}</>;
                    })()}
                />
                <Box className="checkout">
                    {(() => {
                        if (!account) {
                            return (
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        setOpenWalletModal(true);
                                    }}
                                >
                                    Connect Wallet
                                </Button>
                            );
                        } else {
                            if (chainId === config.netId) {
                                if (tab === 0) {
                                    return (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => deposit()}
                                            disabled={loading ? true : false}
                                        >
                                            {loading ? (
                                                <CircularProgress size={28} />
                                            ) : (
                                                "Deposit"
                                            )}
                                        </Button>
                                    );
                                    // }
                                } else {
                                    return (
                                        <Box className="buttonGroup">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => withdraw()}
                                                disabled={
                                                    loading ? true : false
                                                }
                                            >
                                                {loading ? (
                                                    <CircularProgress
                                                        size={28}
                                                    />
                                                ) : (
                                                    "Withdraw"
                                                )}
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => {
                                                    if (stakedBalance < 10 ** -5) {
                                                        alert("You have nothing to withdraw.", "info");
                                                        return;
                                                    }
                                                    if (
                                                        lastClaim +
                                                            selectedPool.lockupDuration >
                                                        new Date().getTime()
                                                    ) {
                                                        handleOpenWithdrawConfirmModal();
                                                    } else {
                                                        withdrawAll();
                                                    }
                                                }}
                                                disabled={
                                                    loading ? true : false
                                                }
                                            >
                                                {loading ? (
                                                    <CircularProgress
                                                        size={28}
                                                    />
                                                ) : (
                                                    "Withdraw All"
                                                )}
                                            </Button>
                                        </Box>
                                    );
                                }
                            } else {
                                return (
                                    <Button
                                        onClick={swn}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Please Switch To BSC Test Network
                                    </Button>
                                );
                            }
                        }
                    })()}
                </Box>
                <Modal
                    open={openWithdrawConfirmModal}
                    onClose={handleCloseWithdrawConfirmModal}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box className={classes.withdrawConfirm}>
                        <p id="modal-description">{`${fn(
                            stakedBalance * 0.15,
                            2
                        )} TIP token would be used as emergency withdraw fee. Are you okay with this?`}</p>
                        <Box className="buttonGroup">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCloseWithdrawConfirmModal}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    handleCloseWithdrawConfirmModal();
                                    withdrawAll();
                                }}
                            >
                                Continue
                            </Button>
                        </Box>
                    </Box>
                </Modal>
                {renderMemshipPlan()}
            </Card>
            <ConnectWallet
                isOpen={openWalletModal}
                setIsOpen={setOpenWalletModal}
            />
        </Container>
    );
};

export default Pool;
