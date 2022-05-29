import styled from 'styled-components';

export const AppStyle = styled.div<{ modalIsOpen?: boolean }>`
  text-align: center;
  max-width: 1300px;
  margin: 0 auto;

  opacity: ${({ modalIsOpen }) => (modalIsOpen ? 0.4 : 1)};
  pointer-events: ${({ modalIsOpen }) => (modalIsOpen ? 'none' : 'auto')};
`;

export const Row = styled.div`
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));
  justify-content: center;
`;
export const Col = styled.div`
  flex: 0 0 auto;
`;
