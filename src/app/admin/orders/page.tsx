import { Section } from "@/components/admin/Section";
import { AdminHeading } from "@/components/admin/Heading";
import { supabaseClient } from "@/clients/supabase";

const Orders = async () => {
  const { data, error } = await supabaseClient.from("orders").select(`
  *,
  guest:guest_id(name),
  starter:starter_id(title),
  main:main_id(title)
  `);

  if (error) {
    console.error(error);
    return <div>Error loading orders</div>;
  }

  const { starters, mains } = data?.reduce(
    (acc, order) => {
      if (!acc.starters[order.starter.title]) {
        acc.starters[order.starter.title] = 0;
      }
      if (!acc.mains[order.main.title]) {
        acc.mains[order.main.title] = 0;
      }
      acc.starters[order.starter.title] += 1;
      acc.mains[order.main.title] += 1;
      return acc;
    },
    { starters: {}, mains: {} } as {
      starters: Record<string, number>;
      mains: Record<string, number>;
    }
  );

  return (
    <>
      <AdminHeading>Orders</AdminHeading>
      <div className="grid grid-cols-2">
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
      </div>
      <div className="divider" />
      <Section title="Orders">
        <table className="table">
          <thead>
            <tr>
              <th>Guest</th>
              <th>Starter</th>
              <th>Main</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order) => (
              <tr key={order.guest_id}>
                <td>{order.guest.name}</td>
                <td>{order.starter.title}</td>
                <td>{order.main.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </>
  );
};

export default Orders;
