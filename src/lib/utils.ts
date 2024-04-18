import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRupiah(num: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num)
}

export function formatBlankPrice(price: number) {
  return price.toLocaleString('id-ID');
}


export function removeHtmlTags(htmlString: string | null | undefined) {
  if (!htmlString) return '';
  return htmlString.replace(/<[^>]*>/g, '');
}