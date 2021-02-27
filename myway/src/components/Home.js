import React from "react";
import styled from "styled-components";
import { ButtonNormalBig } from "./button";

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > div {
        text-align: center;
        max-width: 1000px;
        h1 {
            text-align: center;
            font: normal normal bold 41px/56px Open Sans;
            letter-spacing: 0px;
            color: #000000;
        }
        p {
            text-align: center;
            font: normal normal normal 28px/38px Open Sans;
            letter-spacing: 0px;
            color: #000000;
            opacity: 0.8;
        }
        button {
            margin: 1rem;
        }
    }
`;

function Home() {
    return (
        <>
            <Container>
                <div>
                    <h1>Apply and hear back every time</h1>
                    <p>
                        Exploring internships or jobs? Say good-bye to the typical job portals and
                        use the power of Artificial Intelligence to become successful, faster.
                    </p>
                    <ButtonNormalBig>Get Started</ButtonNormalBig>
                </div>
            </Container>
        </>
    );
}

export default Home;
