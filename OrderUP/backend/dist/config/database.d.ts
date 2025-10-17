import { PrismaClient } from '@prisma/client';
export declare const prisma: PrismaClient<{
    log: ("info" | "error" | "query" | "warn")[];
    errorFormat: "pretty";
}, never, import("@prisma/client/runtime/library").DefaultArgs>;
export declare const connectDatabase: () => Promise<void>;
export declare const disconnectDatabase: () => Promise<void>;
export declare const gracefulShutdown: () => Promise<void>;
export default prisma;
//# sourceMappingURL=database.d.ts.map