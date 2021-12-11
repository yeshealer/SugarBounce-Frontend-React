import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Spinner from "./Spinner";
import useStyles from "../assets/styles";

import clsx from "clsx";
import useMediaQuery from "@mui/material/useMediaQuery";

const BaseLayout = ({ children }) => {
    const classes = useStyles.base();
    const isMobile = useMediaQuery("(max-width:600px)");
    return (
        <>
            <Header />
            <main
                className={clsx(classes.content, {
                    [classes.mobileContent]: isMobile,
                })}
            >
                {children}
            </main>
            <Footer />
            <Spinner isLoading={false} />
        </>
    );
};
export default BaseLayout;
