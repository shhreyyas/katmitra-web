import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const planToMonths = (planType: "1M" | "6M" | "12M") => {
  if (planType === "1M") return 1;
  if (planType === "6M") return 6;
  return 12;
};
