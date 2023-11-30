import { storeResponseLocally } from "../utils/storeResponseLocally";

const apiKey = process.env.REACT_APP_ACCU_KEY;

export async function autocompleteSearch(query: string): Promise<any> {
  const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${query}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (process.env.NODE_ENV === "development") {
      storeResponseLocally("autocompleteResponse", data);
    }
    
  } catch (error) {
    console.error("Error fetching location autocomplete:", error);
    throw error;
  }
}
