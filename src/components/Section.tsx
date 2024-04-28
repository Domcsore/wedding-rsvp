import { PropsWithChildren } from "react";

interface SectionProps {
  title: string;
}

const Section = ({ title, children }: PropsWithChildren<SectionProps>) => (
  <section>
    <h2>{title}</h2>
    {children}
  </section>
);

export { Section };
