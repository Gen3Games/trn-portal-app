// Copyright 2017-2025 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { RuntimeVersion } from '@polkadot/types/interfaces';

import React from 'react';

import { ChainImg, Icon, styled } from '@polkadot/react-components';
import { useApi, useCall, useIpfs, useToggle } from '@polkadot/react-hooks';
import { BestNumber, Chain } from '@polkadot/react-query';

import Endpoints from '../Endpoints/index.js';

interface Props {
  className?: string;
}

function ChainInfo ({ className }: Props): React.ReactElement<Props> {
  const { api, isApiReady } = useApi();
  const runtimeVersion = useCall<RuntimeVersion>(isApiReady && api.rpc.state.subscribeRuntimeVersion);
  const { ipnsChain } = useIpfs();
  const [isEndpointsVisible, toggleEndpoints] = useToggle();
  const canToggle = !ipnsChain;

  return (
    <StyledDiv className={className}>
      <div
        className={`apps--SideBar-logo-inner${canToggle ? ' isClickable' : ''}`}
        onClick={toggleEndpoints}
      >
        <ChainImg />
        <div className='info media--1000'>
          <Chain className='chain' />
          {runtimeVersion && (
            <div className='runtimeVersion'>{runtimeVersion.specName.toString()}/{runtimeVersion.specVersion.toNumber()}</div>
          )}
          <BestNumber
            className='bestNumber'
            label='#'
          />
        </div>
        {canToggle && (
          <Icon
            className='dropdown'
            icon={isEndpointsVisible ? 'caret-right' : 'caret-down'}
          />
        )}
      </div>
      {isEndpointsVisible && (
        <Endpoints onClose={toggleEndpoints} />
      )}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  box-sizing: border-box;
  padding: 0.45rem 0.9rem 0.45rem 0;
  margin: 0;

  .apps--SideBar-logo-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--surface-1);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-1);
    color: var(--color-text);
    padding: 0.55rem 0.8rem;
    transition: transform var(--transition-base), box-shadow var(--transition-base), background var(--transition-base);

    &.isClickable {
      cursor: pointer;

      &:hover {
        background: var(--surface-2);
        box-shadow: var(--shadow-2);
        transform: translateY(-1px);
      }
    }

    .ui--ChainImg {
      height: 2.5rem;
      margin-right: 0.5rem;
      width: 2.5rem;
    }

    .ui--Icon.dropdown,
    > div.info {
      text-align: right;
      vertical-align: middle;
    }

    .ui--Icon.dropdown {
      flex: 0;
      margin: 0;
      width: 1rem;
    }

    .info {
      flex: 1;
      font-size: var(--font-size-tiny);
      line-height: 1.2;
      padding-right: 0.75rem;
      text-align: right;

      .chain {
        font-size: var(--font-size-small);
        max-width: 16rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .runtimeVersion {
        letter-spacing: -0.01em;
      }
    }
  }
`;

export default React.memo(ChainInfo);
