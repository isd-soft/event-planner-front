
/**
 * Check if name is valid
 * @prop String name
 * @returns Boolean
 */
export const isName = (name) => {
    const re = /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/;
    return re.test(name);
}

/**
 * Check if surname is valid
 * @prop String surname
 * @returns Boolean
 */
export const isSurname = (surname) => {
    const re = /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/;
    return re.test(surname);
}

/**
 * Check if email is valid
 * @prop String email
 * @returns Boolean
 */
export const isEmail = (email) => {
    const re =/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    return re.test(email);
}

/**
 * Check if vatiable is empty
 * @prop String thing
 * @returns Boolean
 */
export const isEmpty = (thing) => {
    let empty = false;

    switch (typeof thing) {
        case 'undefined':
            empty = true;
            break;
        case 'string':
            if (thing.trim().length === 0) {
                empty = true;
            }
            break;
        case 'object':
            if (thing === null) {
                empty = true;
            } else if (Object.keys(thing).length === 0) {
                empty = true;
            }
    }

    return empty;
}

/**
 * Check length of the string greater than
 * @prop String|Integer str
 * @prop boolean|options.trim Trim input before validating
 * @prop number|options.lt Check if length less than lt
 * @prop number|options.lte Check if length is less than or equals to lte
 * @prop number|options.gt Check if length is greater than gt
 * @prop number|options.gte Check if length is greater than or equals to gte
 * @returns Boolean
 */
export const isLength = (str, options) => {

    if (isEmpty(options)) {
        throw "Who will provide the options you?"
    }

    let isValid = true;

    if (['string', 'number'].indexOf(typeof str) === -1) {
        isValid = false;
    } else {
        // Convert to string incase it's number
        let len = 0;

        if(options.trim){
            len = str.toString().trim().length;
        } else {
            len = str.toString().length;
        }

        if (typeof options.lt === 'number' && len >= options.lt) {
            isValid = false;
        } else if (typeof options.lte === 'number' && len > options.lte) {
            isValid = false;
        } else if (typeof options.gt === 'number' && len <= options.gt) {
            isValid = false;
        } else if (typeof options.gte === 'number' && len < options.gte) {
            isValid = false;
        }
    }

    return isValid;
}

/**
 * Check if string contains whitespaces
 * @prop String str
 * @returns Boolean
 */
export const isContainWhiteSpace = (str) => {

    if(typeof str === 'string' || typeof str === 'number'){
        return str.toString().trim().indexOf(' ') !== -1;
    } else {
        return false;
    }
}



export const passwordMatching=(str1, str2)=>{

    if(str1===str2){
        return true;
    }else{return false;}

}


