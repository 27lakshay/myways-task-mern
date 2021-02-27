import React, { useState, useRef } from "react";
import styled from "styled-components";

import { useAuth } from "../contexts/AuthContext";
import history from "../history";
import { ButtonNormalBig } from "./button";

const Background = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(33, 32, 32, 0.6) 0% 0% no-repeat padding-box;
    position: fixed;
    z-index: 110;
    transition: 0.5s;
`;

const LoginSideForm = styled.div`
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 120;
    top: 0;
    right: 0;
    background-color: white;
    overflow-x: hidden;
    transition: 0.5s;
    > div {
        margin: 5rem 1rem;
    }
`;
const Title = styled.div`
    text-align: left;
    display: inline-block;
    font: normal normal bold 24px/32px Segoe UI;
    letter-spacing: 0px;
    color: #333333;
    margin-right: auto;
`;
const Label = styled.div`
    text-align: center;
    font: normal normal 600 20px/27px Segoe UI;
    letter-spacing: 0px;
    color: #7ecb20;
`;
const Input = styled.input`
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #707070;
    border-radius: 4px;
    opacity: 0.57;
    width: 100%;
    height: 48px;
    font: normal normal normal 18px/24px Segoe UI;
    letter-spacing: 0px;
    color: rgba(110, 110, 110, 1);
    padding: 1rem;
`;

const Card = styled.div`
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid rgba(112, 112, 112, 0.37);
    height: 371px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 5rem;
    padding: 1rem;
`;
const Link = styled.div`
    font: normal normal 600 15px/20px Segoe UI;
    letter-spacing: 0px;
    color: #7ecb20;
    cursor: pointer;
`;
const LoginButton = styled(ButtonNormalBig)`
    border-radius: 4px;
    width: 100%;
    text-align: center;
    font: normal normal 600 22px/30px Segoe UI;
    letter-spacing: 0px;
    color: #ffffff;
`;

const CloseButton = styled.div`
    cursor: pointer;
    display: inline-block;
    color: #707070;
    font: normal normal bold 24px/32px Segoe UI;
`;

function Login({ closeNav, showLogin, setShowLogin }) {
    const loginRef = useRef();
    const { login, currentUser } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await login(email, password);
        if (response.status === true) {
            closeNavAndBackground();
        } else window.alert(response.message);
    }
    // history.push("/dashboard");
    const closeNavAndBackground = () => {
        closeNav();
    };

    return (
        <>
            {showLogin ? <Background onClick={closeNavAndBackground} ref={loginRef} /> : null}
            <LoginSideForm id="loginSideForm">
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Title>Login</Title>
                        <CloseButton onClick={closeNav}>
                            <i className="fas fa-times"></i>
                        </CloseButton>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <Card>
                            <div style={{ borderBottom: "2px solid #7ecb20", width: "120px" }}>
                                <Label>Student</Label>
                            </div>
                            <Input
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                required="required"
                            ></Input>
                            <Input
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                required="required"
                                minLength="8"
                            ></Input>
                            <Link style={{ textAlign: "left" }}>Forgot Password?</Link>
                            <LoginButton type="submit">Login</LoginButton>
                            <Link>New to MyWays? Sign Up here</Link>
                        </Card>
                    </form>
                </div>
            </LoginSideForm>
        </>
    );
}

export default Login;
