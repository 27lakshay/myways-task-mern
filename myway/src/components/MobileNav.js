import React from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

const DropDownContainer = styled.div`
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: #7ECB20;
    display: grid;
    align-items: center;
    top: 0;
    left: 0;
    transition: 0.3s ease-in-out;
    opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
    top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
`;

const Icon = styled.div`
    position: absolute;
    top: 2rem;
    right: 2rem;
    background: transparent;
    font-size: 4rem;
    cursor: pointer;
    outline: none;
`;
const CloseIcon = styled(FaTimes)`
    color: black;
`;
const DropDownWrapper = styled.div``;
const DropdownMenu = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 80px);
    text-align: center;
    margin-bottom: 4rem;
    @media screen and (max-wdith: 480px) {
        grid-template-rows: repeat(4, 60px);
    }
`;
const DropdownLink = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    list-style: none;
    color: #fff;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    font-style: normal;
    font-weight: bold;
    font-size: 21px;
    line-height: 135%;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: -0.01em;
    text-decoration: none;
`;

const MobileNav = ({ isOpen, toggle }) => {
    return (
        <DropDownContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <DropDownWrapper>
                <DropdownMenu>
                    <DropdownLink>For You</DropdownLink>
                    <DropdownLink>Instant Apply</DropdownLink>
                    <DropdownLink>Pricing</DropdownLink>
                    <DropdownLink>About Us</DropdownLink>
                </DropdownMenu>
            </DropDownWrapper>
        </DropDownContainer>
    );
};

export default MobileNav;
