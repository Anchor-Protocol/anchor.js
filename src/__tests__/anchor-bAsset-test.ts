import { testFabricator } from '../utils/test-fabricators/test-fabricator';
import {
  fabricatebAssetBond,
  fabricatebAssetCheckSlashing,
  fabricatebAssetClaimRewards,
  fabricatebAssetDeregisterValidator,
  fabricatebAssetRegisterValidator,
  fabricatebAssetTransfer,
  fabricatebAssetUnbond,
  fabricatebAssetUpdateConfig,
  fabricatebAssetUpdateGlobalIndex,
  fabricatebAssetUpdateParams,
  fabricatebAssetWithdrawUnbonded,
  fabricatebAssetSend,
  fabricatebAssetIncreaseAllowance,
  Expire,
  fabricatebAssetDecreaseAllowance,
  fabricatebAssetBurn,
  fabricatebAssetTransferFrom,
  fabricatebAssetBurnFrom,
  fabricatebAssetSendFrom,
} from '../fabricators';
import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { createHookMsg } from '../utils/cw20/create-hook-msg';
import { addressProvider } from '../__tests__/common';

/* eslint-disable */
describe('bLuna', () => {
  it('bond ', async () => {
    testFabricator(
      expect,
      fabricatebAssetBond,
      {
        address: 'address',
        validator: 'validator',
        amount: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract(
          'address',
          addressProvider.bLunaHub(),
          {
            bond: { validator: 'validator' },
          },
          { uluna: new Int(new Dec('1000').mul(1000000)).toString() },
        ),
      ],
    );
  });

  it('update-global-index', async () => {
    testFabricator(
      expect,
      fabricatebAssetUpdateGlobalIndex,
      {
        address: 'address',
        airdrop_hooks: undefined,
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bLunaHub(), {
          update_global_index: { airdrop_hooks: undefined },
        }),
      ],
    );
  });

  it('withdraw_unbonded', async () => {
    testFabricator(
      expect,
      fabricatebAssetWithdrawUnbonded,
      {
        address: 'address',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bLunaHub(), {
          withdraw_unbonded: {},
        }),
      ],
    );
  });

  it('register-validator', async () => {
    testFabricator(
      expect,
      fabricatebAssetRegisterValidator,
      {
        address: 'address',
        validator: 'validator',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bLunaHub(), {
          register_validator: { validator: 'validator' },
        }),
      ],
    );
  });

  it('deregister-validator', async () => {
    testFabricator(
      expect,
      fabricatebAssetDeregisterValidator,
      {
        address: 'address',
        validator: 'validator',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bLunaHub(), {
          deregister_validator: { validator: 'validator' },
        }),
      ],
    );
  });

  it('check-slashing', async () => {
    testFabricator(
      expect,
      fabricatebAssetCheckSlashing,
      {
        address: 'address',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bLunaHub(), {
          check_slashing: {},
        }),
      ],
    );
  });

  it('update-params', async () => {
    testFabricator(
      expect,
      fabricatebAssetUpdateParams,
      {
        address: 'address',
        epoch_period: 111111,
        unbonding_period: 111111,
        peg_recovery_fee: '0.5',
        er_threshold: '1.0',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bLunaHub(), {
          update_params: {
            epoch_period: 111111,
            unbonding_period: 111111,
            peg_recovery_fee: '0.5',
            er_threshold: '1.0',
          },
        }),
      ],
    );
  });

  it('update-config', async () => {
    testFabricator(
      expect,
      fabricatebAssetUpdateConfig,
      {
        address: 'address',
        owner: 'new-owner',
        reward_contract: 'reward',
        token_contract: 'token',
        airdrop_registry_contract: 'airdrop',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bLunaHub(), {
          update_config: {
            owner: 'new-owner',
            reward_contract: 'reward',
            token_contract: 'token',
            airdrop_registry_contract: 'airdrop',
          },
        }),
      ],
    );
  });

  it('unbond', async () => {
    testFabricator(
      expect,
      fabricatebAssetUnbond,
      {
        address: 'address',
        amount: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bLunaToken(), {
          send: {
            contract: addressProvider.bLunaHub(),
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
            msg: createHookMsg({
              unbond: {},
            }),
          },
        }),
      ],
    );
  });

  it('claim-rewards', async () => {
    testFabricator(
      expect,
      fabricatebAssetClaimRewards,
      {
        address: 'address',
        recipient: undefined,
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bLunaReward(), {
          claim_rewards: { recipient: undefined },
        }),
      ],
    );
  });

  it('transfer', async () => {
    testFabricator(
      expect,
      fabricatebAssetTransfer,
      {
        address: 'address',
        amount: '1000',
        recipient: 'recipient',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bLunaToken(), {
          transfer: {
            recipient: 'recipient',
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
          },
        }),
      ],
    );
  });

  it('transfer-from', async () => {
    testFabricator(
      expect,
      fabricatebAssetTransferFrom,
      {
        address: 'address',
        owner: 'owner',
        amount: '1000',
        recipient: 'recipient',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bLunaToken(), {
          transfer_from: {
            owner: 'owner',
            recipient: 'recipient',
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
          },
        }),
      ],
    );
  });

  it('burn', async () => {
    testFabricator(
      expect,
      fabricatebAssetBurn,
      {
        address: 'address',
        amount: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bLunaToken(), {
          burn: {
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
          },
        }),
      ],
    );
  });

  it('burn-from', async () => {
    testFabricator(
      expect,
      fabricatebAssetBurnFrom,
      {
        address: 'address',
        owner: 'owner',
        amount: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bLunaToken(), {
          burn_from: {
            owner: 'owner',
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
          },
        }),
      ],
    );
  });

  it('send', async () => {
    testFabricator(
      expect,
      fabricatebAssetSend,
      {
        address: 'address',
        amount: '1000',
        contract: 'contract',
        msg: { msg: {} },
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bLunaToken(), {
          send: {
            contract: 'contract',
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
            msg: createHookMsg({ msg: {} }),
          },
        }),
      ],
    );
  });

  it('send-from', async () => {
    testFabricator(
      expect,
      fabricatebAssetSendFrom,
      {
        address: 'address',
        amount: '1000',
        owner: 'owner',
        contract: 'contract',
        msg: { msg: {} },
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bLunaToken(), {
          send_from: {
            owner: 'owner',
            contract: 'contract',
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
            msg: createHookMsg({ msg: {} }),
          },
        }),
      ],
    );
  });

  it('increase-allowance', async () => {
    testFabricator(
      expect,
      fabricatebAssetIncreaseAllowance,
      {
        address: 'address',
        amount: '1000',
        spender: 'spender',
        expires: { never: {} } as Expire,
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bLunaToken(), {
          increase_allowance: {
            spender: 'spender',
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
            expires: { never: {} },
          },
        }),
      ],
    );
  });

  it('decrease-allowance', async () => {
    testFabricator(
      expect,
      fabricatebAssetDecreaseAllowance,
      {
        address: 'address',
        amount: '1000',
        spender: 'spender',
        expires: { never: {} } as Expire,
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bLunaToken(), {
          decrease_allowance: {
            spender: 'spender',
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
            expires: { never: {} },
          },
        }),
      ],
    );
  });
});
