import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  margin: auto auto 20px auto;
  width: 100%;
  max-width: 1200px;
  min-height: 50px;
  background-color: #24acff;

  label {
    display: flex;
    align-items: center;
    margin-right: 10px;
    font-size: 12px;
  }

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;
