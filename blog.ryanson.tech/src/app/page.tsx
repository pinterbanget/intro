'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import postsData from '../data/posts.json';

interface Post {
  id: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
}

export default function Home() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Auto-sort by date (newest first)
  const sortedPosts = useMemo(() => {
    return [...postsData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  const tags = useMemo(() => {
    const allTags = postsData.flatMap(p => p.tags);
    return Array.from(new Set(allTags));
  }, []);

  const filteredPosts = activeTag
    ? sortedPosts.filter(p => p.tags.includes(activeTag))
    : sortedPosts;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveTag(null)}
          className={`tag-btn ${!activeTag ? 'active' : ''}`}
        >
          All
        </button>
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`tag-btn ${tag === activeTag ? 'active' : ''}`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {filteredPosts.map((post, index) => (
          <Link
            key={post.id}
            href={`/post/${post.id}`}
            className="post-card reveal"
            style={{ animationDelay: `${index * 0.1}s`, textDecoration: 'none', color: 'inherit' }}
          >
            <span style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px', display: 'block' }}>
              {formatDate(post.date)}
            </span>
            <h2 style={{ margin: '0 0 12px', fontSize: '20px', color: '#fff' }}>{post.title}</h2>
            <p style={{ color: 'var(--muted)', fontSize: '14px', margin: '0 0 16px' }}>{post.excerpt}</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {post.tags.map(t => (
                <span key={t} className="tag-pill">{t}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .tag-btn {
          background: rgba(0, 0, 0, 0.18);
          color: var(--muted);
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 13px;
          border: 1px solid rgba(255, 255, 255, 0.02);
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }
        .tag-btn:hover, .tag-btn.active {
          color: var(--accent);
          border-color: rgba(0, 230, 168, 0.3);
          background: rgba(0, 230, 168, 0.05);
        }
        .post-card {
          background: var(--panel);
          padding: 24px;
          border-radius: 12px;
          border: 1px solid var(--glass);
          transition: transform 0.2s, box-shadow 0.2s;
          display: block;
          position: relative;
        }
        .post-card::before {
          content: '';
          display: block;
          height: 1px;
          margin-bottom: 12px;
          background: linear-gradient(90deg, rgba(0, 230, 168, 0.08), transparent);
        }
        .post-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
          border-color: rgba(0, 230, 168, 0.1);
        }
        .tag-pill {
          background: rgba(255, 255, 255, 0.02);
          color: var(--muted);
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 11px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </div>
  );
}
