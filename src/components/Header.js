import React, { useState } from "react";

import clsx from "clsx";
import { useWeb3React } from "@web3-react/core";

// ** Import Material-Ui Components
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";

// ** Import Redux

// ** Import Icons
import LaunchIcon from "@mui/icons-material/Launch";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

// ** Import Modules
import { useHistory } from "react-router-dom";

// ** Import Assets
import useStyles from "../assets/styles";

// ** Import Components
import ConnectWallet from "./ConnectWallet";
import { ConnectedWallet } from "../assets/constants/wallets";

import { tokenImg, Logo } from "../config/constants";
// ** Import
const Header = () => {
    // ** Declare Maintainers
    const history = useHistory();
    const classes = useStyles.header();
    const isMobile = useMediaQuery("(max-width:600px)");

    const { account } = useWeb3React();

    const cWallet = ConnectedWallet();

    const [openWalletList, setOpenWalletList] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    };

    return (
        <AppBar position="sticky" className={classes.appbar}>
            <Toolbar className={classes.toolbar}>
                <Link href="https://www.sugarbounce.com" underline="none">
                    <img
                        className={classes.logo}
                        src={Logo}
                        alt="logo"
                        width={180}
                    />
                </Link>
                <div
                    className={clsx({
                        [classes.hide]: isMobile,
                    })}
                    style={{ flex: 0.8 }}
                />
                <Box className={classes.actionGroup}>
                    <Link
                        href="https://pancakeswap.finance/swap?outputCurrency=0x40f906e19b14100d5247686e08053c4873c66192"
                        underline="none"
                    >
                        <Button
                            variant="contained"
                            startIcon={
                                <img
                                    width={22}
                                    height={22}
                                    src={tokenImg}
                                    alt="Token"
                                />
                            }
                            id="token-button"
                            aria-controls="buy-token"
                            style={{ marginRight: 1 }}
                            color="secondary"
                            className={isMobile ? classes.hide : ""}
                        >
                            BUY ON PANCAKESWAP
                        </Button>
                    </Link>
                    <Box className={classes.connectWallet}>
                        {(() => {
                            if (account) {
                                return (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={
                                            cWallet && (
                                                <img
                                                    width={22}
                                                    src={cWallet.logo}
                                                    alt={cWallet.name}
                                                />
                                            )
                                        }
                                        onClick={() => {
                                            setOpenWalletList(true);
                                        }}
                                        className={isMobile ? classes.hide : ""}
                                    >
                                        {`${account.substring(
                                            0,
                                            8
                                        )} ... ${account.substring(
                                            account.length - 4
                                        )}`}
                                    </Button>
                                );
                            } else {
                                return (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            setOpenWalletList(true);
                                        }}
                                        className={isMobile ? classes.hide : ""}
                                    >
                                        Connect Wallet
                                    </Button>
                                );
                            }
                        })()}
                    </Box>
                    <IconButton
                        color="inherit"
                        onClick={() => toggleDrawer()}
                        className={clsx(classes.drawerButton, {
                            [classes.hide]: !isMobile,
                        })}
                    >
                        <MenuOpenIcon />
                    </IconButton>
                </Box>
            </Toolbar>
            <Drawer
                open={openDrawer}
                anchor="bottom"
                className={classes.drawer}
                onClose={() => toggleDrawer()}
            >
                <List>
                    <ListItem button>
                        <ListItemText>BUY ON PANCAKESWAP</ListItemText>
                        <ListItemIcon>
                            <Link
                                href="https://pancakeswap.finance/swap?outputCurrency=0x40f906e19b14100d5247686e08053c4873c66192"
                                underline="none"
                            >
                                <LaunchIcon />
                            </Link>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem>
                        <Button
                            variant="contained"
                            startIcon={
                                account && (
                                    <img
                                        width={28}
                                        src={cWallet.logo}
                                        alt={cWallet.name}
                                    />
                                )
                            }
                            onClick={() => {
                                setOpenWalletList(true);
                            }}
                            className="connectButton"
                        >
                            {account
                                ? `${account.substring(
                                      0,
                                      8
                                  )} ... ${account.substring(
                                      account.length - 4
                                  )}`
                                : "Connect Wallet"}
                        </Button>
                    </ListItem>
                </List>
            </Drawer>
            <ConnectWallet
                isOpen={openWalletList}
                setIsOpen={setOpenWalletList}
            />
        </AppBar>
    );
};

export default Header;
