import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig(function (_a) {
    var mode = _a.mode;
    var env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react()],
        server: {
            cors: true,
            proxy: {
                '/api': {
                    target: env.VITE_LOCAL_SERVER_URL || 'http://127.0.0.1:8000',
                    changeOrigin: true,
                    rewrite: function (path) { return path.replace(/^\/api/, ''); }
                }
            },
        },
    };
});
