import Link from "next/link";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid grid-cols-[auto,_1fr]">
      <aside className="sidebar h-full p-2">
        <section className="menu-section">
          <nav className="menu">
            <ul className="menu-items">
              <li className="menu-item">
                <Link href="/admin">Guests</Link>
              </li>
              <li className="menu-item">
                <Link href="/admin/menu">Menu</Link>
              </li>
            </ul>
          </nav>
        </section>
      </aside>
      <main className="p-2">{children}</main>
    </div>
  );
};

export default Layout;
