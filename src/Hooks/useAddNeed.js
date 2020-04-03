import { useState } from 'react';

const useAddNeed = (callback) => {


    // const [item, setItem] = useState(need);

    const [values, setValues] = useState({
        needType: "",
        needDescription: "",
        exchangeType: "",
        exchangeDescription: ""
    })

    //TODO: if there is no new value, take from place holder
    const handleChange = e => {
        //this is working fine
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