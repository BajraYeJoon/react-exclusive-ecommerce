import { ReactNode } from "react";

export const MaxWidthWrapper = ({
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-2.5 ">{children}</div>
  );
};
