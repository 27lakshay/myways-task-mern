import React, { useRef, useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { ButtonNormalBig, ButtonNormalSmall } from "../button";
import { useAuth } from "../../contexts/AuthContext";
import checkcircle from "../../assets/checkcircle.svg";
// import { Debug } from "./Debug";

const FormWrapper = styled.div`
    height: 100%;
    width: 340px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`;
const Name = styled.div`
    display: flex;
    gap: 10px;
    @media screen and (max-width: 525px) {
        flex-direction: column;
    }
`;
const CustomField = styled(Field)`
    border: 1px solid rgba(112, 112, 112, 1);
    border-radius: 2px;
    height: 48px;
    opacity: 0.57;
    padding: 14px;
    margin: 12px 0;
    font: normal normal normal 16px/21px Segoe UI;
    letter-spacing: 0px;
    color: #000000;
    opacity: 0.5;
`;

const OTPField = styled(Field)`
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #707070;
    border-radius: 32px;
    height: 63px;
    font: normal normal normal 22px/30px Segoe UI;
    letter-spacing: 0px;
    color: #000000;
    padding: 14px;
    margin: 3rem 0 1rem 0;
    max-width: 336px;
`;
// Wizard is a single Formik instance whose children are each page of the
// multi-step form. The form is submitted on each forward transition (can only
// progress with valid input), whereas a backwards step is allowed with
// incomplete data. A snapshot of form state is used as initialValues after each
// transition. Each page has an optional submit handler, and the top-level
// submit is called when the final page is submitted.

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Wizard = ({ children, initialValues, onSubmit }) => {
    const { requestotp, signup } = useAuth();

    const [stepNumber, setStepNumber] = useState(0);
    const steps = React.Children.toArray(children);

    //holds values entered in the fields even after switching steps
    const [snapshot, setSnapshot] = useState(initialValues);

    const step = steps[stepNumber];
    const totalSteps = steps.length;
    const isLastStep = stepNumber === totalSteps - 1;

    const next = (values) => {
        setSnapshot(values);
        setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
    };

    const previous = (values) => {
        setSnapshot(values);
        setStepNumber(Math.max(stepNumber - 1, 0));
    };

    const handleSubmit = async (values, bag) => {
        if (step.props.onSubmit) {
            if (step.props.onSubmit.step === 1) {
                await requestotp(values.email);
            } else if (step.props.onSubmit.step === 2) {
                await signup(values);
                // window.alert("Signed Up Successfully");
            }
        }
        if (isLastStep) {
            return onSubmit(values, bag);
        } else {
            bag.setTouched({});
            next(values);
        }
    };

    return (
        <Formik
            initialValues={snapshot}
            onSubmit={handleSubmit}
            validationSchema={step.props.validationSchema}
        >
            {(formik) => (
                <Form style={{ width: "100%" }}>
                    {step}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <div>
                            <ButtonNormalBig
                                disabled={formik.isSubmitting}
                                type="submit"
                                style={{ display: isLastStep ? "none" : "block" }}
                            >
                                {isLastStep ? "Enter" : "Sign Up"}
                            </ButtonNormalBig>
                        </div>
                        {stepNumber > 0 && (
                            <ButtonNormalSmall
                                onClick={() => previous(formik.values)}
                                type="button"
                                style={{ display: isLastStep ? "none" : "block" }}
                            >
                                Back
                            </ButtonNormalSmall>
                        )}
                    </div>
                    {/* <Debug /> */}
                </Form>
            )}
        </Formik>
    );
};

const WizardStep = ({ children }) => children;

const App = () => {
    return (
        <FormWrapper>
            <Wizard
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    otp: "",
                }}
            >
                <WizardStep
                    onSubmit={{ step: 1 }}
                    // validationSchema={Yup.object({
                    //     firstName: Yup.string().required("required"),
                    //     lastName: Yup.string().required("required"),
                    //     email: Yup.string().email("Invalid email address").required("required"),
                    //     password: Yup.string().required("required"),
                    // })}
                >
                    <h1>Sign Up</h1>
                    <p>It's quick and easy.</p>
                    <Name>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <CustomField
                                style={{ width: "100%" }}
                                autoComplete="given-name"
                                component="input"
                                id="firstName"
                                name="firstName"
                                placeholder="First Name"
                                type="text"
                                required="required"
                            />
                            {/* <ErrorMessage className="error" component="div" name="firstName" /> */}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <CustomField
                                style={{ width: "100%" }}
                                autoComplete="family-name"
                                component="input"
                                id="lastName"
                                name="lastName"
                                placeholder="Last Name"
                                type="text"
                                required="required"
                            />
                            {/* <ErrorMessage className="error" component="div" name="lastName" /> */}
                        </div>
                    </Name>
                    <div>
                        <CustomField
                            style={{ width: "100%" }}
                            autoComplete="email"
                            component="input"
                            id="email"
                            name="email"
                            placeholder="Email"
                            required="required"
                            type="email"
                        />
                        {/* <ErrorMessage className="error" component="div" name="email" /> */}
                    </div>
                    <div>
                        <CustomField
                            style={{ width: "100%" }}
                            component="input"
                            id="password"
                            name="password"
                            placeholder="Password"
                            type="password"
                            required="required"
                            minLength="8"
                        />
                        {/* <ErrorMessage className="error" component="div" name="password" /> */}
                    </div>
                </WizardStep>
                <WizardStep
                    style={{ width: "100%" }}
                    onSubmit={{ step: 2 }}
                    // validationSchema={Yup.object({
                    //     OTP: Yup.string().required("required"),
                    // })}
                >
                    <h1>OTP Sent!</h1>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <OTPField
                            style={{ borderRadius: "32px", width: "100%" }}
                            component="input"
                            id="otp"
                            name="otp"
                            placeholder="Enter your OTP"
                            type="number"
                            required="required"
                            minLength="4"
                        />
                        {/* <ErrorMessage className="error" component="div" name="otp" /> */}
                        <label htmlFor="email"></label>
                    </div>
                </WizardStep>
                <WizardStep style={{ width: "100%" }}>
                    <img src={checkcircle} style={{ width: "70px" }}></img>
                    <h1>Signed Up Successfully</h1>
                </WizardStep>
            </Wizard>
        </FormWrapper>
    );
};

export default App;
