import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const courses = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/courses' }),
	schema: z.object({
		title: z.string(),
		category: z.enum(['training', 'scent', 'workshop']),
		order: z.number().default(99),
		price: z.string(),
		duration: z.string().optional(),
		dates: z.string().optional(),
		status: z.enum(['open', 'coming-soon', 'enquire', 'one-to-one']).default('enquire'),
		level: z.string().optional(),
		venue: z.string().optional(),
		bookingUrl: z.union([z.string().url(), z.literal('')]).optional(), // empty = use the enquiry form
		image: z.string(),
		imageAlt: z.string().default(''),
		badge: z.boolean().default(false),
		featured: z.boolean().default(false),
		hidden: z.boolean().default(false),
	}),
});

const reviews = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/reviews' }),
	schema: z.object({
		name: z.string(),
		date: z.coerce.date(),
		rating: z.number().min(1).max(5).default(5),
		topic: z.string().optional(),
		excerpt: z.boolean().default(false),
	}),
});

export const collections = { courses, reviews };
