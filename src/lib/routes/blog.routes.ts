import { Express } from 'express';
import { BlogService } from '../services/blog.service';
import { publicCache } from '../middleware/http-cache';

export function registerBlogRoutes(app: Express) {
  app.get('/api/v1/blog/categories', publicCache(120), async (_req, res) => {
    try {
      const categories = await BlogService.listCategories();
      res.json({
        categories: categories.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          postCount: c._count.posts,
        })),
      });
    } catch (err) {
      console.error('Blog categories error:', err);
      res.status(500).json({ error: 'Failed to load blog categories.' });
    }
  });

  app.get('/api/v1/blog', publicCache(60), async (req, res) => {
    try {
      const page = req.query.page ? Number(req.query.page) : 1;
      const limit = req.query.limit ? Number(req.query.limit) : 12;
      const category = typeof req.query.category === 'string' ? req.query.category : '';
      const [list, recent] = await Promise.all([
        BlogService.listPublished({ page, limit, category: category || undefined }),
        BlogService.recentPublished(6),
      ]);
      res.json({ ...list, recent });
    } catch (err) {
      console.error('Blog list error:', err);
      res.status(500).json({ error: 'Failed to load blog.' });
    }
  });

  app.get('/api/v1/blog/:slug', publicCache(60), async (req, res) => {
    try {
      const post = await BlogService.getPublishedBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: 'Article not found.' });
      }
      res.json({ post });
    } catch (err) {
      console.error('Blog article error:', err);
      res.status(500).json({ error: 'Failed to load article.' });
    }
  });
}
