/* Page 3 — Pengumuman */
function PagePengumuman() {
  const [activeId, setActiveId] = useState(0);
  const [query, setQuery] = useState("");
  const [filterCat, setFilterCat] = useState("Semua");
  const announcements = [
    { id: 0, pinned: true, cat: "SDM", title: "Imbalan Prestasi Individu (IPI) Pegawai Tahun 2025", date: "15 Mar 2026", author: "Admin OJKSAR", excerpt: "IPI Pegawai Tahun 2025 telah ditetapkan. Rincian potongan dan pencairan tertera dalam SK." },
    { id: 1, cat: "Pinjaman", title: "Penyesuaian Suku Bunga Pinjaman Kopejka 2026", date: "12 Mar 2026", author: "Tim Kopejka", excerpt: "Berlaku efektif 1 April 2026, suku bunga pinjaman konsumtif disesuaikan menjadi 6.5% efektif." },
    { id: 2, cat: "Pajak", title: "Distribusi Formulir 1721-A1 Tahun Pajak 2025", date: "08 Mar 2026", author: "Bagian Keuangan", excerpt: "Formulir 1721-A1 untuk pelaporan SPT Tahunan dapat diunduh melalui menu Laporan." },
    { id: 3, cat: "Sistem", title: "Pemeliharaan Sistem OJK SAR — 22 Maret 2026", date: "05 Mar 2026", author: "DivTI", excerpt: "Pemeliharaan terjadwal hari Sabtu pukul 22.00 — 02.00 WIB. Sistem tidak dapat diakses sementara." },
    { id: 4, cat: "Sistem", title: "Pembaruan Modul Pinjaman OJK SAR v3.2", date: "03 Mar 2026", author: "DivTI", excerpt: "Modul Pinjaman/Pembiayaan diperbarui dengan alur verifikasi yang lebih cepat dan dashboard ringkasan baru." },
    { id: 5, cat: "SDM", title: "Pendaftaran Program Pelatihan Sertifikasi 2026", date: "28 Feb 2026", author: "Pusdiklat", excerpt: "Pendaftaran program pelatihan sertifikasi internal dibuka hingga 30 April 2026." },
  ];
  const catColor = { SDM: "primary", Pinjaman: "secondary", Pajak: "info", Sistem: "warning" };
  const q = query.trim().toLowerCase();
  const filtered = announcements.filter(it =>
    (filterCat === "Semua" || it.cat === filterCat) &&
    (q === "" || it.title.toLowerCase().includes(q) || it.excerpt.toLowerCase().includes(q))
  );
  const a = announcements.find(x => x.id === activeId) || filtered[0] || announcements[0];

  return (
    <PageShell active="Pengumuman" sidebarActive="" screenLabel="03 Pengumuman">
      <PageHeader
        crumb={["Portal", "Pengumuman"]}
        title="Pengumuman"
        subtitle="Informasi resmi dari manajemen OJK kepada pegawai."
        actions={
          <div style={{ display: "flex", gap: 8 }}>
            <Input icon="search" placeholder="Cari pengumuman…" style={{ width: 280 }} value={query} onChange={e => setQuery(e.target.value)} />
            <Btn variant="soft" icon="filter">Filter</Btn>
          </div>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 16, padding: "24px 32px", flex: 1, overflow: "auto" }}>
        {/* List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
            {["Semua", "SDM", "Pinjaman", "Pajak", "Sistem"].map(t => {
              const on = filterCat === t;
              return (
                <button key={t} onClick={() => setFilterCat(t)} style={{
                  padding: "5px 12px", fontSize: 12, fontWeight: 600,
                  borderRadius: 999,
                  background: on ? "var(--color-primary)" : "#fff",
                  color: on ? "#fff" : "var(--neutral-700)",
                  border: on ? "1px solid var(--color-primary)" : "1px solid var(--neutral-200)",
                  cursor: "pointer",
                }}>{t}</button>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div style={{ padding: 24, textAlign: "center", color: "var(--neutral-500)", fontSize: 13, background: "#fff", border: "1px dashed var(--neutral-300)", borderRadius: 10 }}>Tidak ada pengumuman cocok.</div>
          )}
          {filtered.map(it => {
            const isActive = it.id === activeId;
            return (
              <div key={it.id} onClick={() => setActiveId(it.id)} style={{
                padding: "14px 16px", borderRadius: 10,
                background: "#fff",
                border: isActive ? "1.5px solid var(--color-primary)" : "1px solid var(--neutral-200)",
                cursor: "pointer",
                boxShadow: isActive ? "0 0 0 4px var(--primary-100)" : "none",
              }}>
                <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                  {it.pinned && <Badge tone="warning" icon="pin" size="sm">Pinned</Badge>}
                  <Badge tone={catColor[it.cat]} size="sm">{it.cat}</Badge>
                  <span style={{ fontSize: 11, color: "var(--neutral-500)", marginLeft: "auto" }}>{it.date}</span>
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--neutral-900)", marginBottom: 4, lineHeight: 1.35 }}>{it.title}</div>
                <div style={{ fontSize: 12, color: "var(--neutral-600)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{it.excerpt}</div>
              </div>
            );
          })}
        </div>

        {/* Detail */}
        <Card padded={false} style={{ alignSelf: "flex-start" }}>
          <div style={{ padding: "24px 28px", borderBottom: "1px solid var(--neutral-100)" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
              {a.pinned && <Badge tone="warning" icon="pin">Disematkan</Badge>}
              <Badge tone={catColor[a.cat]}>{a.cat}</Badge>
              <span style={{ fontSize: 12, color: "var(--neutral-500)" }}>•</span>
              <span style={{ fontSize: 12, color: "var(--neutral-500)" }}>{a.date}</span>
              <span style={{ fontSize: 12, color: "var(--neutral-500)" }}>•</span>
              <span style={{ fontSize: 12, color: "var(--neutral-700)", fontWeight: 600 }}>{a.author}</span>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--neutral-900)", letterSpacing: "-0.01em", lineHeight: 1.25 }}>{a.title}</h2>
          </div>
          <div style={{ padding: 28, fontSize: 14, color: "var(--neutral-700)", lineHeight: 1.7 }}>
            <AnnouncementBody a={a} />
          </div>
          <div style={{ padding: "16px 28px", borderTop: "1px solid var(--neutral-100)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--neutral-50)", borderRadius: "0 0 12px 12px" }}>
            <div style={{ fontSize: 12, color: "var(--neutral-500)" }}>Terakhir diperbarui {a.date}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn size="sm" variant="ghost" icon="chevron" style={{ transform: "rotate(180deg)" }}></Btn>
              <Btn size="sm" variant="ghost" icon="chevron"></Btn>
            </div>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
function AnnouncementBody({ a }) {
  const pStyle = { marginBottom: 14 };
  const boxStyle = { background: "var(--neutral-50)", border: "1px solid var(--neutral-200)", borderRadius: 10, padding: 18, margin: "18px 0" };
  const boxTitle = { fontSize: 12, fontWeight: 700, color: "var(--neutral-700)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 12 };
  const rowStyle = { display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px dashed var(--neutral-200)" };

  function AttachmentBox({ filename, size, pages }) {
    return (
      <div style={{ marginTop: 24, padding: 16, background: "var(--primary-50)", borderRadius: 10, border: "1px solid var(--primary-100)", display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{ width: 40, height: 50, borderRadius: 4, background: "#fff", border: "1px solid var(--primary-200)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)", flexShrink: 0 }}><Icon name="pdf" size={22} /></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--neutral-900)" }}>{filename}</div>
          <div style={{ fontSize: 11.5, color: "var(--neutral-600)" }}>{size} · {pages} halaman</div>
        </div>
        <Btn size="sm" variant="primary" icon="download">Unduh</Btn>
      </div>
    );
  }

  function InfoRows({ rows }) {
    return (
      <div style={boxStyle}>
        <div style={boxTitle}>Rincian</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 28, rowGap: 0 }}>
          {rows.map(r => (
            <div key={r.l} style={rowStyle}>
              <span style={{ fontSize: 13, color: "var(--neutral-600)", paddingRight: 12 }}>{r.l}</span>
              <span style={{ fontSize: 13, fontWeight: r.strong ? 700 : 600, color: r.tone === "success" ? "var(--color-success)" : "var(--neutral-900)", textAlign: "right" }}>{r.v}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (a.id === 0) {
    /* IPI 2025 */
    return (
      <>
        <p style={pStyle}>Yth. Bapak/Ibu Pegawai OJK,</p>
        <p style={pStyle}>Bersama ini kami sampaikan bahwa Imbalan Prestasi Individu (IPI) Pegawai Tahun 2025 telah ditetapkan melalui Keputusan Anggota Dewan Komisioner OJK Nomor SK-15/KDK.01/2026 tanggal 15 Maret 2026.</p>
        <InfoRows rows={[
          { l: "Imbalan Bruto", v: "Rp 87.500.000", strong: true },
          { l: "Potongan Kopejka", v: "Rp 0" },
          { l: "Potongan OJK", v: "Rp 0" },
          { l: "Pajak (PPh 21)", v: "Rp 13.125.000" },
          { l: "Take-Home Pay", v: "Rp 74.375.000", tone: "success" },
          { l: "Tanggal Pencairan", v: "25 Mar 2026" },
        ]} />
        <p style={pStyle}>Pencairan akan dilaksanakan melalui rekening payroll masing-masing pegawai pada tanggal 25 Maret 2026. Pegawai dapat memantau status pencairan melalui menu <strong style={{ color: "var(--color-primary)" }}>Laporan → Slip Gaji</strong>.</p>
        <p>Demikian disampaikan untuk menjadi perhatian. Atas perhatian dan kerja sama Bapak/Ibu, kami sampaikan terima kasih.</p>
        <AttachmentBox filename="Lampiran SK-15-KDK.01-2026.pdf" size="1.2 MB" pages="4" />
      </>
    );
  }

  if (a.id === 1) {
    /* Penyesuaian Suku Bunga Kopejka */
    return (
      <>
        <p style={pStyle}>Yth. Bapak/Ibu Anggota Kopejka,</p>
        <p style={pStyle}>Diberitahukan bahwa terdapat penyesuaian suku bunga pinjaman konsumtif Kopejka yang berlaku efektif mulai <strong>1 April 2026</strong>. Penyesuaian ini dilakukan berdasarkan evaluasi berkala terhadap kondisi likuiditas dan kebijakan suku bunga acuan Bank Indonesia.</p>
        <InfoRows rows={[
          { l: "Suku Bunga Lama", v: "7.0% efektif" },
          { l: "Suku Bunga Baru", v: "6.5% efektif", strong: true, tone: "success" },
          { l: "Berlaku Efektif", v: "1 Apr 2026" },
          { l: "Jenis Pinjaman", v: "Konsumtif" },
          { l: "Angsuran Berjalan", v: "Tidak berubah" },
          { l: "Pinjaman Baru", v: "Tarif baru berlaku" },
        ]} />
        <p style={pStyle}>Penyesuaian suku bunga hanya berlaku untuk pinjaman baru yang diajukan mulai 1 April 2026. Pinjaman yang sedang berjalan tidak mengalami perubahan angsuran hingga kontrak berakhir.</p>
        <p style={pStyle}>Informasi lebih lanjut dapat diperoleh melalui menu <strong style={{ color: "var(--color-primary)" }}>Pinjaman/Pembiayaan</strong> atau menghubungi PIC Pinjaman Kopejka di ext. 4521.</p>
        <p>Demikian pemberitahuan ini disampaikan. Terima kasih.</p>
        <AttachmentBox filename="Pemberitahuan-Suku-Bunga-Kopejka-Apr2026.pdf" size="420 KB" pages="2" />
      </>
    );
  }

  if (a.id === 2) {
    /* Distribusi Formulir 1721-A1 */
    return (
      <>
        <p style={pStyle}>Yth. Bapak/Ibu Pegawai OJK,</p>
        <p style={pStyle}>Dalam rangka mendukung pelaporan SPT Tahunan PPh Orang Pribadi Tahun Pajak 2025, Bagian Keuangan OJK telah menyiapkan Formulir <strong>1721-A1</strong> yang dapat diunduh secara mandiri melalui portal OJK SAR.</p>
        <InfoRows rows={[
          { l: "Formulir", v: "1721-A1" },
          { l: "Tahun Pajak", v: "2025" },
          { l: "Batas Pelaporan SPT", v: "31 Mar 2026" },
          { l: "Unduh via", v: "Laporan → Formulir Pajak" },
          { l: "Format", v: "PDF, dapat dicetak" },
          { l: "Status", v: "Tersedia", tone: "success" },
        ]} />
        <p style={pStyle}>Formulir dapat diunduh melalui menu <strong style={{ color: "var(--color-primary)" }}>Laporan → Formulir Pajak</strong>. Pastikan data penghasilan dan potongan telah sesuai sebelum melaporkan SPT melalui Coretax.</p>
        <p style={pStyle}>Bagi pegawai yang memerlukan bantuan pengisian formulir, dapat menghubungi PIC Pajak Bagian Keuangan di ext. 3107.</p>
        <p>Demikian disampaikan. Atas perhatian Bapak/Ibu, kami sampaikan terima kasih.</p>
        <AttachmentBox filename="Panduan-Pengisian-1721-A1-TY2025.pdf" size="680 KB" pages="3" />
      </>
    );
  }

  if (a.id === 3) {
    /* Pemeliharaan Sistem */
    return (
      <>
        <p style={pStyle}>Yth. Bapak/Ibu Pengguna OJK SAR,</p>
        <p style={pStyle}>Diberitahukan bahwa akan dilaksanakan <strong>pemeliharaan terjadwal (scheduled maintenance)</strong> sistem OJK SAR pada:</p>
        <InfoRows rows={[
          { l: "Hari/Tanggal", v: "Sabtu, 22 Mar 2026" },
          { l: "Waktu", v: "22.00 – 02.00 WIB", strong: true },
          { l: "Durasi", v: "± 4 jam" },
          { l: "Lingkup", v: "Seluruh modul" },
          { l: "Dampak", v: "Sistem tidak dapat diakses" },
          { l: "Pemulihan Estimasi", v: "Minggu, 23 Mar 2026 · 02.00" },
        ]} />
        <p style={pStyle}>Selama periode pemeliharaan, seluruh layanan OJK SAR termasuk unduh slip gaji, pengajuan pinjaman, dan akses laporan <strong>tidak dapat digunakan</strong>. Pastikan segala kebutuhan diselesaikan sebelum pukul 22.00 WIB pada hari Sabtu tersebut.</p>
        <p style={pStyle}>Pemeliharaan ini dilakukan dalam rangka peningkatan performa dan keamanan sistem. Mohon maaf atas ketidaknyamanan yang ditimbulkan.</p>
        <p>Informasi lebih lanjut: <strong style={{ color: "var(--color-primary)" }}>DivTI ext. 5000</strong>.</p>
      </>
    );
  }

  if (a.id === 4) {
    /* Pembaruan Modul Pinjaman v3.2 */
    return (
      <>
        <p style={pStyle}>Yth. Bapak/Ibu Pengguna OJK SAR,</p>
        <p style={pStyle}>Kami dengan bangga mengumumkan bahwa <strong>Modul Pinjaman/Pembiayaan OJK SAR versi 3.2</strong> telah resmi diluncurkan. Pembaruan ini hadir dengan sejumlah peningkatan signifikan untuk mempermudah proses pengajuan dan pemantauan pinjaman.</p>
        <div style={boxStyle}>
          <div style={boxTitle}>Fitur Baru & Peningkatan</div>
          <ul style={{ paddingLeft: 18, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              "Alur verifikasi pengajuan pinjaman lebih cepat — estimasi persetujuan turun dari 5 hari menjadi 2 hari kerja",
              "Dashboard ringkasan baru: sisa pokok, bunga berjalan, dan progres pelunasan dalam satu tampilan",
              "Notifikasi otomatis via email saat status pengajuan berubah",
              "Fitur simulasi angsuran sebelum mengajukan pinjaman",
              "Riwayat pengajuan lengkap dapat diekspor ke PDF",
            ].map((f, i) => (
              <li key={i} style={{ fontSize: 13.5, color: "var(--neutral-700)" }}>{f}</li>
            ))}
          </ul>
        </div>
        <p style={pStyle}>Pembaruan ini berlaku sejak <strong>3 Maret 2026</strong> dan dapat langsung diakses melalui menu <strong style={{ color: "var(--color-primary)" }}>Pinjaman/Pembiayaan</strong>.</p>
        <p>Jika ditemukan kendala teknis, silakan hubungi DivTI di ext. 5000 atau buka tiket melalui menu <strong style={{ color: "var(--color-primary)" }}>Kontak</strong>.</p>
        <AttachmentBox filename="Release-Notes-OJK-SAR-v3.2.pdf" size="540 KB" pages="5" />
      </>
    );
  }

  if (a.id === 5) {
    /* Pendaftaran Pelatihan Sertifikasi 2026 */
    return (
      <>
        <p style={pStyle}>Yth. Bapak/Ibu Pegawai OJK,</p>
        <p style={pStyle}>Dalam rangka peningkatan kompetensi pegawai, Pusdiklat OJK membuka pendaftaran <strong>Program Pelatihan Sertifikasi Internal Tahun 2026</strong>. Pegawai diundang untuk mendaftar pada program yang sesuai dengan kebutuhan pengembangan kompetensi masing-masing.</p>
        <InfoRows rows={[
          { l: "Periode Pendaftaran", v: "1 Mar – 30 Apr 2026" },
          { l: "Pelaksanaan Pelatihan", v: "Mei – Des 2026" },
          { l: "Kuota per Program", v: "30 peserta" },
          { l: "Biaya", v: "Ditanggung OJK", tone: "success" },
          { l: "Pendaftaran via", v: "Pusdiklat / PIC SDM" },
          { l: "Info Lanjut", v: "ext. 2314 (PIC SDM)" },
        ]} />
        <div style={boxStyle}>
          <div style={boxTitle}>Program yang Dibuka</div>
          <ul style={{ paddingLeft: 18, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              "Certified Financial Planner (CFP) — untuk pegawai bidang keuangan",
              "Certified Internal Auditor (CIA) — untuk pegawai bidang audit",
              "Project Management Professional (PMP) — untuk manajer proyek",
              "Data Analytics & Visualization — untuk pegawai bidang TI dan perencanaan",
              "Leadership Excellence Program — untuk pegawai eselon III/IV",
            ].map((p, i) => (
              <li key={i} style={{ fontSize: 13.5, color: "var(--neutral-700)" }}>{p}</li>
            ))}
          </ul>
        </div>
        <p style={pStyle}>Pendaftaran dilakukan melalui PIC Remunerasi/SDM unit kerja masing-masing. Batas pendaftaran <strong>30 April 2026</strong>. Kuota terbatas — segera daftarkan diri Anda.</p>
        <p>Informasi lebih lanjut: Sdri. Larasati Putri, PIC Remunerasi · DK SDM, ext. 2314.</p>
        <AttachmentBox filename="Panduan-Pendaftaran-Sertifikasi-2026.pdf" size="890 KB" pages="6" />
      </>
    );
  }

  return <p>{a.excerpt}</p>;
}

window.PagePengumuman = PagePengumuman;
