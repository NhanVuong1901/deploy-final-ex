import { Link, useForm } from "@inertiajs/react";

export default function Edit({ reservation }: { reservation: any }) {
  const { data, setData, put, processing, errors } = useForm({
    customer_name: reservation.customer_name,
    phone: reservation.phone,
    party_size: reservation.party_size,
    reserved_at: reservation.reserved_at?.replace(" ", "T"), // convert to datetime-local format
    status: reservation.status,
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    put(`/reservations/${reservation.id}`);
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Edit Reservation</h1>

      <form onSubmit={submit} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1 font-medium">Customer Name</label>
          <input
            className="border p-2 w-full"
            value={data.customer_name}
            onChange={(e) => setData("customer_name", e.target.value)}
          />
          {errors.customer_name && <div className="text-red-600 text-sm">{errors.customer_name}</div>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            className="border p-2 w-full"
            value={data.phone}
            onChange={(e) => setData("phone", e.target.value)}
          />
          {errors.phone && <div className="text-red-600 text-sm">{errors.phone}</div>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Party Size</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={data.party_size}
            onChange={(e) => setData("party_size", Number(e.target.value))}
          />
          {errors.party_size && <div className="text-red-600 text-sm">{errors.party_size}</div>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Reserved At</label>
          <input
            type="datetime-local"
            className="border p-2 w-full"
            value={data.reserved_at}
            onChange={(e) => setData("reserved_at", e.target.value)}
          />
          {errors.reserved_at && <div className="text-red-600 text-sm">{errors.reserved_at}</div>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            className="border p-2 w-full"
            value={data.status}
            onChange={(e) => setData("status", e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="seated">Seated</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        <button disabled={processing} className="bg-blue-600 px-4 py-2 text-white">
          Update
        </button>

        <Link href="/reservations" className="text-blue-600 ml-4">
          Cancel
        </Link>
      </form>
    </div>
  );
}
