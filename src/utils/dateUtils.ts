function pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
  
  export function formatDateTimeForForm(dateValue: any): string | null {
    if (!dateValue) return null;
    const date = new Date(dateValue);
  
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
  
    return `${year}-${month}-${day}`;
  }
  
  export function formatDateToCreate(dateValue: string | null | undefined): string | null {
    if (!dateValue) return null;
    const date = new Date(dateValue);
  
    const day = date.getDate();
    const month = (date.getMonth() + 1);
    const year = date.getFullYear();
  
    return `${day}-${month}-${year}`;
  }