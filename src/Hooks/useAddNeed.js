import { useState } from 'react';

const useAddNeed = (callback) => {


    const [values, setValues] = useState({
        needType: "",
        needDescription: "",
        exchangeType: "",
        exchangeDescription: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = e => {
        // console.log(values)
        e.preventDefault();
        callback();

    }



    return {
        handleChange,
        handleSubmit,
        values
    }
}

export default useAddNeed;