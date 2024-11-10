export declare const hashPassword: (password: string) => Promise<string>;
export declare const comparePassword: (password: any, hashedPassword: any) => Promise<boolean>;
