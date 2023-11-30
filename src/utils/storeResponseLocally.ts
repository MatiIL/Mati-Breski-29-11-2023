export const storeResponseLocally = (apiResponse: string, data: any) => {
    try {
      // Convert the data to a JSON string and save it to localStorage
      localStorage.setItem(apiResponse, JSON.stringify(data));
      console.log('API response saved locally:', data);
    } catch (error) {
      console.error('Error saving API response locally:', error);
    }
  }