import { ChangeEvent } from 'react';

export function formatDateInput(value: string): string {
  // Remove any non-numeric characters
  const numbers = value.replace(/\D/g, '');
  
  // Format as MM/DD
  if (numbers.length >= 2) {
    const month = numbers.substring(0, 2);
    const day = numbers.substring(2, 4);
    return `${month}${day ? `/${day}` : ''}`;
  }
  
  return numbers;
}

export function isValidDate(dateString: string): boolean {
  // Check format MM/DD
  if (!/^\d{2}\/\d{2}$/.test(dateString)) {
    return false;
  }

  const [month, day] = dateString.split('/').map(Number);
  
  // Check month range
  if (month < 1 || month > 12) {
    return false;
  }
  
  // Check day range based on month
  const daysInMonth = new Date(new Date().getFullYear(), month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    return false;
  }
  
  return true;
}

export function handleDateInput(
  e: ChangeEvent<HTMLInputElement>,
  setDate: (value: string) => void,
  setError?: (value: string | null) => void
) {
  const formattedDate = formatDateInput(e.target.value);
  setDate(formattedDate);
  
  if (setError) {
    if (formattedDate.length === 5 && !isValidDate(formattedDate)) {
      setError('Please enter a valid date (MM/DD)');
    } else {
      setError(null);
    }
  }
}