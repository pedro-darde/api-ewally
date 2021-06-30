import { Request, Response } from "express";
export default {
  async get(req: Request, res: Response) {
    const { codigo } = req.params;

    return res.status(201).json({ codigo });
  },
};
