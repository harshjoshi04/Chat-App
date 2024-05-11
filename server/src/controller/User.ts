import createHttpError from "http-errors";
import asyncErrorHandler from "../utils/asyncHandler";
import { Prisma } from "../server";
import { HashPassword, VerifyPassword } from "../utils/HashPassword";
import { User } from "@prisma/client";

// Register User
export const SigUpUser = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return next(createHttpError(404, "All Field Must Be Required !"));
  const pwd = await HashPassword(password);
  const insertData = await Prisma.user.create({
    data: {
      name: name,
      email: email,
      password: pwd,
    },
  });
  return res.json({ status: "success", data: insertData });
});

// Login User

export const LoginUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(createHttpError(404, "Email Or Password is Required  !"));
  const findUser = await Prisma.user.findUnique({
    where: {
      email, // Specify the type of email here
    },
  });
  if (!findUser)
    return next(createHttpError(404, "Email Or Password went Wrong !"));
  const isMatch = await VerifyPassword(password, findUser.password);
  if (!isMatch)
    return next(createHttpError(404, "Email Or Password went Wrong !"));
  return res.json({ status: "success", data: findUser });
});

// PlatForm Auth
export const PlatForm = asyncErrorHandler(async (req, res, next) => {
  const { name, email, image, platFormId, platFormName } = req.body;
  if (!name || !email || !platFormId || !platFormName)
    return next(createHttpError(404, "All Field Must Be Required !"));
  let user = await Prisma.user.findFirst({
    where: { platFormId: String(platFormId) },
  });
  if (!user) {
    let userData = await Prisma.user.create({
      data: {
        name,
        email,
        password: "",
        image,
        platFormId,
        platFormName,
      },
    });
    return res.json({ status: "success", data: userData });
  }
  return res.json({ status: "success", data: user });
});

// GetUser
export const GetUser = asyncErrorHandler(async (req, res, next) => {
  const { email } = req.query;
  if (!email) return next(createHttpError("Email Must Be Required !"));
  const findUser = await Prisma.user.findUnique({
    where: { email: String(email) },
  });
  if (!findUser) return next(createHttpError(404, "User Not Found !"));
  return res.json({ status: "success", data: findUser });
});

// GetAllUser
export const GetAllUser = asyncErrorHandler(async (req, res, next) => {
  const { email } = req.query;
  if (!email) return next(createHttpError(404, "Email Must Be Required !"));
  const FindUser = await Prisma.user.findUnique({
    where: { email: String(email) },
  });
  const FindAllData = await Prisma.user.findMany({
    where: { NOT: { email: String(email) } },
  });
  const RequestUser = await Prisma.requestsUser.findMany({
    where: { OR: [{ userId: FindUser?.id }, { fromId: FindUser?.id }] },
  });
  if (!FindAllData) return next(createHttpError(404, "User Data Not Found !"));
  const newData = FindAllData?.map((item) => {
    let obj: any = { ...item };
    if (
      RequestUser.some((el) => item?.id == el.userId || item.id == el.fromId)
    ) {
      let findIndex = RequestUser.findIndex(
        (el) => item?.id == el.userId || item.id == el.fromId
      );
      obj["status"] = RequestUser[findIndex].status as string;
    }
    return obj;
  });
  return res.json({ status: "success", data: newData });
});

// Send Request
export const SendRequest = asyncErrorHandler(async (req, res, next) => {
  const { userId, fromId } = req.body;
  if (!userId || !fromId)
    return next(
      createHttpError(404, "User id and from Id must be Required  !")
    );
  const SendRequest = await Prisma.requestsUser.create({
    data: { userId, fromId },
  });
  return res.json({ status: "success", data: SendRequest });
});

// Get Request
export const GetRequest = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(createHttpError(404, "Id Must Be Required !"));
  const findRequest = await Prisma.requestsUser.findMany({
    where: { userId: Number(id) },
    include: {
      recipient: true,
    },
  });

  return res.json({
    status: "success",
    count: findRequest?.filter((el) => el.status == "pending").length,
    data: findRequest,
  });
});
