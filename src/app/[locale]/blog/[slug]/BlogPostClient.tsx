"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import CTABanner from "@/components/sections/CTABanner";

interface Post {
  slug: string;
  title: string;
  titleEs: string;
  excerpt: string;
  excerptEs: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
  image: string;
  featured?: boolean;
}

interface Props {
  post: Post;
  relatedPosts: Post[];
}

export default function BlogPostClient({ post, relatedPosts }: Props) {
  const t = useTranslations("blog");

  // Dynamic URL for social sharing
  const postUrl = typeof window !== "undefined" ? window.location.href : `https://vidres-valls-web.vercel.app/blog/${post.slug}`;

  // Convert markdown-like content to HTML sections
  const sections = post.content.split("\n\n").filter(Boolean);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-dark-bg via-[#1a1035] to-dark-bg py-20 md:py-28">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse-glow" />
        </div>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary/20 text-primary-light text-sm font-medium rounded-full">
                {post.category}
              </span>
              <span className="text-white/40 text-sm">{post.date}</span>
              <span className="text-white/40 text-sm">· {post.readTime}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-manrope)] text-white mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-white/60">{post.excerpt}</p>
          </motion.div>
        </Container>
      </section>

      {/* Cover Image */}
      <div className="w-full h-64 md:h-96 bg-gradient-to-br from-primary/20 to-secondary/20">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
      </div>

      {/* Article Content */}
      <Section spacing="lg">
        <Container>
          <div className="max-w-3xl mx-auto">
            <article className="prose prose-lg max-w-none">
              {sections.map((section, i) => {
                if (section.startsWith("## ")) {
                  return (
                    <motion.h2
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-2xl font-bold font-[family-name:var(--font-manrope)] text-foreground mt-10 mb-4"
                    >
                      {section.replace("## ", "")}
                    </motion.h2>
                  );
                }
                if (section.startsWith("### ")) {
                  return (
                    <motion.h3
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-xl font-bold font-[family-name:var(--font-manrope)] text-foreground mt-8 mb-3"
                    >
                      {section.replace("### ", "")}
                    </motion.h3>
                  );
                }
                if (section.startsWith("**")) {
                  return (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="text-foreground leading-relaxed font-semibold my-4"
                    >
                      {section}
                    </motion.p>
                  );
                }
                if (section.startsWith("- ")) {
                  const items = section.split("\n").filter((l) => l.startsWith("- "));
                  return (
                    <motion.ul
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="list-disc list-inside space-y-2 my-4 text-foreground-muted"
                    >
                      {items.map((item, j) => (
                        <li key={j}>{item.replace("- ", "")}</li>
                      ))}
                    </motion.ul>
                  );
                }
                if (/^\d+\./.test(section)) {
                  const items = section.split("\n").filter((l) => /^\d+\./.test(l));
                  return (
                    <motion.ol
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="list-decimal list-inside space-y-2 my-4 text-foreground-muted"
                    >
                      {items.map((item, j) => (
                        <li key={j}>{item.replace(/^\d+\.\s*/, "")}</li>
                      ))}
                    </motion.ol>
                  );
                }
                return (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-foreground-muted leading-relaxed my-4"
                  >
                    {section}
                  </motion.p>
                );
              })}
            </article>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm text-text-muted mb-4">Comparteix aquest article:</p>
              <div className="flex gap-3">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success hover:bg-success hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#1877f2]/10 flex items-center justify-center text-[#1877f2] hover:bg-[#1877f2] hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Section spacing="lg" className="bg-surface border-t border-border">
          <Container>
            <h3 className="text-2xl font-bold font-[family-name:var(--font-manrope)] text-foreground mb-8">
              Articles relacionats
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((related, i) => (
                <motion.div
                  key={related.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={`/blog/${related.slug}`}
                    className="group block rounded-2xl overflow-hidden border border-border bg-white hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-text-muted">{related.category}</span>
                      <h4 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mt-1">
                        {related.title}
                      </h4>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <CTABanner
        title="Necesites ajuda amb el teu projecte?"
        subtitle="Els nostres experts et poden assessorar sense compromís."
      />
    </div>
  );
}