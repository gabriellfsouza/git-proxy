import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  ul {
  }

  button {
    background: #7159c1;
    border: 0;
    padding: 0 15px;
    margin-left: 10px;
    padding: 10px;
    border-radius: 4px;
    align-self: flex-start;

    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.05, '#7159c1')};
    }

    &:active {
      background: ${darken(0.15, '#7159c1')};
    }
  }
`;
