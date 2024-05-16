import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva("", {
  variants: {
    variant: {
      standard: "border border-stone-100 text-stone-100 rounded-full px-4 py-2",
      text: "underline underline-offset-4 px-4 py-2 text-sm",
    },
  },
  defaultVariants: {
    variant: "standard",
  },
});

export const Button = ({
  variant,
  className,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonStyles>) => (
  <button
    className={twMerge(buttonStyles({ variant }), className)}
    {...props}
  />
);
