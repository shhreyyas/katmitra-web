"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("rounded-xl border bg-white p-4 shadow-sm", className)} {...props} />
);

export const Button = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={cn(
      "rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-50",
      className,
    )}
    {...props}
  />
);

export const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn("w-full rounded-md border bg-white px-3 py-2 text-sm", className)}
    {...props}
  />
);
