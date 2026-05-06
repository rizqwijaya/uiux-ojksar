/* Page 6 — Pinjaman/Pembiayaan */
function PagePinjaman() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const rows = [
    { id: "PJM-2026-0142", periode: "April 2026", kategori: "Konsumtif", status: "Disetujui", bank: "BRI", ket: "Renovasi rumah", buka: "02 Apr 2026", tutup: "02 Apr 2031", pengajuan: "Sedang Berjalan", tone: "success", amount: "Rp 250.000.000" },
    { id: "PJM-2025-0987", periode: "Oktober 2025", kategori: "Pendidikan", status: "Disetujui", bank: "BTN", ket: "Biaya kuliah anak", buka: "12 Okt 2025", tutup: "12 Okt 2027", pengajuan: "Sedang Berjalan", tone: "success", amount: "Rp 45.000.000" },
    { id: "PJM-2025-0654", periode: "Juni 2025", kategori: "Kendaraan", status: "Lunas", bank: "Mandiri", ket: "Pembelian mobil", buka: "05 Jun 2023", tutup: "05 Jun 2025", pengajuan: "Selesai", tone: "neutral", amount: "Rp 180.000.000" },
    { id: "PJM-2025-0321", periode: "Februari 2025", kategori: "Konsumtif", status: "Diproses", bank: "BNI", ket: "Renovasi dapur", buka: "20 Feb 2025", tutup: "20 Feb 2030", pengajuan: "Verifikasi", tone: "warning", amount: "Rp 75.000.000" },
    { id: "PJM-2024-1102", periode: "Desember 2024", kategori: "Konsumtif", status: "Ditolak", bank: "BTN", ket: "Pengajuan kedua", buka: "15 Des 2024", tutup: "—", pengajuan: "Ditolak", tone: "error", amount: "Rp 30.000.000" },
  ];
  const q = query.trim().toLowerCase();
  const filteredRows = rows.filter(r =>
    (statusFilter === "Semua" || r.status === statusFilter) &&
    (q === "" || r.id.toLowerCase().includes(q) || r.ket.toLowerCase().includes(q) || r.kategori.toLowerCase().includes(q) || r.bank.toLowerCase().includes(q))
  );

  return (
    <PageShell active="" sidebarActive="Pinjaman" screenLabel="06 Pinjaman">
      <PageHeader
        crumb={["Portal", "Pinjaman / Pembiayaan"]}
        title="Pinjaman / Pembiayaan"
        subtitle="Riwayat pengajuan dan status pinjaman aktif Anda."
        actions={
          <div style={{ display: "flex", gap: 8 }}>
            <Btn variant="soft" icon="download">Ekspor</Btn>
            <Btn variant="primary" icon="plus" onClick={() => alert("Form pengajuan pinjaman akan dibuka (mock).")}>Ajukan Pinjaman Baru</Btn>
          </div>
        }
      />

      <div style={{ padding: "24px 32px", overflow: "auto", flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Summary cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
          {[
            { l: "Total Plafon Disetujui", v: "Rp 295 Jt", sub: "2 fasilitas aktif", icon: "wallet", tone: "primary" },
            { l: "Sisa Pokok Pinjaman", v: "Rp 187.4 Jt", sub: "63.5% dari plafon", icon: "chart", tone: "secondary" },
            { l: "Cicilan Bulan Ini", v: "Rp 4.250.000", sub: "Jatuh tempo 25 Apr", icon: "calendar", tone: "info" },
            { l: "Pengajuan Diproses", v: "1", sub: "Estimasi 3 hari kerja", icon: "clock", tone: "warning" },
          ].map(c => (
            <div key={c.l} style={{ background: "#fff", border: "1px solid var(--neutral-200)", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11.5, color: "var(--neutral-500)", fontWeight: 600 }}>{c.l}</span>
                <span style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: c.tone === "primary" ? "var(--primary-50)" : c.tone === "secondary" ? "var(--secondary-50)" : c.tone === "info" ? "var(--color-info-light)" : "var(--color-warning-light)",
                  color: c.tone === "primary" ? "var(--color-primary)" : c.tone === "secondary" ? "var(--color-secondary)" : c.tone === "info" ? "var(--color-info)" : "var(--color-secondary)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}><Icon name={c.icon} size={14} /></span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "var(--neutral-900)", letterSpacing: "-0.01em" }}>{c.v}</div>
              <div style={{ fontSize: 11.5, color: "var(--neutral-500)" }}>{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Filter bar */}
        <Card padded={false}>
          <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", gap: 10, flexWrap: "wrap", borderBottom: "1px solid var(--neutral-100)" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--neutral-700)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Filter</span>
            <FilterPill label="Periode" value="Semua" />
            <FilterPill label="Kategori" value="Semua" />
            <FilterPill label="Bank" value="Semua" />
            <FilterPill label="Tgl Buka" value="Semua" />
            <FilterPill label="Tgl Tutup" value="Semua" />
            <StatusSelect value={statusFilter} onChange={setStatusFilter} />
            <button onClick={() => { setQuery(""); setStatusFilter("Semua"); }} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600, color: "var(--color-primary)", background: "transparent", border: "none", cursor: "pointer" }}>
              <Icon name="refresh" size={13} /> Reset
            </button>
            <div style={{ position: "relative" }}>
              <Input icon="search" placeholder="Cari ID atau keterangan…" style={{ height: 34, width: 240 }} value={query} onChange={e => setQuery(e.target.value)} />
            </div>
          </div>

          {/* Table */}
          <div style={{ overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "var(--neutral-50)" }}>
                  {["ID Pengajuan", "Kategori", "Status", "Bank", "Plafon", "Tgl. Buka", "Tgl. Tutup", "Status Pengajuan", "Aksi"].map((h, i) => (
                    <th key={h} style={{
                      padding: "12px 14px", textAlign: i >= 4 && i <= 4 ? "right" : "left",
                      fontSize: 11, fontWeight: 700,
                      color: "var(--neutral-600)", letterSpacing: "0.05em", textTransform: "uppercase",
                      borderBottom: "1px solid var(--neutral-200)",
                      whiteSpace: "nowrap",
                    }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                        {h}
                        {i < 8 && <Icon name="sort" size={11} color="var(--neutral-400)" />}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRows.length === 0 && (
                  <tr><td colSpan={9} style={{ padding: 32, textAlign: "center", color: "var(--neutral-500)", fontSize: 13 }}>Tidak ada pengajuan cocok.</td></tr>
                )}
                {filteredRows.map((r) => {
                  const statusStyles = {
                    success: { dot: "var(--color-success)", bg: "var(--color-success-light)", text: "var(--color-success)" },
                    warning: { dot: "var(--color-secondary)", bg: "var(--color-warning-light)", text: "var(--secondary-800)" },
                    error: { dot: "var(--color-primary)", bg: "var(--color-error-light)", text: "var(--color-primary)" },
                    neutral: { dot: "var(--neutral-500)", bg: "var(--neutral-100)", text: "var(--neutral-700)" },
                  }[r.tone];
                  return (
                    <tr key={r.id} style={{ borderBottom: "1px solid var(--neutral-100)" }}>
                      <td style={{ padding: "14px 14px" }}>
                        <div style={{ fontWeight: 700, color: "var(--color-primary)", fontSize: 12.5 }}>{r.id}</div>
                        <div style={{ fontSize: 11, color: "var(--neutral-500)" }}>{r.periode}</div>
                      </td>
                      <td style={{ padding: "14px 14px", color: "var(--neutral-800)" }}>{r.kategori}</td>
                      <td style={{ padding: "14px 14px" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: statusStyles.text, background: statusStyles.bg, padding: "3px 10px", borderRadius: 999 }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusStyles.dot }} />
                          {r.status}
                        </span>
                      </td>
                      <td style={{ padding: "14px 14px", color: "var(--neutral-800)" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                          <span style={{ width: 24, height: 24, borderRadius: 5, background: "var(--neutral-100)", color: "var(--neutral-700)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{r.bank.slice(0, 2).toUpperCase()}</span>
                          {r.bank}
                        </span>
                      </td>
                      <td style={{ padding: "14px 14px", color: "var(--neutral-900)", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{r.amount}</td>
                      <td style={{ padding: "14px 14px", color: "var(--neutral-700)", whiteSpace: "nowrap" }}>{r.buka}</td>
                      <td style={{ padding: "14px 14px", color: "var(--neutral-700)", whiteSpace: "nowrap" }}>{r.tutup}</td>
                      <td style={{ padding: "14px 14px" }}>
                        <Badge tone={r.tone === "success" ? "success" : r.tone === "warning" ? "warning" : r.tone === "error" ? "error" : "neutral"} size="sm">{r.pengajuan}</Badge>
                      </td>
                      <td style={{ padding: "14px 14px", whiteSpace: "nowrap" }}>
                        <div style={{ display: "flex", gap: 4 }}>
                          <Btn size="sm" variant="ghost" icon="eye"></Btn>
                          <Btn size="sm" variant="ghost" icon="download"></Btn>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderTop: "1px solid var(--neutral-100)", fontSize: 12.5, color: "var(--neutral-600)" }}>
            <div>Menampilkan <strong style={{ color: "var(--neutral-900)" }}>1–5</strong> dari <strong style={{ color: "var(--neutral-900)" }}>12</strong> pengajuan</div>
            <div style={{ display: "flex", gap: 4 }}>
              <Btn size="sm" variant="ghost" icon="chevron" style={{ transform: "rotate(180deg)" }}></Btn>
              {[1, 2, 3].map(n => (
                <button key={n} style={{
                  width: 30, height: 30, borderRadius: 6,
                  background: n === 1 ? "var(--color-primary)" : "transparent",
                  color: n === 1 ? "#fff" : "var(--neutral-700)",
                  border: n === 1 ? "1px solid var(--color-primary)" : "1px solid var(--neutral-200)",
                  fontSize: 12.5, fontWeight: 600, cursor: "pointer",
                }}>{n}</button>
              ))}
              <Btn size="sm" variant="ghost" icon="chevron"></Btn>
            </div>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}

function StatusSelect({ value, onChange }) {
  const opts = ["Semua", "Disetujui", "Diproses", "Lunas", "Ditolak"];
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 999, background: "#fff", border: "1px solid var(--neutral-200)", fontSize: 12, cursor: "pointer" }}>
      <span style={{ color: "var(--neutral-500)" }}>Status:</span>
      <select value={value} onChange={e => onChange(e.target.value)} style={{ border: "none", background: "transparent", fontFamily: "var(--font-family)", fontSize: 12, fontWeight: 600, color: "var(--neutral-900)", outline: "none", cursor: "pointer", paddingRight: 4 }}>
        {opts.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function FilterPill({ label, value }) {
  return (
    <button style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "6px 12px", borderRadius: 999,
      background: "#fff", border: "1px solid var(--neutral-200)",
      fontSize: 12, fontFamily: "var(--font-family)", cursor: "pointer",
    }}>
      <span style={{ color: "var(--neutral-500)" }}>{label}:</span>
      <span style={{ color: "var(--neutral-900)", fontWeight: 600 }}>{value}</span>
      <Icon name="chevronDown" size={12} color="var(--neutral-500)" />
    </button>
  );
}

window.PagePinjaman = PagePinjaman;
