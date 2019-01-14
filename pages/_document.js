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
                        <title>Sally App Sally Down</title>
                    </Head>
                    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,minimal-ui" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="theme-color" content="#000" />
                    <link rel="manifest" href="" />
                    <link href="https://fonts.googleapis.com/css?family=Encode+Sans+Condensed" rel="stylesheet" />
                    <link href='static/main.css' rel='stylesheet' type='text/css' />

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
