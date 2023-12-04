interface WeatherData {
  id: string;
  name: string;
  weatherText: string;
  weatherIcon: number;
  temparature: number;
  timestamp?: number;
}

export default WeatherData;
