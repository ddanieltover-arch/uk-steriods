import { Express, Request, Response } from 'express';
import { CatalogueApiService } from '../services/catalogue-api.service';
import { SeoService } from '../services/seo.service';
import {
  CatalogueQuerySchema,
  CatalogueSearchQuerySchema,
  CatalogueSuggestionQuerySchema,
} from '../validation';
import { rateLimit } from '../middleware/rate-limit';
import { publicCache } from '../middleware/http-cache';
import { SEARCH_QUERY_MIN_LENGTH } from '../search/ranking';

export function registerCatalogueRoutes(app: Express) {
  const searchLimit = rateLimit({
    windowMs: 60_000,
    max: 60,
    message: 'Search rate limit exceeded. Please wait a moment.',
  });
  const suggestLimit = rateLimit({
    windowMs: 60_000,
    max: 40,
    message: 'Suggestion rate limit exceeded. Please wait a moment.',
  });

  app.get('/api/v1/catalogue', publicCache(60), async (req, res) => {
    try {
      const parsed = CatalogueQuerySchema.safeParse({
        search: req.query.q || req.query.search || '',
        category: req.query.category || '',
        brand: req.query.brand || '',
        brandIds: typeof req.query.brandIds === 'string' ? req.query.brandIds.split(',').filter(Boolean) : [],
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : 0,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : 1000,
        availability: req.query.availability || 'all',
        sort: req.query.sort || 'featured',
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 12,
      });

      if (!parsed.success) {
        return res.status(400).json({ error: 'Invalid catalogue query', issues: parsed.error.issues });
      }

      const search = parsed.data.search?.trim() || '';
      const result =
        search.length >= SEARCH_QUERY_MIN_LENGTH
          ? await CatalogueApiService.search(search, parsed.data.page, parsed.data.limit)
          : await CatalogueApiService.list(parsed.data);

      res.json(result);
    } catch (err: any) {
      console.error('Catalogue list error:', err);
      res.status(500).json({ error: 'Failed to load catalogue.' });
    }
  });

  app.get('/api/v1/catalogue/search', searchLimit, publicCache(30), async (req, res) => {
    try {
      const parsed = CatalogueSearchQuerySchema.safeParse({
        q: req.query.q || req.query.search || '',
        page: req.query.page,
        limit: req.query.limit,
      });

      if (!parsed.success) {
        return res.status(400).json({
          error: parsed.error.issues[0]?.message || 'Invalid search query',
          products: [],
          totalCount: 0,
        });
      }

      const result = await CatalogueApiService.search(parsed.data.q, parsed.data.page, parsed.data.limit);
      res.json(result);
    } catch (err: any) {
      console.error('Catalogue search error:', err);
      res.status(500).json({ error: 'Search failed.' });
    }
  });

  app.get('/api/v1/catalogue/suggestions', suggestLimit, publicCache(30), async (req, res) => {
    try {
      const parsed = CatalogueSuggestionQuerySchema.safeParse({ q: req.query.q || '' });
      if (!parsed.success) {
        return res.json({ products: [], brands: [], categories: [] });
      }
      const result = await CatalogueApiService.suggestions(parsed.data.q);
      res.json(result);
    } catch (err: any) {
      console.error('Catalogue suggestions error:', err);
      res.status(500).json({ products: [], brands: [], categories: [] });
    }
  });

  app.get('/api/v1/catalogue/products/:slug', publicCache(60), async (req, res) => {
    try {
      const product = await CatalogueApiService.getPublishedBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ error: 'Product not found.' });
      }
      res.json({ product });
    } catch (err: any) {
      console.error('Catalogue product error:', err);
      res.status(500).json({ error: 'Failed to load product.' });
    }
  });

  app.get('/robots.txt', publicCache(3600), (_req, res) => {
    res.type('text/plain').send(SeoService.getRobotsTxt());
  });

  app.get('/sitemap.xml', publicCache(3600), async (_req, res) => {
    try {
      const xml = await SeoService.getSitemapXml();
      res.type('application/xml').send(xml);
    } catch (err: any) {
      console.error('Sitemap error:', err);
      res.status(500).type('text/plain').send('Sitemap unavailable');
    }
  });

  app.get('/llms.txt', publicCache(3600), (_req, res) => {
    res.type('text/plain; charset=utf-8').send(SeoService.getLlmsTxt());
  });
}
