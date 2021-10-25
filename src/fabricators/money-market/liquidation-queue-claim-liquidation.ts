import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateAddress } from '../../utils/validation/address';
import { validateInput } from '../../utils/validate-input';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string;
  collateral_token: string;
  bids_idx: string[] | undefined;
}

export const fabricateLiquidationQueueClaimLiquidation =
  ({ address, bids_idx, collateral_token }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);

    const mmContractAddress = addressProvider.liquidationQueue();

    return [
      new MsgExecuteContract(address, mmContractAddress, {
        claim_liquidation: {
          collateral_token: collateral_token,
          bids_idx: bids_idx,
        },
      }),
    ];
  };
