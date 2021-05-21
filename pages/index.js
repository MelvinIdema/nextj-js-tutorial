import { useEffect, useState } from "react";
import Head from 'next/head';
import Link from "next/link";
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData
        }
    }
}

export default function Home({ allPostsData }) {
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("/api/hello")
            .then(res => res.json())
            .then(data => setMsg(data.text))
            .catch(err => setMsg(err))
            .finally(() => setLoading(false));
    }, [])

    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <div>{!loading && msg}</div>
                <p>Hello, I'm <strong>Melvin</strong>. A Next.JS student.</p>
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
                            <br/>
                            {id}
                            <br/>
                            {date}
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    )
}