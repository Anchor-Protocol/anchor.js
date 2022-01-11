import { testFabricator } from '../utils/test-fabricators/test-fabricator';
import {
  fabricatebLunaBond,
  fabricatebLunaCheckSlashing,
  fabricatebLunaUnbond,
  fabricatebLunaUpdateConfig,
  fabricatebLunaUpdateGlobalIndex,
  fabricatebLunaUpdateParams,
  fabricatebLunaWithdrawUnbonded,
  fabricatebLunaRegisterValidator,
  fabricatebLunaDeregisterValidator,
} from '../fabricators';
import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { createHookMsg } from '../utils/cw20/create-hook-msg';
import { addressProvider, bLUNA } from '../__tests__/common';

/* eslint-disable */
describe('bLuna', () => {
  it('bond', async () => {
    testFabricator(
      expect,
      fabricatebLunaBond,
      {
        address: 'address',
        amount: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract(
          'address',
          addressProvider.bLunaHub(),
          {
            bond: {},
          },
          { uluna: new Int(new Dec('1000').mul(1000000)).toString() },
        ),
      ],
    );
  });

  it('update-global-index', async () => {
    testFabricator(
      expect,
      fabricatebLunaUpdateGlobalIndex,
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
      fabricatebLunaWithdrawUnbonded,
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
      fabricatebLunaRegisterValidator,
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
      fabricatebLunaDeregisterValidator,
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
      fabricatebLunaCheckSlashing,
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
      fabricatebLunaUpdateParams,
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
      fabricatebLunaUpdateConfig,
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
      fabricatebLunaUnbond,
      {
        address: 'address',
        amount: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', bLUNA.token(), {
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
});
