/* OJK SAR — Bilingual support (Indonesian ↔ English)
   Approach: walk DOM text nodes after each React commit (via MutationObserver),
   look up trimmed value in DICT, swap if hit. Originals are remembered per
   node in a WeakMap so toggling back to ID restores exact source text. */

(function () {
  const DICT = {
    /* ── Top bar / nav ── */
    "Beranda": "Home",
    "Pengumuman": "Announcements",
    "Kontak": "Contact",
    "Laporan": "Reports",
    "Pinjaman/Pembiayaan": "Loans/Financing",
    "Pinjaman / Pembiayaan": "Loans / Financing",
    "Pinjaman": "Loans",
    "Pembiayaan": "Financing",
    "Profil Saya": "My Profile",
    "Pengaturan": "Settings",
    "Keluar": "Logout",
    "Pegawai Tetap": "Permanent Employee",
    "Sistem Aplikasi Remunerasi": "Remuneration Application System",
    "SISTEM APLIKASI REMUNERASI": "REMUNERATION APPLICATION SYSTEM",

    /* ── Sidebar ── */
    "Menu Pegawai": "Employee Menu",
    "MENU PEGAWAI": "EMPLOYEE MENU",
    "Periode Aktif": "Active Period",
    "PERIODE AKTIF": "ACTIVE PERIOD",
    "Slip gaji tersedia 25 April": "Pay slip available April 25",

    /* ── Login page ── */
    "Selamat Datang Kembali": "Welcome Back",
    "SELAMAT DATANG KEMBALI": "WELCOME BACK",
    "Masuk ke Akun Anda": "Sign In to Your Account",
    "Gunakan kredensial pegawai OJK untuk mengakses portal.": "Use your OJK employee credentials to access the portal.",
    "Username / NIP": "Username / Employee ID",
    "Kata Sandi": "Password",
    "Verifikasi Keamanan": "Security Verification",
    "Salin kode verifikasi": "Copy verification code",
    "Ingat saya": "Remember me",
    "Lupa kata sandi?": "Forgot password?",
    "Masuk ke OJK SAR": "Sign In to OJK SAR",
    "Browser yang Didukung": "Supported Browsers",
    "Chrome, Firefox, Edge, Safari versi terbaru. Resolusi minimum 1024×768.": "Chrome, Firefox, Edge, Safari latest versions. Minimum resolution 1024×768.",
    "Portal Internal Pegawai OJK": "OJK Employee Internal Portal",
    "PORTAL INTERNAL PEGAWAI OJK": "OJK EMPLOYEE INTERNAL PORTAL",
    "Transparan.": "Transparent.",
    "Akurat.": "Accurate.",
    "Terintegrasi.": "Integrated.",
    "Kelola slip gaji, pengajuan pinjaman, hingga pelaporan SPT pegawai secara terintegrasi melalui OJK SAR.": "Manage pay slips, loan applications, and tax filings for employees in an integrated way through OJK SAR.",
    "Pegawai Aktif": "Active Employees",
    "Layanan Terintegrasi": "Integrated Services",
    "Kepatuhan Pajak": "Tax Compliance",
    "Masukkan kata sandi": "Enter password",
    "cth. admin.sar": "e.g. admin.sar",

    /* ── Beranda ── */
    "Portal": "Portal",
    "Selamat Pagi, Admin SAR 👋": "Good Morning, Admin SAR 👋",
    "Ringkasan remunerasi & aktivitas terbaru Anda di OJK SAR.": "Summary of your remuneration & latest activities at OJK SAR.",
    "Login terakhir": "Last login",
    "Slip Gaji April": "April Pay Slip",
    "Take-Home Pay April": "April Take-Home Pay",
    "IPI 2025 Ditetapkan": "IPI 2025 Set",
    "Pinjaman Aktif": "Active Loans",
    "2 Fasilitas": "2 Facilities",
    "Kopejka & BRI": "Kopejka & BRI",
    "Pajak yang Dibayarkan": "Taxes Paid",
    "YTD per 30 Apr 2026": "YTD as of 30 Apr 2026",
    "+2.4% dari bulan Maret": "+2.4% from March",
    "SK 15-03-2026": "Decree 15-03-2026",
    "Pinned": "Pinned",
    "Disematkan": "Pinned",
    "Imbalan Prestasi Individu (IPI) Pegawai Tahun 2025": "Individual Performance Reward (IPI) Employee Year 2025",
    "Lihat Detail SK": "View Decree Details",
    "Unduh PDF": "Download PDF",
    "Take-Home Pay 6 Bulan Terakhir": "Take-Home Pay Last 6 Months",
    "Setelah pajak & potongan": "After tax & deductions",
    "Rata-rata": "Average",
    "Tertinggi": "Highest",
    "Total YTD": "Total YTD",
    "Aksi Cepat": "Quick Actions",
    "Layanan yang sering digunakan": "Frequently used services",
    "Slip Gaji": "Pay Slip",
    "Ajukan Pinjaman": "Apply for Loan",
    "Form 1721-A1": "Form 1721-A1",
    "Rekap Penghasilan": "Income Summary",
    "7 hari terakhir": "Last 7 days",
    "Lihat semua": "View all",
    "Slip Gaji April 2026 tersedia": "April 2026 pay slip available",
    "Hari ini · 09:12": "Today · 09:12",
    "Pengajuan Pinjaman BRI disetujui": "BRI loan application approved",
    "Kemarin · 14:30": "Yesterday · 14:30",
    "Pajak PPh 21 April berhasil disetor": "April PPh 21 tax successfully paid",
    "Pengumuman: SK IPI 2025 dirilis": "Announcement: IPI 2025 Decree released",
    "Tren bulanan": "Monthly trend",

    /* ── Pengumuman ── */
    "Informasi resmi dari manajemen OJK kepada pegawai.": "Official information from OJK management to employees.",
    "Cari pengumuman…": "Search announcements…",
    "Filter": "Filter",
    "Semua": "All",
    "SDM": "HR",
    "Pajak": "Tax",
    "Sistem": "System",
    "Tidak ada pengumuman cocok.": "No matching announcements.",
    "Terakhir diperbarui": "Last updated",
    "Penyesuaian Suku Bunga Pinjaman Kopejka 2026": "Kopejka Loan Interest Rate Adjustment 2026",
    "Distribusi Formulir 1721-A1 Tahun Pajak 2025": "Form 1721-A1 Distribution Tax Year 2025",
    "Pemeliharaan Sistem OJK SAR — 22 Maret 2026": "OJK SAR System Maintenance — March 22, 2026",
    "Pembaruan Modul Pinjaman OJK SAR v3.2": "OJK SAR Loan Module Update v3.2",
    "Pendaftaran Program Pelatihan Sertifikasi 2026": "Certification Training Program Registration 2026",
    "Admin OJKSAR": "OJKSAR Admin",
    "Tim Kopejka": "Kopejka Team",
    "Bagian Keuangan": "Finance Division",
    "DivTI": "IT Division",
    "Pusdiklat": "Training Center",
    "Rincian": "Details",
    "RINCIAN": "DETAILS",
    "Imbalan Bruto": "Gross Reward",
    "Potongan Kopejka": "Kopejka Deduction",
    "Potongan OJK": "OJK Deduction",
    "Pajak (PPh 21)": "Tax (PPh 21)",
    "Take-Home Pay": "Take-Home Pay",
    "Tanggal Pencairan": "Disbursement Date",
    "Suku Bunga Lama": "Previous Interest Rate",
    "Suku Bunga Baru": "New Interest Rate",
    "Berlaku Efektif": "Effective Date",
    "Jenis Pinjaman": "Loan Type",
    "Angsuran Berjalan": "Existing Installments",
    "Pinjaman Baru": "New Loans",
    "Tarif baru berlaku": "New rate applies",
    "Tidak berubah": "Unchanged",
    "Konsumtif": "Consumer",
    "Formulir": "Form",
    "Tahun Pajak": "Tax Year",
    "Batas Pelaporan SPT": "Tax Filing Deadline",
    "Unduh via": "Download via",
    "Format": "Format",
    "Status": "Status",
    "Tersedia": "Available",
    "PDF, dapat dicetak": "PDF, printable",
    "Hari/Tanggal": "Day/Date",
    "Waktu": "Time",
    "Durasi": "Duration",
    "Lingkup": "Scope",
    "Dampak": "Impact",
    "Pemulihan Estimasi": "Estimated Recovery",
    "Seluruh modul": "All modules",
    "Sistem tidak dapat diakses": "System inaccessible",
    "Periode Pendaftaran": "Registration Period",
    "Pelaksanaan Pelatihan": "Training Period",
    "Kuota per Program": "Quota per Program",
    "Biaya": "Cost",
    "Ditanggung OJK": "Covered by OJK",
    "Pendaftaran via": "Register via",
    "Info Lanjut": "More Info",
    "Program yang Dibuka": "Available Programs",
    "PROGRAM YANG DIBUKA": "AVAILABLE PROGRAMS",
    "Fitur Baru & Peningkatan": "New Features & Improvements",
    "FITUR BARU & PENINGKATAN": "NEW FEATURES & IMPROVEMENTS",
    "Unduh": "Download",
    "halaman": "pages",

    /* ── Kontak ── */
    "Kontak & Bantuan": "Contact & Help",
    "Hubungi tim Helpdesk OJK SAR atau perwakilan unit kerja Anda.": "Contact the OJK SAR Helpdesk team or your work unit representative.",
    "Telepon Helpdesk": "Helpdesk Phone",
    "TELEPON HELPDESK": "HELPDESK PHONE",
    "Senin–Jumat · 08.00–17.00 WIB": "Monday–Friday · 08:00–17:00 WIB",
    "Email Resmi": "Official Email",
    "EMAIL RESMI": "OFFICIAL EMAIL",
    "Respons dalam 1×24 jam": "Response within 1×24 hours",
    "Tiket Internal": "Internal Ticket",
    "TIKET INTERNAL": "INTERNAL TICKET",
    "Buka Tiket Baru": "Open New Ticket",
    "Sistem ServiceDesk OJK": "OJK ServiceDesk System",
    "Kirim Pesan ke Helpdesk": "Send Message to Helpdesk",
    "Tim akan merespons dalam 1×24 jam kerja.": "Team will respond within 1×24 working hours.",
    "Nama Lengkap": "Full Name",
    "NIP": "Employee ID",
    "Email": "Email",
    "No. Telepon": "Phone No.",
    "Kategori Pertanyaan": "Question Category",
    "Lainnya": "Others",
    "Subjek": "Subject",
    "cth. Pengajuan pinjaman tertahan di status verifikasi": "e.g. Loan application stuck at verification status",
    "Pesan": "Message",
    "Jelaskan kendala atau pertanyaan Anda secara detail…": "Describe your issue or question in detail…",
    "Lampirkan tangkapan layar atau dokumen pendukung (maks 5 MB).": "Attach screenshots or supporting documents (max 5 MB).",
    "Pilih File": "Choose File",
    "Saya menyetujui kebijakan privasi data internal OJK.": "I agree to OJK's internal data privacy policy.",
    "Batal": "Cancel",
    "Kirim Pesan": "Send Message",
    "Kantor Pusat OJK": "OJK Headquarters",
    "Gedung Soemitro Djojohadikusumo": "Soemitro Djojohadikusumo Building",
    "Buka di Google Maps": "Open in Google Maps",
    "Perwakilan Unit Kerja": "Work Unit Representatives",
    "Hubungi PIC unit kerja terdekat.": "Contact the nearest work unit PIC.",
    "PIC Remunerasi · DK SDM": "Remuneration PIC · HR DK",
    "PIC Pinjaman · Kopejka": "Loan PIC · Kopejka",
    "PIC Pajak · Bag. Keuangan": "Tax PIC · Finance Div.",

    /* ── Laporan ── */
    "Slip gaji, rekapitulasi penghasilan, dan formulir pajak.": "Pay slips, income summary, and tax forms.",
    "Tahun Pajak 2025": "Tax Year 2025",
    "Formulir Pajak": "Tax Forms",
    "Riwayat Unduh": "Download History",
    "Pilih periode bulan untuk mengunduh slip gaji.": "Select a month period to download the pay slip.",
    "Tampilkan": "Show",
    "Salary Slip (English)": "Salary Slip (English)",
    "Formulir 1721-VIII": "Form 1721-VIII",
    "Slip Gaji 6 Bulan Terakhir": "Last 6 Months Pay Slip",
    "Riwayat unduh slip gaji periode sebelumnya.": "Pay slip download history for previous periods.",
    "Maret 2026": "March 2026",
    "Februari 2026": "February 2026",
    "Januari 2026": "January 2026",
    "Desember 2025": "December 2025",
    "November 2025": "November 2025",
    "Oktober 2025": "October 2025",
    "Rekapitulasi Penghasilan & Per Komponen": "Income Summary & By Component",
    "Ringkasan tahunan dan formulir pajak.": "Annual summary and tax forms.",
    "Penghasilan Bruto": "Gross Income",
    "PENGHASILAN BRUTO": "GROSS INCOME",
    "Pajak Disetor": "Tax Paid",
    "PAJAK DISETOR": "TAX PAID",
    "Net Take-Home": "Net Take-Home",
    "NET TAKE-HOME": "NET TAKE-HOME",
    "Setelah semua potongan": "After all deductions",
    "Status SPT": "Tax Return Status",
    "STATUS SPT": "TAX RETURN STATUS",
    "Lapor": "Filed",
    "Komponen": "Component",
    "Jumlah Bruto (Rp)": "Gross Amount (Rp)",
    "Pajak (Rp)": "Tax (Rp)",
    "Net (Rp)": "Net (Rp)",
    "Persentase": "Percentage",
    "Gaji Pokok": "Base Salary",
    "Tunjangan Jabatan": "Position Allowance",
    "Tunjangan Kinerja": "Performance Allowance",
    "IPI 2025": "IPI 2025",
    "THR & Bonus": "THR & Bonus",
    "Bukti potong dan formulir terkait pelaporan SPT Tahunan.": "Withholding receipts and forms related to Annual Tax Return filing.",
    "Petunjuk Pelaporan SPT.": "Tax Return Filing Guide.",
    "Formulir 1721-A1 wajib digunakan saat pelaporan SPT Tahunan paling lambat 31 Maret tahun berikutnya melalui Coretax.": "Form 1721-A1 must be used for Annual Tax Return filing no later than March 31 of the following year via Coretax.",
    "Formulir 1721-A1": "Form 1721-A1",
    "Bukti Potong PPh 21": "PPh 21 Withholding Receipt",
    "Tata Cara Pelaporan SPT": "Tax Return Filing Procedure",
    "Panduan 2025": "Guide 2025",
    "Status Pelaporan SPT Tahunan": "Annual Tax Return Filing Status",
    "Riwayat 3 tahun terakhir": "Last 3 years history",
    "Tanggal Lapor": "Filing Date",
    "TANGGAL LAPOR": "FILING DATE",
    "No. BPE": "Receipt No.",
    "NO. BPE": "RECEIPT NO.",
    "Total Unduhan": "Total Downloads",
    "TOTAL UNDUHAN": "TOTAL DOWNLOADS",
    "30 hari terakhir": "Last 30 days",
    "Dokumen": "Document",
    "DOKUMEN": "DOCUMENT",
    "Total Ukuran": "Total Size",
    "TOTAL UKURAN": "TOTAL SIZE",
    "Akumulasi": "Accumulated",
    "Semua dokumen yang pernah Anda unduh.": "All documents you have ever downloaded.",
    "Cari dokumen...": "Search documents...",
    "Kategori": "Category",
    "KATEGORI": "CATEGORY",
    "Periode": "Period",
    "PERIODE": "PERIOD",
    "Tanggal Unduh": "Download Date",
    "TANGGAL UNDUH": "DOWNLOAD DATE",
    "Ukuran": "Size",
    "UKURAN": "SIZE",
    "Unduh ulang": "Re-download",
    "Tidak ada riwayat unduh yang sesuai pencarian.": "No download history matches the search.",

    /* ── Pinjaman ── */
    "Riwayat pengajuan dan status pinjaman aktif Anda.": "Your application history and active loan status.",
    "Ekspor": "Export",
    "Ajukan Pinjaman Baru": "Apply for New Loan",
    "Total Plafon Disetujui": "Total Approved Limit",
    "TOTAL PLAFON DISETUJUI": "TOTAL APPROVED LIMIT",
    "2 fasilitas aktif": "2 active facilities",
    "Sisa Pokok Pinjaman": "Loan Principal Remaining",
    "SISA POKOK PINJAMAN": "LOAN PRINCIPAL REMAINING",
    "63.5% dari plafon": "63.5% of limit",
    "Cicilan Bulan Ini": "This Month's Installment",
    "CICILAN BULAN INI": "THIS MONTH'S INSTALLMENT",
    "Jatuh tempo 25 Apr": "Due April 25",
    "Pengajuan Diproses": "Applications in Process",
    "PENGAJUAN DIPROSES": "APPLICATIONS IN PROCESS",
    "Estimasi 3 hari kerja": "Estimated 3 working days",
    "FILTER": "FILTER",
    "Tgl Buka": "Open Date",
    "Tgl Tutup": "Close Date",
    "Tgl. Buka": "Open Date",
    "Tgl. Tutup": "Close Date",
    "TGL. BUKA": "OPEN DATE",
    "TGL. TUTUP": "CLOSE DATE",
    "Reset": "Reset",
    "Cari ID atau keterangan…": "Search ID or description…",
    "ID Pengajuan": "Application ID",
    "ID PENGAJUAN": "APPLICATION ID",
    "Bank": "Bank",
    "Plafon": "Limit",
    "PLAFON": "LIMIT",
    "Status Pengajuan": "Application Status",
    "STATUS PENGAJUAN": "APPLICATION STATUS",
    "Aksi": "Action",
    "AKSI": "ACTION",
    "KATEGORI": "CATEGORY",
    "STATUS": "STATUS",
    "BANK": "BANK",
    "Disetujui": "Approved",
    "Diproses": "Processing",
    "Lunas": "Paid Off",
    "Ditolak": "Rejected",
    "Sedang Berjalan": "Ongoing",
    "Selesai": "Completed",
    "Verifikasi": "Verification",
    "Pendidikan": "Education",
    "Kendaraan": "Vehicle",
    "Tidak ada pengajuan cocok.": "No matching applications.",
    "Menampilkan": "Showing",
    "dari": "of",
    "pengajuan": "applications",
    "Hide": "Hide",
    "Show": "Show",
    "Sembunyikan": "Hide",

    /* ── Misc ── */
    "Ya": "Yes",
    "Tidak": "No",
    "Cari": "Search",
    "Simpan": "Save",
    "Hapus": "Delete",
    "Edit": "Edit",
    "Tutup": "Close",
    "Lihat Semua": "View All",
    "Selengkapnya": "More",
    "Refresh": "Refresh",
  };

  const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"]);
  const ATTRS = ["placeholder", "title", "alt", "aria-label"];

  /* WeakMap stores original text for each text node we've translated.
     This lets us restore exact source on toggle back to ID. */
  const textOriginals = new WeakMap();
  /* Per-element original attribute values. Map key: `${attr}` per element. */
  const attrOriginals = new WeakMap();

  let currentLang = "ID";
  try {
    const saved = localStorage.getItem("ojkLang");
    if (saved === "EN" || saved === "ID") currentLang = saved;
  } catch (e) {}

  function lookupTranslation(text) {
    if (!text) return null;
    const trimmed = text.trim();
    if (!trimmed || !DICT[trimmed]) return null;
    return text.replace(trimmed, DICT[trimmed]);
  }

  function processTextNode(node, lang) {
    const parent = node.parentNode;
    if (!parent || SKIP_TAGS.has(parent.tagName)) return;

    if (lang === "EN") {
      const current = node.nodeValue;
      const translated = lookupTranslation(current);
      if (translated && translated !== current) {
        if (!textOriginals.has(node)) textOriginals.set(node, current);
        node.nodeValue = translated;
      }
    } else {
      /* lang === "ID": restore original if we recorded one */
      if (textOriginals.has(node)) {
        const original = textOriginals.get(node);
        if (node.nodeValue !== original) {
          node.nodeValue = original;
        }
      }
    }
  }

  function processAttrs(el, lang) {
    let map = attrOriginals.get(el);
    if (lang === "EN") {
      ATTRS.forEach(attr => {
        const v = el.getAttribute(attr);
        if (!v) return;
        const translated = lookupTranslation(v);
        if (translated && translated !== v) {
          if (!map) { map = {}; attrOriginals.set(el, map); }
          if (!(attr in map)) map[attr] = v;
          el.setAttribute(attr, translated);
        }
      });
    } else if (map) {
      ATTRS.forEach(attr => {
        if (attr in map) {
          el.setAttribute(attr, map[attr]);
        }
      });
    }
  }

  function walkAndApply(root, lang) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(node => processTextNode(node, lang));

    const all = root.querySelectorAll("*");
    all.forEach(el => processAttrs(el, lang));
  }

  let observer = null;
  let scheduled = false;

  function applyToDocument() {
    const root = document.getElementById("root");
    if (!root) return;
    /* Detach observer while we mutate so our own changes don't re-trigger us */
    if (observer) observer.disconnect();
    walkAndApply(root, currentLang);
    if (observer) observer.observe(root, { childList: true, subtree: true, characterData: true });
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyToDocument();
    });
  }

  function startObserver() {
    if (observer) return;
    const root = document.getElementById("root");
    if (!root) {
      setTimeout(startObserver, 50);
      return;
    }
    observer = new MutationObserver(() => { schedule(); });
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    applyToDocument();
  }

  function setLanguage(lang) {
    if (lang !== "EN" && lang !== "ID") return;
    if (lang === currentLang) return;
    currentLang = lang;
    try { localStorage.setItem("ojkLang", lang); } catch (e) {}
    applyToDocument();
    /* Notify subscribers (TopBar) so it can re-render the badge */
    window.dispatchEvent(new CustomEvent("ojkLangChange", { detail: { lang } }));
  }

  function getLanguage() { return currentLang; }

  window.OJKi18n = { setLanguage, getLanguage, applyToDocument, startObserver };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startObserver);
  } else {
    startObserver();
  }
})();
