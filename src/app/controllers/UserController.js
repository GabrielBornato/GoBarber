import User from '../models/User';

class UserController {
    async store(req, resp) {
        const userExist = await User.findOne({
            where: { email: req.body.email },
        });

        if (userExist) resp.status(400).json({ error: 'User Already exists.' });

        const { email, name, id, provider } = await User.create(req.body);
        return resp.json({ email, name, id, provider });
    };

    async update(req, resp) {
        const {email,oldPassword}= req.body;
        const user = await User.findByPk(req.userId);

        if(email!=user.email){
            const userExist = await User.findOne({
                where: { email },
            });

            if (userExist) resp.status(400).json({ error: 'User Already exists.' });
        }

        if(oldPassword && !(await user.checkPassword(oldPassword))){
            return resp.status(401).json({ error: 'Password does not match' });
        }

        const { name, id, provider } = await user.update(req.body);

        return resp.json({ email, name, id, provider });
    }
}

export default new UserController();
