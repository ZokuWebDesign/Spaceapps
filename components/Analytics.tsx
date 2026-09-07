const clean = (val?: string): string | undefined => {
  if (!val) return undefined;
  const trimmed = val.trim().replace(/^["']|["']$/g, "");
  return trimmed.length > 0 ? trimmed : undefined;
};

const cleanTagId = (val?: string): string | undefined => {
  const cleaned = clean(val);
  if (!cleaned || cleaned === "AW-" || cleaned === "AW") return undefined;
  return cleaned;
};

export const analyticsConfig = {
  googleAnalyticsId: clean(
    process.env.PUBLIC_GOOGLE_ANALYTICS_ID ||
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ||
      process.env.VITE_GA_MEASUREMENT_ID ||
      process.env.GOOGLE_ANALYTICS_ID
  ),
  gtmId: clean(
    process.env.PUBLIC_GTM_ID ||
      process.env.NEXT_PUBLIC_GTM_ID ||
      process.env.GTM_ID
  ),
  googleTagId: cleanTagId(
    process.env.PUBLIC_GOOGLE_TAG_ID ||
      process.env.NEXT_PUBLIC_GOOGLE_TAG_ID ||
      process.env.GOOGLE_TAG_ID
  ),
  clarityId: clean(
    process.env.PUBLIC_CLARITY_ID ||
      process.env.NEXT_PUBLIC_CLARITY_ID ||
      process.env.CLARITY_ID
  ),
};

export function AnalyticsHead() {
  const { googleAnalyticsId, gtmId, googleTagId, clarityId } = analyticsConfig;

  return (
    <>
      {gtmId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'dataLayer','${gtmId}');`,
          }}
        />
      )}

      {googleAnalyticsId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}');${googleTagId ? `\ngtag('config', '${googleTagId}');` : ""}`,
            }}
          />
        </>
      )}

      {clarityId && (
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${clarityId}");`,
          }}
        />
      )}
    </>
  );
}

export function AnalyticsBody() {
  const { gtmId } = analyticsConfig;

  if (!gtmId) return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
