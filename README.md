## WT - Project

#### Get Started (with docker container)

1. get [docker](https://www.docker.com/) <-- download available on their webside

2. copy and rename the file **config/default.json.const** to **config/default.json** and enter your websettings or use the example config that is already in the folder

3. enter the following command in the project folder
    ```sh
        $ docker-compose up
    ```

#### Get Started (local)

1. get [node.js](https://nodejs.org/en/) <-- click for more information on how to obtain it

2. get [mongodb](https://www.mongodb.com/) <-- click for more information on how to obtain it

3. open the repository folder in IDEA WebStorm/PHPStorm or run the following command in the repository folder to install all packages from the package.json file
    ```sh
        $ npm install
    ```

4. copy and rename the file **config/default.json.const** to **config/default.json** and enter your websettings

5. check the mongodb.connectionstring in **config/default.json** because the local mongo service runs on localhost (127.0.0.1) not on a docker container called "mongo"

6. look up whether mongodb service is running or not / start mondodb service
    ```sh
        $ mongod
    ```

7. Start the webserver on localhost
    ```sh
        $ npm start
    ```