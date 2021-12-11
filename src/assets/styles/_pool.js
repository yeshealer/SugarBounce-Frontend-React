import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "auto",
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        padding: theme.spacing(3, 5, 5, 5),
        maxWidth: theme.spacing(700 / 8),
        borderRadius: `${theme.shape.borderRadius}px !important`,
        boxShadow: `${theme.custom.boxShadow} !important`,
        "& .aumi_reward_btn": {
            width: "100% !important",
            minWidth: theme.spacing(15),
            alignItems: "flex-end",
            "& button": {
                maxwidth: theme.spacing(15),
            },
        },
        "& .apr_value": {
            "& > div": {
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
            },
        },
        "& .table": {
            "& > tbody": {
                "& > tr": {
                    "& > td": {
                        fontWeight: 500,
                        fontSize: 16,
                        "& p": {
                            fontWeight: 500,
                            padding: theme.spacing(0, 2),
                            fontSize: 16,
                            textTransform: "uppercase",
                            display: "flex",
                            justifyContent: "center",
                            "& b": {
                                fontWeight: 600,
                            },
                        },
                    },
                    "& > td:nth-child(2)": {
                        fontWeight: 600,
                        textAlign: "center",
                        paddingLeft: 0,
                        paddingRight: 0,
                    },
                    "& > td:nth-child(3)": {
                        textAlign: "right",
                        padding: 0,
                        "& button": {
                            padding: theme.spacing(0.5, 1),
                        },
                    },
                },
            },
        },
        "& .max-pattern": {
            "& > p": {
                padding: theme.spacing(0, 2),
                fontWeight: 600,
            },
            "& button": {
                margin: theme.spacing(0, 1),
            },
        },
        "& > button": {
            margin: theme.spacing(1, 0),
        },
        "& .input": {
            marginTop: theme.spacing(2.5),
            "& input": {
                textAlign: "right",
                fontWeight: 600,
            },
            "& > p": {
                fontWeight: 600,
                fontSize: 16,
                textAlign: "right",
            },
        },
        "& .feeDescription": {
            marginTop: theme.spacing(2.5),
            fontWeight: 600,
            fontSize: 16,
            textAlign: "center",
        },
        "& .tabs": {
            marginTop: theme.spacing(5),
            "& .Mui-selected": {
                fontWeight: 600,
            },
        },
        "& .checkout": {
            paddingTop: theme.spacing(3),
            "& button": {
                width: "100%",
                minHeight: 48,
            },
            "& .buttonGroup": {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "& button": {
                    width: "calc(50% - 6px)",
                },
            },
        },
        "& .balance": {
            marginTop: theme.spacing(3),
            textAlign: "center",
            "& .title": {
                fontWeight: 600,
            },
            "& .value": {
                fontSize: 22,
                color: theme.palette.primary.main,
                fontWeight: 700,
            },
        },
        "& .compare-table": {
            margin: theme.spacing(1, 0),
            "& td": {
                verticalAlign: "top",
                textAlign: "center",
            },
            "& td:nth-child(2)": {
                textAlign: "right",
            },
        },
        "& > .title": {
            fontWeight: "bold",
            fontSize: 22,
            textAlign: "center",
            padding: theme.spacing(2, 0),
            paddingBottom: 0,
        },
        "& > .subtitle": {
            fontWeight: 600,
            fontSize: 16,
            textAlign: "center",
            paddingBottom: theme.spacing(1),
        },
        "& .lp-pools": {
            "& .card": {
                boxShadow: theme.custom.boxShadow,
                borderRadius: theme.shape.borderRadius,
                cursor: "pointer",
                "&:hover": {
                    background: theme.custom.hoverColor,
                    transition: ".2s",
                },
            },
            "& .card-content": {
                display: "flex",
                flexDirection: "column",
                padding: theme.spacing(3, 6),
                "& .pool-img": {
                    display: "flex",
                    justifyContent: "center",
                    lineHeight: 0,
                    "& img": {
                        width: theme.spacing(6.5),
                        height: theme.spacing(6.5),
                        border: "1px solid rgba(32,114,214,20%)",
                        padding: theme.spacing(0.25),
                        borderRadius: 50,
                        background: theme.palette.background.default,
                    },
                },
                "& .pool-title": {
                    flexDirection: "column",
                    padding: theme.spacing(1, 0),
                    textAlign: "center",
                    "& .description": {
                        fontSize: 16,
                    },
                    "& .title": {
                        fontSize: "18px",
                        fontWeight: 500,
                    }
                },
                "& .percentage": {
                    color: theme.palette.primary.main,
                    fontWeight: 700,
                    textAlign: "center",
                    textShadow: "0px 0px 16px #e55370",
                    fontSize: theme.spacing(2.5),
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    "& svg": {
                        marginLeft: theme.spacing(1),
                    },
                },
                "& .comment": {
                    textAlign: "center",
                    fontSize: theme.spacing(1.75),
                },
            },
        },
        "& .lp-pools.selected": {
            "& .card": {
                background: "#e55370",
            },
            "& .card-content": {
                "& .percentage": {
                    color: "white",
                    textShadow: "0px 0px 16px white",
                },
                "& .pool-title": {
                    "& .title": {
                        color: "white"
                    }
                }
            }
        },
        "& .pool-descripton": {
            textAlign: "center",
            marginTop: theme.spacing(-2),
            padding: theme.spacing(2),
            lineHeight: "25px",
        },
    },
    lockingSelect: {
        "& > div": {
            padding: theme.spacing(1.5, 4),
        },
    },
    reforgedText: {
        display: "flex",
        justifyContent: "space-between",
        "& p": {
            padding: "0px !important",
        },
    },
    vhide: {
        visibility: "hidden",
    },
    logo: {
        height: 72,
        [theme.breakpoints.down(740)]: {
            display: "none",
        },
    },
    crown: {
        marginTop: "10px",
        height: 40,
    },
    withdrawConfirm: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        background: "white",
        boxShadow:
            "0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%)",
        borderRadius: "10px",
        padding: theme.spacing(3, 5),
        "& button": {
            width: "100%",
            minHeight: 48,
        },
        "& .buttonGroup": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "& button": {
                width: "calc(50% - 16px)",
            },
        },
    },
    memshipPlan: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        minHeight: 800,
        maxWidth: 1510,
        background: `${theme.custom.appbar} !important`,
        boxShadow:
            "0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%)",
        borderRadius: "10px",
        padding: theme.spacing(3, 5),
        [theme.breakpoints.down(1400)]: {
            width: 1200,
        },
        [theme.breakpoints.down(1060)]: {
            width: 810,
        },
        [theme.breakpoints.down(740)]: {
            width: 430,
            padding: "0 25px",
            minHeight: 400,
            height: 640,
        },
        "& .swiper-slide": {
            maxWidth: "360px",
        },
        "& p": {
            margin: "0",
        },
        "& button": {
            width: "100%",
            minHeight: 48,
        },
        "& .buttonGroup": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "& button": {
                width: "calc(50% - 16px)",
            },
        },
        "& .modal-logo": {
            display: "flex",
            justifyContent: "center",
        },
        "& .membership-card": {
            width: "250px",
            height: "580px",
            backgroundColor: "white",
            margin: "50px 15px 10px 15px",
            borderRadius: "40px",
            border: "4px dashed #f7696b4d",
            padding: "0 30px",
            fontSize: "12px",
            position: "relative",
            [theme.breakpoints.down(740)]: {
                marginTop: 5,
            },
        },
        "& .membership-card-extend": {
            width: "330px",
            height: "610px",
            backgroundColor: "white",
            margin: "10px",
            borderRadius: "40px",
            border: "solid 12px transparent",
            padding: "0 30px",
            fontSize: "12px",
            position: "relative",
            boxSizing: "border-box",
            backgroundClip: "padding-box",
        },
        "& .membership-card-extend:before": {
            content: '""',
            position: "absolute",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
            zIndex: "-1",
            margin: "-12px",
            borderRadius: "inherit",
            background: "linear-gradient(120deg, #ff3434, #9997e4)",
        },
        "& .membership-group": {
            display: "flex",
            justifyContent: "center",
            overflow: "hidden",
            height: 700,
            padding: "20px",
        },
        "& .card-title": {
            letterSpacing: "3px",
            marginTop: theme.spacing(7),
            fontSize: "15px",
            marginBottom: "0",
            fontWeight: "600",
        },
        "& .percent-title": {
            fontSize: "30px",
            fontWeight: "1000",
            margin: "0 10px 0px 0",
            wordWrap: "break-word",
            letterSpacing: "1px",
            color: "black",
        },
        "& .percent-group": {
            color: "grey",
            alignItems: "center",
            display: "flex",
            justifyContent: "flex-start",
            margin: "0",
        },
        "& .detail-section": {
            alignItems: "center",
            display: "flex",
            justifyContent: "flex-start",
            margin: "15px -5px",
        },
        "& .description": {
            marginTop: "10px",
            marginBottom: "50px",
            letterSpacing: "1px",
            fontWeight: "500",
        },
        "& .gradient-text-premium": {
            background:
                "-webkit-linear-gradient(45deg, #ff1010 30%, #a70000 80%);",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginLeft: "3px",
            fontWeight: "1000",
            letterSpacing: "0.5px",
        },
        "& .gradient-text-vip": {
            background:
                "-webkit-linear-gradient(45deg, #83009b 70%, #c70000 30%);",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginLeft: "3px",
            fontWeight: "1000",
            letterSpacing: "0.5px",
        },
        "& .gradient-text-free": {
            background:
                "-webkit-linear-gradient(45deg, grey 20%, #000000 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginLeft: "3px",
            fontWeight: "1000",
            letterSpacing: "0.5px",
        },
        "& .standard-description, .premium-description, .VIP-description": {
            marginTop: "10px",
            marginBottom: "30px !important",
            letterSpacing: "1px",
        },
        "& .standard-title": {
            color: "#e7421acf",
        },
        "& .premium-title": {
            marginTop: "0px",
            background:
                "-webkit-linear-gradient(45deg, #d10000 30%, #FF8E53 80%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
        },
        "& .VIP-title": {
            background:
                "-webkit-linear-gradient(45deg, #83009b 20%, #c70000 100%);",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
        },
        "& .VIP-description": {
            background:
                "-webkit-linear-gradient(45deg, #ff1010 30%, #a70000 80%);",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
        },
        "& .onsale-section": {
            position: "absolute",
            top: "-10px",
            right: "25px",
        },
        "& .onsale-section:after": {
            position: "absolute",
            content: '""',
            display: "block",
            width: "0",
            height: "0",
            marginTop: "-6px",
            borderLeft: "35px solid transparent",
            borderRight: "35px solid transparent",
            borderTop: "20px solid #ff4545",
        },
        "& .onsale": {
            position: "relative",
            display: "inline-block",
            textAlign: "center",
            color: "#fff",
            background:
                "-webkit-linear-gradient(290deg, #fd327d 50%, #ff4545 80%)",
            fontSize: "14px",
            lineHeight: "1",
            padding: "12px 8px 3px 8px",
            borderRadius: "4px",
            borderTopRightRadius: "10px",
            width: "70px",
            textTransform: "uppercase",
        },
        "& .onsale:before, .onsale:after": {
            position: "absolute",
            content: '""',
            display: "flex",
        },
        "& .onsale:after": {
            left: "-20px",
            top: "0",
            height: "0",
            width: "7px",
            borderRight: "20px solid #962d22",
            borderTop: "10px solid transparent",
            borderRightColor: "#a31555",
        },
        "& .star-display": {
            display: "block",
            marginLeft: "7px",
        },
        "& .star-none": {
            display: "none",
        },
        "& .close-button": {
            display: "none",
            [theme.breakpoints.down(740)]: {
                position: "absolute",
                top: 10,
                right: 20,
                display: "block",
                cursor: "pointer",
            },
        },
        "& .frame-spacer": {
            width: "350px",
            height: "630px",
            zIndex: "-3",
            padding: "1px 0",
            backgroundColor: "transparent",
            marginTop: "20px",
            borderRadius: "40px",
            fontSize: "12px",
            marginRight: "20px",
            outline: "2px solid #e9495a",
            [theme.breakpoints.down(740)]: {
                marginTop: -15,
                outline: "none",
            },
        },
    },
}));
export default useStyles;
