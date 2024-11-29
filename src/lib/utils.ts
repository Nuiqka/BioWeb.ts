import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import crypto from "crypto";

export function generateUserId() {
  return crypto.randomBytes(16).toString("hex");
}
