import { useRef, useState, useEffect } from "react";
// import {
//     faCheck,
//     faTimes,
//     fiInfoCircle,
// } from "@fortawesome/free-solid-svg-icons";
// import { fontAwesomIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register() {
    //USER INPUT FOCUS AND ERROR FOCUS
    const userRef = useRef();
    const errRef = useRef();

    //INPUT USER
    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    //INPUT PASSWORD
    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    //MATCHING PASSWORD
    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    //ERROR AND SUCCESS MESSAGE
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    //FOCUS WHEN PAGE LOADED
    useEffect(() => {
        userRef.current.focus();
    }, []);

    //USER VALIDATION
    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    //PASSWORD VALIDATION
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd, matchPwd]);

    return (
        <>
            <section>
                <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live="assertive"
                >
                    {errMsg}
                </p>
                <h1>Register</h1>
                <form>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        // aria-describedby={usernamenote}
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p id="usernamenote">Something wrong</p>
                </form>
            </section>
        </>
    );
}

export default Register;
