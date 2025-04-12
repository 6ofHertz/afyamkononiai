
import * as React from "react";
import { Link, LinkProps } from "react-router-dom";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ButtonLinkProps extends ButtonProps {
  to: LinkProps["to"];
  replace?: boolean;
  state?: any;
  children: React.ReactNode;
  className?: string;
}

export const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, size, to, replace, state, children, ...props }, ref) => {
    return (
      <Button
        className={cn("", className)}
        variant={variant}
        size={size}
        asChild
        {...props}
      >
        <Link to={to} replace={replace} state={state} ref={ref}>
          {children}
        </Link>
      </Button>
    );
  }
);

ButtonLink.displayName = "ButtonLink";
