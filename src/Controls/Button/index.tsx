import React from "react";
import classnames from "classnames";

import { ButtonTheme } from "./Buttontypes";
import "./index.scss";

type AnchorType = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;
type ButtonType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
type DEFAULT = AnchorType & ButtonType;

interface OwnProps extends DEFAULT {
  label?: string;
  icon?: React.ReactElement;
  theme?: ButtonTheme;
}

function Button({
  className,
  label,
  icon,
  href,
  disabled,
  theme,
  ...others
}: OwnProps): React.ReactElement {
  const classes = classnames(
    "button",
    { "button--disabled": disabled },
    { "button--primary": theme === ButtonTheme.Primary },
    { "button--secondary": theme === ButtonTheme.Secondary },
    className
  );

  return (
    <>
      {href ? (
        <a className={classes} href={href} {...others}>
          <div className="button__content">
            {icon && icon}
            {label}
          </div>
        </a>
      ) : (
        <button disabled={disabled} className={classes} {...others}>
          <div className="button__content">
            {icon && icon}
            {label}
          </div>
        </button>
      )}
    </>
  );
}

export default Button;
