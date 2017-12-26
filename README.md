## WT - Project

#### Get Started

1. get [node.js](https://nodejs.org/en/) <-- click for more information on how to obtain it

2. get [mongodb](https://www.mongodb.com/) <-- click for more information on how to obtain it

3. open the repository folder in IDEA WebStorm/PHPStorm or run the following command in the repository folder to install all packages from the package.json file
    ```sh
        $ npm install
    ```

4. copy and rename the file **config/default.json.const** to **config/default.json** and enter your websettings

5. look up whether mongodb service is running or not / start mondodb service
    ```sh
        $ mongod
    ```

6. Start the webserver on localhost
    ```sh
        $ npm start
    ```