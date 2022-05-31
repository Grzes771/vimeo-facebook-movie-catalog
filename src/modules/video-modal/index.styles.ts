import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const ModalStyle = styled.div<{ isModalOpen?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  z-index: 1055;
  justify-content: center;
  width: 100%;
  max-width: 900px;
  height: auto;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  background-color: white;
  border-radius: 1%;

  @media (max-width: 900px) {
    width: 100%;
    height: auto;
  }
`;

export const StyledButton = styled.button`
  border: none;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  color: #fff;
  border-radius: 0.25rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.3)) top/100% 800%;
  padding: 0.5rem 0.9rem;
  transition: 0.5s;
  background-color: rgba(0, 0, 0, 0.4);
  &:hover {
    background-position: bottom;
    transition: 0.4s;
  }
`;

export const ModalBodyStyle = styled.div`
  padding: 0 !important;
  margin: 0 !important;
  height: auto;
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
`;

export const ModalHeaderStyle = styled.div`
  display: flex;
  margin: auto;
  max-width: 900px;
  flex-shrink: 0;
  align-items: center;
  margin-top: 20px;
  font-size: 16px;
  margin-bottom: 10px;

  div {
    width: 200px;
    display: flex;
    justify-content: flex-end;
    span {
      margin-right: 10px;
    }
  }
  p {
    width: 700px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: auto;
  }
  @media (max-width: 900px) {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    p {
      display: inline-block;
      width: 70vw;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      margin-left: 5px;
    }
    div {
      width: 30vw;
      margin: 0;
    }
  }
`;
export const ModalFooterStyle = styled.div`
  display: flex;
  margin: auto;
  max-width: 900px;
  flex-shrink: 0;
  align-items: center;

  font-size: 16px;

  p {
    display: flex;
    align-items: center;
    margin: auto 0px auto 0px;
    width: 450px;
    justify-content: flex-end;
  }
  div {
    display: flex;
    width: 450px;
    justify-content: flex-start;
  }
  span {
    margin-right: 20px;
  }
  @media (max-width: 900px) {
    display: flex;
    justify-content: space-between;
    margin: 0;
    p {
      width: 45vw;
      margin: 0px 10px 0px 5px;
      right: 0;
    }
    div {
      width: 45vw;
      margin-left: 5px;
    }
  }
`;
