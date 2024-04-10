import { useFormik } from 'formik';
import * as Yup from 'yup';

const getCharacterValidationError = str => {
    return `Your password must have at least 1 ${str} character`;
};

const SignInWithFormikYup = () => {
    const formick = useFormik({
        initialValues: {
            emailId: '',
            pass: ''
        },
        validationSchema: Yup.object({
            emailId: Yup.string().email('@Invalid Email Id').required('**Email Id is Required'),
            pass: Yup.string()
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .matches(/[0-9]/, getCharacterValidationError("digit"))
                .matches(/[a-z]/, getCharacterValidationError("lowercase"))
                .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
                .matches(/[@\$\*\&]/, getCharacterValidationError("special character(@, $, *, &"))
                .required('**Password is Required')
        }),
        onSubmit: (values, { resetForm }) => {
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
                            <h5 className="card-title text-start">SignIn With Formick Yup</h5>
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

export default SignInWithFormikYup