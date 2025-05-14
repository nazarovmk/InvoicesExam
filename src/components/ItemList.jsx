import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useAppStore } from "../lib/zustand";

export default function ItemList({ info }) {
  const { setItems } = useAppStore();

  const [localItems, setLocalItems] = useState(
    info
      ? info
      : [
          {
            id: crypto.randomUUID(),
            name: "",
            quantity: 1,
            price: 0,
            get total() {
              return +this.price * +this.quantity;
              s;
            },
          },
        ]
  );

  useEffect(() => {
    setItems(localItems);
  }, [JSON.stringify(localItems)]);

  function handleChange(e, id) {
    const changedItem = localItems.find((el) => {
      return el.id === id;
    });
    changedItem[e.target.name] = e.target.value;
    setLocalItems((prev) => {
      const mapped = prev.map((el) => {
        if (el.id === changedItem.id) {
          return changedItem;
        } else {
          return el;
        }
      });
      return mapped;
    });
  }

  function handleClick(type, id) {
    if (type === "add") {
      if (localItems.at(-1).name.trim() !== "") {
        setLocalItems((prev) => {
          return [
            ...prev,
            {
              id,
              name: "",
              quantity: 1,
              price: 0,
              get total() {
                return this.price * this.quantity;
              },
            },
          ];
        });
      } else {
        toast.info("Oxirgi nameni kiriting");
      }
    } else if (type === "delete") {
      if (localItems.length === 1) {
        toast.info("Eng kamida bitta element bo'lishi kerak");
      } else {
        const filtered = localItems.filter((el) => el.id !== id);
        setLocalItems(filtered);
      }
    }
  }

  return (
    <div>
      <h3 className="font-bold text-[18px] mb-4">Item List</h3>
      <ul className="flex flex-col mb-[18px]">
        {localItems.map(({ name, quantity, price, total, id }) => {
          return (
            <li
              className="grid grid-cols-1 sm:flex md:flex items-center gap-5 mb-2"
              key={id}
            >
              <div className="flex flex-col gap-2.5 w-full">
                <label className="text-muted font-normal px-1">Item Name</label>
                <Input
                  onChange={(e) => handleChange(e, id)}
                  defaultValue={name}
                  className="pt-[17px] pr-[20px] pb-[17px] pl-[20px] font-bold text-[12px] rounded-[4px] bg-card"
                  type="text"
                  name="name"
                  placeholder="Item Name"
                />
              </div>

              <div className="flex gap-5 items-center">
                <div className="flex flex-col gap-2.5">
                  <label className="text-muted font-normal px-1">Qty.</label>
                  <Input
                    inputMode="numeric"
                    onChange={(e) => handleChange(e, id)}
                    defaultValue={quantity}
                    className="font-bold text-[12px] rounded-[4px] bg-card text-center appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    type="number"
                    name="quantity"
                    placeholder="Qty"
                  />
                </div>
                <div className="flex flex-col gap-2.5">
                  <label className="text-muted font-normal px-1">Price</label>
                  <Input
                    inputMode="numeric"
                    onChange={(e) => handleChange(e, id)}
                    defaultValue={Number(price).toFixed(2)}
                    className="font-bold text-[12px] rounded-[4px] bg-card text-center appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    type="number"
                    name="price"
                    placeholder="Price"
                  />
                </div>
                <div className="flex flex-col gap-2.5">
                  <label className="text-muted font-normal px-1">Total</label>
                  <span className="font-bold text-[12px] text-center">
                    {total.toFixed(2)}
                  </span>
                </div>

                <div className="w-[50px] h-[50px] flex items-center justify-center mt-auto">
                  <Trash2
                    onClick={() => handleClick("delete", id)}
                    className="cursor-pointer transition-transform duration-200 hover:-translate-y-1"
                    size={20}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <Button
        type="button"
        className="w-full mb-10 rounded-[24px] py-[17px] font-bold text-[12px] bg-card text-foreground cursor-pointer"
        onClick={() => handleClick("add", crypto.randomUUID())}
      >
        + Add New Item
      </Button>
    </div>
  );
}
