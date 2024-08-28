export interface Character {
  name: string;
  alias?: string;
  gender: string[];
  species: string[];
  birth_year: string[] | number[];
  house: string[];
  atributes: string[];
  filiations: string[];
  first_appearance: string[];
  alive: boolean;
  wand: string[];
  img: string;
}
