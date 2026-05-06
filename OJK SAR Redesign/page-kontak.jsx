/* Page 4 — Kontak */
function PageKontak() {
  const [kategori, setKategori] = React.useState("Pinjaman");
  const onSubmit = (e) => { e.preventDefault(); alert("Pesan berhasil dikirim. Tim Helpdesk akan merespons dalam 1×24 jam."); };
  return (
    <PageShell active="Kontak" sidebarActive="" screenLabel="04 Kontak">
      <PageHeader
        crumb={["Portal", "Kontak"]}
        title="Kontak & Bantuan"
        subtitle="Hubungi tim Helpdesk OJK SAR atau perwakilan unit kerja Anda."
      />
      <div style={{ padding: "24px 32px", overflow: "auto", flex: 1 }}>
        {/* Top contact strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 20 }}>
          {[
            { icon: "phone", label: "Telepon Helpdesk", value: "157", sub: "Senin–Jumat · 08.00–17.00 WIB", tone: "primary" },
            { icon: "mail", label: "Email Resmi", value: "sar.helpdesk@ojk.go.id", sub: "Respons dalam 1×24 jam", tone: "secondary" },
            { icon: "inbox", label: "Tiket Internal", value: "Buka Tiket Baru", sub: "Sistem ServiceDesk OJK", tone: "info" },
          ].map(c => (
            <div key={c.label} style={{
              background: "#fff", border: "1px solid var(--neutral-200)",
              borderRadius: "var(--radius-lg)", padding: 22,
              display: "flex", gap: 16, alignItems: "flex-start",
            }}>
              <span style={{
                width: 48, height: 48, borderRadius: 10,
                background: c.tone === "primary" ? "var(--primary-50)" : c.tone === "secondary" ? "var(--secondary-50)" : "var(--color-info-light)",
                color: c.tone === "primary" ? "var(--color-primary)" : c.tone === "secondary" ? "var(--color-secondary)" : "var(--color-info)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}><Icon name={c.icon} size={22} /></span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11.5, color: "var(--neutral-500)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 4 }}>{c.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "var(--neutral-900)", marginBottom: 4, letterSpacing: "-0.005em" }}>{c.value}</div>
                <div style={{ fontSize: 12, color: "var(--neutral-600)" }}>{c.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
          {/* Contact form */}
          <Card title="Kirim Pesan ke Helpdesk" subtitle="Tim akan merespons dalam 1×24 jam kerja.">
            <form onSubmit={onSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Input label="Nama Lengkap" defaultValue="Admin SAR" />
              <Input label="NIP" defaultValue="0987651234" />
              <Input label="Email" defaultValue="admin.sar@ojk.go.id" />
              <Input label="No. Telepon" placeholder="08xx-xxxx-xxxx" />
              <div style={{ gridColumn: "span 2" }}>
                <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "var(--neutral-700)", marginBottom: 6 }}>Kategori Pertanyaan</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                  {[
                    { icon: "file", label: "Slip Gaji" },
                    { icon: "wallet", label: "Pinjaman" },
                    { icon: "coin", label: "Pajak" },
                    { icon: "settings", label: "Lainnya" },
                  ].map(k => {
                    const active = kategori === k.label;
                    return (
                      <button key={k.label} type="button" onClick={() => setKategori(active ? null : k.label)} style={{
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "10px 12px", borderRadius: 8,
                        border: active ? "1.5px solid var(--color-primary)" : "1px solid var(--neutral-200)",
                        background: active ? "var(--primary-50)" : "#fff",
                        cursor: "pointer", fontSize: 13, fontWeight: 600,
                        color: active ? "var(--color-primary)" : "var(--neutral-700)",
                        fontFamily: "var(--font-family)", textAlign: "left",
                      }}>
                        <Icon name={k.icon} size={15} />
                        {k.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <Input label="Subjek" placeholder="cth. Pengajuan pinjaman tertahan di status verifikasi" />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "var(--neutral-700)", marginBottom: 6 }}>Pesan</label>
                <textarea rows={5} placeholder="Jelaskan kendala atau pertanyaan Anda secara detail…" style={{
                  width: "100%", padding: "12px 14px",
                  fontFamily: "var(--font-family)", fontSize: 14,
                  border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-md)",
                  outline: "none", resize: "vertical", lineHeight: 1.55,
                }} />
              </div>
              <div style={{ gridColumn: "span 2", display: "flex", gap: 10, padding: 14, border: "1.5px dashed var(--neutral-300)", borderRadius: 10, alignItems: "center", color: "var(--neutral-600)" }}>
                <Icon name="file" size={20} />
                <div style={{ flex: 1, fontSize: 13 }}>Lampirkan tangkapan layar atau dokumen pendukung (maks 5 MB).</div>
                <Btn size="sm" variant="soft">Pilih File</Btn>
              </div>
              <div style={{ gridColumn: "span 2", display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 6 }}>
                <label style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "var(--neutral-700)" }}>
                  <span style={{ width: 16, height: 16, borderRadius: 4, border: "1.5px solid var(--color-primary)", background: "var(--color-primary)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff" }}><Icon name="check" size={11} /></span>
                  Saya menyetujui kebijakan privasi data internal OJK.
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  <Btn variant="soft" type="button">Batal</Btn>
                  <Btn variant="primary" iconRight="arrowRight" type="submit">Kirim Pesan</Btn>
                </div>
              </div>
            </form>
          </Card>

          {/* Sidebar — kantor pusat + perwakilan */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Card title="Kantor Pusat OJK" padded={false}>
              <div style={{
                height: 140,
                position: "relative",
                overflow: "hidden",
                display: "flex", alignItems: "flex-end",
              }}>
                <img
                  src="assets/soemitro-v1.png"
                  alt="Gedung Soemitro Djojohadikusumo"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 100%)" }} />
                <div style={{ position: "relative", padding: "10px 14px", color: "#fff" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>Gedung Soemitro Djojohadikusumo</div>
                </div>
              </div>
              <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 10, fontSize: 12.5 }}>
                <div style={{ display: "flex", gap: 10, color: "var(--neutral-700)" }}>
                  <Icon name="map" size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: 1 }} />
                  <div>Jl. Lapangan Banteng Timur No. 2-4, Jakarta Pusat 10710</div>
                </div>
                <div style={{ display: "flex", gap: 10, color: "var(--neutral-700)" }}>
                  <Icon name="clock" size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: 1 }} />
                  <div>Senin–Jumat · 08.00–17.00 WIB</div>
                </div>
                <Btn variant="outline" size="sm" iconRight="arrowRight"
                  style={{ marginTop: 4, width: "100%" }}
                  onClick={() => window.open("https://maps.app.goo.gl/kxcQgiCjXjSQpd1PA", "_blank")}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--color-primary)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "var(--color-primary)"; }}
                >Buka di Google Maps</Btn>
              </div>
            </Card>

            <Card title="Perwakilan Unit Kerja" subtitle="Hubungi PIC unit kerja terdekat.">
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, padding: 0, margin: 0 }}>
                {[
                  { name: "Sdri. Larasati Putri", role: "PIC Remunerasi · DK SDM", phone: "ext. 2314", initials: "LP" },
                  { name: "Bpk. Ahmad Faisal", role: "PIC Pinjaman · Kopejka", phone: "ext. 4521", initials: "AF" },
                  { name: "Sdri. Ratna Dewi", role: "PIC Pajak · Bag. Keuangan", phone: "ext. 3107", initials: "RD" },
                ].map(p => (
                  <li key={p.name} style={{ display: "flex", gap: 12, padding: 12, border: "1px solid var(--neutral-200)", borderRadius: 10, alignItems: "center" }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,var(--primary-100),var(--secondary-100))", color: "var(--primary-700)", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{p.initials}</div>
                    <div style={{ flex: 1, lineHeight: 1.3 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--neutral-900)" }}>{p.name}</div>
                      <div style={{ fontSize: 11.5, color: "var(--neutral-600)" }}>{p.role}</div>
                      <div style={{ fontSize: 11.5, color: "var(--color-primary)", fontWeight: 600, marginTop: 2 }}>{p.phone}</div>
                    </div>
                    <Btn size="sm" variant="ghost" icon="phone"></Btn>
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
window.PageKontak = PageKontak;
