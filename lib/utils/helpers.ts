import { LIMITS } from '@/constants';

// date.ts
export const formatDate = (date: Date | string | number): string => {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
};

export const relativeTime = (date: Date | string | number): string => {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const time = new Date(date).getTime();
  const now = Date.now();
  const diffInDays = Math.round((time - now) / (1000 * 60 * 60 * 24));
  
  if (Math.abs(diffInDays) < 1) {
    const diffInHours = Math.round((time - now) / (1000 * 60 * 60));
    if (Math.abs(diffInHours) < 1) {
      const diffInMinutes = Math.round((time - now) / (1000 * 60));
      return rtf.format(diffInMinutes, 'minute');
    }
    return rtf.format(diffInHours, 'hour');
  }
  return rtf.format(diffInDays, 'day');
};

// currency.ts
export const formatCurrency = (amount: number, currencyCode = 'INR'): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(amount);
};

// text.ts
export const generateSlug = (text: string): string => {
  return text
    .toString()
    .normalize('NFD') // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, '-') // separator
    .replace(/-+/g, '-') // remove duplicate separators
    .substring(0, LIMITS.MAX_SLUG_LENGTH);
};

export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
};

// object.ts
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const deepMerge = <T extends Record<string, unknown>, U extends Record<string, unknown>>(target: T, source: U): T & U => {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target))
          Object.assign(output, { [key]: source[key] });
        else
          (output as Record<string, unknown>)[key] = deepMerge(target[key] as Record<string, unknown>, source[key] as Record<string, unknown>);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output as T & U;
};

const isObject = (item: unknown): item is Record<string, unknown> => {
  return (item && typeof item === 'object' && !Array.isArray(item)) as boolean;
};

// id.ts
export const generateId = (length = 20): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// async.ts
export const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const retry = async <T>(fn: () => Promise<T>, retries = 3, delayMs = 1000): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    await delay(delayMs);
    return retry(fn, retries - 1, delayMs * 2);
  }
};
