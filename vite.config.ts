import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import type { Plugin } from 'vite'

// On some Linux systems the OS MIME database maps ".ts" to
// "text/vnd.trolltech.linguist" (Qt Linguist translation files).
// Browsers enforce strict MIME checking for ES module scripts, so they
// reject any response that isn't "application/javascript" or similar.
// This plugin wraps res.setHeader for requests to TypeScript source files
// so that any Content-Type assigned by downstream middleware (including
// Vite's static file fallback) is corrected to application/javascript.
// The regex is intentionally scoped to paths under /src/ and /node_modules/
// to avoid interfering with unrelated requests.
function typescriptMimePlugin(): Plugin {
  return {
    name: 'typescript-mime-type',
    configureServer(server) {
      // Returning a function causes this middleware to be appended *after*
      // Vite's own internal middlewares, so it only runs for requests that
      // have not yet been fully handled.
      return () => {
        server.middlewares.use((req, res, next) => {
          if (req.url && /^\/(src|node_modules)\/.+\.(ts|tsx)(\?.*)?$/.test(req.url)) {
            const originalSetHeader = res.setHeader.bind(res)
            const patched = (
              name: string,
              value: Parameters<typeof res.setHeader>[1],
            ): ReturnType<typeof res.setHeader> => {
              if (name.toLowerCase() === 'content-type') {
                return originalSetHeader(name, 'application/javascript; charset=utf-8')
              }
              return originalSetHeader(name, value)
            }
            res.setHeader = patched as typeof res.setHeader
            // Restore the original method once the response is complete so
            // the patched method does not persist beyond this request.
            res.once('finish', () => {
              res.setHeader = originalSetHeader
            })
          }
          next()
        })
      }
    },
  }
}

export default defineConfig({
  plugins: [vue(), typescriptMimePlugin()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
