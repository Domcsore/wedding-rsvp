import { supabaseClient } from "@/clients/supabase";
import { RedirectType, notFound, redirect } from "next/navigation";
import { formatDistanceToNowStrict } from "date-fns";
import { PageScroller } from "@/components/rsvp/PageScroller";
import { COURSE } from "@/contants/course";
import { MenuItem } from "@/types/menu";

export const dynamic = "force-dynamic";

const Rsvp = async ({ params }: { params: { guestId: string } }) => {
  const { data, error } = await supabaseClient
    .from("guests")
    .select()
    .eq("id", params.guestId)
    .single();

  const { data: menuData, error: menuError } = await supabaseClient
    .from("menu")
    .select("id, title, ingredients, allergens, course");

  if (!data || error || !menuData || menuError) {
    return notFound();
  }

  if (data.attending !== null) {
    redirect(`/confirmation/${data.id}`, RedirectType.push);
  }

  const menu = menuData.reduce(
    (acc, item) => {
      switch (item.course) {
        case COURSE.STARTER.id:
          acc.starters.push(item);
          break;
        case COURSE.MAIN.id:
          acc.mains.push(item);
          break;
        case COURSE.DESSERT.id:
          acc.desserts.push(item);
          break;
      }

      return acc;
    },
    { starters: [], mains: [], desserts: [] } as {
      starters: MenuItem[];
      mains: MenuItem[];
      desserts: MenuItem[];
    }
  );

  const untilWedding = formatDistanceToNowStrict(new Date("2024-06-22"), {
    unit: "day",
    addSuffix: true,
  });

  return <PageScroller menu={menu} untilWedding={untilWedding} guest={data} />;
};

export default Rsvp;
