import bcrypt from 'bcrypt';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { PrismaClient, User, USER_STATUS } from '../../../../generated/prisma';

const prisma = new PrismaClient();

const userLogin = async (payload: User) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: USER_STATUS.ACTIVE,
    },
  });
  const checkingPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!checkingPassword) {
    throw new Error('check your password');
  }
  const accessToken = await jwt.sign(
    { email: userData.email, role: userData.role },
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: '15m',
    }
  );
  const refreshToken = jwt.sign(
    { email: userData.email, role: userData.role },
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: '30d',
    }
  );
  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  let decoded;
  try {
    decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as Secret
    ) as JwtPayload;
  } catch (err) {
    throw new Error('You are not authorized');
  }
  const userData = prisma.user.findUniqueOrThrow({
    where: {
      email: decoded?.email,
      status: USER_STATUS.ACTIVE,
    },
  });
  const accessToken = await jwt.sign(
    { email: (await userData).email, role: (await userData).role },
    process.env.JWT_ACCESS_SECRET as Secret,
    {
      expiresIn: '15m',
    }
  );
  return {
    accessToken,
  };
};

export const AuthService = {
  userLogin,
  refreshToken,
};
