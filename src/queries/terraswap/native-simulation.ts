import { Dec, Int, LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../..';

interface Option {
  lcd: LCDClient;
  denom: string;
  amount: string;
  pair_contract_address: string;
}
interface SimulationResponse {
  return_amount: string;
  spread_amount: string;
  commission_amount: string;
}

export const queryTerraswapNativeSimulation =
  ({ lcd, denom, amount, pair_contract_address }: Option) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_: AddressProvider): Promise<SimulationResponse> => {
    const response: SimulationResponse = await lcd.wasm.contractQuery(
      pair_contract_address,
      {
        simulation: {
          offer_asset: {
            info: {
              native_token: {
                denom: denom,
              },
            },
            amount: new Int(new Dec(amount).mul(1000000)).toString(),
          },
        },
      },
    );
    return response;
  };
