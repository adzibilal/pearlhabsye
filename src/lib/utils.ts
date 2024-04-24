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

export function getCourierImage(code: string | null | undefined){
  switch (code) {
    case 'jne':
      return '/images/jne.png'
      break;
    case 'pos':
      return '/images/pos.png'
      break;
    case 'tiki':
      return '/images/tiki.png'
      break;
  
    default:
      break;
  }
}