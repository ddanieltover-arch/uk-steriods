import { markdownToSafeHtml, readingMinutesFromMarkdown, slugify } from '../src/lib/blog/markdown';
import { SeoService } from '../src/lib/services/seo.service';
import { RBACService } from '../src/lib/services/rbac.service';
import { Role } from '@prisma/client';
import { canonicalPathFor } from '../src/lib/seo/site';

function assert(condition: boolean, description: string) {
  if (!condition) throw new Error(`FAIL: ${description}`);
  console.log(`  ✅ ${description}`);
}

function run() {
  console.log('Blog tests');

  assert(slugify('Oxandrolone and Stanozolol!') === 'oxandrolone-and-stanozolol', 'slugify strips punctuation');
  assert(readingMinutesFromMarkdown('word '.repeat(400)) === 2, 'reading time ~200 wpm');

  const html = markdownToSafeHtml('# Title\n\nHello **world** and [link](javascript:alert(1))\n\n- one\n- two');
  assert(html.includes('<h1>Title</h1>'), 'renders heading');
  assert(html.includes('<strong>world</strong>'), 'renders bold');
  assert(html.includes('<ul>'), 'renders list');
  assert(!html.includes('javascript:'), 'strips javascript hrefs');
  assert(html.includes('href="#"'), 'unsafe links become #');

  const xss = markdownToSafeHtml('<script>alert(1)</script>');
  assert(!xss.includes('<script>'), 'escapes script tags');

  const robots = SeoService.getRobotsTxt();
  assert(robots.includes('Allow: /blog'), 'robots allows blog');

  assert(canonicalPathFor('/blog/example', 'utm=1') === '/blog/example', 'blog canonical drops query');

  assert(RBACService.hasPermission(Role.STAFF, 'blog:manage'), 'STAFF can manage blog');
  assert(!RBACService.hasPermission(Role.CUSTOMER, 'blog:read'), 'CUSTOMER cannot read admin blog');
}

run();
console.log('Blog tests passed.');
