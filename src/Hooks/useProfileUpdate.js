import { useState, useEffect } from 'react';

const useSignUp = (callback) => {
    const [values, setValues] = useState({
        "name": "",
        "location": "",
        "healthStatus": "",
        "contactInfo": "",
        "emergencyContact": "",
        "img": "",
        "coords": ""
    });

    // //state for errors
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

    const handleSubmit = e => {
        e.preventDefault();
        //handle errors here 
        // setErrors(validate(values));
        console.log(values);
        setIsSubmitting(true);

        callback();
    }

    const handleLocation = place => {
        setValues({ ...values, coords: place })
    }

    const handleImage = (img) => {
        setValues({...values, img: img})
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
        handleImage,
        handleLocation,
        values,
        errors
    }

}

export default useSignUp;