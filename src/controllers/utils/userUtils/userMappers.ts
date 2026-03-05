import { safeUserDto, userDb } from "@/";

type RequiredUserParams = {
  username: string;
  email: string;
} & Record<string, any>;

export const toSafeUser = (payload: RequiredUserParams): safeUserDto => {
  const safeUser: safeUserDto = {
    username: payload.username,
    email: payload.email,
  }
  return safeUser;
};
