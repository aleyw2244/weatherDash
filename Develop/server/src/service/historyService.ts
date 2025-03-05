import * as fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid'
// TODO: Define a City class with name and id properties

class City {
  name: string;
  id: string;

  constructor(name:string, id:string) {
    this.name = name;
    this.id = id;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  private filePath: string = 'db/db.json';



  // TODO: Define a read method that reads from the searchHistory.json file

  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return data? JSON.parse(data): [];
    } catch (error) {
      console.error ("Error writing search history:", error);
      return []
    }
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}

  private async write(cities: City[]): Promise<void> {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(cities));
    } catch (error) {
      console.error ("Error writing search history:", error);
    }
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}

  async getCities(): Promise<City[]> {
    return await this.read();
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}

  async addCity(city:string): Promise <City |null> {
    if (!city) throw new Error('City input required')
    const cities = await this.getCities();

    const newCity = new City(city,uuidv4());
    cities.push(newCity);

    await this.write(cities)
    return newCity;
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}

  async removeCity(id:string): Promise <boolean> {
    const cities = await this.getCities();

    const updatedCities = cities.filter(city => city.id !==id);

    if (cities.length ===updatedCities.length) {
      return false
  }
    await this.write(updatedCities)
    return true
  }
}

export default new HistoryService();
