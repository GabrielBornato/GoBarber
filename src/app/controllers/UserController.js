import User from '../models/User';

class UserController {
    async store(req, resp) {
        const userExist = await User.findOne({
            where: { email: req.body.email },
        });

        if (userExist) resp.status(400).json({ error: 'User Already exists.' });

        const { email, name, id, provider } = await User.create(req.body);
        return resp.json({ email, name, id, provider });
    }
}

export default new UserController();
