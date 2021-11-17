import { testFabricator } from '../utils/test-fabricators/test-fabricator';
import { addressProvider } from '../__tests__/common';
import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import {
  fabricateCustodyDepositCollateral,
  fabricateCustodyUpdateConfig,
  fabricateCustodyWithdrawCollateral,
  fabricateDistributionUpdateConfig,
  fabricateInterestUpdateConfig,
  fabricateLiquidationRetractBid,
  fabricateLiquidationSubmitBid,
  fabricateLiquidationUpdateConfig,
  fabricateMarketBorrow,
  fabricateMarketClaimRewards,
  fabricateMarketDepositStableCoin,
  fabricateMarketRedeemStable,
  fabricateMarketRepay,
  fabricateMarketUpdateConfig,
  fabricateOracleFeedPrice,
  fabricateOracleRegisterFeeder,
  fabricateOracleUpdateConfig,
  fabricateOverseerEpochOperations,
  fabricateOverseerLiquidateCollateral,
  fabricateOverseerLockCollateral,
  fabricateOverseerUnlockCollateral,
  fabricateOverseerUpdateConfig,
  fabricateOverseerUpdateWhitelist,
  fabricateOverseerWhitelist,
  fabricateProvideCollateral,
  fabricateRedeemCollateral,
  fabricateOverseerLockBETHCollateral,
  fabricateOverseerUnlockBETHCollateral,
  Pair,
  fabricateLiquidationQueueSubmitBid,
  fabricateLiquidationQueueRetractBid,
  fabricateLiquidationQueueActiveBids,
  fabricateLiquidationQueueClaimLiquidation,
} from '../fabricators';
import { COLLATERAL_DENOMS, MARKET_DENOMS } from '../address-provider';
import { createHookMsg } from '../utils/cw20/create-hook-msg';

/* eslint-disable */
describe('Money Market', () => {
  describe('Overseer', () => {
    it('update-config', async () => {
      testFabricator(
        expect,
        fabricateOverseerUpdateConfig,
        {
          address: 'address',
          overseer: MARKET_DENOMS.UUSD,
          owner_addr: 'owner',
          oracle_contract: 'oracle',
          liquidation_contract: 'liquidation',
          threshold_deposit_rate: '1.0',
          target_deposit_rate: '1.0',
          buffer_distribution_factor: '1.0',
          anc_purchase_factor: '0.00001',
          epoch_period: 124,
          price_timeframe: 60,
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.overseer(), {
            update_config: {
              owner_addr: 'owner',
              oracle_contract: 'oracle',
              liquidation_contract: 'liquidation',
              threshold_deposit_rate: '1.0',
              target_deposit_rate: '1.0',
              buffer_distribution_factor: '1.0',
              anc_purchase_factor: '0.00001',
              epoch_period: 124,
              price_timeframe: 60,
            },
          }),
        ],
      );
    });

    it('execute-epoch-operations', async () => {
      testFabricator(
        expect,
        fabricateOverseerEpochOperations,
        {
          address: 'address',
          overseer: MARKET_DENOMS.UUSD,
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.overseer(), {
            execute_epoch_operations: {},
          }),
        ],
      );
    });

    it('liquidate-collateral', async () => {
      testFabricator(
        expect,
        fabricateOverseerLiquidateCollateral,
        {
          address: 'address',
          overseer: MARKET_DENOMS.UUSD,
          borrower: 'borrower',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.overseer(), {
            liquidate_collateral: {
              borrower: 'borrower',
            },
          }),
        ],
      );
    });

    it('lock-collateral', async () => {
      testFabricator(
        expect,
        fabricateOverseerLockCollateral,
        {
          address: 'address',
          market: MARKET_DENOMS.UUSD,
          amount: '1000',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.overseer(), {
            lock_collateral: {
              collaterals: [
                [
                  addressProvider.bLunaToken(),
                  new Int(new Dec('1000').mul(1000000)).toString(),
                ],
              ],
            },
          }),
        ],
      );
    });

    it('unlock-collateral', async () => {
      testFabricator(
        expect,
        fabricateOverseerUnlockCollateral,
        {
          address: 'address',
          market: MARKET_DENOMS.UUSD,
          amount: '1000',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.overseer(), {
            unlock_collateral: {
              collaterals: [
                [
                  addressProvider.bLunaToken(),
                  new Int(new Dec('1000').mul(1000000)).toString(),
                ],
              ],
            },
          }),
        ],
      );
    });

    it('lock-beth-collateral', async () => {
      testFabricator(
        expect,
        fabricateOverseerLockBETHCollateral,
        {
          address: 'address',
          market: MARKET_DENOMS.UUSD,
          amount: '1000',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.overseer(), {
            lock_collateral: {
              collaterals: [
                [
                  addressProvider.bEthToken(),
                  new Int(new Dec('1000').mul(1000000)).toString(),
                ],
              ],
            },
          }),
        ],
      );
    });

    it('unlock-beth-collateral', async () => {
      testFabricator(
        expect,
        fabricateOverseerUnlockBETHCollateral,
        {
          address: 'address',
          market: MARKET_DENOMS.UUSD,
          amount: '1000',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.overseer(), {
            unlock_collateral: {
              collaterals: [
                [
                  addressProvider.bEthToken(),
                  new Int(new Dec('1000').mul(1000000)).toString(),
                ],
              ],
            },
          }),
        ],
      );
    });

    it('whitelist', async () => {
      testFabricator(
        expect,
        fabricateOverseerWhitelist,
        {
          address: 'address',
          overseer: MARKET_DENOMS.UUSD,
          name: 'bAsset',
          symbol: 'BASSET',
          collateral_token: 'collateral',
          custody_contract: 'custody',
          max_ltv: '0.1',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.overseer(), {
            whitelist: {
              name: 'bAsset',
              symbol: 'BASSET',
              collateral_token: 'collateral',
              custody_contract: 'custody',
              max_ltv: '0.1',
            },
          }),
        ],
      );
    });

    it('update-whitelist', async () => {
      testFabricator(
        expect,
        fabricateOverseerUpdateWhitelist,
        {
          address: 'address',
          overseer: MARKET_DENOMS.UUSD,
          collateral_token: 'collateral',
          custody_contract: 'custody',
          max_ltv: '0.1',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.overseer(), {
            update_whitelist: {
              collateral_token: 'collateral',
              custody_contract: 'custody',
              max_ltv: '0.1',
            },
          }),
        ],
      );
    });
  });

  describe('Market', () => {
    it('borrow-stable', async () => {
      testFabricator(
        expect,
        fabricateMarketBorrow,
        {
          address: 'address',
          market: MARKET_DENOMS.UUSD,
          amount: '1000',
          to: 'to',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.market(), {
            borrow_stable: {
              borrow_amount: new Int(new Dec('1000').mul(1000000)).toString(),
              to: 'to',
            },
          }),
        ],
      );
    });

    it('claim-rewards', async () => {
      testFabricator(
        expect,
        fabricateMarketClaimRewards,
        {
          address: 'address',
          market: MARKET_DENOMS.UUSD,
          to: undefined,
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.market(), {
            claim_rewards: {
              to: undefined,
            },
          }),
        ],
      );
    });

    it('deposit-stable', async () => {
      testFabricator(
        expect,
        fabricateMarketDepositStableCoin,
        {
          address: 'address',
          market: MARKET_DENOMS.UUSD,
          amount: '1000',
        },
        addressProvider,
        [
          new MsgExecuteContract(
            'address',
            addressProvider.market(),
            {
              deposit_stable: {},
            },
            { uusd: new Int(new Dec('1000').mul(1000000)).toString() },
          ),
        ],
      );
    });

    it('redeem-stable', async () => {
      testFabricator(
        expect,
        fabricateMarketRedeemStable,
        {
          address: 'address',
          market: MARKET_DENOMS.UUSD,
          amount: '1000',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.aTerra(), {
            send: {
              contract: addressProvider.market(),
              amount: new Int(new Dec('1000').mul(1000000)).toString(),
              msg: createHookMsg({
                redeem_stable: {},
              }),
            },
          }),
        ],
      );
    });

    it('repay-stable', async () => {
      testFabricator(
        expect,
        fabricateMarketRepay,
        {
          address: 'address',
          market: MARKET_DENOMS.UUSD,
          amount: '1000',
        },
        addressProvider,
        [
          new MsgExecuteContract(
            'address',
            addressProvider.market(),
            {
              repay_stable: {},
            },
            { uusd: new Int(new Dec('1000').mul(1000000)).toString() },
          ),
        ],
      );
    });

    it('update-config', async () => {
      testFabricator(
        expect,
        fabricateMarketUpdateConfig,
        {
          address: 'address',
          market: MARKET_DENOMS.UUSD,
          owner_addr: 'owner',
          interest_model: 'interest',
          distribution_model: 'distribution',
          reserve_factor: '10',
          max_borrow_factor: '10',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.market(), {
            update_config: {
              owner_addr: 'owner',
              interest_model: 'interest',
              distribution_model: 'distribution',
              reserve_factor: '10',
              max_borrow_factor: '10',
            },
          }),
        ],
      );
    });
  });
  describe('custody-bluna', () => {
    it('deposit-collateral', async () => {
      testFabricator(
        expect,
        fabricateCustodyDepositCollateral,
        {
          address: 'address',
          market: MARKET_DENOMS.UUSD,
          collateral: COLLATERAL_DENOMS.UBLUNA,
          amount: '1000',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.bLunaToken(), {
            send: {
              contract: addressProvider.custody(
                MARKET_DENOMS.UUSD,
                COLLATERAL_DENOMS.UBLUNA,
              ),
              amount: new Int(new Dec('1000').mul(1000000)).toString(),
              msg: createHookMsg({
                deposit_collateral: {},
              }),
            },
          }),
        ],
      );
    });

    it('withdraw-collateral', async () => {
      testFabricator(
        expect,
        fabricateCustodyWithdrawCollateral,
        {
          address: 'address',
          market: MARKET_DENOMS.UUSD,
          collateral: COLLATERAL_DENOMS.UBLUNA,
          amount: '1000',
        },
        addressProvider,
        [
          new MsgExecuteContract(
            'address',
            addressProvider.custody(
              MARKET_DENOMS.UUSD,
              COLLATERAL_DENOMS.UBLUNA,
            ),
            {
              withdraw_collateral: {
                amount: new Int(new Dec('1000').mul(1000000)).toString(),
              },
            },
          ),
        ],
      );
    });

    it('update-config', async () => {
      testFabricator(
        expect,
        fabricateCustodyUpdateConfig,
        {
          address: 'address',
          owner: 'new-owner',
          market: MARKET_DENOMS.UUSD,
          collateral: COLLATERAL_DENOMS.UBLUNA,
          liquidation_contract: 'liquidation',
        },
        addressProvider,
        [
          new MsgExecuteContract(
            'address',
            addressProvider.custody(
              MARKET_DENOMS.UUSD,
              COLLATERAL_DENOMS.UBLUNA,
            ),
            {
              update_config: {
                owner: 'new-owner',
                liquidation_contract: 'liquidation',
              },
            },
          ),
        ],
      );
    });
  });

  describe('custody-beth', () => {
    it('deposit-collateral', async () => {
      testFabricator(
        expect,
        fabricateCustodyDepositCollateral,
        {
          address: 'address',
          market: MARKET_DENOMS.UUSD,
          collateral: COLLATERAL_DENOMS.UBETH,
          amount: '1000',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.bEthToken(), {
            send: {
              contract: addressProvider.custody(
                MARKET_DENOMS.UUSD,
                COLLATERAL_DENOMS.UBETH,
              ),
              amount: new Int(new Dec('1000').mul(1000000)).toString(),
              msg: createHookMsg({
                deposit_collateral: {},
              }),
            },
          }),
        ],
      );
    });

    it('withdraw-collateral', async () => {
      testFabricator(
        expect,
        fabricateCustodyWithdrawCollateral,
        {
          address: 'address',
          market: MARKET_DENOMS.UUSD,
          collateral: COLLATERAL_DENOMS.UBETH,
          amount: '1000',
        },
        addressProvider,
        [
          new MsgExecuteContract(
            'address',
            addressProvider.custody(
              MARKET_DENOMS.UUSD,
              COLLATERAL_DENOMS.UBETH,
            ),
            {
              withdraw_collateral: {
                amount: new Int(new Dec('1000').mul(1000000)).toString(),
              },
            },
          ),
        ],
      );
    });

    it('update-config', async () => {
      testFabricator(
        expect,
        fabricateCustodyUpdateConfig,
        {
          address: 'address',
          owner: 'new-owner',
          market: MARKET_DENOMS.UUSD,
          collateral: COLLATERAL_DENOMS.UBETH,
          liquidation_contract: 'liquidation',
        },
        addressProvider,
        [
          new MsgExecuteContract(
            'address',
            addressProvider.custody(
              MARKET_DENOMS.UUSD,
              COLLATERAL_DENOMS.UBETH,
            ),
            {
              update_config: {
                owner: 'new-owner',
                liquidation_contract: 'liquidation',
              },
            },
          ),
        ],
      );
    });
  });

  describe('interest-model', () => {
    it('update-config', async () => {
      testFabricator(
        expect,
        fabricateInterestUpdateConfig,
        {
          address: 'address',
          owner: 'new-owner',
          base_rate: '0.1000',
          interest_multiplier: '0.5555',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.interest(), {
            update_config: {
              owner: 'new-owner',
              base_rate: '0.1000',
              interest_multiplier: '0.5555',
            },
          }),
        ],
      );
    });
  });

  describe('distribution-model', () => {
    it('update-config', async () => {
      testFabricator(
        expect,
        fabricateDistributionUpdateConfig,
        {
          address: 'address',
          owner: 'new-owner',
          emission_cap: '1000.1',
          emission_floor: '1000.1',
          increment_multiplier: '100.566',
          decrement_multiplier: '10.1',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.interest(), {
            update_config: {
              owner: 'new-owner',
              emission_cap: '1000.1',
              emission_floor: '1000.1',
              increment_multiplier: '100.566',
              decrement_multiplier: '10.1',
            },
          }),
        ],
      );
    });
  });

  describe('oracle', () => {
    it('update-config', async () => {
      testFabricator(
        expect,
        fabricateOracleUpdateConfig,
        {
          address: 'address',
          owner: 'new-owner',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.oracle(), {
            update_config: {
              owner: 'new-owner',
            },
          }),
        ],
      );
    });

    it('register-feeder', async () => {
      testFabricator(
        expect,
        fabricateOracleRegisterFeeder,
        {
          address: 'address',
          asset: 'bAsset',
          feeder: 'feeder',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.oracle(), {
            register_feeder: {
              asset: 'bAsset',
              feeder: 'feeder',
            },
          }),
        ],
      );
    });

    it('feed-price', async () => {
      const pair: Pair = ['bLuna', '10.3'];
      testFabricator(
        expect,
        fabricateOracleFeedPrice,
        {
          address: 'address',
          prices: [pair],
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.oracle(), {
            feed_price: {
              prices: [['bLuna', '10.3']],
            },
          }),
        ],
      );
    });
  });

  describe('liquidation', () => {
    it('submit-bid', async () => {
      testFabricator(
        expect,
        fabricateLiquidationSubmitBid,
        {
          address: 'address',
          collateral_token: addressProvider.bLunaToken(),
          premium_rate: '0.3',
          denom: MARKET_DENOMS.UUSD,
          amount: '1000',
        },
        addressProvider,
        [
          new MsgExecuteContract(
            'address',
            addressProvider.liquidation(),
            {
              submit_bid: {
                collateral_token: addressProvider.bLunaToken(),
                premium_rate: '0.3',
              },
            },
            { uusd: new Int(new Dec('1000').mul(1000000)).toString() },
          ),
        ],
      );
    });

    it('retract-bid', async () => {
      testFabricator(
        expect,
        fabricateLiquidationRetractBid,
        {
          address: 'address',
          collateral_token: addressProvider.bLunaToken(),
          amount: '1000',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.liquidation(), {
            retract_bid: {
              collateral_token: addressProvider.bLunaToken(),
              amount: new Int(new Dec('1000').mul(1000000)).toString(),
            },
          }),
        ],
      );
    });

    it('update-config', async () => {
      testFabricator(
        expect,
        fabricateLiquidationUpdateConfig,
        {
          address: 'address',
          owner: 'owner',
          oracle_contract: 'oracle_contract',
          stable_denom: 'stable_denom',
          safe_ratio: 'safe_ratio',
          bid_fee: '0.1',
          max_premium_rate: '0.1',
          liquidation_threshold: '01',
          price_timeframe: 60,
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.liquidation(), {
            update_config: {
              owner: 'owner',
              oracle_contract: 'oracle_contract',
              stable_denom: 'stable_denom',
              safe_ratio: 'safe_ratio',
              bid_fee: '0.1',
              max_premium_rate: '0.1',
              liquidation_threshold: '01',
              price_timeframe: 60,
            },
          }),
        ],
      );
    });
  });

  describe('liquidation-queue', () => {
    it('submit-bid', async () => {
      testFabricator(
        expect,
        fabricateLiquidationQueueSubmitBid,
        {
          address: 'address',
          collateral_token: addressProvider.bLunaToken(),
          premium_slot: 3,
          amount: '1000',
          denom: MARKET_DENOMS.UUSD,
        },
        addressProvider,
        [
          new MsgExecuteContract(
            'address',
            addressProvider.liquidationQueue(),
            {
              submit_bid: {
                collateral_token: addressProvider.bLunaToken(),
                premium_slot: 3,
              },
            },
            { uusd: new Int(new Dec('1000').mul(1000000)).toString() },
          ),
        ],
      );
    });

    it('retract-bid', async () => {
      testFabricator(
        expect,
        fabricateLiquidationQueueRetractBid,
        {
          address: 'address',
          bid_idx: '10',
          amount: '1000',
        },
        addressProvider,
        [
          new MsgExecuteContract(
            'address',
            addressProvider.liquidationQueue(),
            {
              retract_bid: {
                bid_idx: '10',
                amount: new Int(new Dec('1000').mul(1000000)).toString(),
              },
            },
          ),
        ],
      );
    });

    it('active-bids', async () => {
      testFabricator(
        expect,
        fabricateLiquidationQueueActiveBids,
        {
          address: 'address',
          bids_idx: undefined,
          collateral_token: addressProvider.bLunaToken(),
        },
        addressProvider,
        [
          new MsgExecuteContract(
            'address',
            addressProvider.liquidationQueue(),
            {
              active_bids: {
                bids_idx: undefined,
                collateral_token: addressProvider.bLunaToken(),
              },
            },
          ),
        ],
      );
    });

    it('active-bids', async () => {
      testFabricator(
        expect,
        fabricateLiquidationQueueClaimLiquidation,
        {
          address: 'address',
          bids_idx: undefined,
          collateral_token: addressProvider.bLunaToken(),
        },
        addressProvider,
        [
          new MsgExecuteContract(
            'address',
            addressProvider.liquidationQueue(),
            {
              claim_liquidation: {
                bids_idx: undefined,
                collateral_token: addressProvider.bLunaToken(),
              },
            },
          ),
        ],
      );
    });
  });

  it('provide-liquidity', async () => {
    testFabricator(
      expect,
      fabricateProvideCollateral,
      {
        address: 'address',
        collateral: COLLATERAL_DENOMS.UBLUNA,
        market: MARKET_DENOMS.UUSD,
        amount: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bLunaToken(), {
          send: {
            contract: addressProvider.custody(
              MARKET_DENOMS.UUSD,
              COLLATERAL_DENOMS.UBLUNA,
            ),
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
            msg: createHookMsg({
              deposit_collateral: {},
            }),
          },
        }),
        new MsgExecuteContract('address', addressProvider.overseer(), {
          lock_collateral: {
            collaterals: [
              [
                addressProvider.bLunaToken(),
                new Int(new Dec('1000').mul(1000000)).toString(),
              ],
            ],
          },
        }),
      ],
    );
  });

  it('redeem-collateral', async () => {
    testFabricator(
      expect,
      fabricateRedeemCollateral,
      {
        address: 'address',
        collateral: COLLATERAL_DENOMS.UBLUNA,
        market: MARKET_DENOMS.UUSD,
        amount: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.overseer(), {
          unlock_collateral: {
            collaterals: [
              [
                addressProvider.bLunaToken(),
                new Int(new Dec('1000').mul(1000000)).toString(),
              ],
            ],
          },
        }),
        new MsgExecuteContract(
          'address',
          addressProvider.custody(MARKET_DENOMS.UUSD, COLLATERAL_DENOMS.UBLUNA),
          {
            withdraw_collateral: {
              amount: new Int(new Dec('1000').mul(1000000)).toString(),
            },
          },
        ),
      ],
    );
  });
});
