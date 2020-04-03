import { useState } from 'react';

const useUpdateNeed = (callback, need, _id) => {


    // const [item, setItem] = useState(need);

    const [values, setValues] = useState({
        _id: _id,
        needType: need.needType || "",
        needDescription: need.needDescription || "",
        exchangeType: need.exchangeType || "",
        exchangeDescription: need.exchangeDescription || ""
    })

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

export default useUpdateNeed;