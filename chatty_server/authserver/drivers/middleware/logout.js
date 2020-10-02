const logoutusecase = require('../../account/LogoutUseCase')

module.exports = function (req, res, next) {
    logoutusecase.execute(req.email, function (err, result) {
        if (err) return res.status(400).json({message: "Logout failed"})
        return res.status(200).json ({message: "Logout Sucess"})
    })
}