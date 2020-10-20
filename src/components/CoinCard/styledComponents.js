import styled from 'styled-components';

import { zdepth2 } from '../StyledAssets/index';

export const Card = styled.div`
  display: flex;
  justify-content: flex-start;
  background-color: whitesmoke;
  border-radius: 15px;
  width: 70%;
  height: 200px;
  padding: 20px 30px;
  margin-top: 20px;

  ${zdepth2}
`;

export const CardTitle = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
`;

export const CardContent = styled.div`
  display: flex;
  flex-flow: column;
  padding: 10px 20px;
  font-size: 1.2em;
`;
