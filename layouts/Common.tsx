import Head from "next/head";
import React, { Children } from "react";
import styles from './../styles/CommonLayout.module.css';

export default function CommonLayout({title, heading, className = '', children} : {title: string, heading: string, className?: string, children?: React.ReactNode[]}) {
    return (
        <React.Fragment>
            <Head>
                <title>{title}</title>
            </Head>
            <h1 className={styles.heading}>{heading}</h1>
            <p className={styles.headingHelper}>Write a letter to your friend :)</p>
            <section className={className}>
                {
                    children
                }
            </section>
        </React.Fragment>
    );
}