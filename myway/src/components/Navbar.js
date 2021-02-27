import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components/macro";
import { Link } from "react-router-dom";
import { ButtonNormalSmall } from "./button";
import { FaBars } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import logoImage from "../assets/myways_logo.png";
import Modal from "./Modal";
import Login from "./Login";

const Nav = styled.nav`
    height: 70px;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    z-index: 100;
    position: fixed;
    background: ${({ scrollNav }) => (scrollNav ? "rgba(112, 112, 112, 1)" : "transparent")};
    transition: background-color 200ms linear;
    @media screen and (max-width: 525px) {
        padding: 1rem 1rem;
    }
`;

const NavLink = css`
    text-decoration: none;
    cursor: pointer;
    text-align: center;
    font: normal normal normal 16px/22px Open Sans;
    letter-spacing: 0.49px;
    color: #000000;
    margin-left: 2.5rem;
    @media screen and (max-width: 525px) {
        margin-left: 0.5rem;
    }
`;
const Logo = styled.img`
    width: 50px;
    height: 50px;
    color: #fff;
    margin-left: 3rem;
    /* transform: translate(30%, 50%); */
`;
const MenuBars = styled(FaBars)`
    display: none;
    @media screen and (max-width: 992px) {
        display: block;
        color: black;
        opacity: 0.6;
        height: 40px;
        width: 40px;
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(50%, 50%);
    }
`;

const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    @media screen and (max-width: 992px) {
        display: none;
    }
`;

const NavMenuLinks = styled(Link)`
    ${NavLink}
`;

const Navbar = ({ toggle }) => {
    const [scrollNav, setScrollNav] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const { currentUser, logout } = useAuth();

    const openModal = () => {
        setShowModal((prev) => !prev);
    };

    const changeNav = () => {
        if (window.scrollY >= 30) {
            setScrollNav(true);
        } else {
            setScrollNav(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", changeNav);
    }, []);

    function openNav() {
        if (currentUser === false) {
            setShowLogin(true);
            if (window.innerWidth < 525) {
                document.getElementById("loginSideForm").style.width = "90vw";
            } else {
                document.getElementById("loginSideForm").style.width = "420px";
            }
        }
    }
    function closeNav() {
        setShowLogin(false);
        document.getElementById("loginSideForm").style.width = "0";
    }

    return (
        <>
            <Nav scrollNav={scrollNav}>
                <Logo src={logoImage}></Logo>
                <MenuBars onClick={toggle} />
                <NavMenu>
                    <NavMenuLinks>For You</NavMenuLinks>
                    <NavMenuLinks>Instant Apply</NavMenuLinks>
                    <NavMenuLinks>Pricing</NavMenuLinks>
                    <NavMenuLinks>About Us</NavMenuLinks>
                </NavMenu>
                {currentUser ? (
                    <NavMenuLinks
                        onClick={logout}
                        style={{ color: "#7ECB20", paddingTop: "8px", fontWeight: "600" }}
                    >
                        Log Out
                    </NavMenuLinks>
                ) : (
                    <div>
                        <NavMenuLinks
                            onClick={openModal}
                            style={{ color: "#7ECB20", fontWeight: "600" }}
                        >
                            SIGN UP
                        </NavMenuLinks>
                        <ButtonNormalSmall onClick={openNav}>Login</ButtonNormalSmall>
                    </div>
                )}
            </Nav>
            <Modal showModal={showModal} setShowModal={setShowModal} />
            <Login showLogin={showLogin} setShowLogin={setShowLogin} closeNav={closeNav} />
        </>
    );
};

export default Navbar;
