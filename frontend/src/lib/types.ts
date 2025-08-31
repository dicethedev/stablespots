import { ReactNode } from "react";


export type BusinessStatus = "pending" | "approved" | "rejected";

export type Category = {
  name: string;
  icon: ReactNode | null;
};



