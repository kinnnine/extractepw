import { defineConfig } from 'vite';

export default defineConfig(({ command, mode }) => {
    const shared = {
        esbuild: {
            jsx: 'transform',
            jsxFactory: 'm',
            jsxFragment: 'm.Fragment',
        },
    }
    if (command === 'build') {
        return {
            ...shared,
            base: '/extractepw/'
        }
    } else {
        return {
            ...shared
        }
    }
});