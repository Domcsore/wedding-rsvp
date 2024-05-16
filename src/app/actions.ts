"use server";

import { supabaseClient } from "@/clients/supabase";
import { revalidatePath } from "next/cache";
import { RedirectType, redirect } from "next/navigation";

export const declineRsvp = async (guestId: string) => {
  const { error } = await supabaseClient
    .from("guests")
    .update({ attending: false })
    .eq("id", guestId);

  if (error) {
    console.error(error);
  } else {
    revalidatePath(`/confirmation/${guestId}`);
    redirect(`/confirmation/${guestId}`, RedirectType.push);
  }
};

export const acceptRsvp = async (formData: FormData) => {
  const guestId = formData.get("guestId")?.toString();
  const starterId = formData.get("starterId")?.toString();
  const mainId = formData.get("mainId")?.toString();
  const dessertId = formData.get("dessertId")?.toString();

  if (!guestId || !starterId || !mainId || !dessertId) {
    console.log("Missing data");
    return;
  }

  const updateGuest = supabaseClient
    .from("guests")
    .update({ attending: true })
    .eq("id", guestId);

  const addOrder = supabaseClient.from("orders").insert([
    {
      guest_id: guestId,
      starter_id: starterId,
      main_id: mainId,
      dessert_id: dessertId,
    },
  ]);

  const reuslt = await Promise.all([updateGuest, addOrder]);

  if (reuslt.some(({ error }) => error)) {
    console.error(reuslt);
  } else {
    revalidatePath(`/confirmation/${guestId}`);
    redirect(`/confirmation/${guestId}`, RedirectType.push);
  }
};
