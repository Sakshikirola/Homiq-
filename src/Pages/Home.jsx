
<section className="relative overflow-hidden bg-linear-to-br from-ink to-[#0a2a31] text-white">
  <Skyline />

  <div className="relative mx-auto grid min-h-[70vh] max-w-6xl items-center gap-10 px-4 py-12 sm:grid-cols-2 sm:py-14">

    <div className="relative z-10">
      <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-brass">
        Find your perfect place
      </p>

      <h1 className="max-w-xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
        A home you can check before you visit
      </h1>

      <p className="mt-5 max-w-lg text-base leading-relaxed text-white/80">
        Browse homes to buy or rent across Faridabad, Gurugram, Noida and five more cities. Every listing shows its full price and details.
      </p>

      <form onSubmit={search} className="mt-8 grid max-w-xl gap-3 rounded-2xl bg-white p-4 shadow-2xl sm:grid-cols-2">
        <select className={field} value={q.status} onChange={(e) => setQ({ ...q, status: e.target.value })} aria-label="Buy or rent">
          <option value="Sale">Buy</option>
          <option value="Rent">Rent</option>
        </select>

        <select className={field} value={q.city} onChange={(e) => setQ({ ...q, city: e.target.value })} aria-label="City">
          <option value="All">All cities</option>
          {cities.map((c) => <option key={c}>{c}</option>)}
        </select>

        <select className={field} value={q.type} onChange={(e) => setQ({ ...q, type: e.target.value })} aria-label="Property type">
          <option value="All">All types</option>
          {types.map((t) => <option key={t}>{t}</option>)}
        </select>

        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-brass px-4 py-3 text-sm font-bold text-ink transition hover:bg-[#d8a54f]">
          <Search size={16} /> Search homes
        </button>
      </form>
    </div>

    <div className="relative z-10 mx-auto w-full max-w-lg">
      <div className="aspect-4/3 overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl">
        <img src="" alt="Featured property" className="h-full w-full object-cover" />
      </div>
    </div>

  </div>
</section>
