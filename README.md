# Documentation of Introcept task

This is a laravel project for recording a client informations like name, gender, date of birth and other details in a csv file and displaying all of them. I will break down the steps i have performed and the technology used below:

## Run this application on new device we can just clone this repository and use it easily.
Steps Involved are:

### Step 1:
```bash
git clone https://github.com/bipin2014/Introcept-task.git
```
- This command will download all the files, branch of server to local system

### Step 2: On the rooy of project run:
```bash
composer install
```
- This will install all the dependency or packages required for this application used in `composer.json`.

### Step 3: 
```bash
php artisan serve
```
- This will run application on `http://localhost:8000/`

### Step 4:
```bash
cd clients
npm install or yarn install or yarn
```
- This command will change directory to clients and install dependency from `package.json`

### Step 5:
You need to create .env file and add 
```bash
REACT_APP_API_BASE_URL = http://localhost:8000/api
```

### Step 6:
```bash
npm start or yarn start
```
- This will run frontend of the app in `http://localhost:3000/`


## Task Performed in Laravel

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
- In this class i have tested both api endpoints
  * For GET method check if the status code is 200.
  * For POST method different test is created like sucess,and different condition of failure.

## Code Formating
As recommended on the task i have used a PSR-2 format for coding and have edited the `styleci.yml` file. Laravel in default use laravel preset which is mostly similar to PSR-2 format.
```bash
preset: psr2
```

## Adding file to Git
Git is a versioning tool. It can be very usefull for software development because software are upgraded frequently and its hard to manually keep record of software versions.
- We can use Git with tools like github, gitlab, bitbucket and save them so that if anything happens to our system then we can take running system from their.
So the steps involved in git are:
### Step 1:
```bash
git init
```
- This will initialize git in folder or repository, and generate .git folder which keeps tracks of all the activities like file  changes, staged the changes etc.

### Step 2:
```bash
git add .
```
- This will add all the files to the git or it staged all the changes.
- We can also specify the file names if we want to add specific files.

### Step 3:
```bash
git commit -m "Initail Commit"
```
- This will commit all the changes or save all the changes to a local repository.

### Step 4:
```bash
git remote add origin https://github.com/bipin2014/Introcept-task.git
```
- This will specify where the files will be saved on the internet, we can use https link or ssh but for ssh we need to add public key of our pc in the platform like github, gitlab

### Step 5:
```bash
git push origin master
```
- This command will upload all the commits to the server so other can also access them easily.


## Task Performed in React (frontend)

For the frontend i have used frontend with typescript. 
It gives us many packages or dependency on installation and others can be added.
```bash
        "axios": "^0.21.1",
        "moment": "^2.29.1",
        "react": "^17.0.1",
        "node-sass": "^4.0.0",
        "react-router-dom": "^5.2.0",
        "sass-loader": "^10.1.1",
        "typescript": "^4.1.2",
        "ts-jest": "25.4.0",
```

## axios
Axios is the library used to make a http request using GET,POST,PUT, DELETE methods from frontend to backend api.
alternate of this if js fetch but this librabry can make request fast and easy to use. I have used axios to get all clients from backend and add client.

## moment
Moment is a js time formating framework where we can firmat time as we like. I have used this framework to format the dob.

## node-sass
This is a library that allows you to natively compile .scss files to css at incredible speed and automatically via a connect middleware.

## react-router-dom
Since react is a single page application it doesnot play with routes by default. SO to handle url and routes we have to use this librabry.

## sass-loader
This is also another librabry which helps to load a Sass/SCSS file and compiles it to CSS. node-sass should be use with it.

## typescript
As react use js as default language and i have built this app using typescript we need this package.

## ts-jest:
Jest is a javascript testing library it helps to test node, react, angular, vue, babel, typescript.

# Implementation
- I have built a table with pagination to show info of the client 
- Develop a modal to add new clinet.
- Write core scss.

# Wercker
It is a Docker-based continuous delivery platform that helps software developers build and deploy their applications.
i have added `wercker.yml` file in root of the project and when ever it is pushed to github.
- It will automatically build the application
- run unit test 
- host the application to heroku, i have connected heroku and wercker link is <a href="https://introcept-task100.herokuapp.com/" target="_blank">`https://introcept-task100.herokuapp.com/`</a> . 
We can create differnt stages where different operation can be performed like i have made `dev`, `build`, `deploy`, and differnt stages do differnt operation.









