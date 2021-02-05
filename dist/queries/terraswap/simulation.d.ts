import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    contractAddr: string;
    amount: string;
}
interface SimulationResponse {
    return_amount: string;
    spread_amount: string;
    commission_amount: string;
}
export declare const querySimulation: ({ lcd, contractAddr, amount, }: Option) => (addressProvider: AddressProvider) => Promise<SimulationResponse>;
export {};
