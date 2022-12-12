import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  title: {
    fontFamily: `"Manrope", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: 700,
    fontSize: 14,
    lineHeight: "19.12px",
    letterSpacing: "-0.00833em",
  },
  contrast: {
    fontFamily: `"Manrope", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: 500,
    fontSize: 16,
    lineHeight: "21.86px",
    letterSpacing: "-0.00833em",
  },
  body: {
    fontFamily: `"Manrope", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: 500,
    fontSize: 12,
    lineHeight: "16.39px",
    letterSpacing: "-0.00833em",
  },
  paragraph: {
    fontFamily: `"Manrope", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: 400,
    fontSize: 10,
    lineHeight: "13.66px",
    letterSpacing: "-0.00833em",
  },
  stats: {
    fontFamily: `"Manrope", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: 700,
    fontSize: 18,
    lineHeight: "24.59px",
    letterSpacing: "-0.00833em",
  },
  subStats: {
    fontFamily: `"Manrope", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: 400,
    fontSize: 12,
    lineHeight: "16.39px",
    letterSpacing: "-0.00833em",
  },
  bold: {
    fontWeight: 700,
  },
  regular: {
    fontWeight: 400,
  },
});

export default useStyles;
