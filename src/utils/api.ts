import { Tariff } from "../types/types";

export async function getTariffs(): Promise<Tariff[]> {
  const res = await fetch("https://t-core.fit-hub.pro/Test/GetTariffs");
  return res.json();
}
