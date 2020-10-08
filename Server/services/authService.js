const jwt           = require('jsonwebtoken')
const saltedMd5     = require('salted-md5')
const env           = require('../env')
const { isValidId } = require('../config/db_mongoDB')
const refTokenData  = require('../models/tokenData.model')
const User          = require('../models/usersData.model')

const getUser = async (id) => {
    if (!isValidId(id)) throw 'User not found';
    const user = await User.findById(id);
    if (!user) throw 'User not found';
    return user;
}

const generateJwtToken = (user) => {
    // create a jwt token containing the user id that expires in 60 minutes
    return jwt.sign(
        { 
            id : user._id,
            username: user.uname,
            role: user.role 
        }, 
        env.token_secret, 
        { 
            // expiresIn: '1h' 
            expiresIn: '1h'
        }
    )
}

const generateRefreshToken = (user) => {
    // create a refresh token that expires in 90 days
    return new refTokenData({
        user: user._id, // User ID
        token: saltedMd5(user._id, env.token_secret), // Generate Token with random string
        expires: new Date(Date.now() + 7*24*60*60*1000) // Expired date in 7 Days
    });
}

const getRefreshTokens = async (userId) => {
    // check that user exists
    await getUser(userId);

    // return refresh tokens for user
    const refreshTokens = await refTokenData.find({ user: userId })
    return refreshTokens
}

const getRefreshToken = async (token) => {
    const refreshToken = await refTokenData.findOne({ token }).populate('users_Data')
    if (!refreshToken || !refreshToken.isActive) throw 'Invalid token'
    return refreshToken;
}

const revokeToken = async ({ token }) => {
    const refreshToken = await getRefreshToken(token);

    // revoke token and save
    refreshToken.revoked = Date.now()
    await refreshToken.save();
}

const refreshToken = async ({ token }) => {
    const refreshToken = await getRefreshToken(token);
    const { user } = refreshToken;

    // replace old refresh token with a new one and save
    const newRefreshToken = generateRefreshToken(user)
    refreshToken.revoked = Date.now()
    refreshToken.replacedByToken = newRefreshToken.token
    await refreshToken.save()
    await newRefreshToken.save()

    // generate new jwt
    const jwtToken = generateJwtToken(user);

    // return basic details and tokens
    return { 
        data: {
            ...user
        },
        accessToken: jwtToken,
        refreshToken: newRefreshToken.token
    }
}

const setTokenCookie = async (res, token) => {
    // create http only cookie with refresh token that expires in 7 days
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(Date.now() + 7*24*60*60*1000)
    }
    res.cookie('refreshToken', token, cookieOptions);
}

module.exports = {
    generateJwtToken,
    generateRefreshToken,
    getRefreshTokens,
    getRefreshToken,
    revokeToken,
    refreshToken,
    setTokenCookie
}