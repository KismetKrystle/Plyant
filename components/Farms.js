import currency from 'currency.js';

export default function Farms({ farms }) {
  return (
    <section className="antialiased bg-gray-100 text-gray-600 mb-8">
      <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800 inline-block">Farms</h2>
        </header>
        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Owner</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Farmer</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Address</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">
                      Annual Revenue
                    </div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Employees</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Property Size</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">
                      Vertical Grow Area
                    </div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">
                      Ground Grow Area
                    </div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Farm Type</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Certificates</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Crops</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {farms.map((farm, idx) => (
                  <tr key={idx}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{farm.name}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{farm.owner}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{farm.farmer}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{farm.address}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">
                        {currency(farm.annualRevenue).format()}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{farm.employees}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{farm.propertySize} sq ft</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">
                        {farm.verticalGrowArea} sq ft
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">
                        {farm.groundGrowArea} sq ft
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{farm.farmType}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">
                        {farm.certificates.join(', ')}
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">
                        {farm.crops.map((crop) => crop.name).join(', ')}
                      </div>
                    </td>
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
