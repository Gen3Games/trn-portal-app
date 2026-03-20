// Copyright 2017-2025 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import Button from '../Button/index.js';
import { styled } from '../styled.js';

interface Props {
  className?: string;
  children: React.ReactNode;
}

function Actions ({ children, className = '' }: Props): React.ReactElement<Props> {
  return (
    <StyledDiv className={`${className} ui--Modal-Actions`}>
      <Button.Group>
        {children}
      </Button.Group>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  background-color: color-mix(in srgb, var(--surface-2) 90%, var(--bg-input));
  border-top: 1px solid var(--border-subtle);
  border-radius: 0 0 var(--radius-xl) var(--radius-xl);

  .ui--Button-Group {
    margin: 1rem 1.25rem 1.25rem;
  }
`;

export default React.memo(Actions);
