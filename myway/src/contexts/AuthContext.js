import React, { useState, useContext, useEffect } from "react";
import backend from "../apis/index";
import history from "../history";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(false);
    // const [loading, setLoading] = useState(true);

    const requestotp = async (email) => {
        try {
            const otp = {
                email,
            };
            await backend.post(`/api/register/`, otp);
            return true;
        } catch (err) {
            console.log(err);
        }
        return false;
    };
    const signup = async (values) => {
        try {
            const newUser = {
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email,
                password: values.password,
                otp: values.otp,
            };
            await backend.post(`/api/register/verify`, newUser);
            // history.push("/dashboard");
            return true;
        } catch (err) {
            console.log(err);
        }
        return false;
    };

    // async function login(email, password) {
    const login = async (email, password) => {
        try {
            const user = {
                email,
                password,
            };
            const loggingIn = await backend.post(`/api/login`, user);
            if (loggingIn.data.status === true) {
                localStorage.setItem("auth-token", loggingIn.data.token);
                setCurrentUser(true);
                return loggingIn.data;
            }
        } catch (err) {
            console.log(err.response.data);
            return err.response.data;
        }
        // return false;
    };

    function logout() {
        localStorage.removeItem("auth-token");
        setCurrentUser(false);
        return true;
    }

    // function resetPassword(email) {
    //     return auth.sendPasswordResetEmail(email);
    // }

    // function updateEmail(email) {
    //     return currentUser.updateEmail(email);
    // }

    // function updatePassword(password) {
    //     return currentUser.updatePassword(password);
    // }

    // function current() {
    //     const token = localStorage.getItem("auth-token");
    //     if (token) {
    //         const getUser = async () => {
    //             try {
    //                 const response = await backend.get("/api/", {
    //                     headers: {
    //                         "x-auth-token": token,
    //                     },
    //                 });
    //                 if (response.data.status === "authenticated") {
    //                     setCurrentUser(true);
    //                 } else {
    //                     localStorage.removeItem("auth-token");
    //                     setCurrentUser(false);
    //                 }
    //             } catch (error) {
    //                 console.log(error);
    //             }
    //         };
    //         getUser();
    //     } else {
    //         console.log("Token not present");
    //     }
    // }

    useEffect(() => {
        const token = localStorage.getItem("auth-token");
        const getUser = async () => {
            try {
                const response = await backend.get("/api/", {
                    headers: {
                        "x-auth-token": token,
                    },
                });
                if (response.data.status === true) {
                    setCurrentUser(true);
                } else {
                    localStorage.removeItem("auth-token");
                    setCurrentUser(false);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getUser();
    }, [currentUser]);

    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged((user) => {
    //         setCurrentUser(user);
    //         setLoading(false);
    //     });
    //     return unsubscribe;
    // }, []);

    const value = {
        requestotp,
        signup,
        login,
        logout,
        currentUser,
        // signup,
        // login,
        // logout,
        // resetPassword,
        // updatePassword,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    // return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
