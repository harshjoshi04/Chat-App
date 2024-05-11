import bcrypt from "bcrypt";

const salt = 10;

export const HashPassword = async (password: string): Promise<string> => {
  try {
    const HashPassword = await bcrypt.hash(password, salt);
    return HashPassword;
  } catch (er) {
    throw new Error("Password Dont Encypt !");
  }
};

export const VerifyPassword = async (
  password: string,
  hashPassword: string
): Promise<boolean | string> => {
  try {
    const isVerify = await bcrypt.compare(password, hashPassword);
    return isVerify;
  } catch (er) {
    throw new Error("Password is not match !");
  }
};
