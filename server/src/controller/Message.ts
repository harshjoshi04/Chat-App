import createHttpError from "http-errors";
import asyncErrorHandler from "../utils/asyncHandler";
import { Prisma } from "../server";

export const SendMessage = asyncErrorHandler(async (req, res, next) => {
  const { userId, fromId, message } = req.body;
  console.log(message);
  if (!userId || !fromId || !message)
    return next(createHttpError(404, "All Field Must Be Required !"));
  const InsertData = await Prisma.messages.create({
    data: {
      userId: Number(userId),
      fromId: Number(fromId),
      message: message,
    },
    include: {
      receiverMessage: true,
      senderMessage: true,
    },
  });

  return res.json({
    status: "success",
    message: "Message Send Successfully !",
    data: InsertData,
  });
});

export const GetMessage = asyncErrorHandler(async (req, res, next) => {
  const { userId, fromId } = req.query;
  if (!userId || !fromId)
    return next(createHttpError(404, "All Field Must Be required "));
  const FindMessage = await Prisma.messages.findMany({
    where: {
      OR: [
        { userId: Number(userId), fromId: Number(fromId) },
        { userId: Number(fromId), fromId: Number(userId) },
      ],
    },
    include: {
      senderMessage: true,
      receiverMessage: true,
    },
  });
  return res.json({ status: "success", data: FindMessage });
});

export const SetReaction = asyncErrorHandler(async (req, res, next) => {
  const { id, type, image } = req.body;
  if (!id || !image)
    return next(createHttpError(404, "Id or Image Must Be Required !"));
  const mainData = type
    ? await Prisma.messages.update({
        where: { id: Number(id) },
        data: {
          senderReaction: image,
        },
      })
    : await Prisma.messages.update({
        where: { id: Number(id) },
        data: {
          receiverReaction: image,
        },
      });
  return res.json({ status: "success", message: "Reaction Change !" });
});
