import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function queryGenerator(obj) {
  let result = "";
  Object.entries(obj).forEach(([key, value]) => {
    if (value) {
      if (result.length) {
        result += `|${key}`;
      } else {
        result += `${key}`;
      }
    }
  });
  return result;
}

export function prepareData(obj) {
  const senderAddressKey = "senderAddress-";
  const clientAddressKey = "clientAddress-";
  const senderAddress = {};
  const clientAddress = {};
  const result = { clientAddress, senderAddress };

  for (const key in obj) {
    if (key.startsWith(senderAddressKey)) {
      senderAddress[key.replace(senderAddressKey, "")] = obj[key];
    }
    if (key.startsWith(clientAddressKey)) {
      clientAddress[key.replace(clientAddressKey, "")] = obj[key];
    }
  }

  for (const key in obj) {
    if (
      !(key.startsWith(senderAddressKey) || key.startsWith(clientAddressKey))
    ) {
      result[key] = obj[key];
    }
  }

  const total = obj.items.reduce((value, currentValue) => {
    return value + currentValue.total;
  }, 0);

  result.total = total;
  return result;
}
