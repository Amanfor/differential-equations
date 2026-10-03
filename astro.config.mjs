// @ts-check
import { defineConfig } from 'astro/config';
import math from 'remark-math';
import katex from 'rehype-katex';
import directive from 'remark-directive';
import { learningDirectives } from './src/lib/directives.ts';

// Fully static site deployed to GitHub Pages under /differential-equations/
export default defineConfig({
  site: 'https://amanfor.github.io',
  base: '/differential-equations/',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  markdown: {
    remarkPlugins: [directive, learningDirectives, math],
    rehypePlugins: [katex],
  },
  compressHTML: true,
});
