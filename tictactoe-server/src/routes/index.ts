import { Router, Request, Response } from "express";
import * as controller from "../controllers/game";
const router = Router();

router.get("/getField", (req: Request, res: Response) =>
  res.send(controller.getField())
);

router.post("/presetField", (req: Request, res: Response) => {
  controller.presetField(req.body);
  res.send("success");
});

router.post("/move", (req: Request, res: Response) => {
  const isSuccess = controller.makeMove(req.body.x, req.body.y);
  if (!isSuccess) return res.status(418).send("Invalid field");
  const winner = controller.checkWinner();
  res.send(winner === 0 ? "success" : { winner });
});

router.post("/reset", (req: Request, res: Response) => {
  controller.reset();
  res.send("success");
});

export default router;
