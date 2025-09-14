// import { cn } from "@/app/lib/utils";
// import React from "react";
//
// type BoundedProps = {
//   as?: React.ElementType;
//   className?: string;
//   children: React.ReactNode;
// };
//
// export const Bounded = ({
//   as: Comp = "section",
//   className,
//   children,
//   ...restProps
// }: BoundedProps) => {
//   return (
//     <Comp className={cn("px-4 first:pt-10 md:px-6", className)} {...restProps}>
//       <div className="mx-auto flex w-full max-w-[919px] flex-col">
//         {children}
//       </div>
//     </Comp>
//   );
// };

import { cn } from "@/app/lib/utils";
import React from "react";

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  [key: string]: unknown;
};

export const Bounded = ({
  as: Comp = "section",
  className,
  children,
  ...restProps
}: BoundedProps) => {
  return React.createElement(
    Comp,
    {
      className: cn("px-4 first:pt-10 md:px-6", className),
      ...restProps,
    },
    React.createElement(
      "div",
      {
        className: "mx-auto flex w-full max-w-[919px] flex-col",
      },
      children,
    ),
  );
};
