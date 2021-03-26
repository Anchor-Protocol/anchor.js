import { AddressProvider } from '../../address-provider';

export class Liquidation {
  addressProvider!: AddressProvider;

  constructor(addressProvider: AddressProvider) {
    this.addressProvider = addressProvider;
  }
}
