import { useState } from 'react';

const useUpdateNeed = (callback) => {


    const [values, setValues] = useState({
        need: "",
        quantity: "",
        exchange: ""
    });
 

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        callback();
    }


    return {
        handleChange,
        handleSubmit,
        values
    }
}

export default useUpdateNeed;