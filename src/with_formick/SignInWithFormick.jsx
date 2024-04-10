import { useFormik } from 'formik';
const SignInWithFormick = () => {
    const formick = useFormik({
        initialValues: {
            emailId: '',
            pass: ''
        },
        validate: values => {
            const errors = {};
            if (!values?.emailId) {
                errors.emailId = ' **EmailId is Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailId)) {
                errors.emailId = ' **Invalid Email Id';
            }

            if (!values?.pass) {
                errors.pass = ' **Password is Required';
            } else if (values?.pass?.length > 8) {
                errors.pass = ' **Password should not exceeded 8 characters';
            } else if (values?.pass?.search(/[A-Z]/) === -1) {
                errors.pass = ' **Password should contains atleast one Uppercase character';
            } else if (values?.pass?.search(/[0-9]/) === -1) {
                errors.pass = ' **Password should contains atleast one Digits';
            } else if (values?.pass?.search(/[@\$\&\*]/) === -1) {
                errors.pass = ' **Password should contains atleast one Special character (@, $, &, *)';
            }
            return errors;
        },
        onSubmit: (values, {resetForm}) => {
            resetForm({
                emailId: '',
                pass: ''
            })
            console.log('values: ', values);
        }
    })
    return (
        <div className='container d-flex justify-content-center h-100 align-items-center'>
            <div className="row">
                <div className="col-12">
                    <div className="card" style={{ width: '30rem' }}>
                        <div className="card-body">
                            <h5 className="card-title text-start">SignIn With Formick</h5>
                            <div className="card-text text-start">
                                <form onSubmit={formick?.handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="emailId" className="form-label">Email address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="emailId"
                                            placeholder="name@example.com"
                                            value={formick?.values?.emailId}
                                            onChange={formick?.handleChange}
                                            onBlur={formick.handleBlur}
                                        />
                                        <span className='text-danger'>{formick?.touched?.emailId && formick?.errors && formick?.errors?.emailId}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="pass" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="pass"
                                            placeholder="your password"
                                            value={formick?.values?.pass}
                                            onChange={formick?.handleChange}
                                            onBlur={formick.handleBlur}
                                        />
                                        <span className='text-danger'>{formick?.touched?.pass && formick?.errors && formick?.errors?.pass}</span>
                                    </div>
                                    <button type="submit" className="btn btn-outline-success">SignIn</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInWithFormick