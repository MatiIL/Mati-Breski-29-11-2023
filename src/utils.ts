export const storeResponseLocally = (itemName: string, data: any) => {
    try {
      localStorage.setItem(itemName, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving API response locally:', error);
    }
  }

export const handleApiResponse = async (url: string, itemName: string): Promise<any> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    if (process.env.NODE_ENV === "development") {
      storeResponseLocally(itemName, data);
    } else return data;
    
  } catch (error) {
    console.error("Error fetching location autocomplete:", error);
    throw error;
  }
};

export const getStoredResponse = (itemName: string): any | null => {
  try {
    const storedData = localStorage.getItem(itemName);
    if (storedData) {
      return JSON.parse(storedData);
    }
    return null;
  } catch (error) {
    console.error('Error retrieving stored data:', error);
    return null;
  }
};

export const convertToCelsius = (val: number): number => {
  const celsiusValue = (val - 32) * (5/9);
  return Math.round(celsiusValue);
}