import { useState, useEffect } from 'react';

const useSignUp = (callback, validate) => {
    const [values, setValues] = useState({
        "name": "",
        "phoneNumber": "",
        "coords": "",
        "address": "",
        "email": "",
        "password": "",
        "healthStatus": "",
        "emergencyContacts": ""
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

    const handleSubmit = e => {
        e.preventDefault();
        //handle errors here 
        setErrors(validate(values));
        console.log(values);
        setIsSubmitting(true);

        callback();
    }

    const handleLocation = place => {
      //TODO: fix this once the values coming back from map work....
      if(place.geometry){
        console.log(place.place_name + ' ' + place.geometry.coordinates)
      }
    
        // setValues({ ...values, coords: coords, address: address})
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
        values,
        errors
    }

}

export default useSignUp;