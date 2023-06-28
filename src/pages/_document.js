import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class RootDocument extends Document {

  render() {
    return (
      <Html>
        <Head>

        </Head>
        <body onContextMenu={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()} onSelectStart={(e) => e.preventDefault()} style={{
        }}>
          <div onClick={() => {
            void (0);
          }}>
            <Main />
            <NextScript />

          </div>
        </body>
      </Html>
    );
  }
}
