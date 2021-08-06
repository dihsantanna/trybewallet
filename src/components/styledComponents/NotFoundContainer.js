import styled from 'styled-components';

const NotFoundContainer = styled.div
  .attrs({
    className: 'not-found',
  })`align-items: center;
  background-color: ${({ darkmode }) => (darkmode ? 'rgb(51, 51, 51)' : 'white')};
  color: ${({ darkmode }) => (darkmode ? 'white' : 'black')};
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;

export default NotFoundContainer;
