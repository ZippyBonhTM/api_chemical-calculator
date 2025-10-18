export type createUserDto = {
  username: string;
  email: string;
  passwordHash: string;
};

export type safeUserDto = {
  username: string;
  email: string;
};

export type userDb = {
  username: string;
  email: string;
  passwordHash: string;
  jwtVertsion: number;
};
