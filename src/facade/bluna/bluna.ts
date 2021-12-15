import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider';
import {
  fabricatebLunaBond,
  fabricatebLunaUnbond,
  fabricatebLunaWithdrawUnbonded,
  fabricateTerraswapSwapbLuna,
  OmitAddress,
  OptionType,
} from '../../fabricators';
import { queryHubUnbond, UnbondResponse } from '../../queries';
import { Operation, OperationImpl } from '../operation';

export type BlunaMintOption = OptionType<typeof fabricatebLunaBond>;
export type BlunaBurnOption = OptionType<typeof fabricatebLunaUnbond>;
export type BlunaInstantBurnOption = OptionType<
  typeof fabricateTerraswapSwapbLuna
>;

export interface BlunaQueriesOption {
  address: string;
}

export class BLuna {
  private _lcd!: LCDClient;
  private _addressProvider!: AddressProvider;

  constructor(lcd: LCDClient, addressProvider: AddressProvider) {
    this._lcd = lcd;
    this._addressProvider = addressProvider;
  }

  mint(mintOption: OmitAddress<BlunaMintOption>): Operation {
    return new OperationImpl(
      fabricatebLunaBond,
      mintOption,
      this._addressProvider,
    );
  }

  burn(burnOption: OmitAddress<BlunaBurnOption>): Operation {
    return new OperationImpl(
      fabricatebLunaUnbond,
      burnOption,
      this._addressProvider,
    );
  }

  instantBurn(
    instantiateBurnOption: OmitAddress<BlunaInstantBurnOption>,
  ): Operation {
    return new OperationImpl(
      fabricateTerraswapSwapbLuna,
      instantiateBurnOption,
      this._addressProvider,
    );
  }

  withdraw(): Operation {
    return new OperationImpl(
      fabricatebLunaWithdrawUnbonded,
      {},
      this._addressProvider,
    );
  }

  async getUnbondRequests(
    getUnbondRequestsOption: BlunaQueriesOption,
  ): Promise<UnbondResponse> {
    return queryHubUnbond({ lcd: this._lcd, ...getUnbondRequestsOption })(
      this._addressProvider,
    );
  }
}
