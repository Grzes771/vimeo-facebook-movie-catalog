import styled, { css } from 'styled-components';
import { EDisplayTypeKeys } from 'types/video-list-context-enums';

export const SingleCardStyle = styled.div<{ displayType: EDisplayTypeKeys }>`
  ${({ displayType }) => {
    switch (displayType) {
      case EDisplayTypeKeys.TILES:
        return css`
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: rgba(0, 0, 0, 0.03);
          flex-wrap: wrap;
          word-wrap: break-word;
          background-color: #fff;
          min-width: 270px;
          background-clip: border-box;
          background-color: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.125);
          border-radius: 0.25rem;
          margin: 0px 16px 30px 14px;
          width: 270px;
          justify-content: left;

          @media (max-width: 700px) {
            max-height: 'auto';
          }
        `;
      case EDisplayTypeKeys.LIST:
        return css`
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 45%;
          height: 100px;
          margin: 0px 5% 50px 0px;
          background-color: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.125);
          transition: 0.2s;

          @media (max-width: 640px) {
            width: 90%;
          }
        `;
      default:
        return css`
          display: flex;
        `;
    }
  }}
`;

export const CardImageWrapper = styled.div<{ displayType: EDisplayTypeKeys }>`
  ${({ displayType }) => {
    switch (displayType) {
      case EDisplayTypeKeys.TILES:
        return css`
          cursor: pointer;
          width: 100%;

          img {
            width: 100%;
            height: 100%;
            min-width: 150px;
          }
        `;
      case EDisplayTypeKeys.LIST:
        return css`
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          width: 30%;
          height: 100%;
          overflow: hidden;

          img {
            height: auto;
            max-height: 100%;
          }
        `;
      default:
        return css`
          display: flex;
        `;
    }
  }}
`;

export const ContentWrapper = styled.div<{ displayType: EDisplayTypeKeys }>`
  ${({ displayType }) => {
    switch (displayType) {
      case EDisplayTypeKeys.TILES:
        return css`
          display: flex;
          flex-direction: column;
        `;
      case EDisplayTypeKeys.LIST:
        return css`
          display: flex;
          flex-direction: column;
          width: 70%;
          height: 100%;
        `;
      default:
        return css`
          display: flex;
        `;
    }
  }}
`;

export const CardHeaderStyle = styled.div<{ displayType: EDisplayTypeKeys }>`
  ${({ displayType }) => {
    switch (displayType) {
      case EDisplayTypeKeys.TILES:
        return css`
          padding: 0.5rem 1rem 0.1rem 1rem;
          margin-bottom: 0;
          width: 100%;

          p {
            height: 40px;
            font-size: 13px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 600;
            word-break: break-all;
            margin-bottom: 10px;
          }
        `;
      case EDisplayTypeKeys.LIST:
        return css`
          padding: 0.5rem 1rem 0.1rem 1rem;
          margin-bottom: 0;
          width: 100%;

          p {
            height: 15px;
            font-size: 13px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-weight: 600;
            word-break: break-all;
            margin-bottom: 10px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        `;
      default:
        return css`
          display: flex;
        `;
    }
  }}
`;

export const CardFooterStyle = styled.div<{ displayType: EDisplayTypeKeys }>`
  ${({ displayType }) => {
    switch (displayType) {
      case EDisplayTypeKeys.TILES:
        return css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          right: 0;
          bottom: 0;
          padding: 0.5rem 0rem;
          color: #6c757d !important;
          font-size: 14px;
          width: auto;
          position: static;
          border-top: 1px solid rgba(0, 0, 0, 0.125);

          span {
            padding: 0px 10px 0px 10px;
          }
        `;

      case EDisplayTypeKeys.LIST:
        return css`
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          right: 0;
          bottom: 0;
          color: #6c757d !important;
          font-size: 12px;
          width: auto;
          position: static;
          height: 100%;

          span {
            padding: 0px 10px 0px 10px;
          }

          @media (max-width: 900px) {
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-start;
          }

          @media (max-width: 640px) {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
          }

          @media (max-width: 450px) {
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-start;
          }
        `;

      default:
        return css`
          display: flex;
        `;
    }
  }}
`;
