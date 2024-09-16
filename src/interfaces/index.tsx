export interface Character {
  id: number;
  name: string;
  alternate_names: string[];
  species: string[];
  gender: string[];
  house: string[];
  birth_year: string[] | number[];
  estimate: boolean;
  ancestry: string[];
  magical_attributes: string[];
  eye_colour: string[];
  hair_colour: string[];
  wand: string[];
  affiliations: string[];
  patronus: string[];
  alive: boolean | string;
  first_appearance: [string, number];
  image: string;
}