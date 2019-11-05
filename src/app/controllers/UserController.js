import User from '../models/User';

class UserController {
    async store(req, resp) {
        const user = await User.create(req.body);
        return resp.json({ user });
    }
}

export default new UserController();
