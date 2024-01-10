import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='manifest' href='/manifest.json' />
          <link rel='apple-touch-icon' href='/icon.png'></link>
          <meta name='theme-color' content='#e84c3d' />
          <title>Post Visualizer</title>
          <meta name='description' content='Visualize your post in social media' />
          <meta name='keywords' content='post visualize' />
          <meta name='author' content='Kshitiz Shah' />
          <meta name='robots' content='index, follow' />

          <meta property='og:title' content='YourSchoolSoftware - All-in-One School Management Solution' />
          <meta property='og:description' content='Discover the future of school administration with YourSchoolSoftware.' />
          <meta property='og:image' content='https://i.ibb.co/fpXpmJs/school-and-college-management-system.png' />
          <meta property='og:type' content='website' />
          <meta property='og:url' content='https://yourschoolsoftware.com'></meta>

          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content='YourSchoolSoftware - All-in-One School Management Solution' />
          <meta name='twitter:description' content='Discover the future of school administration with YourSchoolSoftware.' />
          <meta name='twitter:image' content='https://i.ibb.co/k1HFcmD/cover.png' />
          <meta name='twitter:site' content='@yourschoolsoft' />
          <meta name='twitter:creator' content='@yourschoolsoft' />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
