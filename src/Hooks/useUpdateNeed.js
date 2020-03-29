import { useState, useEffect } from 'react';

const useUpdateNeed = (callback, neededList,need) => {


    const [item, setItem] = useState(need);

    const [values, setValues] = useState([])

    const setArr = () => {
        setValues({ neededList: [...neededList,item]
        })
    }

    //TODO: if there is no new value, take from place holder
    const handleChange = e => {
        //this is working fine
        const { name, value } = e.target
        setItem({
            ...item,
            [name]: value
        })
    }

    const handleSubmit = e => {
        // console.log(values)
        e.preventDefault();
        callback();
    }

    useEffect(() => {
        setArr();
    }, [item])


    return {
        handleChange,
        handleSubmit,
        values,
        item
    }
}

export default useUpdateNeed;