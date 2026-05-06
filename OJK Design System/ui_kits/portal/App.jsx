const { useState } = React;

/* ── Shared Styles ── */
const css = {
  nav: { display:'flex', alignItems:'center', background:'var(--color-primary)', color:'#fff', padding:'0 24px', height:56, gap:24 },
  navBrand: { fontSize:17, fontWeight:700 },
  navLink: { fontSize:14, color:'rgba(255,255,255,0.85)', textDecoration:'none', cursor:'pointer' },
  navLinkActive: { fontSize:14, color:'#fff', textDecoration:'none', borderBottom:'2px solid #fff', paddingBottom:2, cursor:'pointer' },
  btn: { fontFamily:'var(--font-family)', fontSize:15, fontWeight:600, padding:'10px 24px', borderRadius:'var(--radius-md)', border:'none', cursor:'pointer', letterSpacing:'0.03em', display:'inline-flex', alignItems:'center', justifyContent:'center' },
  btnPrimary: { background:'var(--color-primary)', color:'#fff' },
  btnSecondary: { background:'var(--color-secondary)', color:'#fff' },
  btnOutline: { background:'transparent', color:'var(--color-primary)', border:'2px solid var(--color-primary)' },
  input: { fontFamily:'var(--font-family)', fontSize:14, padding:'10px 12px', border:'1.5px solid var(--neutral-300)', borderRadius:'var(--radius-md)', outline:'none', width:'100%' },
  card: { background:'#fff', border:'1px solid var(--neutral-200)', borderRadius:'var(--radius-lg)', padding:20 },
  badge: { display:'inline-flex', padding:'3px 10px', borderRadius:'var(--radius-full)', fontSize:11, fontWeight:600 },
};

/* ── Navbar ── */
function Navbar({ active, onNav }) {
  const links = ['Beranda','Regulasi','Pengawasan','Edukasi','Pengaduan'];
  return (
    <nav style={css.nav}>
      <img src="../../assets/OJK_Logo.png" alt="OJK" style={{height:28,marginRight:4,filter:'brightness(10)'}} />
      {links.map(l => (
        <a key={l} style={active===l ? css.navLinkActive : css.navLink} onClick={()=>onNav(l)}>{l}</a>
      ))}
      <div style={{flex:1}}></div>
      <button style={{...css.btn, fontSize:13, padding:'6px 16px', background:'rgba(255,255,255,0.15)', color:'#fff'}}>Masuk</button>
    </nav>
  );
}

/* ── Hero ── */
function Hero() {
  return (
    <div style={{background:'var(--color-primary)', color:'#fff', padding:'48px 40px'}}>
      <h1 style={{fontSize:'var(--text-h1)', fontWeight:700, lineHeight:1.2, marginBottom:12}}>Otoritas Jasa Keuangan</h1>
      <p style={{fontSize:16, lineHeight:1.6, maxWidth:600, opacity:0.9, marginBottom:24}}>
        Melindungi konsumen dan masyarakat melalui pengaturan dan pengawasan sektor jasa keuangan yang terintegrasi.
      </p>
      <div style={{display:'flex', gap:12}}>
        <button style={{...css.btn, background:'#fff', color:'var(--color-primary)'}}>Layanan Konsumen</button>
        <button style={{...css.btn, background:'transparent', color:'#fff', border:'2px solid rgba(255,255,255,0.5)'}}>Pelajari Lebih Lanjut</button>
      </div>
    </div>
  );
}

/* ── Stats Bar ── */
function StatsBar() {
  const stats = [
    { label:'Lembaga Diawasi', value:'2,847' },
    { label:'Pengaduan Ditangani', value:'156,432' },
    { label:'Regulasi Diterbitkan', value:'1,204' },
    { label:'Literasi Keuangan', value:'65.4%' },
  ];
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, background:'var(--neutral-200)'}}>
      {stats.map(s => (
        <div key={s.label} style={{background:'#fff', padding:'20px 24px', textAlign:'center'}}>
          <div style={{fontSize:28, fontWeight:700, color:'var(--color-primary)', marginBottom:4}}>{s.value}</div>
          <div style={{fontSize:13, color:'var(--neutral-600)'}}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ── Service Card ── */
function ServiceCard({ title, desc, badge }) {
  return (
    <div style={{...css.card, display:'flex', flexDirection:'column', gap:10}}>
      <span style={{...css.badge, background:'var(--primary-100)', color:'var(--primary-700)'}}>{badge}</span>
      <div style={{fontSize:17, fontWeight:700}}>{title}</div>
      <div style={{fontSize:13, color:'var(--neutral-600)', lineHeight:1.5}}>{desc}</div>
      <a style={{fontSize:13, fontWeight:600, color:'var(--color-primary)', textDecoration:'none', cursor:'pointer', marginTop:'auto'}}>Selengkapnya →</a>
    </div>
  );
}

/* ── Alert ── */
function Alert({ type, children }) {
  const map = {
    info: { bg:'var(--color-info-light)', color:'var(--color-info)', icon:'i' },
    warning: { bg:'var(--color-warning-light)', color:'var(--secondary-800)', icon:'!' },
  };
  const s = map[type] || map.info;
  return (
    <div style={{display:'flex', gap:10, padding:'12px 16px', borderRadius:'var(--radius-md)', background:s.bg, color:s.color, fontSize:13, lineHeight:1.5}}>
      <span style={{fontWeight:700, flexShrink:0}}>{s.icon}</span>{children}
    </div>
  );
}

/* ── Table ── */
function DataTable() {
  const rows = [
    { id:'REG-2026-041', title:'POJK Perlindungan Konsumen', status:'Berlaku', date:'12 Mar 2026' },
    { id:'REG-2026-039', title:'SE OJK Pelaporan IKNB', status:'Draft', date:'28 Feb 2026' },
    { id:'REG-2026-035', title:'POJK Tata Kelola Bank Umum', status:'Berlaku', date:'15 Jan 2026' },
  ];
  const statusColor = { Berlaku: { bg:'var(--color-success-light)', color:'var(--color-success)' }, Draft: { bg:'var(--secondary-100)', color:'var(--secondary-800)' } };
  return (
    <div style={{...css.card, padding:0, overflow:'hidden'}}>
      <table style={{width:'100%', borderCollapse:'collapse', fontSize:13}}>
        <thead>
          <tr style={{background:'var(--neutral-50)', textAlign:'left'}}>
            {['No. Regulasi','Judul','Status','Tanggal'].map(h => (
              <th key={h} style={{padding:'12px 16px', fontWeight:600, color:'var(--neutral-600)', borderBottom:'1px solid var(--neutral-200)'}}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} style={{borderBottom:'1px solid var(--neutral-100)'}}>
              <td style={{padding:'12px 16px', fontWeight:600, color:'var(--color-primary)'}}>{r.id}</td>
              <td style={{padding:'12px 16px'}}>{r.title}</td>
              <td style={{padding:'12px 16px'}}><span style={{...css.badge, ...(statusColor[r.status]||{})}}>{r.status}</span></td>
              <td style={{padding:'12px 16px', color:'var(--neutral-500)'}}>{r.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer style={{background:'var(--neutral-900)', color:'var(--neutral-400)', padding:'32px 40px', fontSize:13, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      <div><span style={{color:'#fff', fontWeight:700}}>OJK</span> — Otoritas Jasa Keuangan © 2026</div>
      <div style={{display:'flex', gap:20}}>
        <a style={{color:'var(--neutral-400)', textDecoration:'none'}}>Kebijakan Privasi</a>
        <a style={{color:'var(--neutral-400)', textDecoration:'none'}}>Syarat & Ketentuan</a>
        <a style={{color:'var(--neutral-400)', textDecoration:'none'}}>Hubungi Kami</a>
      </div>
    </footer>
  );
}

/* ── App ── */
function App() {
  const [page, setPage] = useState('Beranda');
  return (
    <div style={{minHeight:'100vh', display:'flex', flexDirection:'column'}}>
      <Navbar active={page} onNav={setPage} />
      <Hero />
      <StatsBar />
      <div style={{padding:'32px 40px', display:'flex', flexDirection:'column', gap:24, flex:1}}>
        <Alert type="info">Layanan pengaduan konsumen kini tersedia 24 jam melalui portal digital OJK.</Alert>
        <div>
          <h2 style={{fontSize:'var(--text-h3)', fontWeight:700, marginBottom:16}}>Layanan Utama</h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16}}>
            <ServiceCard badge="Perbankan" title="Pengawasan Perbankan" desc="Pengaturan dan pengawasan terhadap lembaga perbankan untuk menjaga stabilitas sistem keuangan." />
            <ServiceCard badge="Pasar Modal" title="Pasar Modal & Derivatif" desc="Pengawasan kegiatan di bidang pasar modal, termasuk pengelolaan investasi dan transaksi efek." />
            <ServiceCard badge="IKNB" title="Industri Keuangan Non-Bank" desc="Pengaturan lembaga pembiayaan, asuransi, dana pensiun, dan lembaga jasa keuangan lainnya." />
          </div>
        </div>
        <div>
          <h2 style={{fontSize:'var(--text-h3)', fontWeight:700, marginBottom:16}}>Regulasi Terbaru</h2>
          <DataTable />
        </div>
      </div>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
