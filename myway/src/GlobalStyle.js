import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Open Sans", sans-serif;
    /* outline: 1px solid red; */
    /* color: #23242a; */
    --green: #7ECB20;
    --black: #000000;
    --white: #FFFFFF;
    --grey: #0000000F;
    }
`;

export default GlobalStyle;
