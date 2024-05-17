import { supabaseClient } from "@/clients/supabase";
import { AdminHeading } from "@/components/admin/Heading";
import { Section } from "@/components/admin/Section";
import { revalidatePath } from "next/cache";

const AdminHome = async () => {
  const addGuest = async (formData: FormData) => {
    "use server";

    const name = formData.get("name")?.toString();

    if (!name) {
      return;
    }

    const { error } = await supabaseClient.from("guests").insert({
      name,
      email: "NA",
    });

    if (error) {
      console.error(error);
      return;
    }

    revalidatePath("/admin");
  };

  const { data, error } = await supabaseClient.from("guests").select("*");
  if (error) {
    console.error(error);
    return <div>Error loading guests</div>;
  }

  return (
    <>
      <AdminHeading>Guests</AdminHeading>
      <Section title="Add Guest">
        <form className="form-group mb-4" action={addGuest}>
          <div className="grid grid-cols-2 gap-2">
            <div className="form-field">
              <label className="input-label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="input max-w-full"
              />
            </div>
          </div>
          <div className="form-control">
            <button type="submit" className="btn btn-primary w-full">
              Add guest
            </button>
          </div>
        </form>
      </Section>

      <div className="divider" />

      <Section title="Guest list">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Guest of</th>
              <th>Attending</th>
              <th>Email</th>
              <th>Invite link</th>
            </tr>
          </thead>
          <tbody>
            {data.map((guest) => (
              <tr key={guest.id}>
                <td>{guest.name}</td>
                <td>{data.find((g) => g.id === g.parent_guest)?.name}</td>
                <td>
                  {guest.attending === null
                    ? "Not responded"
                    : guest.attending
                    ? "Yes"
                    : "No"}
                </td>
                <td>{guest.email}</td>
                <td>
                  <a
                    href={`https://wedding.dominicsore.co.uk/rsvp/${guest.id}`}
                  >
                    {`https://wedding.dominicsore.co.uk/rsvp/${guest.id}`}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </>
  );
};

export default AdminHome;
