import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Dynamically gather asset entry files inside resources/css and resources/js
function gatherAssetEntries() {
    const roots = [
        { dir: 'resources/css', ext: '.css' },
        { dir: 'resources/js', ext: ['.js', '.jsx', '.ts', '.tsx'] },
    ];

    const entries = [];
    for (const { dir, ext } of roots) {
        try {
            const files = fs.readdirSync(path.resolve(__dirname, dir));
            for (const file of files) {
                const extensions = Array.isArray(ext) ? ext : [ext];
                if (extensions.some((extension) => file.endsWith(extension))) {
                    entries.push(path.posix.join(dir.replace(/\\/g, '/'), file));
                }
            }
        } catch (e) {
            // If a directory doesn't exist, skip it (shouldn't happen in normal workflow)
        }
    }
    return entries;
}

const assetInputs = gatherAssetEntries();

export default defineConfig({
    plugins: [
        react(),
        laravel({
            // Automatically includes every JS & CSS file in the two resource folders
            input: assetInputs,
            refresh: true,
        }),
    ],
});
