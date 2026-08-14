import { PrismaClient, BlogPostStatus } from '@prisma/client';
import { readingMinutesFromMarkdown } from '../src/lib/blog/markdown';

type SeedPost = {
  slug: string;
  title: string;
  excerpt: string;
  bodyMarkdown: string;
  authorName: string;
  authorBio: string;
  featured?: boolean;
  publishedAt: Date;
  categorySlugs: string[];
  productQuery: string;
  coverImageUrl: string;
  faq: { question: string; answer: string }[];
};

const CATEGORIES = [
  { name: 'Guides', slug: 'guides', sortOrder: 1 },
  { name: 'PCT', slug: 'pct', sortOrder: 2 },
  { name: 'SARMs', slug: 'sarms', sortOrder: 3 },
  { name: 'Testosterone', slug: 'testosterone', sortOrder: 4 },
  { name: 'Oral steroids', slug: 'oral-steroids', sortOrder: 5 },
];

const POSTS: SeedPost[] = [
  {
    slug: 'oxandrolone-and-stanozolol-research-comparison',
    title: 'Oxandrolone and stanozolol: a research comparison',
    excerpt:
      'Two widely discussed orals sit at opposite ends of tolerance and drying effect. This note compares research context, not dosing advice.',
    featured: true,
    publishedAt: new Date('2026-08-12T10:00:00Z'),
    authorName: 'Editorial Team',
    authorBio: 'Store editorial covering catalogue compounds in educational, research-only language.',
    categorySlugs: ['guides', 'oral-steroids'],
    productQuery: 'anavar',
    coverImageUrl: '/blog/oxandrolone-and-stanozolol-research-comparison.webp',
    faq: [
      {
        question: 'Is this medical advice?',
        answer: 'No. Content is educational context for catalogue research compounds only.',
      },
      {
        question: 'Which oral is milder in published literature?',
        answer: 'Oxandrolone is generally described as milder than stanozolol in clinical and research summaries.',
      },
    ],
    bodyMarkdown: `## Research framing

This article summarises how oxandrolone (often labelled Anavar) and stanozolol (often labelled Winstrol) are discussed in bodybuilding literature. Products on this site are intended for research purposes only.

## How they are usually contrasted

Oxandrolone is frequently described as a milder oral with a reputation for lean tissue discussion and relatively fewer reported androgenic effects in historical clinical use. Stanozolol is more often associated with a drier, harder appearance in physique writing, alongside more frequent mentions of joint dryness and hepatic strain.

## Practical catalogue notes

When browsing orals, compare ester-free tablets by milligram strength, lab documentation, and brand. Pair reading with PCT and support listings rather than treating any oral as a standalone protocol.

## Bottom line

Choose catalogue SKUs by documented batch data and your research question. Do not treat comparison articles as instructions for personal use.`,
  },
  {
    slug: 'testosterone-testing-overview',
    title: 'Testosterone testing: what a lab panel usually reports',
    excerpt:
      'Total testosterone, free testosterone, SHBG, and timing of the draw all change how a result is read. A 2026-oriented overview.',
    publishedAt: new Date('2026-08-06T10:00:00Z'),
    authorName: 'Editorial Team',
    authorBio: 'Store editorial covering catalogue compounds in educational, research-only language.',
    categorySlugs: ['testosterone', 'guides'],
    productQuery: 'testosterone',
    coverImageUrl: '/blog/testosterone-testing-overview.webp',
    faq: [
      {
        question: 'When are morning draws preferred?',
        answer: 'Many labs prefer early-morning samples because testosterone levels follow a diurnal pattern.',
      },
    ],
    bodyMarkdown: `## What a typical panel includes

A standard hormone panel may list total testosterone, free testosterone or a calculated free index, SHBG, LH, FSH, and sometimes estradiol. Units and reference ranges differ between UK labs.

## Timing and context

Results are easier to interpret when the draw time, recent sleep, and concurrent medications are recorded. A single number without context is a weak data point.

## Catalogue context

Injectable testosterone esters in the shop are research compounds, not licensed TRT. If you are reading ester guides, keep testing literature separate from product pages.

## Takeaway

Use accredited labs and a qualified clinician for personal health questions. This hub only explains vocabulary that appears next to catalogue listings.`,
  },
  {
    slug: 'pct-research-notes-selective-estrogen-modulators',
    title: 'PCT research notes: selective estrogen receptor modulators',
    excerpt:
      'Tamoxifen (Nolvadex) and clomiphene appear often in post-cycle write-ups. Here is how those names map to catalogue PCT listings.',
    publishedAt: new Date('2026-08-03T10:00:00Z'),
    authorName: 'Editorial Team',
    authorBio: 'Store editorial covering catalogue compounds in educational, research-only language.',
    categorySlugs: ['pct', 'guides'],
    productQuery: 'nolvadex',
    coverImageUrl: '/blog/pct-research-notes-selective-estrogen-modulators.webp',
    faq: [
      {
        question: 'What does PCT mean on this site?',
        answer: 'Post-cycle therapy is a research-literature term. Listings are not treatment protocols.',
      },
    ],
    bodyMarkdown: `## Why PCT appears in physique writing

After a suppressive research cycle, writers often discuss restoring the hypothalamic-pituitary-gonadal axis. Selective estrogen receptor modulators (SERMs) such as tamoxifen are repeatedly named in that literature.

## Catalogue mapping

PCT category pages group SERMs, hCG, and ancillary support. Read product descriptions for milligram strength and tablet count. Do not infer a personal protocol from a blog post.

## Safety language

Hepatotoxicity, lipid changes, and mood effects are discussed in SERM literature. Educational copy cannot replace a clinician.

## Summary

Use the PCT aisle to compare documented SKUs. Treat timing tables on other websites as unverified unless you have primary sources.`,
  },
  {
    slug: 'how-research-stacks-are-described',
    title: 'How research stacks are described — and when a bundle is just packaging',
    excerpt:
      'Stacks combine several compounds in one listing. Understand receptor-pathway marketing versus a simple multi-SKU bundle.',
    publishedAt: new Date('2026-07-27T10:00:00Z'),
    authorName: 'Editorial Team',
    authorBio: 'Store editorial covering catalogue compounds in educational, research-only language.',
    categorySlugs: ['guides'],
    productQuery: 'stack',
    coverImageUrl: '/blog/how-research-stacks-are-described.webp',
    faq: [
      {
        question: 'Are stacks cheaper?',
        answer: 'Sometimes. Compare the bundle price against buying the same SKUs separately.',
      },
    ],
    bodyMarkdown: `## What a stack listing usually is

A stack may be a pre-picked set of orals, injectables, and PCT items sold together, or a marketing name around a goal such as bulking or cutting.

## How to read the page

Check each component SKU, milligram strength, and whether inventory is independent. A missing PCT item in a bundle is still a missing SKU.

## Research caution

Combining several androgens increases the number of variables in any experiment. That is a documentation problem as much as a purchasing one.

## Bottom line

Buy stacks when the bill of materials is clear. Otherwise assemble from individual product pages.`,
  },
  {
    slug: 'testosterone-esters-enanthate-cypionate-and-blends',
    title: 'Testosterone esters: enanthate, cypionate, and blends',
    excerpt:
      'Ester length changes release curve in pharmaceutical literature. A plain-language map of common catalogue names.',
    publishedAt: new Date('2026-07-15T10:00:00Z'),
    authorName: 'Editorial Team',
    authorBio: 'Store editorial covering catalogue compounds in educational, research-only language.',
    categorySlugs: ['testosterone', 'guides'],
    productQuery: 'enanthate',
    coverImageUrl: '/blog/testosterone-esters-enanthate-cypionate-and-blends.webp',
    faq: [
      {
        question: 'Is Sustanon a single ester?',
        answer: 'No. Blend products typically combine several testosterone esters with different half-lives.',
      },
    ],
    bodyMarkdown: `## Ester, not a different hormone

Enanthate, cypionate, propionate, and undecanoate are the same testosterone molecule with different ester chains. Literature describes different depot release profiles.

## Blends

Multi-ester products (often sold under Sustanon-style names) mix short and long esters. That changes peak and trough behaviour compared with a single long ester.

## Shopping the aisle

Filter injectables by ester name, concentration (mg/ml), and vial size. Lab reports belong next to the SKU, not in a blog.

## Close

Ester choice is a research-design question. This article only names the labels you will see in the catalogue.`,
  },
];

export async function seedBlog(prisma: PrismaClient) {
  await prisma.blogPostProduct.deleteMany();
  await prisma.blogPostCategory.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.blogCategory.deleteMany();

  const catMap: Record<string, string> = {};
  for (const c of CATEGORIES) {
    const row = await prisma.blogCategory.create({ data: c });
    catMap[c.slug] = row.id;
  }

  for (const post of POSTS) {
    const matches = await prisma.product.findMany({
      where: {
        isPublished: true,
        deletedAt: null,
        OR: [
          { name: { contains: post.productQuery, mode: 'insensitive' } },
          { slug: { contains: post.productQuery, mode: 'insensitive' } },
        ],
      },
      take: 6,
      select: { id: true },
    });

    await prisma.blogPost.create({
      data: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        bodyMarkdown: post.bodyMarkdown,
        coverImageUrl: post.coverImageUrl,
        authorName: post.authorName,
        authorBio: post.authorBio,
        status: BlogPostStatus.PUBLISHED,
        featured: Boolean(post.featured),
        publishedAt: post.publishedAt,
        readingMinutes: readingMinutesFromMarkdown(post.bodyMarkdown),
        seoTitle: `${post.title} | Steroids UK`,
        seoDescription: post.excerpt,
        faqJson: post.faq,
        categories: {
          create: post.categorySlugs.map((slug) => ({ categoryId: catMap[slug] })),
        },
        products: {
          create: matches.map((p) => ({ productId: p.id })),
        },
      },
    });
  }

  console.log(`📰 Seeded ${CATEGORIES.length} blog categories and ${POSTS.length} original articles.`);
}
