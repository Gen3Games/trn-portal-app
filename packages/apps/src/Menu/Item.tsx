// Copyright 2017-2025 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ItemRoute } from './types.js';

import React from 'react';

import { Badge, Icon, styled } from '@polkadot/react-components';
import { useToggle } from '@polkadot/react-hooks';

interface Props {
  className?: string;
  classNameText?: string;
  isLink?: boolean;
  isToplevel?: boolean;
  route: ItemRoute;
}

const DUMMY_COUNTER = () => 0;

function Item ({ className = '', classNameText, isLink, isToplevel, route: { Modal, href, icon, name, text, useCounter = DUMMY_COUNTER } }: Props): React.ReactElement<Props> {
  const [isModalVisible, toggleModal] = useToggle();
  const count = useCounter();

  return (
    <StyledLi className={`${className} ui--MenuItem ${count ? 'withCounter' : ''} ${isLink ? 'isLink' : ''} ${isToplevel ? 'topLevel highlight--color-contrast' : ''}`}>
      <a
        href={Modal ? undefined : (href || `#/${name}`)}
        onClick={Modal ? toggleModal : undefined}
        rel='noopener noreferrer'
        target={href ? '_blank' : undefined}
      >
        <Icon icon={icon} />
        <span className={classNameText}>{text}</span>
        {!!count && (
          <Badge
            color='white'
            info={count}
          />
        )}
      </a>
      {Modal && isModalVisible && (
        <Modal onClose={toggleModal} />
      )}
    </StyledLi>
  );
}

const StyledLi = styled.li`
  cursor: pointer;
  position: relative;
  white-space: nowrap;

  &.topLevel {
    font-weight: var(--font-weight-normal);
    line-height: 1.214rem;
    border-radius: var(--radius-md);

    a {
      border: 1px solid transparent;
      padding: 0.72rem 0.8rem 0.72rem 0.92rem;
      line-height: 1.214rem;
      border-radius: var(--radius-md);
      transition: background var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast);
    }

    &.isActive.highlight--color-contrast {
      font-weight: var(--font-weight-normal);
      color: var(--color-text);

      a {
        background-color: var(--surface-3);
        border-color: var(--border-subtle);
        box-shadow: var(--shadow-1);
      }
    }

    &.isActive {
      border-radius: 0.15rem 0.15rem 0 0;

      a {
        padding: 0.72rem 1.15rem;
        cursor: default;
      }

      &&.withCounter a {
        padding-right: 3.2rem;
      }
    }

    .ui--Badge {
      top: 0.7rem;
    }
  }

  &&.withCounter a {
    padding-right: 3.2rem;
  }

  a {
    color: inherit !important;
    display: block;
    padding: 0.45rem 1rem 0.5rem;
    text-decoration: none;
    line-height: 1.5rem;
    transition: background var(--transition-fast), color var(--transition-fast), transform var(--transition-fast);
  }

  .ui--Badge {
    position: absolute;
    right: 0.5rem;
  }

  .ui--Icon {
    margin-right: 0.5rem;
  }
`;

export default React.memo(Item);
