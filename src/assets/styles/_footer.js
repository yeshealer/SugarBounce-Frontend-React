import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    footer: {
        display: "flex !important",
        justifyContent: "center",
        alignItems: "center",
        minHeight: theme.spacing(9),
        background: `${theme.custom.footer} !important`,
        boxShadow: `${theme.custom.boxShadow} !important`,
        "& > div": {
            display: "flex",
            justifyContent: "center"
        },
        "& .MuiContainer-root": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap"
        },
        "& a": {
            color: "#999",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "-0.5px",
            paddingLeft: 20,
            paddingRight: 20
        }
    }
}));
export default useStyles;
