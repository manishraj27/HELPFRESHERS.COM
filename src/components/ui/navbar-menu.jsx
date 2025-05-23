"use client";
import React from "react";
import { motion } from "motion/react";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children
}) => {
  return (
    (<div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-foreground hover:text-primary">
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}>
          {active === item && (
            <div
              className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4 z-50">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-card text-card-foreground backdrop-blur-sm rounded-xl overflow-hidden border border-border shadow-xl">
                <motion.div
                  layout
                  className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>)
  );
};

export const Menu = ({
  setActive,
  children
}) => {
  return (
    (<nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-transparent dark:border-border bg-background flex justify-center space-x-4 px-8 py-6">
      {children}
    </nav>)
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src
}) => {
  return (
    (<a href={href} className="flex space-x-2 group">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl" />
      <div>
        <h4 className="text-xl font-bold mb-1 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-muted-foreground text-sm max-w-[10rem]">
          {description}
        </p>
      </div>
    </a>)
  );
};

export const HoveredLink = ({
  children,
  ...rest
}) => {
  return (
    (<a
      {...rest}
      className="text-foreground/80 hover:text-primary transition-colors">
      {children}
    </a>)
  );
};