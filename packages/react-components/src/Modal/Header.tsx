// Copyright 2017-2025 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import Button from '../Button/index.js';
import { styled } from '../styled.js';

interface Props {
  className?: string;
  header?: React.ReactNode;
  onClose: () => void;
}

function Header ({ className = '', header, onClose }: Props): React.ReactElement<Props> {
  return (
    <StyledDiv className={`${className} ui--Modal-Header`}>
      {header && (
        <h1>{header}</h1>
      )}
      <Button
        dataTestId='close-modal'
        icon='times'
        onClick={onClose}
      />
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  align-items: center;
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.25rem;
`;

export default React.memo(Header);
