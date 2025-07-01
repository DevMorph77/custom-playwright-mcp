# playwright-mcp-server-custom

A Model Context Protocol (MCP) server that brings Playwright browser automation to LLMs, agents, and automation frameworks.  
Interact with real browsers, inject cookies/localStorage, take screenshots, generate code, scrape web pages, and more—all via a unified tool interface.

---

## 🚀 Features

- **Full Playwright Automation**: Chromium, Firefox, and WebKit support.
- **Session Injection**: Set cookies and localStorage before navigation (simulate logged-in or pre-configured sessions).
- **Web Interaction**: Click, fill, select, hover, upload files, drag, and more.
- **Navigation & Tabs**: Open URLs, switch tabs, go back/forward, set user agent, headless mode, etc.
- **Screenshots & Output**: Capture screenshots, save as PDF, extract visible text/HTML.
- **API Testing**: Perform HTTP GET/POST/PUT/PATCH/DELETE requests.
- **Console & JS**: Retrieve browser console logs, execute JavaScript.
- **Code Generation**: Record and generate Playwright test scripts.
- **Resource Access**: Download screenshots, logs, and more.

---

## 📦 Installation

```bash
npm install -g playwright-mcp-server-custom
```
Or use with `npx`:
```bash
npx playwright-mcp-server-custom
```

---

## 🖥️ Usage

Start the MCP server:
```bash
playwright-mcp-server
```
or
```bash
npx playwright-mcp-server-custom
```

The server will listen for MCP tool requests via stdio (for integration with LLM agents, automation clients, or your own scripts).

---

## 🛠️ Example Tool Calls

### 1. **Set Session Data (Cookies & localStorage)**
```json
{
  "cookies": [
    {
      "domain": ".example.com",
      "name": "sessionid",
      "value": "abc123",
      "path": "/",
      "expirationDate": 9999999999,
      "httpOnly": true,
      "secure": true,
      "sameSite": "Lax"
    }
  ],
  "origins": [
    {
      "origin": "https://example.com",
      "localStorage": [
        { "name": "user", "value": "{\"id\":1,\"name\":\"Alice\"}" }
      ]
    }
  ]
}
```
Tool name: `playwright_set_session_data`

---

### 2. **Navigate to a Website**
```json
{
  "url": "https://www.hubtel.com"
}
```
Tool name: `playwright_navigate`

---

### 3. **Take a Screenshot**
```json
{
  "name": "homepage",
  "fullPage": true
}
```
Tool name: `playwright_screenshot`

---

## 🧩 Supported Tools

- `playwright_set_session_data` — Set cookies and localStorage before navigation
- `playwright_navigate` — Open a URL
- `playwright_click`, `playwright_fill`, `playwright_select`, `playwright_hover`, `playwright_upload_file`, `playwright_drag`, `playwright_press_key`
- `playwright_screenshot`, `playwright_save_as_pdf`
- `playwright_get`, `playwright_post`, `playwright_put`, `playwright_patch`, `playwright_delete`
- `playwright_console_logs`, `playwright_evaluate`
- `playwright_start_codegen_session`, `playwright_end_codegen_session`, etc.
- ...and more!

See the [Supported Tools documentation](docs/docs/playwright-web/Supported-Tools.mdx) for full details.

---

## 🧪 Testing

This project uses Jest for testing.  
Run all tests:
```bash
npm test
```
With coverage:
```bash
npm run test:coverage
```

---

## 🤝 Contributing

- Fork the repo and create a feature branch.
- Add new tools by implementing the `ToolHandler` interface and registering your tool in `src/tools.ts` and `src/toolHandler.ts`.
- Keep tool names short (for compatibility with LLM clients).
- Submit a pull request!

---

## 📄 License

MIT License  
Copyright (c) 2025 DevMorph

---

## 💡 Credits

Originally inspired by [ExecuteAutomation's Playwright MCP Server](https://github.com/executeautomation/mcp-playwright).  
Maintained by DevMorph.

---

**Happy automating!**
