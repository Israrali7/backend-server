const BookController = {
    get: (req, res) => {
        try {

        } catch (error) {
            res.status(400).json(sendResponse(false, "There Is an Err", error.message))
        }
    },
    Protected: (req, res, next) => {
        try {
            const token = req.headers?.authorization?.split(" ")[1]
            if (!token) {
                res.status(401).json()
            }
            Jwt.verify(token, "qwerty123456",)
            res.status(200).json(sendResponse(true, "SuccessFully LogIn", {
                user: ex
            }))
        }
        catch (error) {

        }
    }
}

module.exports = BookController;