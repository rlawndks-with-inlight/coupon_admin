import Head from "next/head";
import { getLocalStorage } from "src/@core/utils/local-storage";
import { LOCALSTORAGE } from "src/data/data";
import { useEffect, useState } from "react";
import { axiosIns } from "src/@fake-db/backend";
const HeadContent = (props) => {
  const [dnsData, setDnsData] = useState({});
  const { title, dns_data } = props;
  // useEffect(() => {
  //   getDnsData();
  // }, [])

  // const getDnsData = async () => {
  //   try {
  //     let dns_data = await getLocalStorage(LOCALSTORAGE.DNS_DATA);
  //     dns_data = JSON.parse(dns_data);
  //     if (!dns_data?.name) {
  //       const response = await axiosIns().options('/api/v1/auth/domain', {
  //         data: {
  //           dns: location.hostname
  //         },
  //       });
  //       setDnsData(response?.data);
  //     } else {
  //       setDnsData(dns_data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  return (
    <>
      <Head>
        <title>{`${dns_data.name ?? ""}${title ? ` - ${title}` : ''}`}</title>
        <meta
          name='description'
          content={dns_data.og_description}
        />
        <link rel='shortcut icon' href={dns_data.favicon_img} />
        <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={dns_data.name} />
        <meta property="og:image" content={dns_data.og_img} />
        <meta property="og:url" content={'https://' + dns_data.dns} />
        <meta property="og:description" content={dns_data.og_description} />
        <meta name="author" content="purplevery" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={dns_data.name} />
        {/* <meta name="theme-color" content="{{ $bk_clr }}"> <- 여기엔 테마색상 적용 */}
        <link rel="apple-touch-icon" sizes="180x180" href={dns_data.favicon_img} />
      </Head>
    </>
  )
}

export default HeadContent;
