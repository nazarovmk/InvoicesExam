import { create } from "zustand";

export const useAppStore = create((set) => ({
  filter: "",
  invoices: [],
  themes: ["default", "rose", "blue"],
  items: [],
  sheetOpen: false,
  editedData: null,
  setEditedData(editedData) {
    return set(() => {
      return { editedData };
    });
  },
  setSheetOpen() {
    return set((state) => {
      return { sheetOpen: !state.sheetOpen };
    });
  },
  setInvoices: (updater) =>
    set((state) => ({
      invoices:
        typeof updater === "function" ? updater(state.invoices) : updater,
    })),
  updateInvoices(newData) {
    set((state) => ({
      invoices: state.invoices.map((el) =>
        el.id === newData.id ? newData : el
      ),
    }));
  },
  setFilter(value) {
    set(() => ({ filter: value }));
  },
  setItems(items) {
    set(() => ({ items }));
  },
}));
