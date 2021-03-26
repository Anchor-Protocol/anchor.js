import { LCDClient } from "@terra-money/terra.js";
import { AddressProvider } from "../../address-provider";

export class Gov {
  lcd!: LCDClient
  addressProvider!: AddressProvider

  constructor(lcd: LCDClient, addressProvider: AddressProvider) {
    this.lcd = lcd
    this.addressProvider = addressProvider
  }

  

  


}