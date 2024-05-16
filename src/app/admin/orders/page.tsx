import { Section } from "@/components/admin/Section";
import { AdminHeading } from "@/components/admin/Heading";
import { supabaseClient } from "@/clients/supabase";

export const dynamic = "force-dynamic";

const Orders = async () => {
  const { data, error } = await supabaseClient.from("orders").select(`
  *,
  guest:guests!guest_menu_guest_id_fkey(name),
  starter:menu!orders_starter_id_fkey(title),
  main:menu!orders_main_id_fkey(title),
  dessert:menu!orders_dessert_id_fkey(title)
  `);

  if (error) {
    console.error(error);
    return <div>Error loading orders</div>;
  }

  const { starters, mains, desserts } = data?.reduce(
    (acc, order) => {
      if (!acc.starters[order.starter!.title]) {
        acc.starters[order.starter!.title] = 0;
      }
      if (!acc.mains[order.main!.title]) {
        acc.mains[order.main!.title] = 0;
      }
      if (!acc.desserts[order.dessert!.title]) {
        acc.desserts[order.dessert!.title] = 0;
      }
      acc.starters[order.starter!.title] += 1;
      acc.mains[order.main!.title] += 1;
      acc.desserts[order.dessert!.title] += 1;
      return acc;
    },
    { starters: {}, mains: {}, desserts: {} } as {
      starters: Record<string, number>;
      mains: Record<string, number>;
      desserts: Record<string, number>;
    }
  );

  return (
    <>
      <AdminHeading>Orders</AdminHeading>
      <div className="grid grid-cols-3">
        <Section title="Starters">
          {Object.entries(starters).map(([starterId, count]) => (
            <div key={starterId}>
              {starterId}: {count}
            </div>
          ))}
        </Section>
        <Section title="Mains">
          {Object.entries(mains).map(([mainId, count]) => (
            <div key={mainId}>
              {mainId}: {count}
            </div>
          ))}
        </Section>
        <Section title="Desserts">
          {Object.entries(desserts).map(([dessertId, count]) => (
            <div key={dessertId}>
              {dessertId}: {count}
            </div>
          ))}
        </Section>
      </div>
      <div className="divider" />
      <Section title="Orders">
        <table className="table">
          <thead>
            <tr>
              <th>Guest</th>
              <th>Starter</th>
              <th>Main</th>
              <th>Dessert</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order) => (
              <tr key={order.guest_id}>
                <td>{order.guest!.name}</td>
                <td>{order.starter!.title}</td>
                <td>{order.main!.title}</td>
                <td>{order.dessert!.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </>
  );
};

export default Orders;
