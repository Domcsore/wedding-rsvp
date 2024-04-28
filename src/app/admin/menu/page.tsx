import { supabaseClient } from "@/clients/supabase";
import { AdminHeading } from "@/components/admin/Heading";
import { MenuTable } from "@/components/admin/MenuTable";
import { Section } from "@/components/admin/Section";
import { COURSE } from "@/contants/course";
import { revalidatePath } from "next/cache";

const Menu = async () => {
  const { data: menuData, error: menuError } = await supabaseClient
    .from("menu")
    .select();

  const starters = menuData?.filter(
    (item) => item.course === COURSE.STARTER.id
  );
  const mains = menuData?.filter((item) => item.course === COURSE.MAIN.id);

  const addItem = async (formData: FormData) => {
    "use server";

    const name = formData.get("name");
    const ingredients = formData.get("ingredients");
    const allergens = formData.get("allergens");
    const courseId = formData.get("courseId");

    if (!name || !ingredients || !courseId) {
      return;
    }

    const { error } = await supabaseClient
      .from("menu")
      .insert({ title: name, ingredients, allergens, course: courseId });

    if (error) {
      console.log(error);
      return;
    }

    revalidatePath("/admin/menu");
  };

  return (
    <>
      <AdminHeading>Menu</AdminHeading>
      <Section title="Starters">
        <MenuTable items={starters} />
      </Section>
      <div className="divider" />
      <Section title="Mains">
        <MenuTable items={mains} />
      </Section>
      <div className="divider" />
      <Section title="Add Item">
        <form className="form-group" action={addItem}>
          <div className="form-field">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input className="input" type="text" name="name" />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="ingredients">
              Ingredients
            </label>
            <input className="input" type="text" name="ingredients" />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="allergens">
              Allergens
            </label>
            <input className="input" type="text" name="allergens" />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="courseId">
              Course
            </label>
            <select className="select" name="courseId">
              <option value={COURSE.STARTER.id}>Starter</option>
              <option value={COURSE.MAIN.id}>Main</option>
            </select>
          </div>
          <div className="form-control">
            <button className="btn btn-primary">Add Item</button>
          </div>
        </form>
      </Section>
    </>
  );
};

export default Menu;
