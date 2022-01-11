import { testFabricator } from '../utils/test-fabricators/test-fabricator';
import {
  fabricateExchangeProvideLiquidityANC,
  fabricateExchangeProvideLiquiditybLuna,
  fabricateExchangeSwapANC,
  fabricateExchangeSwapbLuna,
  fabricateExchangeSwapLuna,
  fabricateExchangeSwapUSTANC,
  fabricateExchangeWithdrawLiquidityANC,
  fabricateExchangeWithdrawLiquiditybLuna,
} from '../fabricators';
import { addressProvider, bLUNA } from './common';
import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { createHookMsg } from '../utils/cw20/create-hook-msg';
import { COLLATERAL_DENOMS, MARKET_DENOMS } from '..';

/* eslint-disable */
describe('exchange<>anchor', () => {
  it('provide-liquidity-anc', async () => {
    testFabricator(
      expect,
      fabricateExchangeProvideLiquidityANC,
      {
        address: 'address',
        slippage_tolerance: undefined,
        token_amount: '1000',
        native_amount: '1000',
        quote: 'uusd',
        expires: { never: {} },
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.ANC(), {
          increase_allowance: {
            spender: addressProvider.ancUstPair(),
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
            expires: { never: {} },
          },
        }),
        new MsgExecuteContract(
          'address',
          addressProvider.ancUstPair(),
          {
            provide_liquidity: {
              assets: [
                {
                  info: {
                    token: {
                      contract_addr: addressProvider.ANC(),
                    },
                  },
                  amount: new Int(new Dec('1000').mul(1000000)).toString(),
                },
                {
                  info: {
                    native_token: {
                      denom: MARKET_DENOMS.UUSD,
                    },
                  },
                  amount: new Int(new Dec('1000').mul(1000000)).toString(),
                },
              ],
              slippage_tolerance: undefined,
            },
          },
          { uusd: new Int(new Dec('1000').mul(1000000)).toString() },
        ),
      ],
    );
  });

  it('provide-liquidity-anc', async () => {
    testFabricator(
      expect,
      fabricateExchangeProvideLiquiditybLuna,
      {
        address: 'address',
        slippage_tolerance: undefined,
        token_amount: '1000',
        native_amount: '1000',
        quote: 'uluna',
        expires: { never: {} },
      },
      addressProvider,
      [
        new MsgExecuteContract('address', bLUNA.token(), {
          increase_allowance: {
            spender: addressProvider.bLunaLunaPair(),
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
            expires: { never: {} },
          },
        }),
        new MsgExecuteContract(
          'address',
          addressProvider.bLunaLunaPair(),
          {
            provide_liquidity: {
              assets: [
                {
                  info: {
                    token: {
                      contract_addr: bLUNA.token(),
                    },
                  },
                  amount: new Int(new Dec('1000').mul(1000000)).toString(),
                },
                {
                  info: {
                    native_token: {
                      denom: 'uluna',
                    },
                  },
                  amount: new Int(new Dec('1000').mul(1000000)).toString(),
                },
              ],
              slippage_tolerance: undefined,
            },
          },
          { uluna: new Int(new Dec('1000').mul(1000000)).toString() },
        ),
      ],
    );
  });

  it('swap-ANC', async () => {
    testFabricator(
      expect,
      fabricateExchangeSwapANC,
      {
        address: 'address',
        amount: '1000',
        to: 'recipient',
        belief_price: '10',
        max_spread: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.ANC(), {
          send: {
            contract: addressProvider.ancUstPair(),
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
            msg: createHookMsg({
              swap: {
                belief_price: '10',
                max_spread: '1000',
                to: 'recipient',
              },
            }),
          },
        }),
      ],
    );
  });

  it('swap-bluna', async () => {
    testFabricator(
      expect,
      fabricateExchangeSwapbLuna,
      {
        address: 'address',
        amount: '1000',
        to: 'recipient',
        belief_price: '10',
        max_spread: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', bLUNA.token(), {
          send: {
            contract: addressProvider.bLunaLunaPair(),
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
            msg: createHookMsg({
              swap: {
                belief_price: '10',
                max_spread: '1000',
                to: 'recipient',
              },
            }),
          },
        }),
      ],
    );
  });

  it('swap-luna', async () => {
    testFabricator(
      expect,
      fabricateExchangeSwapLuna,
      {
        address: 'address',
        amount: '1000',
        denom: 'uluna',
        to: 'recipient',
        belief_price: '10',
        max_spread: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract(
          'address',
          addressProvider.bLunaLunaPair(),
          {
            swap: {
              offer_asset: {
                info: {
                  native_token: {
                    denom: 'uluna',
                  },
                },
                amount: new Int(new Dec('1000').mul(1000000)).toString(),
              },
              belief_price: '10',
              max_spread: '1000',
              to: 'recipient',
            },
          },
          { uluna: new Int(new Dec('1000').mul(1000000)).toString() },
        ),
      ],
    );
  });

  it('swap-usd-ANC', async () => {
    testFabricator(
      expect,
      fabricateExchangeSwapUSTANC,
      {
        address: 'address',
        amount: '1000',
        denom: MARKET_DENOMS.UUSD,
        to: 'recipient',
        belief_price: '10',
        max_spread: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract(
          'address',
          addressProvider.ancUstPair(),
          {
            swap: {
              offer_asset: {
                info: {
                  native_token: {
                    denom: MARKET_DENOMS.UUSD,
                  },
                },
                amount: new Int(new Dec('1000').mul(1000000)).toString(),
              },
              belief_price: '10',
              max_spread: '1000',
              to: 'recipient',
            },
          },
          { uusd: new Int(new Dec('1000').mul(1000000)).toString() },
        ),
      ],
    );
  });

  it('withdraw-liquidity', async () => {
    testFabricator(
      expect,
      fabricateExchangeWithdrawLiquidityANC,
      {
        address: 'address',
        amount: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.ancUstLPToken(), {
          send: {
            contract: addressProvider.ancUstPair(),
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
            msg: createHookMsg({
              withdraw_liquidity: {},
            }),
          },
        }),
      ],
    );
  });

  it('withdraw-liquidity', async () => {
    testFabricator(
      expect,
      fabricateExchangeWithdrawLiquiditybLuna,
      {
        address: 'address',
        amount: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bLunaLunaLPToken(), {
          send: {
            contract: addressProvider.bLunaLunaPair(),
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
            msg: createHookMsg({
              withdraw_liquidity: {},
            }),
          },
        }),
      ],
    );
  });
});
