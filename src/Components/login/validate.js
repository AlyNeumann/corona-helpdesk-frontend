//function to validate errors
//email - string be more than 0 chars & string to be email
//password - string more than 0 chars, be more than 8 chars 

export default function validate(values){
    let errors = {}
    console.log(values.email);
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)){
        errors.email = "Email address is invalid";
    }
    if(!values.password){
        errors.password = "Password is required"
    }else if(values.password.length < 8){
        errors.password = "Password is invalid";
    }
    return errors;
}