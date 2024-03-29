import type { NextPage } from 'next'
import { Html, Head, Main, NextScript } from 'next/document'

const Home: NextPage = () => {
    return (
        <Html lang="no">
            <Head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
            </Head>
            <body>
                <Main />

                <NextScript />
            </body>
        </Html>
    )
}

export default Home
