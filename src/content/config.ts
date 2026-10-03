import { defineCollection } from 'astro:content';

const topics = defineCollection({ type: 'content' });

export const collections = { topics };
