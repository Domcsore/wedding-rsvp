import { supabaseClient } from "@/clients/supabase";
import { AdminHeading } from "@/components/admin/Heading";
import { revalidatePath } from "next/cache";

const AdminHome = async () => {
  const addGuest = async (formData: FormData) => {
    "use server";

    const name = formData.get("name");
    const email = formData.get("email");

    if (!name || !email) {
      return;
    }

    const { error } = await supabaseClient.from("guests").insert({
      name,
      email,
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
      <form className="form-group mb-4" action={addGuest}>
        <div className="form-field">
          <label className="input-label" htmlFor="name">
            Name
          </label>
          <input type="text" name="name" id="name" required className="input" />
        </div>
        <div className="form-field">
          <label className="input-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="input"
          />
        </div>
        <div className="form-control">
          <button type="submit" className="btn btn-primary">
            Add guest
          </button>
        </div>
      </form>
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
                {guest.parent_guest
                  ? ""
                  : `https://wedding.dominicsore.co.uk/rsvp/${guest.id}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminHome;
