import type { MenuItem } from "@/types/menu";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { GiCheckMark } from "react-icons/gi";

export const MenuListItem = ({ item }: { item: MenuItem }) => (
  <div key={item.id} className="grid grid-cols-[1fr_auto] items-center">
    <div className="pr-4">
      <label className="block font-title uppercase" htmlFor={`item-${item.id}`}>
        {item.title} {item.allergens ? `(${item.allergens})` : ""}
      </label>
      <p className="text-xs md:text-sm">{item.ingredients} </p>
    </div>
    <RadioGroup.Item
      id={`item-${item.id}`}
      value={item.id}
      className="border border-slate-900 h-4 w-4"
    >
      <RadioGroup.Indicator>
        <GiCheckMark />
      </RadioGroup.Indicator>
    </RadioGroup.Item>
  </div>
);
