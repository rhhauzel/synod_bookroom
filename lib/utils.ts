import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function financialYear(){
  const currYear = new Date().getFullYear();
  let finYear = ['2013-2014'];
  for (let i = 2014; i <= currYear; i++) {
    finYear=[...finYear,`${i}-${i+1}`,]
  }
  return finYear;
}
