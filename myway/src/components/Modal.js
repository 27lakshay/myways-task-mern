import React, { useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import Wizard from "./SignUpModal/Formik";

const Background = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(33, 32, 32, 0.6) 0% 0% no-repeat padding-box;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 110;
`;

const ModalWrapper = styled.div`
    width: 80vw;
    max-width: 680px;
    height: 500px;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
    background: #fff;
    color: #000;
    position: relative;
    z-index: 120;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    @media screen and (max-width: 525px) {
        width: 95vw;
    }
`;

const CloseModalButton = styled.button`
    cursor: pointer;
    font-size: 26px;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 10;
    border: none;
    background: none;
`;
function Modal({ showModal, setShowModal }) {
    const modalRef = useRef();
    
    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    };

    const keyPress = useCallback(
        (e) => {
            if (e.key === "Escape" && showModal) {
                setShowModal(false);
                console.log("I pressed");
            }
        },
        [setShowModal, showModal]
    );

    useEffect(() => {
        document.addEventListener("keydown", keyPress);
        return () => document.removeEventListener("keydown", keyPress);
    }, [keyPress]);

    return (
        <>
            {showModal ? (
                <Background onClick={closeModal} ref={modalRef}>
                    <ModalWrapper showModal={showModal}>
                        {/* <ModalContent> */}
                        <Wizard closeModal={closeModal}/>
                        {/* </ModalContent> */}
                        <CloseModalButton
                            aria-label="Close modal"
                            onClick={() => setShowModal((prev) => !prev)}
                        >
                            <i className="fas fa-times"></i>
                        </CloseModalButton>
                    </ModalWrapper>
                </Background>
            ) : null}
        </>
    );
}

export default Modal;
