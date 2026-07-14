export interface UserInfo {
  id: number;
  password: string;
  realName: string;
  roles: string[];
  username: string;
  homePath?: string;
}

/** 不含密码的安全用户信息 */
export type SafeUser = Omit<UserInfo, 'password'>;

export interface TimezoneOption {
  offset: number;
  timezone: string;
}

/** Hono 应用上下文变量类型 */
export interface AppBindings {
  Variables: {
    user: SafeUser;
  };
}
