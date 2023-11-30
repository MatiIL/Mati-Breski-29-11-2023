export const getStorage = (apiResponse: string): any | null => {
    try {
      const storedData = localStorage.getItem(apiResponse);
      if (storedData) {
        return JSON.parse(storedData);
      }
      return null;
    } catch (error) {
      console.error('Error retrieving stored data:', error);
      return null;
    }
  };
  