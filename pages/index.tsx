import Head from "next/head"
import Link from "next/link"
import { getSortedPostsData } from "../lib/posts"
import Layout, { siteTitle } from "../components/layout"
import Date from "../components/date"

import utilStyles from "../styles/utils.module.css"
import { GetStaticProps } from "next"

export default function Home({ allPostsData }: { allPostsData: { id: string, date: string, title: string }[] }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, I'm Omer Dolev. I'm a software engineer at Microsoft Israel.</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <div className={utilStyles.lightText}>
                <Date dateString={date} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    allPostsData: getSortedPostsData()
  }
})