<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;
        $status = $request->status;

        $query = Reservation::query();

        if ($search) {
            $query->where('customer_name', 'like', "%$search%");
        }

        if ($status) {
            $query->where('status', $status);
        }

        $reservations = $query->orderBy('id', 'desc')->paginate(30);

        return Inertia::render('Reservations/Index', [
            'reservations' => $reservations,
            'filters' => $request->only(['search', 'status'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Reservations/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'customer_name' => 'required|string|max:100',
            'phone' => ['required', 'regex:/^\\+?\\d{8,15}$/'],
            'party_size' => 'required|integer|min:1|max:50',
            'reserved_at' => 'required|date|after_or_equal:now',
            'status' => 'required|in:pending,confirmed,seated,canceled'
        ]);

        Reservation::create($request->all());

        return redirect()->route('reservations.index')->with('success', 'Created Successfully');
    }

    public function edit(Reservation $reservation)
    {
        return Inertia::render('Reservations/Edit', [
            'reservation' => $reservation
        ]);
    }

    public function update(Request $request, Reservation $reservation)
    {
        $request->validate([
            'customer_name' => 'required|string|max:100',
            'phone' => ['required', 'regex:/^\\+?\\d{8,15}$/'],
            'party_size' => 'required|integer|min:1|max:50',
            'reserved_at' => 'required|date|after_or_equal:now',
            'status' => 'required|in:pending,confirmed,seated,canceled'
        ]);

        $reservation->update($request->all());

        return redirect()->route('reservations.index')->with('success', 'Updated Successfully');
    }

    public function destroy(Reservation $reservation)
    {
        $reservation->delete();
        return back()->with('success', 'Deleted Successfully');
    }
}
