import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: whitesmoke;
  position: absolute;
  top: 0;
  left: 0;
`;

export const BackIconBtn = styled.img`
  width: 32px;
  margin: 0 20px;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;
