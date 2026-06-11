"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import CTABanner from "@/components/sections/CTABanner";
import { blogPosts } from "@/lib/blog-data";

const categories = ["Tots", "Consells", "Tendències", "Manteniment", "Productes", "Novetats", "Disseny"];

export default function BlogPage() {
  const t = useTranslations("blog");
  const [activeCategory, setActiveCategory] = useState("Tots");

  const filtered = activeCategory === "Tots"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-dark-bg via-sage-900 to-dark-bg py-20 md:py-28">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse-glow" />
        </div>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-manrope)] text-white mb-4">
              {t("title")}
            </h1>
            <p className="text-xl text-white/60">{t("subtitle")}</p>
          </motion.div>
        </Container>
      </section>

      {/* Posts */}
      <Section spacing="lg">
        <Container>
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-surface text-foreground-muted hover:bg-surface-dark hover:text-foreground border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured posts */}
          {activeCategory === "Tots" && (
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {blogPosts.filter((p) => p.featured).map((post, i) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block rounded-2xl overflow-hidden border border-border bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full"
                  >
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                        Destacat
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2 py-0.5 bg-surface text-xs font-medium rounded text-text-muted">
                          {post.category}
                        </span>
                        <span className="text-xs text-text-muted">{post.date}</span>
                        <span className="text-xs text-text-muted">· {post.readTime}</span>
                      </div>
                      <h2 className="text-xl font-bold font-[family-name:var(--font-manrope)] text-foreground group-hover:text-primary transition-colors mb-2">
                        {post.title}
                      </h2>
                      <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* All posts grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeCategory === "Tots" ? filtered.filter((p) => !p.featured) : filtered).map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-2xl overflow-hidden border border-border bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-surface text-xs font-medium rounded text-text-muted">
                        {post.category}
                      </span>
                      <span className="text-xs text-text-muted">{post.date}</span>
                    </div>
                    <h3 className="font-bold font-[family-name:var(--font-manrope)] text-foreground group-hover:text-primary transition-colors mb-1 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-text-muted line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <CTABanner
        title="Necesites assessorament personalitzat?"
        subtitle="Els nostres experts et poden ajudar a triar la millor solució per al teu projecte."
      />
    </div>
  );
}