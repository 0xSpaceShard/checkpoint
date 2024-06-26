import Checkpoint from '../checkpoint';
import { CheckpointRecord } from '../stores/checkpoints';
import { Logger } from '../utils/logger';
import { CheckpointConfig, ContractSourceConfig } from '../types';

export type Instance = {
  config: CheckpointConfig;
  getCurrentSources(blockNumber: number): ContractSourceConfig[];
  setLastIndexedBlock(blockNum: number);
  insertCheckpoints(checkpoints: CheckpointRecord[]);
  getWriterParams(): Promise<{
    instance: Checkpoint;
  }>;
};

export class BlockNotFoundError extends Error {
  constructor() {
    super('Block not found');
    this.name = 'BlockNotFoundError';
  }
}

export class BaseProvider {
  protected readonly instance: Instance;
  protected readonly log: Logger;
  protected readonly abis: Record<string, any> = {};

  constructor({
    instance,
    log,
    abis
  }: {
    instance: Instance;
    log: Logger;
    abis?: Record<string, any>;
  }) {
    this.instance = instance;
    this.log = log;
    if (abis) {
      this.abis = abis;
    }
  }

  init(): Promise<void> {
    throw new Error('init method was not defined');
  }

  formatAddresses(addresses: string[]): string[] {
    throw new Error(
      `formatAddresses method was not defined when formatting ${addresses.length} addresses`
    );
  }

  getNetworkIdentifier(): Promise<string> {
    throw new Error('getNetworkIdentifier method was not defined');
  }

  getLatestBlockNumber(): Promise<number> {
    throw new Error('getLatestBlockNumber method was not defined');
  }

  processBlock(blockNum: number): Promise<number> {
    throw new Error(`processBlock method was not defined when fetching block ${blockNum}`);
  }

  processPool(blockNumber: number) {
    throw new Error(
      `processPool method was not defined when fetching pool for block ${blockNumber}`
    );
  }

  async getCheckpointsRange(fromBlock: number, toBlock: number): Promise<CheckpointRecord[]> {
    throw new Error(
      `getCheckpointsRange method was not defined when fetching events from ${fromBlock} to ${toBlock}`
    );
  }
}

export class BaseIndexer {
  protected provider?: BaseProvider;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  init({ instance, log, abis }: { instance: Instance; log: Logger; abis?: Record<string, any> }) {
    throw new Error('init method was not defined');
  }

  public getProvider() {
    if (!this.provider) {
      throw new Error('Provider not initialized');
    }

    return this.provider;
  }

  public getHandlers(): string[] {
    throw new Error('getHandlers method was not defined');
  }
}
