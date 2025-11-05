<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reservation;
use Faker\Factory as Faker;

class ReservationSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('vi_VN');

        $statuses = ['pending', 'confirmed', 'seated', 'canceled'];

        for ($i = 0; $i < 30; $i++) {
            Reservation::create([
                'customer_name' => $faker->name,
                'phone' => $faker->numerify('0#########'),
                'party_size' => $faker->numberBetween(1, 12),
                'reserved_at' => $faker->dateTimeBetween('now', '+10 days'),
                'status' => $faker->randomElement($statuses),
            ]);
        }
    }
}
