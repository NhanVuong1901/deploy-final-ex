import { Link } from '@inertiajs/react';

export default function Index({ reservations, filters }) {
    return (
        <div className="p-6">
            <div className="mb-4 flex gap-3">
                <form className="flex gap-2" method="get">
                    <input name="search" placeholder="Search name..." defaultValue={filters.search} className="border p-1" />
                    <select name="status" defaultValue={filters.status} className="border p-1">
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="seated">Seated</option>
                        <option value="canceled">Canceled</option>
                    </select>
                    <button className="bg-blue-600 px-3 text-white">Filter</button>
                </form>

                <Link href="/reservations/create" className="bg-green-600 px-3 text-white">
                    New
                </Link>
            </div>

            <table className="min-w-full border border-gray-300 text-sm">
                <thead>
                    <tr>
                        <th className="w-50 border px-3 py-2 text-left">Name</th>
                        <th className="w-32 border px-3 py-2 text-center">Phone</th>
                        <th className="w-50 border px-3 py-2 text-center">Party</th>
                        <th className="w-56 border px-3 py-2 text-center">Reserved At</th>
                        <th className="w-28 border px-3 py-2 text-center">Status</th>
                        <th className="w-24 border px-3 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.data.map((r) => (
                        <tr key={r.id} className="hover:bg-gray-50">
                            <td className="px-3 py-2 border">{r.customer_name}</td>
                            <td className="px-3 py-2 border text-center">{r.phone}</td>
                            <td className="px-3 py-2 border text-center">{r.party_size}</td>
                            <td className="px-3 py-2 border text-center">{r.reserved_at}</td>
                            <td className="px-3 py-2 border text-center capitalize">{r.status}</td>
                            <td className="px-3 py-2 border text-center">
                                <Link href={`/reservations/${r.id}/edit`} className="text-blue-600">
                                    Edit
                                </Link>
                                <Link as="button" method="delete" href={`/reservations/${r.id}`} className="text-red-600">
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
