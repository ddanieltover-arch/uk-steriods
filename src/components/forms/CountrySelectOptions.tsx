import React from 'react';
import { EUROPEAN_COUNTRIES, OTHER_COUNTRIES, formatCountryLabel } from '../../data/countries';

export const CountrySelectOptions: React.FC = () => (
  <>
    <optgroup label="Europe">
      {EUROPEAN_COUNTRIES.map((c) => (
        <option key={c.code} value={c.code}>
          {formatCountryLabel(c)}
        </option>
      ))}
    </optgroup>
    <optgroup label="Rest of world">
      {OTHER_COUNTRIES.map((c) => (
        <option key={c.code} value={c.code}>
          {formatCountryLabel(c)}
        </option>
      ))}
    </optgroup>
  </>
);
