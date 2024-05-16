import { PropsWithChildren } from "react";
import { VariantProps, cva } from "class-variance-authority";

const pageSectionStyles = cva(
  "h-svh m-h-svh w-full relative bg-stone-100 text-stone-900 p-8 md:p-14 lg:p-20",
  {
    variants: {
      withBorders: {
        true: "border-t border-b border-stone-500",
      },
    },
  }
);

const PageSection = ({
  children,
  withBorders,
}: PropsWithChildren<VariantProps<typeof pageSectionStyles>>) => (
  <div className={pageSectionStyles({ withBorders })}>{children}</div>
);

export { PageSection };
