import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, resp) => {
    return resp.json({ message: 'hello word' });
});

export default routes;
