import { Database } from "@/types/database.types";

const MenuTable = ({
  items,
}: {
  items?: Database["public"]["Tables"]["menu"]["Row"][];
}) => {
  if (!items) return <p>No items found</p>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Ingredients</th>
          <th>Allergens</th>
        </tr>
      </thead>
      <tbody>
        {items.map((starter) => (
          <tr key={starter.id}>
            <td>{starter.title}</td>
            <td>{starter.ingredients}</td>
            <td>{starter.allergens}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { MenuTable };
