import styled from "styled-components/macro";
// import { Link } from "react-router-dom";

export const ButtonNormalSmall = styled.button`
    width: 134px;
    height: 38px;
    background: #7ecb20 0% 0% no-repeat padding-box;
    border-radius: 19px;
    text-align: left;
    font: normal normal 600 16px/22px Open Sans;
    letter-spacing: 0.48px;
    color: #ffffff;
    text-align: center;
    border: none;
    color: white;
    cursor: pointer;
    margin: 0 1rem;
    transition: transform 0.2s;
    :hover {
        transform: scale(1.05);
    }
    @media screen and (max-width: 525px){
        width: 100px;
        margin: 0 0.5rem;
    }
`;

export const ButtonNormalBig = styled.button`
    width: 236px;
    height: 53px;
    margin: 1rem 0;
    border: none;
    cursor: pointer;
    transition: transform 0.2s;
    background: #7ecb20 0% 0% no-repeat padding-box;
    border-radius: 27px;
    text-align: center;
    font: normal normal bold 24px/33px Open Sans;
    letter-spacing: 0px;
    color: #ffffff;
    text-transform: capitalize;
    :hover {
        transform: scale(1.05);
    }
    @media screen and (max-width: 525px){
        width: 200px;
    }
`;
