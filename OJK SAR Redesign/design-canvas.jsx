/* Hash-based router for OJK SAR.
   File:// safe — uses window.location.hash + 'hashchange' event.
   Renders exactly one page at a time. */

const ROUTES = ["login", "beranda", "pengumuman", "kontak", "laporan", "pinjaman"];
const DEFAULT_ROUTE = "login";

function getRoute() {
  const h = (window.location.hash || "").replace(/^#/, "").toLowerCase();
  return ROUTES.includes(h) ? h : DEFAULT_ROUTE;
}

function navigate(route) {
  if (!ROUTES.includes(route)) route = DEFAULT_ROUTE;
  if (window.location.hash !== "#" + route) {
    window.location.hash = "#" + route;
  } else {
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
}

window.OJKNavigate = navigate;
window.OJKGetRoute = getRoute;

function Router() {
  const [route, setRoute] = React.useState(getRoute());

  React.useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#" + DEFAULT_ROUTE);
    }
    const onHash = () => {
      setRoute(getRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const pages = {
    login: window.PageLogin,
    beranda: window.PageBeranda,
    pengumuman: window.PagePengumuman,
    kontak: window.PageKontak,
    laporan: window.PageLaporan,
    pinjaman: window.PagePinjaman,
  };
  const Page = pages[route] || window.PageLogin;
  return <Page />;
}

window.Router = Router;
