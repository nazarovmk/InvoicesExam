const baseURL =
  import.meta.env.VITE_BASE_URL ||
  "https://json-api.uz/api/project/fn35/invoices";

// All
export async function getInvoices(query = "") {
  const req = await fetch(baseURL + (query ? `?status=${query}` : ""));
  if (req.status === 200) {
    const result = await req.json();
    return result.data;
  } else {
    throw new Error("Something went wrong!");
  }
}

// Get by id
export async function getInvoice(id) {
  const req = await fetch(baseURL + `/${id}`);
  if (req.status === 200) {
    const result = await req.json();
    return result;
  } else {
    throw new Error("Something went wrong!");
  }
}

// Delete by id
export async function deleteById(id) {
  const req = await fetch(baseURL + `/${id}`, {
    method: "DELETE",
  });
  if (req.status === 200) {
    return "success";
  } else {
    throw new Error("Something went wrong!");
  }
}

// Update by id
export async function updateById(id, newData) {
  const req = await fetch(baseURL + `/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  if (req.status === 200) {
    const result = req.json();
    return result;
  } else {
    throw new Error("Something went wrong!");
  }
}

// Add by id
export async function addInvoices(data) {
  const req = await fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (req.status === 200) {
    const result = req.json();
    return result;
  } else {
    throw new Error("Something went wrong!");
  }
}
