import { AppLocale } from '@/shared/сonfig/i18n';
// import { createApiResponseSchema } from './utils';

export type ApiRequestParams<T extends Record<string, unknown> = {}> = {
    params?: T;
    locale?: AppLocale;
    signal?: AbortSignal;
};

// export type ApiResponse<T = unknown> = z.infer<
//     ReturnType<typeof createApiResponseSchema<z.ZodType<T, z.ZodTypeDef, T>>>
// >;

export type AppCommonPageData = {};
