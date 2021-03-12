# Documentation of Introcept task

This is a laravel project for recording a client informations like name, gender, date of birth and other details in a csv file and displaying all of them. I will break down the steps i have performed and the technology used below:

1. At first new latest laravel project is installed from `composer`.
2. Then i have started to plan about the routes of the application, cleared the unused and default routes in `routes/web.php`.
3. Created a `Client` model and `ClientController` resource class.
4. Used the `ClientController` in `routes/api.php` for route:
  ```bash
  Route::apiResource('clients', ClientController::class);
  ```  
5. `Route::apiResource` provides less endpoints than resource, and are suitable in our case too.

| Domain | Method    | URI                  | Name            | Action                                        | Middleware |
|--------|-----------|----------------------|-----------------|-----------------------------------------------|------------|
|        | GET,HEAD  | api/clients          | clients.index   | App\Http\Controllers\ClientController@index   | api        |
|        | POST      | api/clients          | clients.store   | App\Http\Controllers\ClientController@store   | api        |
|        | GET,HEAD  | api/clients/{client} | clients.show    | App\Http\Controllers\ClientController@show    | api        |
|        | PUT,PATCH | api/clients/{client} | clients.update  | App\Http\Controllers\ClientController@update  | api        |
|        | DELETE    | api/clients/{client} | clients.destroy | App\Http\Controllers\ClientController@destroy | api        |

6. I have only foucus on store and index method to create the client details and to retrieve back the data of the csv file.
7. So in  our `api/clients` `GET` method endpoint , i have used php function `fopen` to open the file in read mode and if the file is not avaiable we have created one and added a column header in it.
  - Code to open file in read mode
  ```bash
  $file = fopen($path, "r");
  ``` 
  - Code to create a file if not available and added header in it.
  ```bash
  $file = fopen($path, 'w');
  $column=array('Name', 'Gender', 'Phone', 'Email', 'Address','Nationality','Dob','Education Background','Contact Mode');
  // save the column headers
  fputcsv($file, $column);
  fclose($file);
  ``` 
  `fopen`,`fputcsv`,`fclose` is a function given us by php so no other library is needed.


8. And in our `api/clients` `POST` method endpoint, i have created a `FormRequest` class called `ClientRequest` where all the validation parameter are placed in `rules` function like this:
```bash
public function rules()
    {
        return [
            'name' => 'required|min:3|max:50',
            'gender' => 'required',
            'phone' => 'required|digits:10',
            'email' => 'required|email',
            'address' => 'required|min:5',
            'nationality' => 'required',
            'dob' => 'required|date',
            'education_background' => 'required',
            'contact_mode' => 'required',
        ];
    }
```
- And if validation is failed it will return custum message with `422` status code.
- And if data are valid then we append the array data at the end of csv file by:
```bash
        $file = fopen($path, 'a');
        fputcsv($file, $dataarray);
        fclose($file);
```

9. So i put the other method `destroy`, `update`, `show` empty so that it can be used later to update or delete.

## Testing the application
So i have created a test case for this app to check if the functionality is working correctly or not.
Laravel provides us with default `test` folder which contains `Feature`  and `Unit` folders and we can run test using `phpunit`, all the configuration is done for us by laravel.

- In `Unit` folder unit test are written and specific methods or function is tested.
- In `Feature ` folder feature can be tested like the api can be call or differnt Http request can be sent and test the functionality.

### We can test our application by runnining this command in terminal:
```bash
php artisan test
```

1. So i created a test class called `ClientTest.php` under Feature folder.





