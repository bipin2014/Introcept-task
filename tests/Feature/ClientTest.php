<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ClientTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_get_clients()
    {
        $response = $this->get('/api/clients');

        $response->assertOk();
    }

    public function test_post_clients_success()
    {
        $response = $this->post('/api/clients',[
            "name"=>"Test Client",
            "gender"=>"Male",
            "phone"=>9865321456,
            "email"=>"abc@gmail.com",
            "address"=>"Kathmandu",
            "nationality"=>"Nepali",
            "dob"=>"2050/01/20",
            "education_background"=>"BIM",
            "contact_mode"=>"phone"
        ]);

        $response->assertOk()->assertJson(['message'=>"Data added sucessfull to csv file"]);
    }

    public function test_post_clients_name_empty()
    {
        $response = $this->post('/api/clients',[
            "gender"=>"Male",
            "phone"=>9865321456,
            "email"=>"abc@gmail.com",
            "address"=>"Kathmandu",
            "nationality"=>"Nepali",
            "dob"=>"2050/01/20",
            "education_background"=>"BIM",
            "contact_mode"=>"phone"
        ],['Accept' => 'application/json']);
        $response->assertStatus(422)->assertJsonValidationErrors('name');
    }

    public function test_post_clients_name_length_less_than_three()
    {
        $response = $this->post('/api/clients',[
            "name"=>"a",
            "gender"=>"Male",
            "phone"=>9865321456,
            "email"=>"abc@gmail.com",
            "address"=>"Kathmandu",
            "nationality"=>"Nepali",
            "dob"=>"2050/01/20",
            "education_background"=>"BIM",
            "contact_mode"=>"phone"
        ],['Accept' => 'application/json']);
        // dd($response);

        $response->assertStatus(422)->assertJsonValidationErrors('name');
    }

    public function test_post_clients_phone_non_numeric()
    {
        $response = $this->post('/api/clients',[
            "name"=>"Ramesh",
            "gender"=>"Male",
            "phone"=>"9865sd3214",
            "email"=>"abc@gmail.com",
            "address"=>"Kathmandu",
            "nationality"=>"Nepali",
            "dob"=>"2050/01/20",
            "education_background"=>"BIM",
            "contact_mode"=>"phone"
        ],['Accept' => 'application/json']);

        $response->assertStatus(422)->assertJsonValidationErrors('phone');
    }

    public function test_post_clients_phone_length_not_ten()
    {
        $response = $this->post('/api/clients',[
            "name"=>"Ramesh",
            "gender"=>"Male",
            "phone"=>"986532145689",
            "email"=>"abc@gmail.com",
            "address"=>"Kathmandu",
            "nationality"=>"Nepali",
            "dob"=>"2050/01/20",
            "education_background"=>"BIM",
            "contact_mode"=>"phone"
        ],['Accept' => 'application/json']);

        $response->assertStatus(422)->assertJsonValidationErrors('phone');
    }

    public function test_post_clients_dob_not_date()
    {
        $response = $this->post('/api/clients',[
            "name"=>"Ramesh",
            "gender"=>"Male",
            "phone"=>"9865472358",
            "email"=>"abc@gmail.com",
            "address"=>"Kathmandu",
            "nationality"=>"Nepali",
            "dob"=>"hello",
            "education_background"=>"BIM",
            "contact_mode"=>"phone"
        ],['Accept' => 'application/json']);

        $response->assertStatus(422)->assertJsonValidationErrors('dob');
    }

    public function test_post_clients_all_value_empty()
    {
        $response = $this->post('/api/clients',[],['Accept' => 'application/json']);

        $response->assertStatus(422)->assertJsonValidationErrors(['name','gender','phone','email','address','nationality','dob','education_background','contact_mode']);
    }
}
