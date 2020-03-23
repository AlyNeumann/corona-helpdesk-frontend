import { useState, useEffect } from 'react';

const useSignUp = (callback, validate) => {
    const [values, setValues] = useState({
        "Name": "",
        "PhoneNumber": "",
        "Address": "",
        "Email": "",
        "Password": "",
        "HealthStatus": ""
    });

    //state for errors
    const [errors, setErrors] = useState({});
    //state for submitting 
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    // const handleCheck = () => {
    //     setValues({ ...values, AgreedToTerms: !values.AgreedToTerms })
    // }
    const handleSubmit = e => {
        e.preventDefault();
        //handle errors here 
        setErrors(validate(values));
        setIsSubmitting(true);

        callback();
    }

    //check to see if no errors, if none, call callback
    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }

    }, [errors])

    return {
        handleChange,
        handleSubmit,
        values,
        errors
    }

}

export default useSignUp;