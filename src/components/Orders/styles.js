import styled, { css } from 'styled-components';

export const Container = styled.div`
  margin-top: 42px;
  display: grid;
  grid-gap: 1.6rem;
  grid-template-columns: 1fr;

  @media (min-width: 690px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const cardStatusVariants = {
  PREPARING: css`
    background: #f6a609;
    color: #fff;

    header small {
      background: #fff;
      color: #0a100d;
    }

    select {
      border-color: #fff;
    }
  `,
  DONE: css`
    background: #2ac769;
    color: #fff;

    header small {
      background: #fff;
      color: #0a100d;
    }

    select {
      border-color: #fff;
    }
  `,
}

export const Card = styled.div`
  background-color: #FFF;
  padding: 16px;
  border-radius: 5px;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.1);

  header {
    display: flex;
    justify-content: space-between;

    h3 {
      font-weight: 400;
      font-size: 18px;
    }

    small {
      padding: 4px 8px;
      background: #CCC;
      border-radius: 5px;
      color: #fff;
      font-weight: bold;
      font-size: 12px;
    }
  }

  p {
    font-size: 14px;
    margin-top: 16px;
  }

  select {
    margin-top: 8px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #ccc;
    background: #fff;
    height: 45px;
    font-size: 14px;
    padding: 0 8px;
  }

  ${({ status }) => cardStatusVariants[status] || null }
`;
