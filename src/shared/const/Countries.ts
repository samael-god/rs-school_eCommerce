export enum CountryType {
  Belarus = 'Belarus',
  Russia = 'Russia',
  Poland = 'Poland',
}

interface Country {
  name: CountryType;
  abbr: string;
  indexError: string;
  regularForIndex: RegExp;
}

type CountriesList = Country[];

export const countriesList: CountriesList = [
  {
    name: CountryType.Poland,
    abbr: 'PL',
    indexError: 'Index format 5 digits XY-ZZZ',
    regularForIndex: /^\d{2}-\d{3}$/,
  },
  {
    name: CountryType.Russia,
    abbr: 'RU',
    indexError: 'Index format 6 digits XXXYYY',
    regularForIndex: /^\d{6}$/,
  },
  {
    name: CountryType.Belarus,
    abbr: 'BY',
    indexError: 'Index format 6 digits XXXYYY',
    regularForIndex: /^\d{6}$/,
  },
];
