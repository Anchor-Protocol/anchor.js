import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { testFabricator } from './../utils/test-fabricators/test-fabricator';
import {
  fabricateAirdropClaim,
  fabricateAirdropRegisterMerkleRoot,
  fabricateAirdropUpdateConfig,
  fabricateCollectorSweep,
  fabricateCollectorUpdateConfig,
  fabricateCommunitySpend,
  fabricateCommunityUpdateConfig,
  fabricateDistributorAddDistributor,
  fabricateDistributorRemoveDistributor,
  fabricateDistributorSpend,
  fabricateDistributorUpdateConfig,
  fabricateGovCastVote,
  fabricateGovCreatePoll,
  fabricateGovEndPoll,
  fabricateGovExecutePoll,
  fabricateGovExpirePoll,
  fabricateGovSnapshotPoll,
  fabricateGovStakeVoting,
  fabricateGovUpdateConfig,
  fabricateGovWithdrawVotingTokens,
  fabricateInvestorVestingClaim,
  fabricateInvestorVestingRegisterAccounts,
  fabricateInvestorVestingUpdateConfig,
  fabricateStakingBond,
  fabricateStakingUnbond,
  fabricateStakingWithdraw,
  fabricateTeamVestingClaim,
  fabricateTeamVestingRegisterAccounts,
  fabricateTeamVestingUpdateConfig,
  VoteOption,
} from '../fabricators';
import { createHookMsg } from '../utils/cw20/create-hook-msg';
import { addressProvider } from '../__tests__/common';
import { MARKET_DENOMS } from '..';

/* eslint-disable */
describe('Anchor Token', () => {
  describe('Airdrop', () => {
    it('claim', async () => {
      testFabricator(
        expect,
        fabricateAirdropClaim,
        {
          address: 'address',
          stage: 1,
          amount: '100000',
          proof: ['terra1', 'terra2'],
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.airdrop(), {
            claim: { stage: 1, amount: '100000', proof: ['terra1', 'terra2'] },
          }),
        ],
      );
    });

    it('register-merkel-root', async () => {
      testFabricator(
        expect,
        fabricateAirdropRegisterMerkleRoot,
        {
          address: 'address',
          merkle_root: 'root',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.airdrop(), {
            register_merkle_root: { merkle_root: 'root' },
          }),
        ],
      );
    });

    it('update-config', async () => {
      testFabricator(
        expect,
        fabricateAirdropUpdateConfig,
        {
          address: 'address',
          owner: 'new_owner',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.airdrop(), {
            update_config: { owner: 'new_owner' },
          }),
        ],
      );
    });
  });

  describe('collector', () => {
    it('sweep', async () => {
      testFabricator(
        expect,
        fabricateCollectorSweep,
        {
          address: 'address',
          denom: MARKET_DENOMS.UUSD,
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.collector(), {
            sweep: { denom: MARKET_DENOMS.UUSD },
          }),
        ],
      );
    });

    it('update-config', async () => {
      testFabricator(
        expect,
        fabricateCollectorUpdateConfig,
        {
          address: 'address',
          reward_factor: '2.0',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.collector(), {
            update_config: { reward_factor: '2.0' },
          }),
        ],
      );
    });
  });

  describe('community', () => {
    it('spend', async () => {
      testFabricator(
        expect,
        fabricateCommunitySpend,
        {
          address: 'address',
          recipient: 'recipient',
          amount: '10000',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.community(), {
            spend: {
              recipient: 'recipient',
              amount: new Int(new Dec('10000').mul(1000000)).toString(),
            },
          }),
        ],
      );
    });

    it('update-config', async () => {
      testFabricator(
        expect,
        fabricateCommunityUpdateConfig,
        {
          address: 'address',
          spend_limit: '10000',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.community(), {
            update_config: {
              spend_limit: '10000',
            },
          }),
        ],
      );
    });
  });

  describe('distributor', () => {
    it('spend ', async () => {
      testFabricator(
        expect,
        fabricateDistributorSpend,
        {
          address: 'address',
          recipient: 'recipient',
          amount: '10000',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.distributor(), {
            spend: {
              recipient: 'recipient',
              amount: new Int(new Dec('10000').mul(1000000)).toString(),
            },
          }),
        ],
      );
    });
    it('update-config', async () => {
      testFabricator(
        expect,
        fabricateDistributorUpdateConfig,
        {
          address: 'address',
          spend_limit: '10000',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.distributor(), {
            update_config: {
              spend_limit: '10000',
            },
          }),
        ],
      );
    });

    it('update-config', async () => {
      testFabricator(
        expect,
        fabricateDistributorUpdateConfig,
        {
          address: 'address',
          spend_limit: '10000',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.distributor(), {
            update_config: {
              spend_limit: '10000',
            },
          }),
        ],
      );
    });

    it('add-distributor', async () => {
      testFabricator(
        expect,
        fabricateDistributorAddDistributor,
        {
          address: 'address',
          distributor: 'distributor',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.distributor(), {
            add_distributor: {
              distributor: 'distributor',
            },
          }),
        ],
      );
    });

    it('remove-distributor', async () => {
      testFabricator(
        expect,
        fabricateDistributorRemoveDistributor,
        {
          address: 'address',
          distributor: 'distributor',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.distributor(), {
            remove_distributor: {
              distributor: 'distributor',
            },
          }),
        ],
      );
    });
  });
  describe('gov', () => {
    it('cast-vote', async () => {
      testFabricator(
        expect,
        fabricateGovCastVote,
        {
          address: 'address',
          poll_id: 1,
          vote: 'yes' as VoteOption,
          amount: '1000',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.gov(), {
            cast_vote: {
              poll_id: 1,
              vote: 'yes',
              amount: new Int(new Dec('1000').mul(1000000)).toString(),
            },
          }),
        ],
      );
    });

    it('create-poll', async () => {
      testFabricator(
        expect,
        fabricateGovCreatePoll,
        {
          address: 'address',
          amount: '1000',
          title: 'poll1',
          description: 'no description',
          link: 'www.poll1.com',
          execute_message: undefined,
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.ANC(), {
            send: {
              contract: addressProvider.gov(),
              amount: new Int(new Dec('1000').mul(1000000)).toString(),
              msg: createHookMsg({
                create_poll: {
                  title: 'poll1',
                  description: 'no description',
                  link: 'www.poll1.com',
                  execute_message: undefined,
                },
              }),
            },
          }),
        ],
      );
    });

    it('stake-voting-tokens', async () => {
      testFabricator(
        expect,
        fabricateGovStakeVoting,
        {
          address: 'address',
          amount: '1000',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.ANC(), {
            send: {
              contract: addressProvider.gov(),
              amount: new Int(new Dec('1000').mul(1000000)).toString(),
              msg: createHookMsg({
                stake_voting_tokens: {},
              }),
            },
          }),
        ],
      );
    });

    it('withdraw-voting-tokens', async () => {
      testFabricator(
        expect,
        fabricateGovWithdrawVotingTokens,
        {
          address: 'address',
          amount: '1000',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.gov(), {
            withdraw_voting_tokens: {
              amount: new Int(new Dec('1000').mul(1000000)).toString(),
            },
          }),
        ],
      );
    });

    it('end-poll', async () => {
      testFabricator(
        expect,
        fabricateGovEndPoll,
        {
          address: 'address',
          poll_id: 1,
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.gov(), {
            end_poll: {
              poll_id: 1,
            },
          }),
        ],
      );
    });

    it('execute-poll', async () => {
      testFabricator(
        expect,
        fabricateGovExecutePoll,
        {
          address: 'address',
          poll_id: 1,
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.gov(), {
            execute_poll: {
              poll_id: 1,
            },
          }),
        ],
      );
    });

    it('expire-poll', async () => {
      testFabricator(
        expect,
        fabricateGovExpirePoll,
        {
          address: 'address',
          poll_id: 1,
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.gov(), {
            expire_poll: {
              poll_id: 1,
            },
          }),
        ],
      );
    });

    it('snapshot-poll', async () => {
      testFabricator(
        expect,
        fabricateGovSnapshotPoll,
        {
          address: 'address',
          poll_id: 1,
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.gov(), {
            snapshot_poll: {
              poll_id: 1,
            },
          }),
        ],
      );
    });

    it('update-config', async () => {
      testFabricator(
        expect,
        fabricateGovUpdateConfig,
        {
          address: 'address',
          owner: 'a',
          quorum: '0.1',
          threshold: '0.2',
          voting_period: 123,
          timelock_period: 145,
          expiration_period: 145,
          proposal_deposit: '10000',
          snapshot_period: 1000,
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.gov(), {
            update_config: {
              owner: 'a',
              quorum: '0.1',
              threshold: '0.2',
              voting_period: 123,
              timelock_period: 145,
              expiration_period: 145,
              proposal_deposit: '10000',
              snapshot_period: 1000,
            },
          }),
        ],
      );
    });
  });

  describe('staking', () => {
    it('bond ', async () => {
      testFabricator(
        expect,
        fabricateStakingBond,
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
                contract: addressProvider.staking(),
                amount: new Int(new Dec('1000').mul(1000000)).toString(),
                msg: createHookMsg({
                  bond: {},
                }),
              },
            },
          ),
        ],
      );
    });

    it('unbond ', async () => {
      testFabricator(
        expect,
        fabricateStakingUnbond,
        {
          address: 'address',
          amount: '1000',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.staking(), {
            unbond: {
              amount: new Int(new Dec('1000').mul(1000000)).toString(),
            },
          }),
        ],
      );
    });

    it('withdraw ', async () => {
      testFabricator(
        expect,
        fabricateStakingWithdraw,
        {
          address: 'address',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.staking(), {
            withdraw: {},
          }),
        ],
      );
    });
  });

  describe('investor-vesting', () => {
    it('update-config', async () => {
      testFabricator(
        expect,
        fabricateInvestorVestingUpdateConfig,
        {
          address: 'address',
          owner: 'new-owner',
          anchor_token: 'token',
          genesis_time: '100000',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.investorLock(), {
            update_config: {
              owner: 'new-owner',
              anchor_token: 'token',
              genesis_time: '100000',
            },
          }),
        ],
      );
    });

    it('register-vesting-accounts', async () => {
      testFabricator(
        expect,
        fabricateInvestorVestingRegisterAccounts,
        {
          address: 'address',
          vesting_accounts: ['address1', 'address2'],
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.investorLock(), {
            register_vesting_accounts: {
              vesting_accounts: ['address1', 'address2'],
            },
          }),
        ],
      );
    });

    it('claim', async () => {
      testFabricator(
        expect,
        fabricateInvestorVestingClaim,
        {
          address: 'address',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.investorLock(), {
            claim: {},
          }),
        ],
      );
    });
  });

  describe('team-vesting', () => {
    it('update-config', async () => {
      testFabricator(
        expect,
        fabricateTeamVestingUpdateConfig,
        {
          address: 'address',
          owner: 'new-owner',
          anchor_token: 'token',
          genesis_time: '100000',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.teamLock(), {
            update_config: {
              owner: 'new-owner',
              anchor_token: 'token',
              genesis_time: '100000',
            },
          }),
        ],
      );
    });

    it('register-vesting-accounts', async () => {
      testFabricator(
        expect,
        fabricateTeamVestingRegisterAccounts,
        {
          address: 'address',
          vesting_accounts: ['address1', 'address2'],
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.teamLock(), {
            register_vesting_accounts: {
              vesting_accounts: ['address1', 'address2'],
            },
          }),
        ],
      );
    });

    it('claim', async () => {
      testFabricator(
        expect,
        fabricateTeamVestingClaim,
        {
          address: 'address',
        },
        addressProvider,
        [
          new MsgExecuteContract('address', addressProvider.teamLock(), {
            claim: {},
          }),
        ],
      );
    });
  });
});
