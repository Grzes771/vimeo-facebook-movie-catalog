import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: right;
  width: 100%;
  height: 90px;
  max-width: 1200px;
  background-color: #24acff;
  margin: 0px auto 20px auto;
`;

export const Button = styled.button<{ favorite?: string; id: string }>`
  outline: ${({ favorite, id }) =>
    favorite === 'all' && id === 'all'
      ? '2px solid white !important'
      : favorite === 'favorite' && id === 'favorite'
      ? '2px solid white !important'
      : 'none'};
  border: none;
  width: 120px;
  height: 35px;
  margin-right: 30px;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  color: #fff;
  border-radius: 0.25rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.3)) top/100% 800%;
  padding: 0.5rem 0.9rem;
  transition: 0.5s;
  background-color: rgba(25, 135, 84);

  &:hover {
    background-position: bottom;
    transition: 0.4s;
  }
  &:focus {
    background-position: bottom;
    transition: 0.1s;
  }
`;
