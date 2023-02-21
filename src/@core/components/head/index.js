import Head from "next/head";
import { getLocalStorage } from "src/@core/utils/local-storage";
import { LOCALSTORAGE } from "src/data/data";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
const HeadContent = (props) => {
  const [dnsData, setDnsData] = useState({});
  const { title } = props;
  const router = useRouter();
  const theme = useTheme();
  useEffect(() => {
    getDnsData();
    console.log(theme)
  }, [])

  const getDnsData = async () => {
    let dns_data = await getLocalStorage(LOCALSTORAGE.DNS_DATA);
    dns_data = JSON.parse(dns_data);
    console.log(dns_data)
    setDnsData(dns_data);
  }

  return (
    <>
      <Head>
        <title>{`${dnsData.name ?? ""}${title ? ` - ${title}` : ''}`}</title>
        <meta
          name='description'
          content={dnsData.og_description}
        />
        <link rel='shortcut icon' href={dnsData.favicon_img} />
        <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={dnsData.name} />
        <meta property="og:image" content={dnsData.og_img} />
        <meta property="og:description" content={dnsData.og_description} />
        <meta name="author" content="purplevery" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={dnsData.name} />
        {/* <meta name="theme-color" content="{{ $bk_clr }}"> <- 여기엔 테마색상 적용 */}
        <link rel="apple-touch-icon" sizes="180x180" href={dnsData.favicon_img} />
      </Head>
    </>
  )
}

export default HeadContent;
