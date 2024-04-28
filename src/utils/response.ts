/**
 * @description send a response as answer of a succesful request
 * @param res express response to send a response 
 * @param data is a data to send
 * @param code request code
 * @param msg message
 */
export const succesfulResponse = (res, data, code = 200, msg = 'Successful') => {
    res.json({
        ok: true,
        msg,
        data
    })
}




/**
 * @description send a response as answer of a unsuccesful request
 * @param res 
 * @param error 
 * @param code 
 * @param msg 
 */
export const unSuccesfulResponse = (res, errors = { err: 'something went wrong. contact your server admistrator' }, code = 500, msg = 'Unsuccessful') => {
    res.json({
        ok: false,
        msg,
        errors
    })
}