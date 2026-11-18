"use client";

import { usePathname } from "next/navigation";

export default function HideOnAppointment({ children }) {
  const pathname = usePathname();

  return pathname === "/book-appointment" ? null : children;
}
