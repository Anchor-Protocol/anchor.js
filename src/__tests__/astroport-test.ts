import { testFabricator } from '../utils/test-fabricators/test-fabricator';
import {
  fabricateAstroportProvideLiquidityANC,
  fabricateAstroportProvideLiquiditybLuna,
  fabricateAstroportSwapANC,
  fabricateAstroportSwapbLuna,
  fabricateAstroportSwapLuna,
  fabricateAstroportSwapUSTANC,
  fabricateAstroportWithdrawLiquidityANC,
  fabricateAstroportWithdrawLiquiditybLuna,
} from '../fabricators';
import { addressProvider } from './common';
import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { createHookMsg } from '../utils/cw20/create-hook-msg';
import { MARKET_DENOMS } from '..';

/* eslint-disable */
describe('astroport<>anchor', () => {
  it('provide-liquidity-anc', async () => {
    testFabricator(
      expect,
      fabricateAstroportProvideLiquidityANC,
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
            spender: addressProvider.astroportAncUstPair(),
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
            expires: { never: {} },
          },
        }),
        new MsgExecuteContract(
          'address',
          addressProvider.astroportAncUstPair(),
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
      fabricateAstroportProvideLiquiditybLuna,
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
        new MsgExecuteContract('address', addressProvider.bLunaToken(), {
          increase_allowance: {
            spender: addressProvider.astroportbLunaLunaPair(),
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
            expires: { never: {} },
          },
        }),
        new MsgExecuteContract(
          'address',
          addressProvider.astroportbLunaLunaPair(),
          {
            provide_liquidity: {
              assets: [
                {
                  info: {
                    token: {
                      contract_addr: addressProvider.bLunaToken(),
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
      fabricateAstroportSwapANC,
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
            contract: addressProvider.astroportAncUstPair(),
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
      fabricateAstroportSwapbLuna,
      {
        address: 'address',
        amount: '1000',
        to: 'recipient',
        belief_price: '10',
        max_spread: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bLunaToken(), {
          send: {
            contract: addressProvider.astroportbLunaLunaPair(),
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
      fabricateAstroportSwapLuna,
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
          addressProvider.astroportbLunaLunaPair(),
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
      fabricateAstroportSwapUSTANC,
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
          addressProvider.astroportAncUstPair(),
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
      fabricateAstroportWithdrawLiquidityANC,
      {
        address: 'address',
        amount: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract(
          'address',
          addressProvider.astroportAncUstLPToken(),
          {
            send: {
              contract: addressProvider.astroportAncUstPair(),
              amount: new Int(new Dec('1000').mul(1000000)).toString(),
              msg: createHookMsg({
                withdraw_liquidity: {},
              }),
            },
          },
        ),
      ],
    );
  });

  it('withdraw-liquidity', async () => {
    testFabricator(
      expect,
      fabricateAstroportWithdrawLiquiditybLuna,
      {
        address: 'address',
        amount: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract(
          'address',
          addressProvider.astroportbLunaLunaLPToken(),
          {
            send: {
              contract: addressProvider.astroportbLunaLunaPair(),
              amount: new Int(new Dec('1000').mul(1000000)).toString(),
              msg: createHookMsg({
                withdraw_liquidity: {},
              }),
            },
          },
        ),
      ],
    );
  });
});
