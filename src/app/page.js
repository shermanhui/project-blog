import React from 'react'

import BlogSummaryCard from '@/components/BlogSummaryCard'

import styles from './homepage.module.css'
import { getBlogPostList } from '@/helpers/file-helpers'

async function Home() {
  const blogPosts = await getBlogPostList()

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>
      {blogPosts.length &&
        blogPosts.map(({ slug, title, publishedOn, abstract }) => (
          <BlogSummaryCard
            key={`${slug}+${title}`}
            slug={slug}
            title={title}
            abstract={abstract}
            publishedOn={publishedOn}
          />
        ))}
    </div>
  )
}

export default Home
