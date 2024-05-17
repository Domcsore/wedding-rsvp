"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { PageSection } from "./PageSection";
import Image from "next/image";
import { acceptRsvp, declineRsvp } from "@/app/actions";
import { Button } from "./Button";
import { MenuItem } from "@/types/menu";
import { MenuList } from "./MenuList";

interface PageScrollerProps {
  untilWedding: string;
  guest: {
    name: string;
    id: string;
  };
  menu: {
    starters: MenuItem[];
    mains: MenuItem[];
    desserts: MenuItem[];
  };
}

const PageScroller = ({ menu, untilWedding, guest }: PageScrollerProps) => {
  const [page, setPage] = useState(0);
  const [sectionHeight, setSectionHeight] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "up" | "down") => {
    if (direction === "up") {
      setPage((prev) => Math.max(0, prev - 1));
    } else {
      setPage((prev) => prev + 1);
    }
  };

  const handleResize: ResizeObserverCallback = useCallback(
    (entries) => {
      for (const entry of entries) {
        const { height } = entry.contentRect;
        if (height !== sectionHeight) {
          setSectionHeight(height);
        }
      }
    },
    [sectionHeight]
  );

  useEffect(() => {
    const resizeOb = new ResizeObserver(handleResize);

    if (containerRef.current) {
      resizeOb.observe(containerRef.current);
    }

    return () => {
      resizeOb.disconnect();
    };
  }, [containerRef, handleResize]);

  return (
    <main
      ref={containerRef}
      className="h-svh max-h-svh overflow-hidden relative bg-stone-300 text-slate-900"
    >
      <div
        style={{
          transform: `translateY(-${page * sectionHeight}px)`,
          transition: "transform 0.5s",
        }}
      >
        <PageSection>
          <Image
            src={`/main.webp`}
            alt="Hannah and Dominic"
            fill
            className="brightness-50 object-cover"
            priority
          />
          <div className="absolute z-10 text-stone-100 mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
            <p className="text-center text-3xl font-cursive text-slate-100">
              {guest.name}, please join us on becoming Mr & Mrs Sore
            </p>
            <p className="text-4xl tracking-widest font-title w-full text-center py-8">
              DOMINIC & HANNAH-LOUISE
            </p>
            <div className="mx-auto w-fit bg-slate-100 text-slate-900 rounded-full px-4 py-2 mt-4 uppercase">
              {untilWedding}
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <Button type="button" onClick={() => handleScroll("down")}>
              RSVP
            </Button>
          </div>
        </PageSection>
        <PageSection>
          <div className="border-t-8 border-b-8 border-stone-500 py-8 h-full flex flex-col items-center">
            <div className="my-auto grid gap-8">
              <div>
                <h3 className="text-center font-cursive text-3xl">Ceremony</h3>
                <address className="font-title uppercase text-center text-2xl md:text-xl tracking-wider">
                  Ealing Abbey
                  <br /> Charlbury Grove
                  <br /> Ealing, W5 2DY
                  <br />
                  at 3:30pm
                </address>
              </div>
              <div>
                <h3 className="text-center font-cursive text-3xl">Reception</h3>
                <address className="font-title uppercase text-center text-2xl md:text-xl tracking-wider">
                  The Drayton Court Hotel
                  <br /> 2 The Avenue
                  <br /> Ealing, W13 8PH
                  <br />
                  at 5:00pm till late
                </address>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div>
                <Button
                  variant="text"
                  type="button"
                  onClick={() => handleScroll("down")}
                  className="border-r border-stone-900 block ml-auto"
                >
                  I&apos;ll Be There
                </Button>
              </div>
              <div>
                <div>
                  <Button
                    variant="text"
                    type="button"
                    onClick={async () => {
                      await declineRsvp(guest.id);
                    }}
                  >
                    I Can&apos;t Make It
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </PageSection>
        <form action={acceptRsvp}>
          <input hidden name="guestId" defaultValue={guest.id} />
          <PageSection>
            <div className="md:border-x-8 border-stone-500 md:px-4 flex flex-col items-center max-h-full overflow-y-auto">
              <h2 className="font-title uppercase text-2xl">Menu</h2>
              <div className="md:my-auto py-4 grid gap-4">
                <h3 className="font-title uppercase text-xl text-center">
                  Starters
                </h3>
                <MenuList items={menu.starters} name="starterId" />
                <h3 className="font-title uppercase text-xl text-center">
                  Mains
                </h3>
                <MenuList items={menu.mains} name="mainId" />
                <h3 className="font-title uppercase text-xl text-center">
                  Desserts
                </h3>
                <MenuList items={menu.desserts} name="dessertId" />
              </div>
              <div className="mt-auto">
                <div>
                  <Button variant="text" type="submit">
                    Complete
                  </Button>
                </div>
              </div>
            </div>
          </PageSection>
        </form>
      </div>
    </main>
  );
};

export { PageScroller };
