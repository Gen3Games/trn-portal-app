// Copyright 2017-2025 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TabItem } from '../types.js';

import React from 'react';
import { NavLink } from 'react-router-dom';

import Badge from '../Badge.js';
import { styled } from '../styled.js';

interface Props extends TabItem {
  basePath: string;
  className?: string;
  count?: number;
  index: number;
}

function Tab ({ basePath, className = '', count, hasParams, index, isExact, isRoot, name, text }: Props): React.ReactElement<Props> {
  const to = isRoot
    ? basePath
    : `${basePath}/${name}`;

  // only do exact matching when not the fallback (first position tab),
  // params are problematic for dynamic hidden such as app-accounts
  const tabIsExact = isExact || !hasParams || index === 0;

  return (
    <StyledNavLink
      className={`${className} ui--Tab`}
      end={tabIsExact}
      to={to}
    >
      <div className='tabLinkText'>
        {text}
      </div>
      {!!count && (
        <Badge
          className='tabCounter'
          color='counter'
          info={count}
        />
      )}
    </StyledNavLink>
  );
}

const StyledNavLink = styled(NavLink)`
  align-items: center;
  border-radius: var(--radius-md);
  display: flex;
  color: #8B8B8B;
  height: 100%;
  padding: 0 1.1rem;
  position: relative;
  transition: color var(--transition-fast), background var(--transition-fast);

  &:hover {
    background: var(--surface-1);
    color: #8B8B8B;

    .tabLinkText::after {
      background-color: #8B8B8B;
    }
  }

  &.active, &:hover {
    .tabLinkText::after {
      content: '';
      position: absolute;
      width: 3.14rem;
      height: 2px;
      bottom: -1px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &.active {
    background: var(--surface-1);
    color: var(--color-text) !important;
    font-weight: var(--font-weight-normal);

    &:hover {
      cursor: default;
    }
  }

  .tabLinkText {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .tabCounter {
    margin: -1rem 0 -1rem 0.75rem;
  }

  .tabIcon {
    margin-left: 0.75rem;
  }
`;

export default React.memo(Tab);
