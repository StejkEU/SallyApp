import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {

	render() {
		return (
			<html>
                <head>
                    <!-- Global site tag (gtag.js) - Google Analytics -->
                    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-77526103-2"></script>
                    <script>
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'UA-77526103-2');
                    </script>

                    <Head>
                        <title>Sally App</title>
                    </Head>
                    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="theme-color" content="#000" />
                    <link rel="manifest" href="" />
                    <link href="https://fonts.googleapis.com/css?family=Encode+Sans+Condensed" rel="stylesheet" />
                    <link href='static/main.css' rel='stylesheet' type='text/css' />

                    <link rel="apple-touch-icon" sizes="57x57" href="static/favicon/apple-icon-57x57.png" />
                    <link rel="apple-touch-icon" sizes="60x60" href="static/favicon/apple-icon-60x60.png" />
                    <link rel="apple-touch-icon" sizes="72x72" href="static/favicon/apple-icon-72x72.png"/>
                    <link rel="apple-touch-icon" sizes="76x76" href="static/favicon/apple-icon-76x76.png"/>
                    <link rel="apple-touch-icon" sizes="114x114" href="static/favicon/apple-icon-114x114.png"/>
                    <link rel="apple-touch-icon" sizes="120x120" href="static/favicon/apple-icon-120x120.png"/>
                    <link rel="apple-touch-icon" sizes="144x144" href="static/favicon/apple-icon-144x144.png"/>
                    <link rel="apple-touch-icon" sizes="152x152" href="static/favicon/apple-icon-152x152.png"/>
                    <link rel="apple-touch-icon" sizes="180x180" href="static/favicon/apple-icon-180x180.png"/>
                    <link rel="icon" type="image/png" sizes="192x192"  href="static/favicon/android-icon-192x192.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="static/favicon/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="96x96" href="static/favicon/favicon-96x96.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="static/favicon/favicon-16x16.png"/>
                    <link rel="manifest" href="static/favicon/manifest.json"/>
                    <meta name="msapplication-TileColor" content="#ffffff"/>
                    <meta name="msapplication-TileImage" content="static/favicon/ms-icon-144x144.png"/>
                    <meta name="theme-color" content="#ffffff"/>
                </head>

				<body id="sallyApp">
					<Main className="main" />
					<NextScript />
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                </body>
			</html>
		);
	}
}
