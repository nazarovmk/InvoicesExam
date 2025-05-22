const baseURL = "https://json-api.uz/api/project/fn35/invoices";

// Hammasini olish (status bo‘yicha filtr bilan)
export async function getInvoices(query = "") {
  const req = await fetch(baseURL + (query ? `?status=${query}` : ""));
  if (req.ok) {
    const result = await req.json();
    return result.data;
  } else {
    throw new Error("Something went wrong while fetching invoices.");
  }
}

// ID orqali bitta invoice olish
export async function getInvoice(id) {
  const req = await fetch(`${baseURL}/${id}`);
  if (req.ok) {
    const result = await req.json();
    return result;
  } else {
    throw new Error("Something went wrong while fetching invoice by ID.");
  }
}

// ID orqali o‘chirish
export async function deleteById(id) {
  const req = await fetch(`${baseURL}/${id}`, {
    method: "DELETE",
  });
  if (req.ok) {
    return "success";
  } else {
    throw new Error("Something went wrong while deleting invoice.");
  }
}

// ID orqali yangilash
export async function updateById(id, newData) {
  const req = await fetch(`${baseURL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });

  if (req.ok) {
    const result = await req.json();
    return result;
  } else {
    throw new Error("Something went wrong while updating invoice.");
  }
}

// Yangi invoice qo‘shish
export async function addInvoices(data) {
  const req = await fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (req.ok) {
    const result = await req.json();
    return result;
  } else {
    throw new Error("Something went wrong while adding invoice.");
  }
}
