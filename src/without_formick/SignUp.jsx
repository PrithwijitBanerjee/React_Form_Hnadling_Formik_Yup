import { useRef, useState } from "react"

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passErr, setPassErr] = useState('');
    const nameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();

    // on submit validation ...
    const validation = () => {
        let err = false;
        if (!name) {
            setNameErr(' ** Name is Required');
            nameRef.current.style.outline = '2px solid violet';
            err = true;
        } else if (!isNaN(name)) {
            setNameErr(' ** Digits not allowed in Name field');
            err = true;
            nameRef.current.style.outline = '2px solid violet';
        }

        if (!email) {
            setEmailErr(' ** Email Id is Required');
            err = true;
            emailRef.current.style.outline = '2px solid violet';
        } else if (email.search(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === -1) {
            setEmailErr(' ** Invalid Email Id');
            err = true;
            emailRef.current.style.outline = '2px solid violet';
        }

        if (!password) {
            setPassErr(' ** Password is Required');
            err = true;
            passRef.current.style.outline = '2px solid violet';

        } else if (password.search(/[A-Z]/) === -1) {
            setPassErr(' ** Password should contains atleast one uppercase character');
            err = true;
            passRef.current.style.outline = '2px solid violet';
        } else if (password.search(/[0-9]/) === -1) {
            setPassErr(' ** Password should contains atleast one digits');
            err = true;
            passRef.current.style.outline = '2px solid violet';
        } else if (password.search(/[$\@\*]/) === -1) {
            setPassErr(' ** Password should contains atleast one special character ($, *, @)');
            err = true;
            passRef.current.style.outline = '2px solid violet';
        }
        return err;
    }
    // on change validation ....
    const handleName = e => {
        if (!e.target.value) {
            setNameErr('@Name should not be Empty');
            setName('');
        } else if (e.target.value.length > 30) {
            setNameErr('@Name should not be greater than 30 characters');
        } else {
            setName(e.target.value);
            setNameErr('');
        }

    }
    const handleEmail = e => {
        if (!e.target.value) {
            setEmail('');
            setEmailErr('@Email Id should not be Empty');
        } else {
            setEmailErr('');
            setEmail(e.target.value);
        }
    }
    const handlePass = e => {
        if (!e.target.value) {
            setPassErr('@Password should not be empty');
            setPassword('');
        } else if (e.target.value.length > 8) {
            setPassErr('@Password length should not exceeded 8 characters');
            setPassword('');
        } else {
            setPassErr('');
            setPassword(e.target.value);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (!validation()) {
            const personObj = {
                name,
                email,
                password
            }
            console.log(personObj);
        }
    }

    const handleReset = e => {
        e.preventDefault();
        setName('');
        setEmail('');
        setPassword('');
        setNameErr('');
        setEmailErr('');
        setPassErr('');
        nameRef.current.style.outline = 'none';
        emailRef.current.style.outline = 'none';
        passRef.current.style.outline = 'none';
    }
    return (
        <div className="container d-flex justify-content-center">
            <div className="row">
                <div className="col-12">
                    <div className="card" style={{ width: '30rem' }}>
                        <div className="card-body">
                            <h5 className="card-title text-start mb-5">Sign Up Form</h5>
                            <div className="card-text text-start">
                                <form onSubmit={handleSubmit} onReset={handleReset}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Full Name</label>
                                        <input
                                            ref={nameRef}
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="your name"
                                            value={name}
                                            onChange={handleName}
                                        />
                                    </div>
                                    <span className="text-danger">{nameErr?.length !== 0 && nameErr}</span>
                                    <div className="mb-3">
                                        <label htmlFor="emailId" className="form-label">Email Id</label>
                                        <input
                                            ref={emailRef}
                                            type="text"
                                            className="form-control"
                                            id="emailId"
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={handleEmail}
                                        />
                                    </div>
                                    <span className="text-danger">{emailErr?.length !== 0 && emailErr}</span>
                                    <div className="mb-3">
                                        <label htmlFor="pass" className="form-label">Password</label>
                                        <input
                                            ref={passRef}
                                            type="password"
                                            className="form-control"
                                            id="pass"
                                            placeholder="your password"
                                            value={password}
                                            onChange={handlePass}
                                        />
                                    </div>
                                    <span className="text-danger">{passErr?.length !== 0 && passErr}</span><br /><br />
                                    <div className="d-flex justify-content-around">
                                        <button className="btn btn-outline-success" type="submit">SignUp</button>
                                        <button className="btn btn-outline-secondary" type="reset">Reset</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp