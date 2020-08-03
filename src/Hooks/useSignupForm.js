import { useState, useEffect } from 'react';

const useSignUp = (callback, validate) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        emergencyContacts: [],
        healthStatus: "",
        homeLocation: {}
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

    //push emergency contacts into array
    const handleEmergency = e => {
        const newEmergencyContact = values.emergencyContacts;

        if (e.target.name === "emergencyContacts") {
            newEmergencyContact[0] = e.target.value
            setValues({ ...values, emergencyContacts: newEmergencyContact })
        } else {
            
            
                newEmergencyContact[1] = e.target.value
            
            setValues({ ...values, emergencyContacts: newEmergencyContact })

        }
        ;
    }



    const handleSubmit = e => {
        e.preventDefault();
        //handle errors here 
        setErrors(validate(values));
        console.log(values);
        setIsSubmitting(true);

        callback();
    }

    //lat and lng + address
    const handleLocation = (address, coords) => {
        // console.log(address,coords)
            setValues({
                ...values,
                homeLocation: coords
            })
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
        handleLocation,
        handleEmergency,
        values,
        errors
    }

}

export default useSignUp;