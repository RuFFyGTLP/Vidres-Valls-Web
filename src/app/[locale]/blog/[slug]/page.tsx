import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";
import BlogPostClient from "./BlogPostClient";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return { title: "Article no trobat" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": locale === "es" ? post.titleEs : post.title,
    "description": locale === "es" ? post.excerptEs : post.excerpt,
    "image": post.image,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": "Vidres Valls",
      "url": "https://vidres-valls-web.vercel.app",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Vidres Valls",
      "logo": {
        "@type": "ImageObject",
        "url": "https://vidres-valls-web.vercel.app/logo-vidres-valls.png",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://vidres-valls-web.vercel.app/${locale}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogPostClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}
