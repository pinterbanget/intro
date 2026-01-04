import Link from 'next/link';
import { notFound } from 'next/navigation';
import postsData from '../../../data/posts.json';

interface Post {
    id: string;
    title: string;
    date: string;
    tags: string[];
    content: string;
}

export function generateStaticParams() {
    return postsData.map((post) => ({
        id: post.id,
    }));
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = (postsData as Post[]).find((p) => p.id === id);

    if (!post) {
        notFound();
    }

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="reveal">
            <Link href="/" style={{
                display: 'inline-flex',
                alignItems: 'center',
                color: 'var(--accent)',
                textDecoration: 'none',
                marginBottom: '32px',
                fontSize: '14px'
            }}>
                ← Back to home
            </Link>

            <header style={{ marginBottom: '32px' }}>
                <span style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px', display: 'block' }}>
                    {formatDate(post.date)}
                </span>
                <h1 style={{ fontSize: 'clamp(32px, 6vw, 48px)', color: '#fff', margin: '0 0 16px', lineHeight: 1.2 }}>
                    {post.title}
                </h1>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {post.tags.map(t => (
                        <span key={t} className="tag-pill">{t}</span>
                    ))}
                </div>
            </header>

            <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </div>
    );
}
