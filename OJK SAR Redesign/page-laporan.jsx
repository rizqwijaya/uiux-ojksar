/* Page 5 — Laporan */
function PageLaporan() {
  const [tab, setTab] = React.useState(() => { const t = window.OJKLaporanTab; window.OJKLaporanTab = null; return t || "Slip Gaji"; });
  const tabs = [
    { l: "Slip Gaji", icon: "file" },
    { l: "Rekap Penghasilan", icon: "chart" },
    { l: "Formulir Pajak", icon: "coin" },
    { l: "Riwayat Unduh", icon: "download" },
  ];

  return (
    <PageShell active="" sidebarActive="Laporan" screenLabel="05 Laporan">
      <PageHeader
        crumb={["Portal", "Laporan"]}
        title="Laporan"
        subtitle="Slip gaji, rekapitulasi penghasilan, dan formulir pajak."
        actions={<Btn variant="outline" icon="calendar">Tahun Pajak 2025</Btn>}
      />

      <div style={{ padding: "24px 32px", display: "flex", flexDirection: "column", gap: 16, overflow: "auto", flex: 1 }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--neutral-200)", marginBottom: 4 }}>
          {tabs.map(t => {
            const active = tab === t.l;
            return (
              <button key={t.l} onClick={() => setTab(t.l)} style={{
                padding: "10px 16px", fontSize: 13.5, fontWeight: 600,
                background: "transparent", border: "none",
                color: active ? "var(--color-primary)" : "var(--neutral-600)",
                borderBottom: active ? "2px solid var(--color-primary)" : "2px solid transparent",
                marginBottom: -1, cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: "var(--font-family)",
              }}>
                <Icon name={t.icon} size={14} />
                {t.l}
              </button>
            );
          })}
        </div>

        {tab === "Slip Gaji" && <TabSlipGaji />}
        {tab === "Rekap Penghasilan" && <TabRekap />}
        {tab === "Formulir Pajak" && <TabFormulirPajak />}
        {tab === "Riwayat Unduh" && <TabRiwayat />}
      </div>
    </PageShell>
  );
}

/* ── Tab: Slip Gaji ── */
function TabSlipGaji() {
  return (
    <>
      <Card title="Slip Gaji" subtitle="Pilih periode bulan untuk mengunduh slip gaji."
        headerRight={
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Input icon="calendar" defaultValue="2026-04" style={{ height: 36, width: 160 }} />
            <Btn variant="primary" icon="search" size="sm">Tampilkan</Btn>
          </div>
        }
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {[
            { title: "Slip Gaji", period: "April 2026", size: "248 KB", lang: "ID", icon: "file" },
            { title: "Salary Slip (English)", period: "April 2026", size: "246 KB", lang: "EN", icon: "file" },
            { title: "Formulir 1721-VIII", period: "April 2026", size: "192 KB", lang: "ID", icon: "coin" },
          ].map(d => <DocCard key={d.title} {...d} />)}
        </div>
      </Card>

      <Card title="Slip Gaji 6 Bulan Terakhir" subtitle="Riwayat unduh slip gaji periode sebelumnya.">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {[
            { period: "Maret 2026", size: "246 KB", thp: "Rp 24.30 Jt" },
            { period: "Februari 2026", size: "242 KB", thp: "Rp 23.20 Jt" },
            { period: "Januari 2026", size: "248 KB", thp: "Rp 22.40 Jt" },
            { period: "Desember 2025", size: "240 KB", thp: "Rp 22.90 Jt" },
            { period: "November 2025", size: "238 KB", thp: "Rp 22.10 Jt" },
            { period: "Oktober 2025", size: "236 KB", thp: "Rp 21.80 Jt" },
          ].map(r => <RiwayatRow key={r.period} {...r} />)}
        </div>
      </Card>
    </>
  );
}

/* ── Tab: Rekap Penghasilan ── */
function TabRekap() {
  return (
    <>
      <Card title="Rekapitulasi Penghasilan & Per Komponen" subtitle="Ringkasan tahunan dan formulir pajak."
        headerRight={
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <select defaultValue="2025" style={selectStyle}>
              <option>2025</option><option>2024</option><option>2023</option>
            </select>
            <Btn variant="primary" icon="search" size="sm">Tampilkan</Btn>
          </div>
        }
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 18, padding: 16, background: "var(--neutral-50)", borderRadius: 10, border: "1px solid var(--neutral-100)" }}>
          <Stat label="Penghasilan Bruto" value="Rp 412.5 Jt" icon="wallet" tone="primary" />
          <Stat label="Pajak Disetor" value="Rp 61.875.000" icon="coin" tone="warn" />
          <Stat label="Net Take-Home" value="Rp 281.4 Jt" sub="Setelah semua potongan" icon="chart" tone="info" />
          <Stat label="Status SPT" value="Lapor" sub="22 Mar 2026" icon="check" tone="success" />
        </div>

        {/* Komponen breakdown */}
        <table style={tableStyle}>
          <thead>
            <tr style={{ background: "var(--neutral-50)" }}>
              {["Komponen", "Jumlah Bruto (Rp)", "Pajak (Rp)", "Net (Rp)", "Persentase"].map(h => (
                <th key={h} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { k: "Gaji Pokok", b: "240.000.000", p: "36.000.000", n: "204.000.000", pct: "58.2%", icon: "wallet", tone: "primary" },
              { k: "Tunjangan Jabatan", b: "84.000.000", p: "12.600.000", n: "71.400.000", pct: "20.4%", icon: "award", tone: "info" },
              { k: "Tunjangan Kinerja", b: "60.500.000", p: "9.075.000", n: "51.425.000", pct: "14.7%", icon: "chart", tone: "success" },
              { k: "IPI 2025", b: "87.500.000", p: "—", n: "87.500.000", pct: "—", icon: "coin", tone: "warn" },
              { k: "THR & Bonus", b: "28.000.000", p: "4.200.000", n: "23.800.000", pct: "6.7%", icon: "heart", tone: "neutral" },
            ].map((r, i) => {
              const palette = {
                primary: { bg: "var(--primary-50)", fg: "var(--color-primary)" },
                success: { bg: "#E8F6EC", fg: "#2E7D32" },
                info:    { bg: "#E6F0FB", fg: "#1565C0" },
                warn:    { bg: "#FFF4E0", fg: "#B26A00" },
                neutral: { bg: "var(--neutral-100)", fg: "var(--neutral-700)" },
              }[r.tone];
              return (
              <tr key={i} style={{ borderBottom: "1px solid var(--neutral-100)" }}>
                <td style={{ ...tdStyle, fontWeight: 600, color: "var(--neutral-800)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 26, height: 26, borderRadius: 6, background: palette.bg, color: palette.fg, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={r.icon} size={14} />
                    </span>
                    {r.k}
                  </span>
                </td>
                <td style={tdStyle}>{r.b}</td>
                <td style={tdStyle}>{r.p}</td>
                <td style={{ ...tdStyle, color: "var(--neutral-900)", fontWeight: 600 }}>{r.n}</td>
                <td style={tdStyle}>{r.pct}</td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

    </>
  );
}

/* ── Tab: Formulir Pajak ── */
function TabFormulirPajak() {
  return (
    <>
      <Card title="Formulir Pajak" subtitle="Bukti potong dan formulir terkait pelaporan SPT Tahunan."
        headerRight={
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <select defaultValue="2025" style={selectStyle}>
              <option>2025</option><option>2024</option><option>2023</option>
            </select>
          </div>
        }
      >
        <Notice tone="info">
          <strong>Petunjuk Pelaporan SPT.</strong> Formulir 1721-A1 wajib digunakan saat pelaporan SPT Tahunan paling lambat 31 Maret tahun berikutnya melalui DJP Online (e-Filing).
        </Notice>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginTop: 16 }}>
          <DocCard title="Formulir 1721-A1" period="Tahun Pajak 2025" size="318 KB" lang="ID" icon="coin" />
          <DocCard title="Formulir 1721-VIII" period="April 2026" size="192 KB" lang="ID" icon="coin" />
          <DocCard title="Bukti Potong PPh 21" period="Tahun Pajak 2025" size="278 KB" lang="ID" icon="file" />
          <DocCard title="Tata Cara Pelaporan SPT" period="Panduan 2025" size="1.4 MB" lang="ID" icon="file" />
        </div>
      </Card>

      <Card title="Status Pelaporan SPT Tahunan" subtitle="Riwayat 3 tahun terakhir">
        <table style={tableStyle}>
          <thead>
            <tr style={{ background: "var(--neutral-50)" }}>
              {["Tahun Pajak", "Tanggal Lapor", "No. BPE", "Status", ""].map(h => (
                <th key={h} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { ty: "2025", dt: "22 Mar 2026", bpe: "BPE-2026032212345", st: "Lapor", tone: "success", icon: "file", iconTone: "primary" },
              { ty: "2024", dt: "18 Mar 2025", bpe: "BPE-2025031898765", st: "Lapor", tone: "success", icon: "file", iconTone: "info" },
              { ty: "2023", dt: "25 Mar 2024", bpe: "BPE-2024032554321", st: "Lapor", tone: "success", icon: "file", iconTone: "success" },
            ].map((r, i) => {
              const palette = {
                primary: { bg: "var(--primary-50)", fg: "var(--color-primary)" },
                info:    { bg: "#E6F0FB", fg: "#1565C0" },
                warn:    { bg: "#FFF4E0", fg: "#B26A00" },
                success: { bg: "#E8F6EC", fg: "#2E7D32" },
              }[r.iconTone];
              return (
              <tr key={i} style={{ borderBottom: "1px solid var(--neutral-100)" }}>
                <td style={{ ...tdStyle, fontWeight: 700, color: "var(--neutral-900)" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 26, height: 26, borderRadius: 6, background: palette.bg, color: palette.fg, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={r.icon} size={14} />
                    </span>
                    {r.ty}
                  </span>
                </td>
                <td style={tdStyle}>{r.dt}</td>
                <td style={{ ...tdStyle, fontFamily: "monospace", fontSize: 12 }}>{r.bpe}</td>
                <td style={tdStyle}><Badge tone={r.tone} icon="check">{r.st}</Badge></td>
                <td style={{ ...tdStyle, textAlign: "right" }}>
                  <Btn size="sm" variant="ghost" icon="download">BPE</Btn>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
}

/* ── Tab: Riwayat Unduh ── */
function TabRiwayat() {
  const [q, setQ] = React.useState("");
  const all = [
    { d: "Slip Gaji - April 2026", p: "Apr 2026", t: "01 Mei 2026 · 08:32", s: "248 KB", k: "Slip Gaji" },
    { d: "Slip Gaji - Maret 2026", p: "Mar 2026", t: "01 Apr 2026 · 09:14", s: "246 KB", k: "Slip Gaji" },
    { d: "Formulir 1721-A1 2025", p: "TY 2025", t: "22 Mar 2026 · 15:40", s: "318 KB", k: "Formulir Pajak" },
    { d: "Slip Gaji - Februari 2026", p: "Feb 2026", t: "01 Mar 2026 · 08:55", s: "242 KB", k: "Slip Gaji" },
    { d: "Salary Slip - Januari 2026", p: "Jan 2026", t: "02 Feb 2026 · 11:20", s: "248 KB", k: "Slip Gaji" },
    { d: "Bukti Potong PPh 21 2025", p: "TY 2025", t: "20 Mar 2026 · 10:05", s: "278 KB", k: "Formulir Pajak" },
    { d: "Rekap Penghasilan 2025", p: "TY 2025", t: "15 Mar 2026 · 14:22", s: "412 KB", k: "Rekap Penghasilan" },
    { d: "Slip Gaji - Desember 2025", p: "Des 2025", t: "01 Jan 2026 · 09:00", s: "240 KB", k: "Slip Gaji" },
  ];
  const filtered = q ? all.filter(r => r.d.toLowerCase().includes(q.toLowerCase()) || r.k.toLowerCase().includes(q.toLowerCase())) : all;

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        <MiniStat label="Total Unduhan" value={String(all.length)} sub="30 hari terakhir" icon="download" tone="primary" />
        <MiniStat label="Slip Gaji" value={String(all.filter(r => r.k === "Slip Gaji").length)} sub="Dokumen" icon="file" tone="info" />
        <MiniStat label="Formulir Pajak" value={String(all.filter(r => r.k === "Formulir Pajak").length)} sub="Dokumen" icon="coin" tone="success" />
        <MiniStat label="Total Ukuran" value="2.33 MB" sub="Akumulasi" icon="chart" tone="secondary" />
      </div>

      <Card title="Riwayat Unduh" subtitle="Semua dokumen yang pernah Anda unduh." padded={false}
        headerRight={
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Input icon="search" placeholder="Cari dokumen..." value={q} onChange={e => setQ(e.target.value)} style={{ height: 36, width: 220 }} />
            <Btn variant="outline" icon="filter" size="sm">Filter</Btn>
          </div>
        }
      >
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "var(--neutral-50)", textAlign: "left" }}>
              {["Dokumen", "Kategori", "Periode", "Tanggal Unduh", "Ukuran", ""].map(h => (
                <th key={h} style={{ padding: "10px 16px", fontSize: 11, fontWeight: 700, color: "var(--neutral-600)", letterSpacing: "0.05em", textTransform: "uppercase", borderBottom: "1px solid var(--neutral-200)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid var(--neutral-100)" }}>
                <td style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 30, height: 30, borderRadius: 6, background: "var(--primary-50)", color: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="pdf" size={15} /></span>
                  <span style={{ fontWeight: 600, color: "var(--neutral-800)" }}>{r.d}</span>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <Badge tone={r.k === "Slip Gaji" ? "primary" : r.k === "Formulir Pajak" ? "success" : "info"} size="sm">{r.k}</Badge>
                </td>
                <td style={{ padding: "12px 16px", color: "var(--neutral-700)" }}>{r.p}</td>
                <td style={{ padding: "12px 16px", color: "var(--neutral-600)" }}>{r.t}</td>
                <td style={{ padding: "12px 16px", color: "var(--neutral-600)" }}>{r.s}</td>
                <td style={{ padding: "12px 16px", textAlign: "right" }}>
                  <Btn size="sm" variant="ghost" icon="download" onClick={() => alert("Mengunduh " + r.d + " (mock).")}>Unduh ulang</Btn>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: "32px 16px", textAlign: "center", color: "var(--neutral-500)", fontSize: 13 }}>
                  Tidak ada riwayat unduh yang sesuai pencarian.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </>
  );
}

/* ── Helper components ── */
function MiniStat({ label, value, sub, icon, tone }) {
  const tones = {
    primary: { bg: "var(--primary-50)", color: "var(--color-primary)" },
    info: { bg: "var(--color-info-light)", color: "var(--color-info)" },
    success: { bg: "var(--color-success-light)", color: "var(--color-success)" },
    secondary: { bg: "var(--secondary-50)", color: "var(--color-secondary)" },
  };
  const s = tones[tone];
  return (
    <div style={{
      background: "#fff", border: "1px solid var(--neutral-200)",
      borderRadius: 10, padding: "14px 16px",
      display: "flex", alignItems: "center", gap: 12,
    }}>
      <span style={{
        width: 38, height: 38, borderRadius: 8,
        background: s.bg, color: s.color,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}><Icon name={icon} size={18} /></span>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 11, color: "var(--neutral-500)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: "var(--neutral-900)", marginTop: 2 }}>{value}</div>
        {sub && <div style={{ fontSize: 11, color: "var(--neutral-500)" }}>{sub}</div>}
      </div>
    </div>
  );
}

const selectStyle = {
  height: 36, padding: "0 30px 0 12px", fontSize: 13,
  fontFamily: "var(--font-family)", border: "1.5px solid var(--neutral-300)",
  borderRadius: "var(--radius-md)", background: "#fff", appearance: "none",
  backgroundImage: "linear-gradient(45deg,transparent 50%,var(--neutral-500) 50%),linear-gradient(135deg,var(--neutral-500) 50%,transparent 50%)",
  backgroundPosition: "calc(100% - 14px) 50%,calc(100% - 9px) 50%",
  backgroundSize: "5px 5px,5px 5px",
  backgroundRepeat: "no-repeat",
};

const tableStyle = { width: "100%", borderCollapse: "collapse", fontSize: 13 };
const thStyle = { padding: "10px 16px", fontSize: 11, fontWeight: 700, color: "var(--neutral-600)", letterSpacing: "0.05em", textTransform: "uppercase", borderBottom: "1px solid var(--neutral-200)", textAlign: "left" };
const tdStyle = { padding: "12px 16px", color: "var(--neutral-700)" };

function DocCard({ title, period, size, lang, icon, featured }) {
  const [hover, setHover] = useState(false);
  const active = hover || featured;
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
      display: "flex", alignItems: "center", gap: 14,
      padding: 16, borderRadius: 10,
      background: active ? "linear-gradient(135deg,var(--primary-50),#fff 60%)" : "#fff",
      border: active ? "1px solid var(--primary-200)" : "1px solid var(--neutral-200)",
      cursor: "pointer", transition: "all 150ms ease",
    }}>
      <div style={{
        width: 44, height: 54, borderRadius: 6,
        background: "#fff", border: "1.5px solid var(--primary-200)",
        position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "center", padding: "0 0 6px",
        flexShrink: 0,
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}>
        <div style={{ position: "absolute", top: -1, right: -1, width: 14, height: 14, background: "var(--neutral-50)", borderLeft: "1.5px solid var(--primary-200)", borderBottom: "1.5px solid var(--primary-200)", borderRadius: "0 4px 0 4px" }} />
        <span style={{ fontSize: 9, fontWeight: 700, color: "var(--color-primary)", letterSpacing: "0.05em" }}>PDF</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, flexWrap: "wrap" }}>
          <Badge tone="primary" size="sm">{lang}</Badge>
          <span style={{ fontSize: 11, color: "var(--neutral-500)" }}>{size}</span>
        </div>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--neutral-900)", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</div>
        <div style={{ fontSize: 12, color: "var(--neutral-600)" }}>{period}</div>
      </div>
      <Btn size="sm" variant={active ? "primary" : "outline"} icon="download"></Btn>
    </div>
  );
}

function RiwayatRow({ period, size, thp }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
        border: hover ? "1px solid var(--primary-200)" : "1px solid var(--neutral-200)",
        borderRadius: 8,
        background: hover ? "linear-gradient(135deg,var(--primary-50),#fff 60%)" : "#fff",
        cursor: "pointer", transition: "all 150ms ease",
      }}
    >
      <span style={{ width: 32, height: 32, borderRadius: 6, background: "var(--primary-50)", color: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="pdf" size={15} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--neutral-900)" }}>{period}</div>
        <div style={{ fontSize: 11, color: "var(--neutral-500)" }}>THP {thp} · {size}</div>
      </div>
      <Btn size="sm" variant={hover ? "primary" : "ghost"} icon="download"></Btn>
    </div>
  );
}

window.PageLaporan = PageLaporan;
