import React from 'react';

import { TNavbarSection } from './types';

import * as S from './index.styles';

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
    <S.Container>
      <S.Label>{label}:</S.Label>
      <S.ButtonsContainer>
        <S.StyledButton
          id={idLeft}
          type="button"
          isActive={buttonIsActive(idLeft)}
          onClick={() => buttonOnClick(idLeft)}
        >
          {leftButtonLabel}
        </S.StyledButton>
        <S.StyledButton
          id={idRight}
          type="button"
          isActive={buttonIsActive(idRight)}
          onClick={() => buttonOnClick(idRight)}
        >
          {rightButtonLabel}
        </S.StyledButton>
      </S.ButtonsContainer>
    </S.Container>
  );
};
