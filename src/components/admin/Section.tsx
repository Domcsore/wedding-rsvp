import { PropsWithChildren } from "react";

const Section = ({ title, children }: PropsWithChildren<{ title: string }>) => (
  <section className="mb-4">
    <h2 className="font-bold mb-2">{title}</h2>
    {children}
  </section>
);

export { Section };
