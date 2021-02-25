import { Dec, Int, LCDClient } from '@terra-money/terra.js';
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

export const querySimulation = ({
  lcd,
  contractAddr,
  amount,
}: Option) => async (
  addressProvider: AddressProvider,
): Promise<SimulationResponse> => {
  const pairContractAddress = addressProvider.terraswapblunaLunaPair();
  let reponse: SimulationResponse = await lcd.wasm.contractQuery(
    pairContractAddress,
    {
      simulation: {
        offer_asset: {
          info: {
            ANC: {
              contract_addr: contractAddr,
            },
          },
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
        },
      },
    },
  );
  return reponse;
};
