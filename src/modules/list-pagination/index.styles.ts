import styled from 'styled-components';

export const Container = styled.nav`
  overflow-x: auto;
  justify-content: center;
  display: flex;
  padding-left: 0;
  list-style: none;
  margin: 10px auto 30px auto;

  nav {
    color: green;
    overflow-x: auto;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    display: flex;
    padding-left: 0;
    list-style: none;
    margin: 10px auto 30px auto;
  }
`;

export const StyledListItem = styled.li<{ isActive?: boolean }>`
  display: list-item;
  text-align: --webkit-match-parent;
  pointer-events: ${({ isActive }) => (isActive ? 'auto' : 'none')};
  opacity: ${({ isActive }) => (isActive ? '1' : '0.4')};
`;

export const StyledButton = styled.button<{ backgroundActive?: boolean }>`
  height: 45px;
  width: 45px;

  background-color: ${({ backgroundActive }) =>
    backgroundActive ? 'rgba(0,184,255,0.7)' : 'white'};
  border: 1px solid rgba(0, 0, 0, 0.13);
  border-radius: 15%;
  &:hover {
    background-color: ${({ backgroundActive }) =>
      backgroundActive ? 'rgba(0,184,255, 0.7)' : 'rgba(0, 0, 0, 0.13)'};
    transition: 0.4s;
  }
  &:focus {
    background-color: ${({ backgroundActive }) =>
      backgroundActive ? 'rgba(0,184,255,0.7)' : 'white'};
  }
`;
