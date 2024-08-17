import React from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'

import BlogHero from '@/components/BlogHero'

import styles from './postSlug.module.css'
import { loadBlogPost } from '@/helpers/file-helpers'
import CodeSnippet from '@/components/CodeSnippet'
import { BLOG_TITLE } from '@/constants'

const DivisionGroupsDemo = React.lazy(() =>
  import('@/components/DivisionGroupsDemo')
)

export async function generateMetadata({ params }) {
  const {
    frontmatter: { title, abstract },
  } = await loadBlogPost(params.postSlug)

  return {
    title: `${title} • ${BLOG_TITLE}`,
    description: abstract,
  }
}

async function BlogPost({ params }) {
  const {
    frontmatter: { title, publishedOn },
    content,
  } = await loadBlogPost(params.postSlug)

  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{ pre: CodeSnippet, DivisionGroupsDemo }}
        />
      </div>
    </article>
  )
}

export default BlogPost
