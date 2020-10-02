const createUserUsecase = require('../../user/CreateUserUseCase')

module.exports = function (req, res, next) {
    const reqUser = req.body.user
    if (!reqUser) return res.status(400).json({message : "user is missing"})
    console.log("create new user")
    const param = createUserUsecase.param(reqUser.email, reqUser.name, reqUser.avatar)
    createUserUsecase.execute(param, function (err) {
        console.log("create new user")

        if (err) return res.status(400).json({message: "can not create user: " + err})
        console.log('create user success')
        console.log("create new user")

        return res.status(200).json({message: "Create new user success"})
    })
}