/* Page 2 — Beranda (Dashboard) */
function AksiCepat() {
  const [hovered, setHovered] = React.useState(null);
  const items = [
    { icon: "file",   label: "Slip Gaji",        tone: "primary",   route: "laporan", tab: null },
    { icon: "wallet", label: "Ajukan Pinjaman",   tone: "secondary", route: "pinjaman", tab: null },
    { icon: "coin",   label: "Form 1721-A1",      tone: "info",      route: "laporan", tab: "Formulir Pajak" },
    { icon: "chart",  label: "Rekap Penghasilan", tone: "success",   route: "laporan", tab: "Rekap Penghasilan" },
  ];
  const toneBg   = { primary: "var(--primary-50)",          secondary: "var(--secondary-50)",   info: "var(--color-info-light)",    success: "var(--color-success-light)" };
  const toneFg   = { primary: "var(--color-primary)",       secondary: "var(--color-secondary)", info: "var(--color-info)",          success: "var(--color-success)" };
  const hoverBg  = { primary: "var(--primary-50)",          secondary: "var(--secondary-50)",   info: "var(--color-info-light)",    success: "var(--color-success-light)" };
  return (
    <Card title="Aksi Cepat" subtitle="Layanan yang sering digunakan">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {items.map((a, i) => (
          <a key={a.label} onClick={() => { if (a.tab) window.OJKLaporanTab = a.tab; window.OJKGo(a.route); }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              padding: "14px 12px", borderRadius: 10,
              border: hovered === i ? `1.5px solid ${toneFg[a.tone]}` : "1px solid var(--neutral-200)",
              background: hovered === i ? hoverBg[a.tone] : "#fff",
              display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8,
              cursor: "pointer", textDecoration: "none",
              transition: "all 150ms ease",
            }}>
            <span style={{
              width: 34, height: 34, borderRadius: 8,
              background: toneBg[a.tone], color: toneFg[a.tone],
              display: "flex", alignItems: "center", justifyContent: "center",
            }}><Icon name={a.icon} size={18} /></span>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: hovered === i ? toneFg[a.tone] : "var(--neutral-800)", transition: "color 150ms ease" }}>{a.label}</span>
          </a>
        ))}
      </div>
    </Card>
  );
}

function PageBeranda() {
  const [showTHP, setShowTHP] = React.useState(true);
  const [showIPI, setShowIPI] = React.useState(true);
  const [showPinjaman, setShowPinjaman] = React.useState(true);
  const [showPajak, setShowPajak] = React.useState(true);
  const [hoveredCard, setHoveredCard] = React.useState(null);
  const leaveTimer = React.useRef(null);
  const enterCard = (key) => { clearTimeout(leaveTimer.current); setHoveredCard(key); };
  const leaveCard = () => { leaveTimer.current = setTimeout(() => setHoveredCard(null), 80); };

  return (
    <PageShell active="Beranda" sidebarActive="" screenLabel="02 Beranda">
      <PageHeader
        crumb={["Portal", "Beranda"]}
        title="Selamat Pagi, Admin SAR 👋"
        subtitle="Ringkasan remunerasi & aktivitas terbaru Anda di OJK SAR."
        actions={
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ fontSize: 11.5, color: "var(--neutral-500)", textAlign: "right", lineHeight: 1.3 }}>
              <div>Login terakhir</div>
              <div style={{ color: "var(--neutral-800)", fontWeight: 600, fontSize: 12.5 }}>30 Apr 2026 · 15:37 WIB</div>
            </div>
            <Btn variant="outline" icon="download" size="md" className="ojk-btn-outline-hover" onClick={() => window.OJKGo("laporan")}>Slip Gaji April</Btn>
          </div>
        }
      />

      <div style={{ padding: "24px 32px", overflow: "auto", flex: 1 }}>
        {/* KPI row */}
        <div style={{ zoom: 0.94, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20 }}>
          <KPI tone="primary" label="Take-Home Pay April" value="Rp 24.850.000" delta="+2.4% dari bulan Maret" deltaUp icon="coin" shown={showTHP} onToggle={() => setShowTHP(v => !v)} active={hoveredCard === null ? true : hoveredCard === "primary"} onMouseEnter={() => enterCard("primary")} onMouseLeave={leaveCard} />
          <KPI tone="secondary" label="IPI 2025 Ditetapkan" value="Rp 87.500.000" sub="SK 15-03-2026" icon="award" shown={showIPI} onToggle={() => setShowIPI(v => !v)} active={hoveredCard === "secondary"} onMouseEnter={() => enterCard("secondary")} onMouseLeave={leaveCard} />
          <KPI tone="info" label="Pinjaman Aktif" value="2 Fasilitas" sub="Kopejka & BRI" icon="wallet" shown={showPinjaman} onToggle={() => setShowPinjaman(v => !v)} active={hoveredCard === "info"} onMouseEnter={() => enterCard("info")} onMouseLeave={leaveCard} />
          <KPI tone="success" label="Pajak yang Dibayarkan" value="Rp 18.450.000" sub="YTD per 30 Apr 2026" icon="coin" shown={showPajak} onToggle={() => setShowPajak(v => !v)} active={hoveredCard === "success"} onMouseEnter={() => enterCard("success")} onMouseLeave={leaveCard} />
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {/* Left column: IPI card + chart */}
          <div style={{ flex: 1.5, display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
            {/* Featured announcement */}
            <Card padded={false}>
              <div style={{ padding: 20, display: "flex", gap: 18 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 12,
                  background: "linear-gradient(135deg,var(--secondary-100),var(--primary-100))",
                  color: "var(--color-primary)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}><Icon name="megaphone" size={26} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                    <Badge tone="warning" icon="pin">Pinned</Badge>
                    <Badge tone="primary">SDM</Badge>
                    <span style={{ fontSize: 11.5, color: "var(--neutral-500)" }}>15 Mar 2026 · Admin OJKSAR</span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--neutral-900)", marginBottom: 6, letterSpacing: "-0.005em" }}>
                    Imbalan Prestasi Individu (IPI) Pegawai Tahun 2025
                  </h3>
                  <p style={{ fontSize: 13.5, color: "var(--neutral-600)", lineHeight: 1.55, marginBottom: 14 }}>
                    IPI Pegawai Tahun 2025 telah ditetapkan. Rincian: Imbalan kotor <strong>Rp 87.500.000</strong>, Potongan Kopejka <strong>Rp 0</strong>, Potongan OJK <strong>Rp 0</strong>. Pencairan dijadwalkan tanggal 25 Maret 2026.
                  </p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Btn variant="primary" size="sm" iconRight="arrowRight" onClick={() => window.OJKGo("pengumuman")}>Lihat Detail SK</Btn>
                    <Btn variant="ghost" size="sm" icon="download" onClick={() => alert("Unduhan dimulai (mock).")}>Unduh PDF</Btn>
                  </div>
                </div>
              </div>
            </Card>

            {/* Chart */}
            <Card title="Take-Home Pay 6 Bulan Terakhir" subtitle="Setelah pajak & potongan" headerRight={<Badge tone="success" icon="arrowUp">+12.6%</Badge>}>
              <ChartBars />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 18, paddingTop: 16, borderTop: "1px dashed var(--neutral-200)" }}>
                <Stat label="Rata-rata" value="Rp 23.450.000" />
                <Stat label="Tertinggi" value="Rp 24.850.000" sub="April 2026" />
                <Stat label="Total YTD" value="Rp 93.420.000" />
              </div>
            </Card>
          </div>

          {/* Right column: quick actions + activity */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
            {/* Quick actions */}
            <AksiCepat />

            {/* Pengumuman */}
            <Card title="Pengumuman" subtitle="7 hari terakhir" headerRight={<a href="#pengumuman" style={{ fontSize: 12, color: "var(--color-primary)", fontWeight: 600, textDecoration: "none", cursor: "pointer" }}>Lihat semua</a>}>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, padding: 0, margin: 0 }}>
                {[
                  { icon: "file", color: "primary", title: "Slip Gaji April 2026 tersedia", time: "Hari ini · 09:12" },
                  { icon: "check", color: "success", title: "Pengajuan Pinjaman BRI disetujui", time: "Kemarin · 14:30" },
                  { icon: "coin", color: "secondary", title: "Pajak PPh 21 April berhasil disetor", time: "28 Apr · 23:55" },
                  { icon: "megaphone", color: "info", title: "Pengumuman: SK IPI 2025 dirilis", time: "15 Mar · 08:00" },
                ].map((a, i) => (
                  <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{
                      width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                      background: `var(--${a.color === "primary" ? "primary-50" : a.color === "secondary" ? "secondary-50" : a.color === "success" ? "color-success-light" : "color-info-light"})`,
                      color: `var(--${a.color === "primary" ? "color-primary" : a.color === "secondary" ? "color-secondary" : a.color === "success" ? "color-success" : "color-info"})`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}><Icon name={a.icon} size={15} /></span>
                    <div style={{ flex: 1, lineHeight: 1.4 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--neutral-800)" }}>{a.title}</div>
                      <div style={{ fontSize: 11.5, color: "var(--neutral-500)", marginTop: 2 }}>{a.time}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>

      </div>
    </PageShell>
  );
}

function KPI({ tone, label, value, sub, delta, deltaUp, icon, shown, onToggle, active, onMouseEnter, onMouseLeave }) {
  const hasToggle = onToggle !== undefined;
  const isShown = shown !== false;
  const [toggleHover, setToggleHover] = React.useState(false);
  const activeStyle = { bg: "linear-gradient(135deg,#9E1E21,#7A1719)", color: "#fff", iconBg: "rgba(255,255,255,0.15)", iconColor: "#fff", labelColor: "rgba(255,255,255,0.85)", subColor: "rgba(255,255,255,0.75)", toggleColor: "rgba(255,255,255,0.7)" };
  const tones = {
    primary: { bg: "#fff", color: "var(--neutral-900)", iconBg: "var(--primary-50)", iconColor: "var(--color-primary)", labelColor: "var(--neutral-600)", subColor: "var(--neutral-500)", toggleColor: "var(--neutral-400)" },
    secondary: { bg: "#fff", color: "var(--neutral-900)", iconBg: "var(--secondary-50)", iconColor: "var(--color-secondary)", labelColor: "var(--neutral-600)", subColor: "var(--neutral-500)", toggleColor: "var(--neutral-400)" },
    info: { bg: "#fff", color: "var(--neutral-900)", iconBg: "var(--color-info-light)", iconColor: "var(--color-info)", labelColor: "var(--neutral-600)", subColor: "var(--neutral-500)", toggleColor: "var(--neutral-400)" },
    success: { bg: "#fff", color: "var(--neutral-900)", iconBg: "var(--color-success-light)", iconColor: "var(--color-success)", labelColor: "var(--neutral-600)", subColor: "var(--neutral-500)", toggleColor: "var(--neutral-400)" },
  };
  const s = active ? activeStyle : tones[tone];
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        background: s.bg, color: s.color,
        padding: "18px 18px 16px",
        borderRadius: "var(--radius-lg)",
        border: active ? "1px solid transparent" : "1px solid var(--neutral-200)",
        display: "flex", flexDirection: "column", gap: 10,
        position: "relative", overflow: "hidden",
        cursor: "default",
        transition: "all 200ms ease",
      }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <span style={{ width: 28, height: 28, borderRadius: 8, background: s.iconBg, color: s.iconColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name={icon} size={15} />
          </span>
          <span style={{ fontSize: 12, fontWeight: 600, color: s.labelColor, letterSpacing: "0.01em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
        </div>
        {hasToggle && (() => {
          const onActiveCard = active;
          const baseBg = onActiveCard ? "rgba(255,255,255,0.14)" : "var(--neutral-100)";
          const hoverBg = onActiveCard ? "rgba(255,255,255,0.28)" : "var(--neutral-200)";
          const baseBorder = onActiveCard ? "rgba(255,255,255,0.25)" : "var(--neutral-200)";
          const hoverBorder = onActiveCard ? "rgba(255,255,255,0.45)" : "var(--neutral-300)";
          const fg = onActiveCard ? "#fff" : "var(--neutral-600)";
          return (
            <button
              onClick={onToggle}
              onMouseEnter={() => setToggleHover(true)}
              onMouseLeave={() => setToggleHover(false)}
              title={isShown ? "Sembunyikan" : "Tampilkan"}
              style={{
                background: toggleHover ? hoverBg : baseBg,
                border: `1px solid ${toggleHover ? hoverBorder : baseBorder}`,
                cursor: "pointer",
                color: fg,
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4,
                height: 26,
                padding: "0 9px",
                fontSize: 10.5, fontWeight: 600,
                borderRadius: 999,
                letterSpacing: "0.02em",
                transition: "all 150ms ease",
                transform: toggleHover ? "translateY(-1px)" : "translateY(0)",
                boxShadow: toggleHover && !onActiveCard ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                flexShrink: 0,
              }}>
              <Icon name={isShown ? "eye" : "eyeOff"} size={12} />
              <span>{isShown ? "Hide" : "Show"}</span>
            </button>
          );
        })()}
      </div>
      <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.1 }}>
        {isShown ? value : <span style={{ letterSpacing: "0.15em", opacity: 0.6 }}>••••••••</span>}
      </div>
      <div style={{ fontSize: 11.5, color: s.subColor, display: "flex", alignItems: "center", gap: 6 }}>
        {delta && isShown && <span style={{
          display: "inline-flex", alignItems: "center", gap: 2,
          padding: "2px 6px", borderRadius: 999,
          background: active ? "rgba(255,255,255,0.18)" : "var(--color-success-light)",
          color: active ? "#fff" : "var(--color-success)",
          fontSize: 10.5, fontWeight: 600,
        }}><Icon name={deltaUp ? "arrowUp" : "arrowDown"} size={10} />{delta}</span>}
        {sub && <span>{isShown ? sub : "—"}</span>}
      </div>
    </div>
  );
}

function Stat({ label, value, sub, icon, tone = "primary" }) {
  const palette = {
    primary: { bg: "var(--primary-50)", fg: "var(--color-primary)" },
    success: { bg: "#E8F6EC", fg: "#2E7D32" },
    info:    { bg: "#E6F0FB", fg: "#1565C0" },
    warn:    { bg: "#FFF4E0", fg: "#B26A00" },
    neutral: { bg: "var(--neutral-100)", fg: "var(--neutral-700)" },
  }[tone] || { bg: "var(--primary-50)", fg: "var(--color-primary)" };
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
      {icon && (
        <span style={{
          width: 32, height: 32, borderRadius: 8,
          background: palette.bg, color: palette.fg,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Icon name={icon} size={16} />
        </span>
      )}
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 11, color: "var(--neutral-500)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--neutral-900)", letterSpacing: "-0.01em" }}>{value}</div>
        {sub && <div style={{ fontSize: 11, color: "var(--neutral-500)", marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

function ChartBars() {
  const data = [
    { m: "Nov", v: 22.1 }, { m: "Des", v: 22.9 },
    { m: "Jan", v: 22.4 }, { m: "Feb", v: 23.2 },
    { m: "Mar", v: 24.3 }, { m: "Apr", v: 24.85 },
  ];
  const max = 26, min = 20;
  const W = 560, H = 220, padL = 44, padR = 56, padT = 16, padB = 32;
  const innerW = W - padL - padR, innerH = H - padT - padB;
  const xFor = i => padL + (innerW * i) / (data.length - 1);
  const yFor = v => padT + innerH - ((v - min) / (max - min)) * innerH;
  const linePts = data.map((d, i) => `${xFor(i)},${yFor(d.v)}`).join(" ");
  const areaPts = `${padL},${padT + innerH} ${linePts} ${xFor(data.length - 1)},${padT + innerH}`;
  const yTicks = [20, 22, 24, 26];

  const [hovered, setHovered] = React.useState(null);

  const months = ["Nov 2025", "Des 2025", "Jan 2026", "Feb 2026", "Mar 2026", "Apr 2026"];

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="220" preserveAspectRatio="xMidYMid meet" style={{ display: "block" }}>
        <defs>
          <linearGradient id="barGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#9E1E21" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#7A1719" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="barGradSoft" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#EEEEEE" />
            <stop offset="100%" stopColor="#DCDCDC" />
          </linearGradient>
          <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#F0714D" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#F0714D" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid + Y-axis labels */}
        {yTicks.map(t => (
          <g key={t}>
            <line x1={padL} x2={W - padR} y1={yFor(t)} y2={yFor(t)} stroke="#EEEEEE" strokeDasharray="3 4" />
            <text x={padL - 8} y={yFor(t) + 4} fontSize="10" fill="#8D8F8C" textAnchor="end" fontFamily="var(--font-family)">Rp {t}jt</text>
          </g>
        ))}

        {/* Bars */}
        {data.map((d, i) => {
          const isLast = i === data.length - 1;
          const bw = 26;
          const x = xFor(i) - bw / 2;
          const y = yFor(d.v);
          const h = padT + innerH - y;
          return (
            <g key={d.m}>
              <rect x={x} y={y} width={bw} height={h} rx="4" fill={isLast ? "url(#barGrad)" : "url(#barGradSoft)"} />
              <text x={xFor(i)} y={H - 10} fontSize="11" fill={isLast ? "#9E1E21" : "#8D8F8C"} textAnchor="middle" fontWeight={isLast ? 700 : 500} fontFamily="var(--font-family)">{d.m}</text>
            </g>
          );
        })}

        {/* Area + line overlay (trend) */}
        <polygon points={areaPts} fill="url(#areaGrad)" />
        <polyline points={linePts} fill="none" stroke="#F0714D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((d, i) => {
          const isLast = i === data.length - 1;
          const isHovered = hovered === i;
          return (
            <g key={"p" + i}>
              {/* Static label for Apr */}
              {isLast && (
                <g>
                  <rect x={xFor(i) - 40} y={yFor(d.v) - 30} width="80" height="20" rx="4" fill="#9E1E21" />
                  <text x={xFor(i)} y={yFor(d.v) - 16} fontSize="10.5" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="var(--font-family)">Rp {d.v.toFixed(2)} jt</text>
                </g>
              )}
              {/* Invisible hit area — full column height */}
              <rect
                x={xFor(i) - 26} y={padT} width={52} height={innerH}
                fill="transparent" style={{ cursor: "default" }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              />
              {/* Visible dot */}
              <circle cx={xFor(i)} cy={yFor(d.v)} r={isLast || isHovered ? 5 : 3.5}
                fill="#fff" stroke={isHovered ? "#9E1E21" : "#F0714D"}
                strokeWidth={isHovered ? 2.5 : 2} style={{ pointerEvents: "none" }}
              />
              {/* Hover tooltip for non-Apr dots */}
              {!isLast && isHovered && (() => {
                const cx = xFor(i);
                const cy = yFor(d.v);
                const tw = 80;
                const rectX = Math.max(padL, Math.min(cx - tw / 2, W - padR - tw));
                return (
                  <g>
                    <rect x={rectX} y={cy - 30} width={tw} height="20" rx="4" fill="#9E1E21" />
                    <text x={rectX + tw / 2} y={cy - 16} fontSize="10.5" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="var(--font-family)">Rp {d.v.toFixed(2)} jt</text>
                  </g>
                );
              })()}
            </g>
          );
        })}
      </svg>
      <div style={{ display: "flex", gap: 16, paddingLeft: 44, marginTop: 4, fontSize: 11, color: "var(--neutral-600)" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: "var(--color-primary)" }} />Take-Home Pay</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 14, height: 2, background: "var(--color-secondary)", borderRadius: 2 }} />Tren bulanan</span>
      </div>
    </div>
  );
}

window.PageBeranda = PageBeranda;
