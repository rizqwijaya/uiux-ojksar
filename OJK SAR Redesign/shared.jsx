/* Shared components for OJK SAR redesign */
const { useState, useEffect, useRef, useMemo } = React;

/* Hash navigation helpers (router lives in design-canvas.jsx) */
function go(route) { (window.OJKNavigate || (() => {}))(route); }
function useCurrentHash() {
  const [h, setH] = useState((window.location.hash || "").replace(/^#/, "").toLowerCase());
  useEffect(() => {
    const fn = () => setH((window.location.hash || "").replace(/^#/, "").toLowerCase());
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);
  return h;
}
window.OJKGo = go;
window.useCurrentHash = useCurrentHash;

/* ── Icons (Lucide-style 1.5px stroke) ── */
const Icon = ({ name, size = 18, color = "currentColor", strokeWidth = 1.75, style }) => {
  const paths = {
    home: <><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></>,
    bell: <><path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9z" /><path d="M10 21a2 2 0 004 0" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
    file: <><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" /><path d="M14 3v6h6" /></>,
    wallet: <><path d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><path d="M16 12h3" /><path d="M3 9h18" /></>,
    heart: <path d="M12 21s-7-4.5-9.5-9A5 5 0 0112 6a5 5 0 019.5 6c-2.5 4.5-9.5 9-9.5 9z" />,
    chart: <><path d="M3 3v18h18" /><path d="M7 14l4-4 4 4 5-6" /></>,
    chevron: <path d="M9 6l6 6-6 6" />,
    chevronDown: <path d="M6 9l6 6 6-6" />,
    chevronUp: <path d="M18 15l-6-6-6 6" />,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0116 0" /></>,
    lock: <><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" /></>,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.5-4.5" /></>,
    download: <><path d="M12 3v12" /><path d="M7 10l5 5 5-5" /><path d="M4 21h16" /></>,
    filter: <path d="M3 5h18l-7 9v6l-4-2v-4z" />,
    refresh: <><path d="M3 12a9 9 0 0115-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 01-15 6.7L3 16" /><path d="M3 21v-5h5" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    minus: <path d="M5 12h14" />,
    check: <path d="M5 12l5 5L20 7" />,
    x: <><path d="M6 6l12 12" /><path d="M18 6L6 18" /></>,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 8h.01" /><path d="M11 12h1v5h1" /></>,
    warn: <><path d="M12 3l10 18H2z" /><path d="M12 10v5" /><path d="M12 18h.01" /></>,
    phone: <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8 9.6a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z" />,
    map: <><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></>,
    pdf: <><path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" /><path d="M14 3v6h6" /><path d="M9 14h.5a1.5 1.5 0 010 3H9v-3z" /><path d="M14 14h2v3h-2z" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18" /><path d="M8 3v4" /><path d="M16 3v4" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 01-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 01-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 012.8-2.8l.1.1a1.7 1.7 0 001.8.3h0a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 012.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8v0a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z" /></>,
    logout: <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></>,
    menu: <><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>,
    arrowRight: <><path d="M5 12h14" /><path d="M13 5l7 7-7 7" /></>,
    arrowUp: <><path d="M12 19V5" /><path d="M5 12l7-7 7 7" /></>,
    arrowDown: <><path d="M12 5v14" /><path d="M19 12l-7 7-7-7" /></>,
    pin: <><circle cx="12" cy="10" r="3" /><path d="M12 2a8 8 0 018 8c0 4-8 12-8 12S4 14 4 10a8 8 0 018-8z" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    building: <><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M9 9h.01" /><path d="M15 9h.01" /><path d="M9 13h.01" /><path d="M15 13h.01" /><path d="M9 17h6" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 010 18" /><path d="M12 3a14 14 0 000 18" /></>,
    sort: <><path d="M7 4v16" /><path d="M3 8l4-4 4 4" /><path d="M17 20V4" /><path d="M21 16l-4 4-4-4" /></>,
    coin: <><circle cx="12" cy="12" r="9" /><path d="M12 7v10" /><path d="M9 9h4.5a1.5 1.5 0 010 3H10a1.5 1.5 0 000 3h5" /></>,
    handshake: <><path d="M11 17l2 2a1 1 0 001.4 0l5-5a1 1 0 000-1.4l-3-3-1 1" /><path d="M14 7l-2-2a2 2 0 00-2.8 0L4 10l3 3 1-1" /><path d="M9 11l-3 3" /></>,
    award: <><circle cx="12" cy="9" r="6" /><path d="M9 14l-2 7 5-3 5 3-2-7" /></>,
    inbox: <><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5 5l-3 7v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3-7a2 2 0 00-1.8-1H6.8A2 2 0 005 5z" /></>,
    megaphone: <><path d="M3 11v2a1 1 0 001 1h2l8 5V5L6 10H4a1 1 0 00-1 1z" /><path d="M18 8a5 5 0 010 8" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
      {paths[name] || null}
    </svg>
  );
};

/* ── Top App Bar ── */
function TopBar({ active, user = "Admin SAR", onNav }) {
  const links = [
    { label: "Beranda", route: "beranda" },
    { label: "Pengumuman", route: "pengumuman" },
    { label: "Kontak", route: "kontak" },
  ];
  const hash = useCurrentHash();
  const [langOpen, setLangOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [lang, setLang] = useState(() => (window.OJKi18n && window.OJKi18n.getLanguage()) || "ID");
  const dropdownRef = useRef(null);
  const langRef = useRef(null);
  useEffect(() => {
    if (!userOpen) return;
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [userOpen]);
  useEffect(() => {
    if (!langOpen) return;
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [langOpen]);
  useEffect(() => {
    const onChange = (e) => setLang(e.detail.lang);
    window.addEventListener("ojkLangChange", onChange);
    return () => window.removeEventListener("ojkLangChange", onChange);
  }, []);
  const pickLang = (code) => {
    setLangOpen(false);
    if (window.OJKi18n) window.OJKi18n.setLanguage(code);
    setLang(code);
  };
  return (
    <header style={{
      display: "flex", alignItems: "stretch",
      background: "var(--color-primary)", color: "#fff",
      height: 56, borderBottom: "3px solid var(--primary-700)",
      fontFamily: "var(--font-family)",
    }}>
      {/* Logo block */}
      <div style={{ width: 240, display: "flex", alignItems: "center", gap: 10, padding: "0 20px", background: "#fff", borderRight: "1px solid var(--neutral-200)" }}>
        <img src="assets/OJK_Logo.png" alt="OJK" style={{ height: 32 }} />
        <div style={{ lineHeight: 1.05 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-primary)", letterSpacing: "-0.01em" }}>OJK SAR</div>
          <div style={{ fontSize: 9.5, color: "var(--neutral-600)", fontWeight: 600, letterSpacing: "0.02em", textTransform: "uppercase" }}>Sistem Aplikasi Remunerasi</div>
        </div>
      </div>
      {/* Nav */}
      <nav style={{ display: "flex", alignItems: "stretch", flex: 1, paddingLeft: 12 }}>
        {links.map(l => {
          const isActive = hash === l.route || active === l.label;
          return (
            <a key={l.route} href={"#" + l.route} style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "0 20px",
              fontSize: 14, fontWeight: isActive ? 700 : 500,
              color: "#fff", textDecoration: "none", cursor: "pointer",
              background: isActive ? "var(--primary-700)" : "transparent",
              borderBottom: isActive ? "3px solid #fff" : "3px solid transparent",
              marginBottom: -3,
              transition: "background 150ms ease",
              whiteSpace: "nowrap",
            }}>{l.label}</a>
          );
        })}
      </nav>
      {/* Right cluster */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "0 12px" }}>
        <button style={topBtn}><Icon name="bell" size={18} /><span style={notifDot} /></button>
        <div ref={langRef} style={{ position: "relative" }}>
          <button style={topBtn} onClick={() => setLangOpen(v => !v)}>
            <Icon name="globe" size={16} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>{lang}</span>
            <Icon name={langOpen ? "chevronUp" : "chevronDown"} size={14} />
          </button>
          {langOpen && (
            <div style={{
              position: "absolute", top: "calc(100% + 4px)", right: 0,
              background: "#fff", border: "1px solid var(--neutral-200)",
              borderRadius: "var(--radius-lg)", boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              minWidth: 160, zIndex: 999, overflow: "hidden",
            }}>
              {[
                { code: "ID", label: "Bahasa Indonesia" },
                { code: "EN", label: "English" },
              ].map(opt => {
                const active = lang === opt.code;
                return (
                  <button key={opt.code} onClick={() => pickLang(opt.code)} style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 14px",
                    background: active ? "var(--primary-50)" : "transparent",
                    border: "none", cursor: "pointer",
                    fontSize: 13, fontWeight: active ? 700 : 500,
                    color: active ? "var(--color-primary)" : "var(--neutral-700)",
                    fontFamily: "var(--font-family)", textAlign: "left",
                  }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700,
                      width: 28, padding: "2px 0", textAlign: "center",
                      borderRadius: 4,
                      background: active ? "var(--color-primary)" : "var(--neutral-100)",
                      color: active ? "#fff" : "var(--neutral-600)",
                    }}>{opt.code}</span>
                    <span style={{ flex: 1 }}>{opt.label}</span>
                    {active && <Icon name="check" size={14} color="var(--color-primary)" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.25)", margin: "0 6px" }} />
        {/* Profile dropdown */}
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button onClick={() => setUserOpen(v => !v)} style={{ ...topBtn, gap: 8, padding: "0 10px", width: 182 }}>
            <div style={{
              width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg,#FF977A,#F0714D)",
              color: "#fff", fontSize: 12, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "2px solid rgba(255,255,255,0.3)",
            }}>AS</div>
            <div style={{ textAlign: "left", lineHeight: 1.1, flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user}</div>
              <div style={{ fontSize: 10.5, opacity: 0.8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Pegawai Tetap</div>
            </div>
            <Icon name={userOpen ? "chevronUp" : "chevronDown"} size={14} style={{ flexShrink: 0 }} />
          </button>
          {userOpen && (
            <div style={{
              position: "absolute", top: "calc(100% + 4px)", right: 0,
              background: "#fff", border: "1px solid var(--neutral-200)",
              borderRadius: "var(--radius-lg)", boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              minWidth: 200, zIndex: 999,
              overflow: "hidden",
            }}>
              {/* Profile header */}
              <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--neutral-100)", background: "var(--neutral-50)" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--neutral-900)" }}>{user}</div>
                <div style={{ fontSize: 11.5, color: "var(--neutral-500)", marginTop: 2 }}>admin.sar@ojk.go.id</div>
              </div>
              {/* Menu items */}
              <div style={{ padding: "6px 0" }}>
                <button style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 16px", background: "transparent", border: "none",
                  fontSize: 13, color: "var(--neutral-700)", cursor: "pointer",
                  fontFamily: "var(--font-family)", fontWeight: 500, textAlign: "left",
                }}>
                  <Icon name="user" size={15} color="var(--neutral-500)" />
                  Profil Saya
                </button>
                <button style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 16px", background: "transparent", border: "none",
                  fontSize: 13, color: "var(--neutral-700)", cursor: "pointer",
                  fontFamily: "var(--font-family)", fontWeight: 500, textAlign: "left",
                }}>
                  <Icon name="settings" size={15} color="var(--neutral-500)" />
                  Pengaturan
                </button>
                <div style={{ height: 1, background: "var(--neutral-100)", margin: "4px 0" }} />
                <button onClick={() => { setUserOpen(false); go("login"); }} style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 16px", background: "transparent", border: "none",
                  fontSize: 13, color: "var(--color-primary)", cursor: "pointer",
                  fontFamily: "var(--font-family)", fontWeight: 600, textAlign: "left",
                }}>
                  <Icon name="logout" size={15} color="var(--color-primary)" />
                  Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
const topBtn = {
  display: "flex", alignItems: "center", gap: 6,
  background: "transparent", border: "none", color: "#fff",
  height: 56, padding: "0 10px", cursor: "pointer",
  fontFamily: "var(--font-family)", position: "relative",
};
const notifDot = {
  position: "absolute", top: 14, right: 8,
  width: 8, height: 8, borderRadius: "50%",
  background: "var(--color-secondary)",
  border: "2px solid var(--color-primary)",
};

/* ── Sidebar ── */
function Sidebar({ active, onNav, collapsed = false, onToggle }) {
  const items = [
    { key: "Laporan", route: "laporan", label: "Laporan", icon: "file" },
    { key: "Pinjaman", route: "pinjaman", label: "Pinjaman/Pembiayaan", icon: "wallet" },
  ];
  const hash = useCurrentHash();
  const tx = "280ms cubic-bezier(0.4,0,0.2,1)";
  return (
    <aside style={{
      width: collapsed ? 64 : 240,
      minWidth: collapsed ? 64 : 240,
      background: "#fff",
      borderRight: "1px solid var(--neutral-200)",
      display: "flex", flexDirection: "column",
      overflow: "hidden",
      transition: `width ${tx}, min-width ${tx}`,
    }}>
      <div style={{ padding: "18px 16px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", minWidth: 0 }}>
        <div style={{
          fontSize: 11, fontWeight: 700, color: "var(--neutral-500)",
          letterSpacing: "0.08em", textTransform: "uppercase",
          whiteSpace: "nowrap", overflow: "hidden",
          maxWidth: collapsed ? 0 : 160,
          opacity: collapsed ? 0 : 1,
          transition: `opacity ${tx}, max-width ${tx}`,
        }}>Menu Pegawai</div>
        <button onClick={onToggle} style={{ flexShrink: 0, background: "var(--neutral-50)", border: "1px solid var(--neutral-200)", borderRadius: 6, width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--neutral-600)" }}>
          <Icon name={collapsed ? "chevron" : "menu"} size={14} />
        </button>
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 2, padding: "0 10px" }}>
        {items.map(it => {
          const isActive = hash === it.route || active === it.key;
          return (
            <a key={it.key} href={"#" + it.route} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 12px",
              fontSize: 14, fontWeight: isActive ? 600 : 500,
              color: isActive ? "var(--color-primary)" : "var(--neutral-700)",
              background: isActive ? "var(--primary-50)" : "transparent",
              borderRadius: "var(--radius-md)",
              textDecoration: "none", cursor: "pointer",
              borderLeft: isActive ? "3px solid var(--color-primary)" : "3px solid transparent",
              paddingLeft: isActive ? 9 : 12,
              minWidth: 0, overflow: "hidden",
            }}>
              <Icon name={it.icon} size={18} color={isActive ? "var(--color-primary)" : "var(--neutral-500)"} style={{ flexShrink: 0 }} />
              <span style={{
                whiteSpace: "nowrap", overflow: "hidden",
                maxWidth: collapsed ? 0 : 180,
                opacity: collapsed ? 0 : 1,
                transition: `opacity ${tx}, max-width ${tx}`,
              }}>{it.label}</span>
            </a>
          );
        })}
      </nav>
      <div style={{
        margin: 14, marginTop: 12, padding: 14, borderRadius: 10,
        background: "linear-gradient(135deg,var(--primary-50),var(--secondary-50))",
        border: "1px solid var(--primary-100)",
        overflow: "hidden",
        maxHeight: collapsed ? 0 : 120,
        opacity: collapsed ? 0 : 1,
        marginLeft: collapsed ? 0 : 14,
        marginRight: collapsed ? 0 : 14,
        paddingTop: collapsed ? 0 : 14,
        paddingBottom: collapsed ? 0 : 14,
        transition: `opacity ${tx}, max-height ${tx}, margin ${tx}, padding-top ${tx}, padding-bottom ${tx}`,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--primary-700)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 6 }}>Periode Aktif</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--neutral-900)", marginBottom: 2 }}>April 2026</div>
        <div style={{ fontSize: 11.5, color: "var(--neutral-600)" }}>Slip gaji tersedia 25 April</div>
      </div>
      <div style={{ flex: 1 }} />
    </aside>
  );
}

/* ── Page Header (breadcrumb + title) ── */
function PageHeader({ crumb = ["Beranda"], title, subtitle, actions }) {
  return (
    <div style={{ padding: "20px 32px 16px", background: "#fff", borderBottom: "1px solid var(--neutral-100)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--neutral-500)", marginBottom: 8 }}>
        {crumb.map((c, i) => (
          <React.Fragment key={i}>
            <span style={i === crumb.length - 1 ? { color: "var(--neutral-700)", fontWeight: 600 } : {}}>{c}</span>
            {i < crumb.length - 1 && <Icon name="chevron" size={12} color="var(--neutral-400)" />}
          </React.Fragment>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--neutral-900)", letterSpacing: "-0.01em", marginBottom: subtitle ? 4 : 0 }}>{title}</h1>
          {subtitle && <p style={{ fontSize: 13.5, color: "var(--neutral-600)" }}>{subtitle}</p>}
        </div>
        {actions}
      </div>
    </div>
  );
}

/* ── Button ── */
function Btn({ children, variant = "primary", size = "md", icon, iconRight, style, ...rest }) {
  const sizes = {
    sm: { padding: "6px 12px", fontSize: 12.5, height: 30 },
    md: { padding: "9px 16px", fontSize: 13.5, height: 38 },
    lg: { padding: "12px 22px", fontSize: 14.5, height: 44 },
  };
  const variants = {
    primary: { background: "var(--color-primary)", color: "#fff", border: "1px solid var(--color-primary)" },
    secondary: { background: "var(--color-secondary)", color: "#fff", border: "1px solid var(--color-secondary)" },
    outline: { background: "#fff", color: "var(--color-primary)", border: "1.5px solid var(--color-primary)" },
    ghost: { background: "transparent", color: "var(--neutral-700)", border: "1px solid transparent" },
    soft: { background: "var(--neutral-100)", color: "var(--neutral-800)", border: "1px solid var(--neutral-200)" },
  };
  return (
    <button {...rest} style={{
      ...sizes[size], ...variants[variant],
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
      borderRadius: "var(--radius-md)", fontFamily: "var(--font-family)",
      fontWeight: 600, letterSpacing: "0.01em",
      cursor: "pointer", whiteSpace: "nowrap",
      transition: "background 280ms cubic-bezier(0.4,0,0.2,1), border-color 280ms cubic-bezier(0.4,0,0.2,1), box-shadow 280ms cubic-bezier(0.4,0,0.2,1), opacity 280ms ease",
      ...style,
    }}>
      {icon && <Icon name={icon} size={size === "sm" ? 14 : 16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === "sm" ? 14 : 16} />}
    </button>
  );
}

/* ── Card ── */
function Card({ children, style, padded = true, title, subtitle, headerRight }) {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid var(--neutral-200)",
      borderRadius: "var(--radius-lg)",
      ...style,
    }}>
      {(title || headerRight) && (
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--neutral-100)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div>
            {title && <div style={{ fontSize: 14, fontWeight: 700, color: "var(--neutral-900)" }}>{title}</div>}
            {subtitle && <div style={{ fontSize: 12, color: "var(--neutral-500)", marginTop: 2 }}>{subtitle}</div>}
          </div>
          {headerRight}
        </div>
      )}
      <div style={padded ? { padding: 20 } : {}}>{children}</div>
    </div>
  );
}

/* ── Badge ── */
function Badge({ children, tone = "neutral", size = "md", icon }) {
  const tones = {
    neutral: { bg: "var(--neutral-100)", color: "var(--neutral-700)" },
    primary: { bg: "var(--primary-50)", color: "var(--primary-700)" },
    secondary: { bg: "var(--secondary-100)", color: "var(--secondary-800)" },
    success: { bg: "var(--color-success-light)", color: "var(--color-success)" },
    warning: { bg: "var(--color-warning-light)", color: "var(--secondary-800)" },
    info: { bg: "var(--color-info-light)", color: "var(--color-info)" },
    error: { bg: "var(--color-error-light)", color: "var(--color-primary)" },
  };
  const s = tones[tone];
  const sizes = { sm: { padding: "2px 8px", fontSize: 10.5 }, md: { padding: "3px 10px", fontSize: 11.5 } };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      ...sizes[size],
      background: s.bg, color: s.color,
      borderRadius: "var(--radius-full)",
      fontWeight: 600, letterSpacing: "0.01em", whiteSpace: "nowrap",
    }}>
      {icon && <Icon name={icon} size={11} />}
      {children}
    </span>
  );
}

/* ── Input ── */
function Input({ icon, suffix, style, label, hint, error, ...rest }) {
  return (
    <div>
      {label && <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "var(--neutral-700)", marginBottom: 6 }}>{label}</label>}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {icon && <span style={{ position: "absolute", left: 12, color: "var(--neutral-500)", display: "flex", pointerEvents: "none" }}><Icon name={icon} size={16} /></span>}
        <input {...rest} style={{
          width: "100%", height: 40,
          padding: icon ? "0 12px 0 36px" : "0 12px",
          paddingRight: suffix ? 80 : icon ? 12 : 12,
          fontFamily: "var(--font-family)", fontSize: 14,
          border: `1.5px solid ${error ? "var(--color-error)" : "var(--neutral-300)"}`,
          borderRadius: "var(--radius-md)",
          background: "#fff", color: "var(--neutral-900)",
          outline: "none",
          ...style,
        }} />
        {suffix && <span style={{ position: "absolute", right: 12, color: "var(--neutral-500)", fontSize: 12 }}>{suffix}</span>}
      </div>
      {hint && !error && <div style={{ fontSize: 11.5, color: "var(--neutral-500)", marginTop: 4 }}>{hint}</div>}
      {error && <div style={{ fontSize: 11.5, color: "var(--color-error)", marginTop: 4 }}>{error}</div>}
    </div>
  );
}

/* ── Notice / footer copyright ── */
function Notice({ children, tone = "neutral" }) {
  const tones = {
    neutral: { bg: "var(--neutral-50)", border: "var(--neutral-200)", color: "var(--neutral-700)", icon: "var(--neutral-500)" },
    info: { bg: "var(--color-info-light)", border: "#BFDBFE", color: "#1E3A5F", icon: "var(--color-info)" },
    warning: { bg: "var(--color-warning-light)", border: "var(--secondary-200)", color: "var(--secondary-800)", icon: "var(--color-secondary)" },
  };
  const s = tones[tone];
  return (
    <div style={{
      display: "flex", gap: 12, padding: "12px 16px",
      background: s.bg, border: `1px solid ${s.border}`,
      borderRadius: "var(--radius-md)",
      fontSize: 12, color: s.color, lineHeight: 1.55,
    }}>
      <span style={{ flexShrink: 0, color: s.icon, marginTop: 1 }}><Icon name="info" size={16} /></span>
      <div>{children}</div>
    </div>
  );
}

/* Persists sidebar collapsed state across page navigations */
let _sidebarCollapsed = false;

/* Page shell — top bar + sidebar + main slot */
function PageShell({ active, sidebarActive, children, screenLabel }) {
  const [collapsed, setCollapsed] = React.useState(_sidebarCollapsed);
  const toggle = () => { _sidebarCollapsed = !_sidebarCollapsed; setCollapsed(_sidebarCollapsed); };
  return (
    <div data-screen-label={screenLabel} style={{
      display: "flex", flexDirection: "column",
      height: "100%", minHeight: 720,
      background: "var(--neutral-50)",
      fontFamily: "var(--font-family)", color: "var(--neutral-900)",
    }}>
      <TopBar active={active} />
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <Sidebar active={sidebarActive} collapsed={collapsed} onToggle={toggle} />
        <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

Object.assign(window, { Icon, TopBar, Sidebar, PageHeader, Btn, Card, Badge, Input, Notice, PageShell });
