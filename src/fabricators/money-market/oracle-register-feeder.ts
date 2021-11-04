import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string;
  asset: string;
  feeder: string;
}

export const fabricateOracleRegisterFeeder =
  ({ address, asset, feeder }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address), validateAddress(feeder)]);

    const mmOracle = addressProvider.oracle();

    return [
      new MsgExecuteContract(address, mmOracle, {
        register_feeder: {
          asset: asset,
          feeder: feeder,
        },
      }),
    ];
  };
