import Link from "next/link";
import { useRouter, NextRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import CommonLayout from "../../layouts/Common";
import { IFuck } from "../../types/commonTypes";
import styles from './../../styles/FuckingPage.module.css';
import QRCode from 'qrcode';
import { replaceQueryParams } from "../../helpers/replacer";
import { fetchFucks } from "../../helpers/fetching";

export default function FuckingPage({ fuck }: { fuck: IFuck }) {
    const router = useRouter();

    const canvas = useRef();

    let [text, setText] = useState(fuck.text);
    let data: string = router.query.data as string;
    useEffect(() => {
        let cardData = {
            title: '',
            text,
            id: -1
        }
        let from = data.split('::')[1];
        let to = data.split('::')[2];
        replaceQueryParams({cardData, from, to, setText});
    }, [router.query.data]);

    useEffect(() => {
        QRCode.toCanvas(canvas.current, getFullUrl(), function (error: any) {
            if (error) console.error(error)
        })
    }, [])

    let quoteAuthor = text.split('-')[text.split('-').length - 1];
    let preparedText = text.split('-');
    preparedText.pop();
    let readyText = preparedText.join('-');

    let [showFuckingNotice, setShowFuckingNotice] = useState(false);

    function showNotice(): void {
        setShowFuckingNotice(true);
        setTimeout(() => setShowFuckingNotice(false), 3000);
    }

    function handleNeedShowFuckingNotice(): void {
        navigator.clipboard.writeText(getFullUrl())
            .then(() => {
                showNotice();
            })
    }

    return (
        <CommonLayout title={"FOaaS UI | Fucking card #" + data.split('::')[0]} heading={`Fucking card #${data.split('::')[0]} - ${fuck.title}`}>
            <div className={styles.wrapper}>
                <div className={styles.quote}>
                    <b>
                        {
                            readyText.split('@').map((f, i) => !(i % 2) ? <span key={`pieceParsed-${fuck.title}-${i}`}>{f.toString()}</span> : <span key={`pieceParsed-${fuck.title}-${i}`}>{f.toString()}</span>)
                        }
                    </b>
                    <br />
                    <br />
                    <i>-{" "}{quoteAuthor.replace(/@from@/g, data.split('::')[1]).replace(/@/g, '')}</i>
                </div>
                <div className={styles.linksWrapper}>
                    <div className={styles.linksInner}>
                        <canvas ref={canvas}></canvas>
                        <div className={styles.copyButton} onClick={handleNeedShowFuckingNotice}>
                            <i className="fas fa-link"></i>
                            <p>copy link</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer className={styles.footer}>
                <Link href={'/'}><a><p>Back to main</p></a></Link>
            </footer>

            <div className={[styles.fuckingNotice, showFuckingNotice && styles.showFuckingNotice].join(' ')}><p>Copied to clipboard!</p></div>
        </CommonLayout>
    );
}

function getFullUrl(req = null) {
    if (req) {
        return req.protocol + '://' + req.get('host') + req.originalUrl
    }
    else if (!(typeof window === 'undefined')) {
        return window.location.href
    }
}

export async function getServerSideProps({ query }) {
    let results = await fetchFucks();
    return {
        props: {
            fuck: results[+query.data.split('::')[0] || 0]
        }
    }
}
