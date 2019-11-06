import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
    async store(req, resp) {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email },
        });

        if (!user) return resp.status(401).json({ error: 'User not found' });

        if (!(await user.checkPassword(password)))
            return resp.status(401).json({ error: 'User not found' });

        const { id, name } = user;

        return resp.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();
