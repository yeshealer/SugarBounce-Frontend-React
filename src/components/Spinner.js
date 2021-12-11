import React from "react";
import clsx from "clsx";
import Paper from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import useStyles from "../assets/styles";

const Spinner = ({ isLoading }) => {
    const classes = useStyles.base();

    return (
        <Paper
            id="spinner"
            className={clsx(classes.spinRoot, { [classes.hide]: !isLoading })}
        >
            <LinearProgress className="progress" />
        </Paper>
    );
};

export default Spinner;
