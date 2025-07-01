import { BrowserToolBase } from './base';
import { ToolContext, ToolResponse, createSuccessResponse, createErrorResponse } from '../common/types';

export class SetSessionDataTool extends BrowserToolBase {
  async execute(args: any, context: ToolContext): Promise<ToolResponse> {
    return this.safeExecute(context, async (page) => {
      // 1. Set cookies
      if (Array.isArray(args.cookies)) {
        const cookies = args.cookies.map((cookie: any) => ({
          name: cookie.name,
          value: cookie.value,
          domain: cookie.domain,
          path: cookie.path || '/',
          expires: cookie.expirationDate || cookie.expires || -1,
          httpOnly: cookie.httpOnly || false,
          secure: cookie.secure || false,
          sameSite: cookie.sameSite || 'Lax'
        }));
        await page.context().addCookies(cookies);
      }

      // 2. Set localStorage for each origin
      if (Array.isArray(args.origins)) {
        for (const originObj of args.origins) {
          if (!originObj.origin || !Array.isArray(originObj.localStorage)) continue;
          await page.goto(originObj.origin, { waitUntil: 'domcontentloaded' });
          for (const item of originObj.localStorage) {
            await page.evaluate(
              ([key, value]) => localStorage.setItem(key, value),
              [item.name, item.value]
            );
          }
        }
      }

      return createSuccessResponse('Session data (cookies/localStorage) set successfully.');
    });
  }
} 