'use client';
import { useRouter } from "next/navigation";
import { getLocalStorage } from "src/@core/utils/local-storage";
import { LOCALSTORAGE } from "src/data/data";

const HeadContent = () => {
  const router = useRouter();

  useEffect(() => {
    getDnsData();
  }, [router.pathname])

  const getDnsData = async () => {
    let dns_data = await getLocalStorage(LOCALSTORAGE.DNS_DATA);
    console.log(dns_data)
  }

  return (
    <>
      <title>{`comagain`}</title>
      <meta
        name='description'
        content={`comagain`}
      />
      <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
      <meta name='viewport' content='initial-scale=1, width=device-width' />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="{{ $name }}" />
      <meta property="og:image" content="{{ $favicon_img }}" />
      <meta property="og:description" content="모두가 간편한 서비스 {{ $name }}" />
      <meta name="author" content="purplevery" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="{{ $name }}" />
      {/* <meta name="theme-color" content="{{ $bk_clr }}"> <- 여기엔 테마색상 적용 */}
      <link rel="apple-touch-icon" sizes="180x180" href="{{ $favicon_img }}" />
      <link rel="shortcut icon" href="{{ $favicon_img }}" type="image/x-icon" />
    </>
  )
}

export default HeadContent;
