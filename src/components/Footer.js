import React from "react";

// ** Import Material UI Components
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import SvgIcon from "@mui/material/SvgIcon";
import AppBar from "@mui/material/AppBar";

// ** Import Assets
import useStyles from "../assets/styles";

import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import YoutubeIcon from "@mui/icons-material/YouTube";
import RedditIcon from "@mui/icons-material/Reddit";

import { ReactComponent as MediumIcon } from "../assets/img/medium.svg";

const Footer = () => {
    const classes = useStyles.footer();
    return (
        <AppBar position="static" component="footer" className={classes.footer}>
            <Toolbar className={classes.toolbar}>
                <Container maxWidth="md">
                    <Link href="https://twitter.com/SugarBounceNSFW" underline="none">
                        <Button>
                            <TwitterIcon />
                        </Button>
                    </Link>
                    <Link href="https://www.instagram.com/sugarbounce/" underline="none">
                        <Button>
                            <InstagramIcon />
                        </Button>
                    </Link>
                    <Link href="#" underline="none">
                        <Button>
                            <RedditIcon />
                        </Button>
                    </Link>
                    <Link href="https://www.youtube.com/channel/UCYLci1BnEHJADNyjGZ1t6kw" underline="none">
                        <Button>
                            <YoutubeIcon />
                        </Button>
                    </Link>
                    <Link href="https://t.me/SugarBounceNSFW" underline="none">
                        <Button>
                            <TelegramIcon />
                        </Button>
                    </Link>
                    <Link href="https://medium.com/@sugarbouncecrypto" underline="none">
                        <Button>
                            <SvgIcon
                                component={MediumIcon}
                                viewBox="0 0 512 512"
                            />
                        </Button>
                    </Link>
                </Container>
            </Toolbar>
        </AppBar>
    );
};
export default Footer;
