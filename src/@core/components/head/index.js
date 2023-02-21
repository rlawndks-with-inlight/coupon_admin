import Head from "next/head";
import { getLocalStorage } from "src/@core/utils/local-storage";
import { LOCALSTORAGE } from "src/data/data";
import { useEffect, useState } from "react";
import { axiosIns } from "src/@fake-db/backend";
const HeadContent = (props) => {
  const [dnsData, setDnsData] = useState({});
  const { title } = props;
  useEffect(() => {
    getDnsData();
  }, [])

  const getDnsData = async () => {
    try {
      let dns_data = await getLocalStorage(LOCALSTORAGE.DNS_DATA);
      dns_data = JSON.parse(dns_data);
      if (!dns_data?.name) {
        const response = await axiosIns().options('/api/v1/auth/domain', {
          data: {
            dns: location.hostname
          },
        });
        setDnsData(response?.data);
      } else {
        setDnsData(dns_data);
      }
    } catch (err) {
      console.log(err);
    }
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
        <meta property="og:url" content={'https://' + dnsData.dns} />
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
