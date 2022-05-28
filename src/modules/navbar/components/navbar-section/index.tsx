import React from 'react';

import { TNavbarSection } from './types';

import { Container, Button, ButtonsContainer, Label } from './index.styles';

export const NavbarSection = ({
  label,
  leftButtonLabel,
  rightButtonLabel,
  idLeft,
  idRight,
  buttonIsActive,
  buttonOnClick,
}: TNavbarSection) => {
  return (
    <Container>
      <Label>{label}:</Label>
      <ButtonsContainer>
        <Button
          id={idLeft}
          type="button"
          isActive={buttonIsActive(idLeft)}
          onClick={() => buttonOnClick(idLeft)}
        >
          {leftButtonLabel}
        </Button>
        <Button
          id={idRight}
          type="button"
          isActive={buttonIsActive(idRight)}
          onClick={() => buttonOnClick(idRight)}
        >
          {rightButtonLabel}
        </Button>
      </ButtonsContainer>
    </Container>
  );
};
