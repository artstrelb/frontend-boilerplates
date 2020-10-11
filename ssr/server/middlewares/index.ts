import cookieParserMiddleware from 'cookie-parser';
import {RequestHandler} from 'express';
import rateLimitMiddleware from 'express-rate-limit';
import helmetMiddleware from 'helmet';
import cfg from 'lib/cfg';
import {expressCspHeader} from 'lib/express-csp-header';

import loggerMiddleware from './logger';
import renderMiddleware from './render';

const cookieParser: RequestHandler = cookieParserMiddleware();

const cspHeader: RequestHandler = expressCspHeader(cfg.csp);

const rateLimit: RequestHandler = rateLimitMiddleware({
    windowMs: 15 * 60 * 10000,
    max: 20000,
});

const helmet = helmetMiddleware(cfg.helmet);

const render: RequestHandler | RequestHandler[] = renderMiddleware;

const logger: RequestHandler = loggerMiddleware();

export {validateBodyKeys} from './bodyChecker';

export {
    rateLimit,
    cookieParser,
    helmet,
    render,
    logger,
    cspHeader,
};
