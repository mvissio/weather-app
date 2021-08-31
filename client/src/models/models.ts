export interface City {
  title: string;
  woeid: string;
}

export interface CityForecast {
  weatherStateIcon: string;
  weatherStatName: string;
  applicableDate: string;
  maxTemp: number;
  minTemp: number;
}
