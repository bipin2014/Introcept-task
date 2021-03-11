<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientRequest;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $path = $this->check_file_exists_and_return_path();
        $file = fopen($path, 'r');
        $all_data = [];
        while (($data = fgetcsv($file, 200, ',')) !== false) {
            $client = new Client();
            array_push($all_data, $client->array_to_object_array($data));
        }

        return response()->json([
            'data'=>$all_data,
        ]);
    }

    public function check_file_exists_and_return_path()
    {
        $file_name = 'clients_data.csv';
        $exists = Storage::disk('local')->exists($file_name);
        $path = Storage::path($file_name);
        //If file not exists create one
        if (! $exists) {
            $file = fopen($path, 'w');
            $column = ['Name', 'Gender', 'Phone', 'Email', 'Address', 'Nationality', 'Dob', 'Education Background', 'Contact Mode'];
            // save the column headers
            fputcsv($file, $column);
            fclose($file);
        }

        return $path;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ClientRequest $request)
    {
        //data is valid
        $path = $this->check_file_exists_and_return_path();
        //Store data to csv
        $this->append_to_file($path, $request->validated());

        return response()->json([
            'message' => 'Data added sucessfull to csv file',
        ]);
    }

    private function append_to_file($path, $dataarray)
    {
        $file = fopen($path, 'a');
        fputcsv($file, $dataarray);
        fclose($file);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function show(Client $client)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Client $client)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function destroy(Client $client)
    {
        //
    }
}
