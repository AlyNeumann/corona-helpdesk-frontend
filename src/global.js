import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';


export const Button = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  font-family: 'RobotoMonoB !important'
  border-radius: 5px;
  color: black;
  color: ${props => (props.primary ? '#718751' : '#783b37')};
  border: ${props =>
    props.primary ? '2px solid #dbaf9a' : '2px solid #699696'};
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
  box-shadow: 10px 14px 80px rgba(34, 35, 58, 0.2);
  &:hover {
    color: white;
    background-color: ${props =>
      props.primary ? '#9ba896'  : '#699696'};
  }
`;

//TODO: make sick button
export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    align-items: center;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    margin: 0;
    padding: 0;
    // font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
  }`