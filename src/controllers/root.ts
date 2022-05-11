import { Request, Response, Router } from 'express';

export class RootController {
    private router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/', RootController.index);
        this.router.post('/', RootController.dummyPost);
    }

    getRouter(): Router {
        return this.router;
    }

    static index(_: Request, res: Response): Response {
        return res.status(200).json({ status: 'ok' });
    }

    static dummyPost(_Reqest, res: Response): Response {
        return res.status(200).json({ status: "you aren't supposed to be posting here dummy OwO" });
    }
}
