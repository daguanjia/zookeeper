import { RequestHandler } from 'express';

/**
 * 异步错误处理工具
 * @param fn 路由回调方法
 */
declare function asyncHandler(fn: RequestHandler): void;

export = asyncHandler;