const generateAccessTokenUseCase = require('../../login/generate_accesstoken_usecase')

module.exports = function (req, res, next) {

        console.log(req.body)

        if (!req.body.refreshToken) {
            return res.status(400).json({message: "can not find req.body.refreshtoken"}).end()
        }

        return generateAccessTokenUseCase.execute(req.body.refreshToken, function (err, newAccessToken) {
            if (err) {return res.status(401).json({message: err}).end()}
            if (!newAccessToken) {return res.status(500).json({message: "failed"}).end()}

            return res.status(200).json({accessToken: newAccessToken}).end()
        })
}