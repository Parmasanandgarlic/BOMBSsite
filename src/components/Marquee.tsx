export function Marquee() {
  const text = "B.O.M.B.S WORLDWIDE // BACK ON MY BULLSHIT // SYNDICATE DROPS // JOIN THE MOVEMENT // ";
  
  return (
    <div className="bg-black text-white py-3 overflow-hidden border-y-4 border-white" aria-hidden="true">
      <div className="flex whitespace-nowrap marquee-track" style={{ width: 'max-content' }}>
        <span className="text-sm md:text-base font-black italic uppercase tracking-widest">{text}</span>
        <span className="text-sm md:text-base font-black italic uppercase tracking-widest">{text}</span>
        <span className="text-sm md:text-base font-black italic uppercase tracking-widest">{text}</span>
        <span className="text-sm md:text-base font-black italic uppercase tracking-widest">{text}</span>
        <span className="text-sm md:text-base font-black italic uppercase tracking-widest">{text}</span>
        <span className="text-sm md:text-base font-black italic uppercase tracking-widest">{text}</span>
      </div>
    </div>
  );
}
