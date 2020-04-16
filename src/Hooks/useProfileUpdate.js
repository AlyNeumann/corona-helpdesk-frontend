import { useState, useEffect } from 'react';
//this will need to be form data for image 

const useSignUp = (callback, userId) => {

    //TODO: are the coords right for house location? look at how this is being sent...
    
    const [values, setValues] = useState({
        id: userId,
        name: "",
        location: "",
        healthStatus: "",
        phoneNumber: "",
        emergencyContacts: [],
        img: "",
        coords: ""
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