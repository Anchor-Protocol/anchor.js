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

export const queryReverseNativeSimulation = ({
  lcd,
  denom,
  amount,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<SimulationResponse> => {
  const pairContractAddress = addressProvider.blunaUlunaPair();
  let reponse: SimulationResponse = await lcd.wasm.contractQuery(
    pairContractAddress,
    {
      reverse_simulation: {
        ask_asset: {
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
