import styled from 'styled-components';

export const RankContainer = styled.div`
  display: flex;
  justify-content: center;
  align-tems: center;
  flex-flow: column;
  padding: 15px 30px;
  width: 80%;
`;

export const Pair = styled.div`
  width: 100%;
  height: 60px;
  // background-color: black;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 5% 10% 12% 12% 12% 12% 12% 12%;
`;

export const Label = styled.div`
  border-radius: 10px;
  padding: 5px 5px;
  text-align: center;
  transition: 0.3s ease-out;
  &:hover {
    background-color: #f3f3f3;
  }
`;

export const HeaderLabel = styled(Label)`
  text-align: left;
  font-weight: 800;
  margin-bottom: 20px;
`;

export const RankControllers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
