export declare const config: {
    server: {
        port: number;
        nodeEnv: "development" | "production" | "test";
        isDevelopment: boolean;
        isProduction: boolean;
        isTest: boolean;
    };
    database: {
        url: string;
    };
    jwt: {
        secret: string;
        refreshSecret: string;
        expiresIn: string;
        refreshExpiresIn: string;
    };
    stripe: {
        secretKey: string | undefined;
        webhookSecret: string | undefined;
    };
    email: {
        host: string | undefined;
        port: number | undefined;
        user: string | undefined;
        pass: string | undefined;
    };
    redis: {
        url: string | undefined;
    };
    upload: {
        maxFileSize: number;
        uploadPath: string;
    };
    rateLimit: {
        windowMs: number;
        maxRequests: number;
    };
};
export default config;
//# sourceMappingURL=index.d.ts.map