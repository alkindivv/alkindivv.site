import { NextSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { generateSchema } from '@/lib/schema';
import { Metadata } from 'next';
import { BlogPost } from '@/types/blog';

export type SEOProps = {
  templateTitle?: string;
  title?: string;
  description?: string;
  canonical?: string;
  isBlog?: boolean;
  banner?: string;
  tags?: string[];
  category?: string;
  readingTime?: number;
  wordCount?: number;
  date?: string;
  keywords?: string[];
  openGraph?: {
    type?: string;
    title?: string;
    description?: string;
    images?: Array<{ url: string }>;
    article?: {
      publishedTime?: string;
      authors?: string[];
      tags?: string[];
    };
  };
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    images?: string[];
  };
};

const defaultMeta = {
  title: 'AL KINDI - Corporate Law, Technology & Cryptocurrency Expert',
  siteName: 'AL KINDI',
  description:
    'insights and thoughts about law, technology, and cryptocurrency. specialized in corporate mergers and acquisitions, capital markets, bankruptcy & insolvency, and cryptocurrency regulations.',
  url: 'https://alkindivv.site',
  image: 'https://alkindivv.site/images/default.png',
  type: 'website',
  robots:
    'follow, index, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  keywords:
    'corporate law, hukum perusahaan, hukum korporasi, corporate lawyer indonesia, ' +
    'pengacara korporasi, konsultan hukum perusahaan, firma hukum, perseroan terbatas, PT, ' +
    'limited liability company, LLC, perseroan publik, tbk, emiten, perusahaan terbuka, ' +
    'perusahaan tertutup, pendirian PT, establishment of company, company registration, ' +
    'pendaftaran perusahaan, perizinan usaha, business licenses, NIB, anggaran dasar, ' +
    'articles of association, perubahan anggaran dasar, amendment of articles, SABH, ' +
    'administrasi hukum umum, dewan komisaris, direksi, RUPS, board of directors, ' +
    'board of commissioners, general meeting of shareholders, circular resolution, ' +
    'corporate governance, GCG, tata kelola perusahaan, manajemen risiko, risk management, ' +
    'compliance, kepatuhan, company profile, profil perusahaan, company valuation, ' +
    'penilaian perusahaan, business plan, rencana bisnis, mergers and acquisitions, ' +
    'merger dan akuisisi, M&A lawyer indonesia, M&A consultant, konsultan M&A, ' +
    'penggabungan usaha, peleburan usaha, pengambilalihan perusahaan, akuisisi perusahaan, ' +
    'pembelian saham, due diligence, uji tuntas, legal due diligence, financial due diligence, ' +
    'business due diligence, corporate action, aksi korporasi, rights issue, HMETD, ' +
    'private placement, penempatan langsung, divestasi, divestment, spin-off, pemisahan usaha, ' +
    'carve-out, business separation, share acquisition, akuisisi saham, asset acquisition, ' +
    'akuisisi aset, business transfer, pengalihan usaha, company takeover, ' +
    'pengambilalihan perusahaan, hostile takeover, tender offer, penawaran tender, ' +
    'corporate restructuring, restrukturisasi perusahaan, business restructuring, ' +
    'reorganisasi perusahaan, capital markets, pasar modal, securities law, hukum pasar modal, ' +
    'stock market, bursa saham, initial public offering, IPO, penawaran umum perdana, ' +
    'go public, pencatatan saham, listing requirements, right issue, HMETD, rights offering, ' +
    'penawaran umum terbatas, PUT, warrant, waran, convertible bonds, obligasi konversi, ' +
    'sukuk, obligasi syariah, medium term notes, MTN, OJK, otoritas jasa keuangan, IDX, BEI, ' +
    'bursa efek indonesia, financial services authority, indonesia stock exchange, ' +
    'securities trading, perdagangan efek, stock broker, perusahaan efek, investment manager, ' +
    'manajer investasi, mutual funds, reksa dana, collective investment contract, KIK, ' +
    'investment products, produk investasi, public company, perusahaan publik, listed company, ' +
    'emiten, disclosure requirements, keterbukaan informasi, insider trading, ' +
    'perdagangan orang dalam, market manipulation, manipulasi pasar, securities fraud, ' +
    'penipuan efek, bankruptcy law, hukum kepailitan, PKPU, suspension of payment, ' +
    'penundaan kewajiban pembayaran utang, debt restructuring, restrukturisasi utang, ' +
    'debt workout, penyelesaian utang, debt settlement, insolvency, insolvensi, ' +
    'bankruptcy petition, permohonan pailit, bankruptcy proceedings, proses kepailitan, ' +
    'creditor, kreditur, secured creditor, kreditur separatis, unsecured creditor, ' +
    'kreditur konkuren, debt collector, penagih utang, collection agency, agency penagihan, ' +
    'debt collection, penagihan utang, asset recovery, pemulihan aset, asset tracing, ' +
    'penelusuran aset, confiscation, penyitaan, liquidation, likuidasi, winding up, ' +
    'pembubaran perusahaan, bankruptcy trustee, kurator kepailitan, debt moratorium, ' +
    'moratorium utang, debt standstill, penghentian pembayaran, debt compromise, ' +
    'perdamaian utang, corporate litigation, litigasi korporasi, commercial litigation, ' +
    'litigasi komersial, business dispute, sengketa bisnis, commercial court, ' +
    'pengadilan niaga, district court, pengadilan negeri, supreme court, mahkamah agung, ' +
    'alternative dispute resolution, ADR, arbitration, arbitrase, BANI, ICC arbitration, ' +
    'arbitrase internasional, mediation, mediasi, negotiation, negosiasi, ' +
    'settlement agreement, perjanjian perdamaian, shareholder dispute, ' +
    'sengketa pemegang saham, boardroom dispute, sengketa direksi, internal dispute, ' +
    'class action, gugatan perwakilan kelompok, derivative action, gugatan derivatif, ' +
    'citizen lawsuit, legal standing, kedudukan hukum, court proceedings, ' +
    'proses pengadilan, litigation strategy, strategi litigasi, investment law, ' +
    'hukum investasi, foreign investment, penanaman modal asing, PMA, BKPM, ' +
    'investment coordinating board, joint venture, usaha patungan, strategic partnership, ' +
    'kemitraan strategis, business alliance, aliansi bisnis, shareholders agreement, ' +
    'perjanjian pemegang saham, subscription agreement, perjanjian pemesanan saham, ' +
    'business contracts, kontrak bisnis, commercial contracts, kontrak komersial, ' +
    'agreement drafting, pembuatan perjanjian, franchise, waralaba, licensing, lisensi, ' +
    'distribution agreement, perjanjian distribusi, agency agreement, keagenan, ' +
    'intellectual property, HAKI, trademark, merek, patent, paten, copyright, hak cipta, ' +
    'trade secret, rahasia dagang, legal consultant, konsultan hukum, law firm indonesia, ' +
    'kantor hukum, advocate, advokat, lawyer, pengacara, legal opinion, pendapat hukum, ' +
    'legal memorandum, nota hukum, legal advice, nasihat hukum, legal documentation, ' +
    'dokumentasi hukum, legal drafting, pembuatan dokumen hukum, contract review, ' +
    'telaah kontrak, corporate secretary, sekretaris perusahaan, compliance officer, ' +
    'legal officer, in-house counsel, penasehat hukum internal, regulatory compliance, ' +
    'kepatuhan hukum, legal audit, audit hukum, legal risk management, ' +
    'manajemen risiko hukum, legal research, penelitian hukum, legal analysis, ' +
    'analisis hukum, legal framework, kerangka hukum, legal tech, teknologi hukum, ' +
    'digital law, hukum digital, information technology law, hukum teknologi informasi, ' +
    'cryptocurrency law, hukum kripto, blockchain law, hukum blockchain, smart contracts, ' +
    'kontrak pintar, fintech law, hukum fintech, digital banking, perbankan digital, ' +
    'electronic money, uang elektronik, data protection, perlindungan data, privacy law, ' +
    'hukum privasi, cybersecurity, keamanan siber, digital signature, ' +
    'tanda tangan elektronik, electronic evidence, bukti elektronik, digital forensics, ' +
    'forensik digital, artificial intelligence law, hukum kecerdasan buatan, ' +
    'machine learning regulations, regulasi pembelajaran mesin, internet law, hukum internet, ' +
    'digital platform, platform digital, online marketplace, pasar online',
} as const;

export default function SEO(props: SEOProps) {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
  };

  // Use the passed openGraph or create a default one
  const openGraph = props.openGraph || {
    title: meta.title,
    description: meta.description,
    images: [{ url: meta.image }],
    type: props.isBlog ? 'article' : 'website',
  };

  // Use the passed twitter or create a default one
  const twitter = props.twitter || {
    card: 'summary_large_image',
    site: '@alkindivv',
    creator: '@alkindivv',
    title: meta.title,
    description: meta.description,
  };

  // Generate canonical URL
  const canonicalUrl = props.canonical
    ? props.canonical
    : `${meta.url}${router.asPath.split('?')[0]}`; // Remove query parameters

  meta.title = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title;

  const schema = generateSchema({
    title: meta.title,
    description: meta.description,
    url: canonicalUrl,
    siteName: meta.siteName,
    image: props.banner || meta.image,
    type: props.isBlog ? 'article' : 'website',
    date: props.date,
    category: props.category,
    tags: props.tags,
    wordCount:
      props.wordCount ||
      (props.readingTime ? props.readingTime * 200 : undefined),
  });

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content={meta.robots} />
        <meta name="description" content={meta.description} />
        <meta
          name="keywords"
          content={
            Array.isArray(meta.keywords)
              ? meta.keywords.join(', ')
              : meta.keywords
          }
        />
        <meta name="author" content="AL KINDI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Language */}
        <meta property="og:locale" content="id_ID" />
        <meta property="og:locale:alternate" content="en_US" />
        <link rel="alternate" hrefLang="id-ID" href={canonicalUrl} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0a0a0a" />

        {/* Open Graph */}
        <meta property="og:url" content={`${meta.url}${router.asPath}`} />
        <meta property="og:type" content={openGraph.type || 'website'} />
        <meta property="og:site_name" content={meta.siteName} />
        <meta
          property="og:description"
          content={openGraph.description || meta.description}
        />
        <meta property="og:title" content={openGraph.title || meta.title} />
        {openGraph.images?.map((image, index) => (
          <meta key={index} property="og:image" content={image.url} />
        ))}

        {/* Twitter */}
        <meta name="twitter:card" content={twitter.card} />
        <meta name="twitter:site" content={twitter.site} />
        <meta name="twitter:creator" content={twitter.creator} />
        <meta name="twitter:title" content={twitter.title || meta.title} />
        <meta
          name="twitter:description"
          content={twitter.description || meta.description}
        />

        {/* Additional Meta for Blog Posts */}
        {props.isBlog && (
          <>
            <meta property="article:author" content="AL KINDI" />
            <meta property="article:section" content={props.category} />
            {props.tags?.map((tag) => (
              <meta key={tag} property="article:tag" content={tag} />
            ))}
            <meta property="article:published_time" content={props.date} />
            <meta property="article:modified_time" content={props.date} />
            {props.readingTime && (
              <meta
                property="article:reading_time"
                content={String(props.readingTime)}
              />
            )}
          </>
        )}

        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      </Head>
      <NextSeo
        title={meta.title}
        description={meta.description}
        canonical={props.canonical}
        openGraph={openGraph}
        twitter={twitter}
      />
    </>
  );
}

interface GenerateBlogMetadataProps {
  post: BlogPost;
  baseUrl?: string;
}

export function generateBlogMetadata({
  post,
  baseUrl = 'https://alkindivv.site',
}: GenerateBlogMetadataProps): Metadata {
  const {
    title,
    description,
    featuredImage,
    author,
    date,
    category,
    tags = [],
  } = post;

  const publishedTime = new Date(date).toISOString();
  const ogImage = featuredImage
    ? `${baseUrl}${featuredImage}`
    : `${baseUrl}/og-image.png`;

  return {
    title,
    description,
    authors: [{ name: author }],
    keywords: [...tags, category, 'blog', 'AL KINDI', author],
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      authors: [author],
      tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: `${baseUrl}/blog/${category}/${post.slug}`,
    },
  };
}

interface GenerateBlogListingMetadataProps {
  title: string;
  description: string;
  baseUrl?: string;
  category?: string;
}

export function generateBlogListingMetadata({
  title,
  description,
  baseUrl = 'https://alkindivv.site',
  category,
}: GenerateBlogListingMetadataProps): Metadata {
  const path = category ? `/blog/${category}` : '/blog';
  const fullTitle = category
    ? `${title} - ${category.charAt(0).toUpperCase() + category.slice(1)} Articles`
    : title;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${baseUrl}/og-image.png`],
    },
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
  };
}
