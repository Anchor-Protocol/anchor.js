import { Dec, Int, LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  lcd: LCDClient;
  denom: string;
  amount: string;
}
interface SimulationResponse {
  return_amount: string;
  spread_amount: string;
  commission_amount: string;
}

export const queryNativeSimulation = ({ lcd, denom, amount }: Option) => async (
  addressProvider: AddressProvider,
): Promise<SimulationResponse> => {
  const pairContractAddress = addressProvider.blunaUlunaPair();
  let reponse: SimulationResponse = await lcd.wasm.contractQuery(
    pairContractAddress,
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
  return reponse;
};
