import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const ModalStyle = styled.div<{ isModalOpen?: boolean }>`
  position: fixed;
  top: 150px;
  z-index: 1055;
  justify-content: center;
  width: 100%;
  max-width: 850px;
  height: auto;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  background-color: white;
  outline: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 1%;
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

export const ModalFooterStyle = styled.div`
  display: flex;
  height: auto;
  flex-wrap: wrap;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-end;
  padding: 0.75rem;
  border-bottom-right-radius: calc(0.3rem - 1px);
  border-bottom-left-radius: calc(0.3rem - 1px);
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
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
  justify-content: center !important;
  font-size: 20px;
`;
