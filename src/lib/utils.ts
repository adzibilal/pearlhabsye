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

export function generateRandomNumber(digits: number) {
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * max).toString().padStart(digits, '0');
}

export function generateTransactionID() {
  const now = new Date();
  const YY = now.getFullYear().toString().slice(-2);
  const MM = (now.getMonth() + 1).toString().padStart(2, '0');
  const DD = now.getDate().toString().padStart(2, '0');
  const HH = now.getHours().toString().padStart(2, '0');
  const mm = now.getMinutes().toString().padStart(2, '0');
  const SS = now.getSeconds().toString().padStart(2, '0');
  const random = generateRandomNumber(4);
  return `${YY}${MM}${DD}${HH}${mm}${SS}${random}`;
}