const errorHandler = (err, req, res, next) => {
    let statusCode
    let message

    switch (err.message) {
        case "Missing_Token":
            statusCode = 401
            message = "Missing access token"
            break
        // case "not_found":
        //     statusCode = 404
        //     message = "User not registered"
        //     break
        case "User_Not_Registered":
            statusCode = 404
            message = "User not registered"
            break
        default:
            console.log(err)
            statusCode = 500
            message = "Internal server error"
            break
    }

    return res.status(statusCode).json({
        success: false,
        message
    })
}

export default errorHandler