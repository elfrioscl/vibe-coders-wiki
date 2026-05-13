import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

export const SEO = ({ 
  title, 
  description, 
  canonical,
  ogImage,
  ogType = 'website',
  noIndex = false,
  jsonLd,
}: SEOProps) => {
  const siteTitle = 'Vibe Coders Wiki';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
  const baseUrl = 'https://www.vibe-coders.es';
  const image = ogImage ?? `${baseUrl}/og-image.png`;
  const url = canonical ? `${baseUrl}${canonical}` : undefined;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {url && <link rel="canonical" href={url} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={image} />
      {url && <meta property="og:url" content={url} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};
