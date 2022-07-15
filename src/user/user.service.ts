import { Request } from 'express';

export class UserService {
  dashboard(req: Request) {
    return req.user;
  }
}
