const logoutusecase = require('../../account/logout_usecase')

module.exports = function (req, res, next) {
    return logoutusecase.execute(req.email, function (err, result) {
        if (err) return res.status(400).json({message: "Logout failed"})
        return res.status(200).json ({message: "Logout Sucess"})
    })
}