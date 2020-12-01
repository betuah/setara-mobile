const jwt           = require('jsonwebtoken') // Import jwt lib
const crypto        = require('crypto') // Import crypto
const saltedMd5     = require('salted-md5') // Import mdt salt
const env           = require('../env') // Import env var
const { isValidId } = require('../config/db_mongoDB') // Import isValidId function from mongodb config
const refTokenData  = require('../models/tokenData.model') // Import refreshToken model
const User          = require('../models/usersData.model') // Import User model

// Start Get User details
const getUser = async (id) => {
    if (!isValidId(id)) throw 'Invalid ID User. ID User must be an ObjectId' // Check if userId is objectId
    const user = await User.findById(id) // Find User data from model
    if (!user) throw 'User not found' // If user not found
    return user // If user data found
}
// End Get User details

// Start Generate Token
const generateJwtToken = (user) => {
    // create a jwt token containing the user id that expires in 30 minutes
    return jwt.sign(
        // Start Data PayLoad
        {
            id : user._id,
            username: user.username,
            status: user.status
        },
        // End Data PayLoad
        env.token_secret, // Set jwt secret
        {
            expiresIn: '120m' // Set token expire
            // expiresIn: '30'
        }
    )
}
// End generate token

// Start generate refresh token
const generateRefreshToken = (user) => {
    // create a refresh token that expires in 90 days
    return new refTokenData({ // return refresh token model function
        user: user._id, // User ID
        token: saltedMd5(user._id, crypto.randomBytes(16)), // Generate Token with random string
        expires: new Date(Date.now() + 7*24*60*60*1000) // Expired date in 7 Days
    })
}
// End generate refresh token

// Start verifying refreshToken
const getRefreshToken = async (token) => {
    const refreshToken = await refTokenData.findOne({ token }).populate('user')
    if (!refreshToken || !refreshToken.isActive) throw 'Invalid token'
    return refreshToken
}
// End verifying refreshToken

// Start Revoke token
const revokeToken = async ({ token }) => {
    const refreshToken = await getRefreshToken(token) // Verifying refresh token

    // revoke token and save
    refreshToken.revoked = Date.now()
    await refreshToken.save()
}
// End revoke token

// Start Generate New refresh and token function
const refreshToken = async ({ token }) => {
    try {
        const refreshToken = await getRefreshToken(token) // Verifying refresh token

        const { user } = refreshToken // Get User data

        // replace old refresh token with a new one and save
        const newRefreshToken = generateRefreshToken(user) // Generate New Refresh token
        refreshToken.revoked = Date.now() // Revoke old refresh token
        refreshToken.replacedByToken = newRefreshToken.token // Set replacebytoken field to old refresh token
        await refreshToken.save() // save revoked refreshToken to database
        await newRefreshToken.save() // Save new refreshToken to datebase

        // generate new jwt
        const jwtToken = generateJwtToken(user)

        // return basic details and tokens
        return {
            message: 'Your old token is expired. Set New Token!',
            accessToken: jwtToken,
            refreshToken: newRefreshToken.token
        }
    } catch (error) {
        throw error // Return any error
    }
}
// End Generate New refresh and token function

// Start Token Cookie
const setTokenCookie = async (res, token) => {
    // create http only cookie with refresh token that expires in 7 days
    const cookieOptions = {
        httpOnly: true, // Set http only
        maxAge : 7 * 24 * 60 * 60 * 1000,
        expires: new Date(Date.now() + 7*24*60*60*1000) // Set expire
    }
    res.cookie('refToken', token, cookieOptions)
}
// End Token Cookie

module.exports = {
    generateJwtToken,
    generateRefreshToken,
    getRefreshToken,
    revokeToken,
    refreshToken,
    setTokenCookie
}
