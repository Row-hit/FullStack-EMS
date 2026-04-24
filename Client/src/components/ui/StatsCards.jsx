const StatsCards = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-10">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="group bg-white border border-slate-200 p-4 flex items-center justify-between shadow-sm hover:shadow-md transition rounded-lg border-l-4 border-l-slate-400 hover:border-l-indigo-400"
          >
            <div>
              <p className="text-sm text-slate-500">{card.title}</p>

              {/* optional subtitle */}
              {card.subtitle && (
                <p className="text-xs text-slate-400">{card.subtitle}</p>
              )}

              <h2 className="text-xl font-semibold text-slate-800 mt-1">
                {card.value}
              </h2>
            </div>

            <div className="p-3 rounded-lg bg-slate-100 text-slate-600 group-hover:text-indigo-600">
              <Icon size={22} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
