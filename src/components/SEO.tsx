import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
}

export const SEO = ({ 
  title, 
  description, 
  canonical,
  ogImage = 'https://lovable.dev/opengraph-image-p98pqg.png',
  ogType = 'website',
  noIndex = false
}: SEOProps) => {
  const siteTitle = 'Vibe Coders Wiki';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
  const baseUrl = 'https://www.vibe-coders.es';
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={`${baseUrl}${canonical}`} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      {canonical && <meta property="og:url" content={`${baseUrl}${canonical}`} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
};
