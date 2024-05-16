import { supabaseClient } from "@/clients/supabase";
import { PageSection } from "@/components/rsvp/PageSection";
import { gu } from "date-fns/locale";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const Confirmation = async ({ params }: { params: { guestId: string } }) => {
  const { data, error } = await supabaseClient
    .from("guests")
    .select()
    .eq("id", params.guestId)
    .single();

  if (!data || error) {
    notFound();
  }

  const isAttending = data.attending;

  if (isAttending === null) {
    return redirect(`/rsvp/${params.guestId}`);
  }

  return isAttending ? (
    <PageSection>
      <div className="border-t-8 border-b-8 border-stone-500 py-8 h-full flex flex-col items-center justify-center">
        <h1 className="font-title uppercase text-3xl text-center w-full">
          Thank you {data.name}
        </h1>
      </div>
    </PageSection>
  ) : (
    <PageSection>
      <div className="border-t-8 border-b-8 border-stone-500 py-8 h-full flex flex-col items-center justify-center">
        <h1 className="font-title uppercase text-3xl text-center w-full">
          {data.name}, Sorry you can&apos;t make it
        </h1>
        <p className="text-sm text-center w-full">
          If things change, get in touch with Hannah or Dominic
        </p>
      </div>
    </PageSection>
  );
};

export default Confirmation;
