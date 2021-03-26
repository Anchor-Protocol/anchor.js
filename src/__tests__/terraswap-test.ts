import { testFabricator } from '../utils/test-fabricators/test-fabricator';
import {
  fabricateTerraswapProvideLiquidityANC,
  fabricateTerraswapProvideLiquiditybLuna,
  fabricateTerraswapSwapANC,
  fabricateTerraswapSwapbLuna,
  fabricateTerraswapSwapLuna,
  fabricateTerraswapSwapUSTANC,
  fabricateTerraswapWithdrawLiquidityANC,
  fabricateTerraswapWithdrawLiquiditybLuna,
} from '../fabricators';
import { addressProvider } from '../__tests__/common';
import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { createHookMsg } from '../utils/cw20/create-hook-msg';
import { MARKET_DENOMS } from '..';

/* eslint-disable */
describe('terraswap<>anchor', () => {
  it('provide-liquidity-anc', async () => {
    testFabricator(
      expect,
      fabricateTerraswapProvideLiquidityANC,
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
            spender: addressProvider.terraswapAncUstPair(),
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
            expires: { never: {} },
          },
        }),
        new MsgExecuteContract(
          'address',
          addressProvider.terraswapAncUstPair(),
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
      fabricateTerraswapProvideLiquiditybLuna,
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
            spender: addressProvider.terraswapblunaLunaPair(),
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
            expires: { never: {} },
          },
        }),
        new MsgExecuteContract(
          'address',
          addressProvider.terraswapblunaLunaPair(),
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
      fabricateTerraswapSwapANC,
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
            contract: addressProvider.terraswapAncUstPair(),
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
      fabricateTerraswapSwapbLuna,
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
            contract: addressProvider.terraswapblunaLunaPair(),
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
      fabricateTerraswapSwapLuna,
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
          addressProvider.terraswapblunaLunaPair(),
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
      fabricateTerraswapSwapUSTANC,
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
          addressProvider.terraswapAncUstPair(),
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
      fabricateTerraswapWithdrawLiquidityANC,
      {
        address: 'address',
        amount: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract(
          'address',
          addressProvider.terraswapAncUstLPToken(),
          {
            send: {
              contract: addressProvider.terraswapAncUstPair(),
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
      fabricateTerraswapWithdrawLiquiditybLuna,
      {
        address: 'address',
        amount: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract(
          'address',
          addressProvider.terraswapblunaLunaLPToken(),
          {
            send: {
              contract: addressProvider.terraswapblunaLunaPair(),
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
