/* Page 1 — Landing & Login */
function PageLogin() {
  const [showPw, setShowPw] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState(() => (window.OJKi18n && window.OJKi18n.getLanguage()) || "ID");
  const langRef = useRef(null);
  const onSubmit = (e) => { e.preventDefault(); window.OJKGo("beranda"); };

  useEffect(() => {
    if (!langOpen) return;
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
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
    <div data-screen-label="01 Login" style={{
      width: "100%", height: "100%",
      background: "var(--neutral-50)",
      fontFamily: "var(--font-family)", color: "var(--neutral-900)",
      display: "flex", flexDirection: "column",
    }}>
      {/* Slim brand bar */}
      <div style={{
        height: 56, background: "transparent",
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 10,
        display: "flex", alignItems: "center", padding: "0 32px",
        color: "#fff",
      }}>
        <img src="assets/OJK_Logo.png" alt="OJK" style={{ height: 28, marginRight: 12, filter: "brightness(0) invert(1)" }} />
        <div style={{ lineHeight: 1.1 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>OJK SAR</div>
          <div style={{ fontSize: 10.5, opacity: 0.85, letterSpacing: "0.04em", textTransform: "uppercase" }}>Sistem Aplikasi Remunerasi</div>
        </div>
        <div style={{ flex: 1 }} />
      </div>

      {/* Body — split hero / login */}
      <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", flex: 1, minHeight: 0, position: "relative" }}>
        {/* Hero */}
        <div style={{
          position: "relative",
          backgroundImage: "url('assets/soemitro-login.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "#fff", padding: "96px 44px 48px",
          display: "flex", flexDirection: "column", justifyContent: "flex-start",
          overflow: "hidden",
        }}>
          {/* Dark fade overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(0,0,0,0.75)",
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 10px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 999, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 22 }}>
              <span style={{ position: "relative", width: 5, height: 5, display: "inline-flex" }}>
                <span style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  background: "#7BD389",
                  animation: "ojkPulseRing 1.4s ease-out infinite",
                }} />
                <span style={{
                  position: "relative", width: 5, height: 5, borderRadius: "50%",
                  background: "#7BD389",
                  animation: "ojkBlink 1.2s ease-in-out infinite",
                  boxShadow: "0 0 6px rgba(123,211,137,0.8)",
                }} />
              </span>
              Portal Internal Pegawai OJK
            </div>
            <h1 style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 14 }}>
              Transparan.<br />Akurat.<br /><span>Terintegrasi.</span>
            </h1>
            <p style={{ fontSize: 14, lineHeight: 1.55, opacity: 0.85, maxWidth: 420 }}>
              Kelola slip gaji, pengajuan pinjaman, hingga pelaporan SPT pegawai secara terintegrasi melalui OJK SAR.
            </p>
          </div>

          {/* Stat strip */}
          <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 160 }}>
            {[
              {
                v: "4,723", l: "Pegawai Aktif", color: "var(--color-accent)",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              },
              {
                v: "8", l: "Layanan Terintegrasi", color: "#7BD389",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7BD389" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              },
              {
                v: "100%", l: "Kepatuhan Pajak", color: "#60BFFF",
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60BFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              },
            ].map(s => (
              <div key={s.l} style={{ padding: "0 4px", display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                <div style={{ flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1, color: s.color, marginBottom: 4 }}>{s.v}</div>
                  <div style={{ fontSize: 11, opacity: 0.85 }}>{s.l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Login card */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 44px", background: "#fff", position: "relative", overflow: "hidden" }}>
          {/* Language switcher — top-right of login panel */}
          <div ref={langRef} style={{ position: "absolute", top: 16, right: 20, zIndex: 10 }}>
            <button onClick={() => setLangOpen(v => !v)} style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "var(--neutral-50)", border: "1px solid var(--neutral-200)",
              borderRadius: 999, padding: "5px 12px",
              color: "var(--neutral-700)", cursor: "pointer", fontSize: 12, fontWeight: 600,
              fontFamily: "var(--font-family)",
            }}>
              <Icon name="globe" size={14} color="var(--neutral-500)" />
              <span>{lang}</span>
              <Icon name={langOpen ? "chevronUp" : "chevronDown"} size={12} color="var(--neutral-500)" />
            </button>
            {langOpen && (
              <div style={{
                position: "absolute", top: "calc(100% + 6px)", right: 0,
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
                        width: 28, padding: "2px 0", textAlign: "center", borderRadius: 4,
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
          {/* Decorative accent — top-right corner glow */}
          <div style={{
            position: "absolute", top: -120, right: -120, width: 320, height: 320,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(155,29,29,0.06) 0%, rgba(155,29,29,0) 70%)",
            pointerEvents: "none",
          }} />
          {/* Decorative accent — bottom-left corner glow */}
          <div style={{
            position: "absolute", bottom: -140, left: -140, width: 360, height: 360,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(155,29,29,0.04) 0%, rgba(155,29,29,0) 70%)",
            pointerEvents: "none",
          }} />
          <div style={{ width: "100%", maxWidth: 360, position: "relative", zIndex: 1 }}>
<div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--color-primary)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Selamat Datang Kembali</div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--neutral-900)", letterSpacing: "-0.015em", marginBottom: 6, lineHeight: 1.2 }}>Masuk ke Akun Anda</h2>
              <p style={{ fontSize: 12.5, color: "var(--neutral-600)", lineHeight: 1.55 }}>Gunakan kredensial pegawai OJK untuk mengakses portal.</p>
            </div>

            <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Input label="Username / NIP" icon="user" placeholder="cth. admin.sar" defaultValue="admin.sar" />
              <Input
                label="Kata Sandi"
                icon="lock"
                type={showPw ? "text" : "password"}
                placeholder="Masukkan kata sandi"
                defaultValue="••••••••••"
                suffix={<span onClick={() => setShowPw(v => !v)} style={{ cursor: "pointer", display: "inline-flex" }}><Icon name="eye" size={14} /></span>}
              />

              {/* Captcha */}
              <div>
                <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: "var(--neutral-700)", marginBottom: 5 }}>Verifikasi Keamanan</label>
                <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 8 }}>
                  <div style={{
                    height: 34, borderRadius: "var(--radius-md)",
                    background: "repeating-linear-gradient(45deg, var(--neutral-100) 0 6px, var(--neutral-50) 6px 12px)",
                    border: "1.5px solid var(--neutral-300)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative",
                  }}>
                    <span style={{
                      fontFamily: "Georgia,serif",
                      fontSize: 16, fontWeight: 700,
                      color: "var(--primary-700)",
                      letterSpacing: "0.16em",
                      transform: "skew(-6deg) rotate(-2deg)",
                      textShadow: "1px 1px 0 rgba(255,255,255,0.7)",
                    }}>wU5yZ</span>
                    <button title="Refresh" style={{
                      position: "absolute", right: 3, top: 3,
                      width: 20, height: 20, borderRadius: 4,
                      background: "rgba(255,255,255,0.85)", border: "none", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--neutral-600)",
                    }}><Icon name="refresh" size={11} /></button>
                  </div>
                  <Input placeholder="Salin kode verifikasi" style={{ height: 34 }} />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12 }}>
                <label style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", color: "var(--neutral-700)" }}>
                  <span style={{ width: 14, height: 14, borderRadius: 3, border: "1.5px solid var(--neutral-400)", background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center" }}></span>
                  Ingat saya
                </label>
                <a style={{ color: "var(--color-primary)", fontWeight: 600, textDecoration: "none", cursor: "pointer" }}>Lupa kata sandi?</a>
              </div>

              <Btn
                type="submit"
                variant="primary"
                iconRight="arrowRight"
                className="ojk-login-btn"
                style={{ width: "100%", marginTop: 6, letterSpacing: "0.01em" }}
              >Masuk ke OJK SAR</Btn>

            </form>

            <div style={{
              marginTop: 24, padding: "11px 13px",
              background: "linear-gradient(135deg, var(--neutral-50) 0%, #fff 100%)",
              border: "1px solid var(--neutral-200)",
              borderRadius: 10,
              fontSize: 11, color: "var(--neutral-600)", lineHeight: 1.55,
              display: "flex", alignItems: "flex-start", gap: 9,
            }}>
              <div style={{
                flexShrink: 0, marginTop: 1,
                width: 22, height: 22, borderRadius: 6,
                background: "rgba(155,29,29,0.08)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                color: "var(--color-primary)",
              }}>
                <Icon name="info" size={12} />
              </div>
              <div>
                <strong style={{ color: "var(--neutral-800)", display: "block", marginBottom: 2 }}>Browser yang Didukung</strong>
                Chrome, Firefox, Edge, Safari versi terbaru. Resolusi minimum 1024×768.
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
window.PageLogin = PageLogin;
