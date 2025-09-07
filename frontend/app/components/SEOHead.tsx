"use client";

import { usePathname } from 'next/navigation';
import SEOHeadServer from './SEOHeadServer';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'course' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  locale?: string;
  alternateLocales?: string[];
  noIndex?: boolean;
  noFollow?: boolean;
  canonicalUrl?: string;
  structuredData?: any;
  pathname?: string;
}

export default function SEOHead(props: SEOHeadProps) {
  const pathname = usePathname();

  return (
    <SEOHeadServer
      {...props}
      pathname={props.pathname || pathname || '/'}
    />
  );
}
