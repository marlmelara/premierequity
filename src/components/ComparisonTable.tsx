const rows = [
  { feature: "Commissions / Fees", realtor: "3-6% Commission, Plus Brokerage Fees", us: "No Fees" },
  { feature: "Closing Costs", realtor: "$800-$1,800 Paid by The Seller", us: "No Costs, We Cover Everything" },
  { feature: "Average Days Until Sold", realtor: "+/- 151 Days", us: "1 Day" },
  { feature: "Closing Date", realtor: "30-60 Days After Accepting an Offer", us: "Within 30 Days" },
  { feature: "Time Invested", realtor: "Could Be Months or Even Years", us: "Only a Few Days" },
];

const exampleRows = [
  { feature: "Starting Price", realtor: "$61,999", us: "$50,000" },
  { feature: "Negotiation", realtor: "$54,000", us: "$50,000" },
  { feature: "Realtor Fees", realtor: "-$4,440", us: "$0" },
  { feature: "Closing Costs", realtor: "-$1,500", us: "$0" },
  { feature: "Time to Receive Cash", realtor: "180 Days", us: "28 Days" },
  { feature: "Net Cash To You!", realtor: "$48,060", us: "$50,000" },
];

export function ComparisonTable() {
  return (
    <section id="why-us" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-neutral-900 text-center">
          Why Choose Us?
        </h2>

        <div className="mt-12 overflow-x-auto rounded-2xl border border-neutral-200">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-forest text-white">
                <th className="px-6 py-4 font-heading font-semibold">Feature</th>
                <th className="px-6 py-4 font-heading font-semibold">Listing with Realtor</th>
                <th className="px-6 py-4 font-heading font-semibold">Selling to Us</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.feature} className={i % 2 ? "bg-cream" : "bg-white"}>
                  <td className="px-6 py-4 font-medium text-neutral-900">{row.feature}</td>
                  <td className="px-6 py-4 text-neutral-600">{row.realtor}</td>
                  <td className="px-6 py-4 font-semibold text-olive">{row.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-neutral-200">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-forest text-white">
                <th className="px-6 py-4 font-heading font-semibold">Example</th>
                <th className="px-6 py-4 font-heading font-semibold">Listing with Realtor</th>
                <th className="px-6 py-4 font-heading font-semibold">Selling to Us</th>
              </tr>
            </thead>
            <tbody>
              {exampleRows.map((row, i) => (
                <tr key={row.feature} className={i % 2 ? "bg-cream" : "bg-white"}>
                  <td className="px-6 py-4 font-medium text-neutral-900">{row.feature}</td>
                  <td className="px-6 py-4 text-neutral-600">{row.realtor}</td>
                  <td className="px-6 py-4 font-semibold text-olive">{row.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
