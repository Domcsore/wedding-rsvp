import { PropsWithChildren } from "react";

const AdminHeading = ({ children }: PropsWithChildren) => (
  <h1 className="text-2xl font-bold mb-4">{children}</h1>
);

export { AdminHeading };
