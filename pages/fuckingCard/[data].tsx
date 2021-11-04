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
        // if (data.split('::')[1] && data.split('::')[2]) setText(text.replace(/from/i, data.split('::')[1]).replace(/to/i, data.split('::')[2]).replace(/noun/i, data.split('::')[2]).replace(/language/i, data.split('::')[2]).replace(/company/i, data.split('::')[2]).replace(/name/i, data.split('::')[2]))
        // else if (data.split('::')[1]) setText(text.replace(/from/i, data.split('::')[1]))
        // else if (data.split('::')[2]) setText(text.replace(/to/i, data.split('::')[2]).replace(/noun/i, data.split('::')[2]).replace(/language/i, data.split('::')[2]).replace(/company/i, data.split('::')[2]).replace(/name/i, data.split('::')[2]))
        // else setText(text.replace(/:from:/i, ':from:').replace(/:to:/i, ':to:').replace(/:noun:/i, ':noun:').replace(/:language:/i, ':language:').replace(/:company:/i, ':company:').replace(/:name:/i, ':name:'))
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
    // const data = await fetch('http://foaas.com/fucks');
    // let fucks = await data.text();
    // let fucksArr = fucks.split('</tr>');
    // fucksArr.pop();
    // let results = [];
    // for (let f of fucksArr) {
    //     let unTrimmedStr = f.split('</td>')[1]?.split('form')[1].trim().split(':from').join(`:from:`).split(':to').join(`:to:`).split(':company').join(`:company:`).split(':name').join(`:name:`).split('');
    //     unTrimmedStr.pop();
    //     unTrimmedStr.shift();
    //     results.push({
    //         title: f.split('</td>')[0].split('/')[1],
    //         text: unTrimmedStr.join('')
    //     });
    // }
    let results = await fetchFucks();
    return {
        props: {
            fuck: results[+query.data.split('::')[0] || 0]
        }
    }
}
