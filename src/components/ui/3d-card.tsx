"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const ROTATION_RANGE = 24;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

interface CardContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  containerClassName?: string;
}

const CardContainer = React.forwardRef<HTMLDivElement, CardContainerProps>(
  ({ className, containerClassName, children, ...props }, ref) => {
    const [isMouseEntered, setIsMouseEntered] = React.useState(false);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      const element = event.currentTarget;
      const rect = element.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const xPercentage = x / rect.width;
      const yPercentage = y / rect.height;

      const rotateX = (yPercentage * ROTATION_RANGE - HALF_ROTATION_RANGE) * -1;
      const rotateY = xPercentage * ROTATION_RANGE - HALF_ROTATION_RANGE;

      element.style.setProperty("--rotateX", `${rotateX}deg`);
      element.style.setProperty("--rotateY", `${rotateY}deg`);
    };

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
      setIsMouseEntered(true);
      event.currentTarget.style.setProperty("--scale", "1.02");
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
      setIsMouseEntered(false);
      event.currentTarget.style.setProperty("--rotateX", "0deg");
      event.currentTarget.style.setProperty("--rotateY", "0deg");
      event.currentTarget.style.setProperty("--scale", "1");
    };

    return (
      <div className={cn("py-4 [perspective:1000px]", containerClassName)}>
        <div
          ref={ref}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "relative transition-transform duration-200 ease-linear [transform-style:preserve-3d]",
            className,
          )}
          style={
            {
              "--rotateX": "0deg",
              "--rotateY": "0deg",
              "--scale": "1",
              transform:
                "rotateX(var(--rotateX)) rotateY(var(--rotateY)) scale(var(--scale))",
            } as React.CSSProperties
          }
          {...props}
        >
          <CardContext.Provider value={isMouseEntered}>
            {children}
          </CardContext.Provider>
        </div>
      </div>
    );
  },
);
CardContainer.displayName = "CardContainer";

const CardContext = React.createContext(false);

type CardBodyProps = React.HTMLAttributes<HTMLDivElement>;

const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "h-full w-full rounded-2xl border border-border/70 bg-background/80 p-6 shadow-sm backdrop-blur-sm [transform-style:preserve-3d]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
CardBody.displayName = "CardBody";

interface CardItemProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  translateZ?: number;
  rotateX?: number;
  rotateY?: number;
}

const CardItem = React.forwardRef<HTMLDivElement, CardItemProps>(
  (
    {
      as: Tag = "div",
      className,
      children,
      translateZ = 0,
      rotateX = 0,
      rotateY = 0,
      ...props
    },
    ref,
  ) => {
    const isMouseEntered = React.useContext(CardContext);

    const transform = isMouseEntered
      ? `translate3d(0,0,${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      : "translate3d(0,0,0) rotateX(0deg) rotateY(0deg)";

    return (
      <Tag
        ref={ref}
        className={cn("transition-transform duration-200 ease-linear", className)}
        style={{ transform }}
        {...props}
      >
        {children}
      </Tag>
    );
  },
);
CardItem.displayName = "CardItem";

export { CardContainer, CardBody, CardItem };
