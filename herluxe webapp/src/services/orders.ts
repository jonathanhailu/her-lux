import { api } from "@/api/client";

export async function fetchOrders() {
  // Mock fallback
  return [
    { id: "ORD-1042", date: "2026-05-12", total: 489, status: "Shipped", items: 1, tracking: 75 },
    { id: "ORD-1031", date: "2026-04-28", total: 720, status: "Delivered", items: 1, tracking: 100 },
    { id: "ORD-1019", date: "2026-04-09", total: 369, status: "Processing", items: 1, tracking: 30 },
  ];
}

export async function createOrder(payload: unknown) {
  const { data } = await api.post("/api/orders/create/", payload);
  return data;
}

export async function initiateChapaPayment(payload: unknown) {
  const { data } = await api.post("/api/payments/chapa/initiate/", payload);
  return data;
}