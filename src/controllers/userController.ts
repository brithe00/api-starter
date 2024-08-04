import { Request, Response, NextFunction } from "express";
import { userService } from "@/services/userService";
import {
  createUserSchema,
  updateUserSchema,
  User,
  CreateUserInput,
  UpdateUserInput,
} from "@/schema/userSchema";
import { ValidationError } from "@/utils/errors";
import { z } from "zod";

export class UserController {
  async getUser(
    req: Request<{ id: string }>,
    res: Response<User>,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const user = await userService.getUser(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: Request, res: Response<User[]>, next: NextFunction) {
    try {
      const users = await userService.getUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async createUser(
    req: Request<{}, {}, CreateUserInput>,
    res: Response<User>,
    next: NextFunction
  ) {
    try {
      const data = createUserSchema.parse(req.body);
      const user = await userService.createUser(data);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new ValidationError(error));
      } else {
        next(error);
      }
    }
  }

  async updateUser(
    req: Request<{ id: string }, {}, UpdateUserInput>,
    res: Response<User>,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const data = updateUserSchema.parse(req.body);
      const user = await userService.updateUser(id, data);
      res.json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(new ValidationError(error));
      } else {
        next(error);
      }
    }
  }

  async deleteUser(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
