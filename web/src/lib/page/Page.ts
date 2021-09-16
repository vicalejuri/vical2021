import { dirname, relative, basename } from 'node:path';
import * as t from 'typanion';
import { slugifyFilepath } from '../helpers';
import { isSimpleISO8601 } from '../validation/isSimpleISO8601';
import { abspathOfPages, pagePathToUrl, urlToPagePath } from './pagePathToUrl';

const AstroContextSymbol = Symbol.for('astro.context');
interface AstroPage {
  /** rendered markdown content */
  astro: {
    headers: string[];
    source: string;
    html: string;
  };
  /** Frontmatter */
  [k: string]: any;
  /** Astro page context */
  [AstroContextSymbol]: {
    pageCSS: string[];
    pageScripts: string[];
    request: {
      params: Record<string, any>;
      url: URL;
      canonicalUrl: URL;
    };
  };
}

function isAstroPage(subject: Record<string | symbol, any>): subject is AstroPage {
  return subject[AstroContextSymbol] !== undefined;
}

interface AstroMarkdownPage {
  astro: {
    headers: any[];
    source: string;
    html: string;
  };
  /** frontmatter */
  [k: string]: any;
}

/** A page after @astrojs/markdown parser with name&abspath */
interface MarkdownPageReference extends AstroMarkdownPage {
  name: string;
  abspath: string;
}

/** Page schema (according to @schema.org) */
const isPageSchema = t.isOneOf([t.isLiteral('article'), t.isLiteral('basic')], { exclusive: true });
type PageSchema = t.InferType<typeof isPageSchema>;

/** Page status */
const isPageStatus = t.isOneOf([t.isLiteral('draft'), t.isLiteral('in progress'), t.isLiteral('complete')], {
  exclusive: true
});
type PageStatus = t.InferType<typeof isPageStatus>;

/** Page content */
const isPageContent = t.isObject(
  {
    title: t.isString(),
    subtitle: t.isString(),
    description: t.isString(),
    headers: t.isArray(t.isUnknown()),
    content: t.isString()
  },
  {
    extra: t.isUnknown()
  }
);
type PageContent = t.InferType<typeof isPageContent>;

/**
 * Page Entity
 * Every page must have those fields.
 */
const isPage = t.isObject({
  name: t.isString(),
  abspath: t.isString(),
  slug: t.isString(),

  /** It's inside a folder? */
  collection: t.isArray(t.isString()),

  url: t.isInstanceOf(URL),
  tags: t.isArray(t.isString()),

  schema: isPageSchema,

  layout: t.isString(),
  status: isPageStatus,

  published: t.isBoolean(),
  publishedAt: t.isDate(),

  /** Page content */
  content: isPageContent,

  /** Page thumbnail */
  thumbnail: t.isOptional(
    t.isObject(
      {
        path: t.isString(),
        width: t.isOptional(t.isNumber()),
        height: t.isOptional(t.isNumber())
      },
      {
        extra: t.isUnknown()
      }
    )
  )
});
type Page = t.InferType<typeof isPage>;

/**
 * Convert to Page interface
 */
function toPage(content: MarkdownPageReference, cwd?: string): Page;
function toPage(content: AstroPage, cwd?: string): Page;
function toPage(content: AstroPage | MarkdownPageReference, cwd?: string): Page {
  let name, slug, abspath, relativePath, collection;

  /** MarkdownPageReference */
  if (isAstroPage(content)) {
    /** Transform from a path/filename.xx into a url friendly slug  */
    const astroContext = content[AstroContextSymbol];

    abspath = urlToPagePath(astroContext.request.url);
    name = basename(abspath);
    slug = slugifyFilepath(name.replace(/\.\w*?$/g, ''));

    relativePath = relative(abspathOfPages, dirname(abspath));
    collection = (relativePath && relativePath.split('/')) || [];
  } else {
    name = content.name;
    slug = slugifyFilepath(name.replace(/\.\w*?$/g, ''));
    abspath = content.abspath;

    relativePath = relative(cwd, dirname(abspath));
    collection = (relativePath && relativePath.split('/')) || [];
  }

  /** Aggregate properties received that are not reserved  */
  const reservedProps = ['astro', AstroContextSymbol];
  const otherProps = Object.fromEntries(Object.entries(content).filter(([key, v]) => !reservedProps.includes(key)));

  return {
    name,
    abspath,
    slug,
    collection,
    url: pagePathToUrl(abspath),
    tags: content?.tags || [],
    layout: content?.layout,
    schema: content?.schema,
    status: content?.status,
    published: content?.published,
    publishedAt: content?.publishedAt,
    content: {
      title: content?.title,
      subtitle: content?.subtitle,
      description: content?.description,
      headers: content.astro?.headers || [],
      content: content.astro?.html || '',
      ...otherProps
    },
    /** Thumbnail? */
    ...(content.thumbnail?.path
      ? {
          thumbnail: {
            path: content.thumbnail?.path,
            width: content.thumbnail?.width ?? undefined,
            height: content.thumbnail?.height ?? undefined
          }
        }
      : {})
  };
}

export {
  AstroPage,
  MarkdownPageReference,
  Page,
  PageSchema,
  PageStatus,
  PageContent,
  isAstroPage,
  isPage,
  isPageSchema,
  isPageStatus,
  isPageContent,
  toPage
};