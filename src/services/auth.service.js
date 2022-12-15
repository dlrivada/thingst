const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { User } = require('../mocks/models/user.model');

const { config } = require('./../config/config');
const UserService = require('./user.service');
const service = new UserService();

class AuthService {
    constructor() {}

    signToken(user) {
        const payload = {
          sub: user.id,
          role: user.role
        }
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiration });
        return {
          user,
          token
        };
    }

    // login
    async login(user) {
        const { email, password } = user;
        return await
        service.findOne({
            where: {
                email: email
            }
        })
        .then (async user => {
            if (!user) {
                throw boom.unauthorized('invalid credentials');
            }
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                throw boom.unauthorized('invalid credentials');
            }

            const payload = {
                sub: user.id,
                role: user.role
            }
            const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiration });   
            const refreshToken = await models.RefreshToken.createToken(user);
    
            let authorities = [];
            user.getRoles().then(roles =>
            roles.forEach(rol => {
                authorities.push("ROLE_" + rol.name.toUpperCase());  
            }));
    
            return {
                id: user.id,
                username: user.name,
                email: user.email,
                roles: authorities,
                accessToken: token,
                refreshToken: refreshToken,
            };
        })
        .catch(err => {
            throw boom.internal(`mesaje de error: ${err.message}`);
        })
    }

    // register
    async register(user) {
        const { email, password } = user;
        const userExists = await service.findOne(email);
        if (userExists) {
            throw boom.badRequest('user already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        return await service.create({ ...user, password: hashedPassword });
    }

    // forgot-password
    async forgotPassword(email) {
        return await
        service.findOne({
            where: {
                email: email
            }
        })
        .then (async user => {
            if (!user) {
                throw boom.notFound('user not found');
            }
            const payload = {
                sub: user.id,
                name: user.name,
                email: user.email,
                oneTimeToken: true
            };
            const token = jwt.sign(payload, config.jwtSecret, {
                expiresIn: '15m'
            });
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'user',   
                    pass: 'password'
                }
            });
            const info = await transporter.sendMail({
                from: `"Fred Foo 👻" <${config.mailerEmail}>`,
                to: email,
                subject: 'Forgot Password ✔',
                text: `To reset your password copy and paste this link in your browser: ${config.hostUrlApiV1Auth}/reset-password?token=${token}. This link will expire in 15 minutes. If you did not request a password reset, please ignore this email. Thanks, Team Company`,
                html: `<b>Follow this link to reset your password</b> <br> <a href="${config.hostUrlApiV1Auth}/reset-password?token=${token}">Reset Password</a> <br> <p>Or copy and paste this link in your browser: ${config.hostUrlApiV1Auth}/reset-password?token=${token}</p> <br> <p>This link will expire in 15 minutes.</p> <br> <p>If you did not request a password reset, please ignore this email.</p> <br> <p>Thanks,</p> <br> <p>Team</p> <br> <p>Company</p>`,
            });
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            return { message: 'We send you an email. Please check your inbox.', token: token, user: payload };
        })
        .catch(err => {
            throw boom.internal(`mesaje de error: ${err.message}`);
        })
    }

    // reset-password
    async resetPassword(token, password) {
        const { email } = jwt.verify(token, config.jwtSecret);
        return await
        service.findOne({
            where: {
                email: email
            }
        })
        .then (async user => {
            if (!user) 
                throw boom.notFound('user not found');           

            user.password = await bcrypt.hash(password, 10);
            UserService.update(user.id, user);
            return { message: 'Password reset successfully' };
        })
        .catch(err => {
            throw boom.internal(`mesaje de error: ${err.message}`);
        })
    }

    // change-password
    async changePassword(id, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await service.update(id, { password: hashedPassword });
    }

    // change-email
    async changeEmail(id, email) {
        const userExists = await service.findOne(email);
        if (userExists) {
            throw boom.badRequest('user already exists');
        }
        return await service.update(id, { email });
    }

    // verify-email
    async verifyEmail(token) {
        const decodedToken = jwt.verify(token, config.authJwtSecret);
        return await service.update(decodedToken.sub, { verified: true });
    }

    // verify-phone
    async verifyPhone(token) {
        const decodedToken = jwt.verify(token, config.authJwtSecret);
        return await service.update(decodedToken.sub, { verified: true });
    }

    // change-phone
    async changePhone(id, phone) {
        const userExists = await service.findOne(phone);
        if (userExists) {
            throw boom.badRequest('user already exists');
        }
        return await service.update(id, { phone });
    }

    // verify-otp
    async verifyOtp(token) {
        const decodedToken = jwt.verify(token, config.authJwtSecret);
        return await service.update(decodedToken.sub, { verified: true });
    }

    // change-otp
    async changeOtp(id, otp) {
        const userExists = await service.findOne(otp);
        if (userExists) {
            throw boom.badRequest('user already exists');
        }
        return await service.update(id, { otp });
    }

    async validateUser(token) {
        try {
            const decodedToken = jwt.verify(token, config.authJwtSecret);
            const user = await service.findOne(decodedToken.email);
            if (!user) {
                return { isValid: false };
            }
            const credentials = {
                id: user.id,
                name: user.name,
                email: user.email,
                scopes: user.scopes
            };
            return { isValid: true, credentials };
        } catch (err) {
            return { isValid: false };
        }
    }

    async validateAdmin(token) {
        try {
            const decodedToken = jwt.verify(token, config.jwtSecret);
            const user = await service.findOne(decodedToken.sub);
            if (!user || user.role !== 'admin') {
                return { isValid: false };
            }
            const credentials = {
                id: user.id,
                name: user.name,
                email: user.email,
                scopes: user.scopes
            };
            return { isValid: true, credentials };
        } catch (err) {
            return { isValid: false };
        }
    }

    async validateScope(token, scope) {
        try {
            const decodedToken = jwt.verify(token, config.authJwtSecret);
            const user = await service.findOne(decodedToken.email);
            if (!user || !user.scopes.includes(scope)) {
                return { isValid: false };
            }
            const credentials = {
                id: user.id,
                name: user.name,
                email: user.email,
                scopes: user.scopes
            };
            return { isValid: true, credentials };
        } catch (err) {
            return { isValid: false };
        }
    }

    async validateScopes(token, scopes) {
        try {
            const decodedToken = jwt.verify(token, config.authJwtSecret);
            const user = await service.findOne(decodedToken.email);
            if (!user || !user.scopes.some(r => scopes.includes(r))) {
                return { isValid: false };
            }
            const credentials = {
                id: user.id,
                name: user.name,
                email: user.email,
                scopes: user.scopes
            };
            return { isValid: true, credentials };
        } catch (err) {
            return { isValid: false };
        }
    }

    async validateAllScopes(token, scopes) {
        try {
            const decodedToken = jwt.verify(token, config.authJwtSecret);
            const user = await service.findOne(decodedToken.email);
            if (!user || !user.scopes.every(r => scopes.includes(r))) {
                return { isValid: false };
            }
            const credentials = {
                id: user.id,
                name: user.name,
                email: user.email,
                scopes: user.scopes
            };
            return { isValid: true, credentials };
        } catch (err) {
            return { isValid: false };
        }
    }

    async validateAnyScope(token, scopes) {
        try {
            const decodedToken = jwt.verify(token, config.authJwtSecret);
            const user = await service.findOne(decodedToken.email);
            if (!user || !user.scopes.some(r => scopes.includes(r))) {
                return { isValid: false };
            }
            const credentials = {
                id: user.id,
                name: user.name,
                email: user.email,
                scopes: user.scopes
            };
            return { isValid: true, credentials };
        } catch (err) {
            return { isValid: false };
        }
    }

    // validate-role
    async validateRole(token, role) {
        try {
            const decodedToken = jwt.verify(token, config.authJwtSecret);
            const user = await service.findOne(decodedToken.email);
            if (!user || user.role !== role) {
                return { isValid: false };
            }
            const credentials = {
                id: user.id,
                name: user.name,
                email: user.email,
                scopes: user.scopes
            };
            return { isValid: true, credentials };
        } catch (err) {
            return { isValid: false };
        }
    }

    // validate-roles
    async validateRoles(token, roles) {
        try {
            const decodedToken = jwt.verify(token, config.authJwtSecret);
            const user = await service.findOne(decodedToken.email);
            if (!user || !roles.includes(user.role)) {
                return { isValid: false };
            }
            const credentials = {
                id: user.id,
                name: user.name,
                email: user.email,
                scopes: user.scopes
            };
            return { isValid: true, credentials };
        } catch (err) {
            return { isValid: false };
        }
    }

    // validate-all-roles
    async validateAllRoles(token, roles) {
        try {
            const decodedToken = jwt.verify(token, config.authJwtSecret);
            const user = await service.findOne(decodedToken.email);
            if (!user || !roles.every(r => user.role.includes(r))) {
                return { isValid: false };
            }
            const credentials = {
                id: user.id,
                name: user.name,
                email: user.email,
                scopes: user.scopes
            };
            return { isValid: true, credentials };
        } catch (err) {
            return { isValid: false };
        }
    }

    // validate-any-roles
    async validateAnyRoles(token, roles) {
        try {
            const decodedToken = jwt.verify(token, config.authJwtSecret);
            const user = await service.findOne(decodedToken.email);
            if (!user || !roles.some(r => user.role.includes(r))) {
                return { isValid: false };
            }
            const credentials = {
                id: user.id,
                name: user.name,
                email: user.email,
                scopes: user.scopes
            };
            return { isValid: true, credentials };
        } catch (err) {
            return { isValid: false };
        }
    }

    // validate-All-permissions
    async validateAllPermissions(token, permissions) {
        try {
            const decodedToken = jwt.verify(token, config.authJwtSecret);
            const user = await service.findOne(decodedToken.email);
            if (!user || !permissions.every(r => user.permissions.includes(r))) {
                return { isValid: false };
            }
            const credentials = {
                id: user.id,
                name: user.name,
                email: user.email,
                scopes: user.scopes
            };
            return { isValid: true, credentials };
        } catch (err) {
            return { isValid: false };
        }
    }

    // validate-any-permissions
    async validateAnyPermissions(token, permissions) {
        try {
            const decodedToken = jwt.verify(token, config.authJwtSecret);
            const user = await service.findOne(decodedToken.email);
            if (!user || !permissions.some(r => user.permissions.includes(r))) {
                return { isValid: false };
            }
            const credentials = {
                id: user.id,
                name: user.name,
                email: user.email,
                scopes: user.scopes
            };
            return { isValid: true, credentials };
        } catch (err) {
            return { isValid: false };
        }
    }

    // validate-permissions
    async validatePermissions(token, permissions) {
        try {
            const decodedToken = jwt.verify(token, config.authJwtSecret);
            const user = await service.findOne(decodedToken.email);
            if (!user || !user.permissions.some(r => permissions.includes(r))) {
                return { isValid: false };
            }
            const credentials = {
                id: user.id,
                name: user.name,
                email: user.email,
                scopes: user.scopes
            };
            return { isValid: true, credentials };
        } catch (err) {
            return { isValid: false };
        }
    }

    // validate-permission
    async validatePermission(token, permission) {
        try {
            const decodedToken = jwt.verify(token, config.authJwtSecret);
            const user = await service.findOne(decodedToken.email);
            if (!user || !user.permissions.includes(permission)) {
                return { isValid: false };
            }
            const credentials = {
                id: user.id,
                name: user.name,
                email: user.email,
                scopes: user.scopes
            };
            return { isValid: true, credentials };
        } catch (err) {
            return { isValid: false };
        }
    }

    // validate-All-roles-permissions
    async validateAllRolesPermissions(token, roles, permissions) {
        try {
            const decodedToken = jwt.verify(token, config.authJwtSecret);
            const user = await service.findOne(decodedToken.email);
            if (!user || !roles.every(r => user.role.includes(r)) || !permissions.every(r => user.permissions.includes(r))) {
                return { isValid: false };
            }
            const credentials = {
                id: user.id,
                name: user.name,
                email: user.email,
                scopes: user.scopes
            };
            return { isValid: true, credentials };
        } catch (err) {
            return { isValid: false };
        }
    }

    // validate-any-roles-permissions
    async validateAnyRolesPermissions(token, roles, permissions) {
        try {
            const decodedToken = jwt.verify(token, config.authJwtSecret);
            const user = await service.findOne(decodedToken.email);
            if (!user || !roles.some(r => user.role.includes(r)) || !permissions.some(r => user.permissions.includes(r))) {
                return { isValid: false };
            }
            const credentials = {
                id: user.id,
                name: user.name,
                email: user.email,
                scopes: user.scopes
            };
            return { isValid: true, credentials };
        } catch (err) {
            return { isValid: false };
        }
    }

    // validate-All-roles-permission
    async validateAllRolesPermission(token, roles, permission) {
        try {
            const decodedToken = jwt.verify(token, config.authJwtSecret);
            const user = await service.findOne(decodedToken.email);
            if (!user || !roles.every(r => user.role.includes(r)) || !user.permissions.includes(permission)) {
                return { isValid: false };
            }
            const credentials = {
                id: user.id,
                name: user.name,
                email: user.email,
                scopes: user.scopes
            };
            return { isValid: true, credentials };
        } catch (err) {
            return { isValid: false };
        }
    }

    // validate-any-roles-permission
    async validateAnyRolesPermission(token, roles, permission) {
        try {
            const decodedToken = jwt.verify(token, config.authJwtSecret);
            const user = await service.findOne(decodedToken.email);
            if (!user || !roles.some(r => user.role.includes(r)) || !user.permissions.includes(permission)) {
                return { isValid: false };
            }
            const credentials = {
                id: user.id,
                name: user.name,
                email: user.email,
                scopes: user.scopes
            };
            return { isValid: true, credentials };
        } catch (err) {
            return { isValid: false };
        }
    }

    //refresh-token
    async refreshToken(token) {
        if (token == null) 
            throw boom.forbidden('Refresh Token is required!');
                
        let refreshToken = await models.RefreshToken.findOne({ where: { token: token } });
    
        console.log(refreshToken)
    
        if (!refreshToken) 
            throw boom.forbidden('Refresh token is not in database!');
    
        if (models.RefreshToken.verifyExpiration(refreshToken)) {
            models.RefreshToken.destroy({ where: { id: refreshToken.id } });
            throw boom.forbidden('Refresh token was expired. Please make a new signin request');
        }
    
        const user = await refreshToken.getUser();
        const payload = {
            sub: user.id,
            role: user.role
        }
        let newAccessToken = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiration });
    
        return {
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        };
    }

    //logout
    async logout(token) {
        const decodedToken = jwt.verify(token, config.jwtSecret);
        if (!decodedToken) 
            throw boom.notFound('user not found');
        
        const userId = await service.findOne(decodedToken.sub);
        if (!userId) 
            throw boom.notFound('user not found');
        
        const refreshToken = await models.RefreshToken.findOne({ where: { userId: userId.id } });
        if (!refreshToken)
            throw boom.notFound('refresh token not found');

        await service.update(userId.id, { refreshToken: null });
        await models.RefreshToken.destroy({ where: { id: refreshToken.id } });
        return { message: 'logout successfully' };
    }

    //logout all
    async logoutAll(token) {
        const decodedToken = jwt.verify(token, config.jwtSecret);
        const userId = await service.findOne(decodedToken.sub);
        if (!userId) 
            throw boom.notFound('user not found');
        
        let authorities = [];
        authorities = await models.Authority.findAll({ where: { userId: userId.id } });
        if (!authorities)
            throw boom.notFound('authorities not found');           
        if (!authorities.includes('admin'))
            throw boom.unauthorized('Not authorized to perform this action');

        const users = await service.findAll();
        if (!users)
            throw boom.notFound('users not found');
        
        users.forEach(async user => {
            await service.update(user.id, { refreshToken: null });
            await models.RefreshToken.destroy({ where: { userId: user.id } });
        });
    }


}

module.exports = AuthService;