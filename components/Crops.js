import currency from 'currency.js';

export default function Crops({ headerText, crops, buyButton }) {
  return (
    <section className="antialiased bg-gray-100 text-gray-600">
      <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800 inline-block">
            {headerText}
          </h2>
        </header>
        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Harvested</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Type</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Cost</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Weight</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Planted</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Pesticides</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">
                      Special Treatments
                    </div>
                  </th>
                  {buyButton && <th className="p-2 whitespace-nowrap"></th>}
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {crops.map((crop, idx) => (
                  <tr key={idx}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{crop.dateHarvested}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{crop.type}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">
                        {currency(crop.cost).format()}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{crop.weight} kg</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{crop.datePlanted}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{crop.pesticides}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{crop.specialTreatments}</div>
                    </td>
                    {buyButton && (
                      <td className="p-2 whitespace-nowrap">
                        <button className="rounded-md px-4 py-1.5 text-xs font-md text-white shadow bg-green-600 cursor-not-allowed">
                          Buy
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
