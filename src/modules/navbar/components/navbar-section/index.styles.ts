import styled from 'styled-components';

export const Container = styled.form`
  display: flex;

  @media (max-width: 1000px) {
    margin: 10px 0px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 350px;
    transition: 0.5s;
  }
`;

export const Label = styled.label`
  @media (max-width: 1000px) {
    width: 80px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    @media (max-width: 620px) {
      display: none !important;
    }
  }
`;

export const ButtonsContainer = styled.div`
  @media (max-width: 620px) {
    margin: 0px auto 0px auto;
  }
`;

export const StyledButton = styled.button<{
  isActive: boolean | undefined;
  id?: string;
}>`
  border: none;
  width: 100px;
  height: 35px;
  margin-right: 30px;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  color: #fff;
  border-radius: 0.25rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.3)) top/100% 800%;
  transition: 0.5s;
  background-color: rgba(25, 135, 84);
  outline: ${({ isActive }) =>
    isActive ? '2px solid white !important' : 'none'};
  &:hover {
    background-position: bottom;
    transition: 0.4s;
  }
  @media (max-width: 620px) {
    margin: 5px 5px 5px 5px;
    display: inline-block;
  }
`;
