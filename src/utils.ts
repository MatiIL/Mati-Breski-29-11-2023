export const handleApiResponse = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json(); 
    return data;
    
  } catch (error) {
    console.error("Error fetching location autocomplete:", error);
    throw error;
  }
};

export const convertToCelsius = (val: number): number => {
  const celsiusValue = (val - 32) * (5/9);
  return Math.round(celsiusValue);
};

export const getDayAbbreviation = (timestamp: number): string => {
  const date = new Date(timestamp);
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  const abbreviatedDay = dayOfWeek.slice(0, 3);
  return abbreviatedDay;
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout;
  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};