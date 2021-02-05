import { InputEntry } from '../validate-input';
// @ts-ignore
import bassetConstants from '../../constants/basset.json';

export const validateWhitelistedBAsset = (symbol: string): InputEntry => [
  () => bassetConstants.bluna && symbol.toLocaleLowerCase() === 'bluna',
  `unknown bAsset symbol ${symbol}.`,
];
