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
}