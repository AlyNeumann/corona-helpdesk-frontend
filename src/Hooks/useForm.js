import { useState, useEffect } from 'react';
//pass input errors back to form

const useForm = (callback) => {

    //add a RememberMe value when new BE is ready 
    const [values, setValues] = useState({
        email: "",
        password: ""
    });
    //state for errors
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        //handle errors here 
        // setErrors(validate(values));
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

export default useForm;
