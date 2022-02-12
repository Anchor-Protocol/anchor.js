import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateAddress } from '../../utils/validation/address';
import { validateInput } from '../../utils/validate-input';
import { AddressProvider } from '../../address-provider/provider';
import { validateTrue } from '../../utils/validation/true';
import { MARKET_DENOMS } from '../../address-provider';

interface Option {
  address: string;
  market: MARKET_DENOMS;
  to?: string;
}

/**
 *
 * @param address Client’s Terra address.
 * @param market Type of stablecoin money market to borrow.
 * @param to (optional) Terra address to withdraw rewards. If null, withdraws to address
 */
export const fabricateMarketClaimRewards =
  ({ address, market, to }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      to ? validateAddress(to) : validateTrue,
    ]);

    const mmContractAddress = addressProvider.market(market);

    return [
      new MsgExecuteContract(address, mmContractAddress, {
        claim_rewards: {
          to: to,
        },
      }),
    ];
  };
