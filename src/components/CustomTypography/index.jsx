import React from "react";
import { useTheme } from "react-jss";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Box } from "@material-ui/core";
import useStyles from "./styles";

/**
 * This component renders a responsive Typography element using custom colors, variants and weights.
 * @returns A typography component
 */
function CustomTypography({
  variant,
  color,
  weight,
  className,
  children,
  style,
  ...rest
}) {
  CustomTypography.defaultProps = {
    children: undefined,
    color: undefined,
    variant: "body",
    weight: undefined,
    className: "",
    style: {},
  };

  CustomTypography.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    color: PropTypes.string,
    variant: PropTypes.string,
    weight: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.shape(),
  };

  const theme = useTheme();
  const classes = useStyles();

  return (
    <Box
      className={classNames(classes[variant], classes[weight], className)}
      style={{ color: color || theme.text.primary, ...style }}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default CustomTypography;
