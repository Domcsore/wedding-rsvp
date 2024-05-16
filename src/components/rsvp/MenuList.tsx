import { MenuItem } from "@/types/menu";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { MenuListItem } from "./MenuItem";

interface MenuListProps {
  items: MenuItem[];
  name?: string;
}

export const MenuList = ({ name, items }: MenuListProps) => (
  <RadioGroup.Root name={name} className="grid gap-4">
    {items.map((item) => (
      <MenuListItem key={item.id} item={item} />
    ))}
  </RadioGroup.Root>
);
