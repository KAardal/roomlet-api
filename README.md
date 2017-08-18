# Roomlet API

![Roomlet](./roomlet.png)



# Getting Started

# NodeJS installation

## NodeJS for Mac OS

### Use brew to install nodeJS locally

##### 1. Install brew... please visit the brew homepage...
  [Brew Homepage](https://brew.sh/)

##### 2. Install NodeJS using brew with one command...
```
brew install node
```

#### Refer to Mac OS section of NodeJS documentation for further reference !

[NodeJS documentation](https://nodejs.org/en/download/package-manager/)

## NodeJS for Windows

##### 1. Install chocolatey... please visit the brew homepage...
  [chocolatey Homepage](https://chocolatey.org/)

## 1. Install NodeJS using Chocolatey with several commands...
```
cinst nodejs
# or for full install with npm
cinst nodejs.install
```
#### Refer to Windows section of NodeJS documentation for further reference !

[NodeJS documentation](https://nodejs.org/en/download/package-manager/)


## NodeJS for Debian, Ubuntu, Linux Mint

```
sudo apt-get install nodejs npm
```

#### Refer to Windows section of NodeJS documentation for further reference !

[NodeJS documentation](https://nodejs.org/en/download/package-manager/)


# Yarn installation

### Refer to Yarn documentation specific to Mac OS, Windows, Linux, and other alternatives !

[Yarn Homepage](https://yarnpkg.com/lang/en/docs/install/#mac-tab)

## Install Mongo DB

### Refer to Mongo DB documentation specific to Mac OS, Windows, Linux, and other alternatives !

[Mongo DB Homepage Installation Page](https://docs.mongodb.com/manual/administration/install-community/)

# Roomlet repository specific instructions (FRONT END SETUP)
Setting up the Roomlet Repository in local file directory

### 1. Clone the repository to local file directory
### 2. cd into the root level of the repository
### 3. Enter in the following command to initialize yarn and install node_modules
```
yarn install
```
### 4. Create a .env file in the root directory of the repository, containging the following information..
```
AUTH0_CLIENT_ID=''
AUTH0_CLIENT_DOMAIN='username.auth0.com'
NODE_ENV='dev'
AUTH0_API_TOKEN=''
```

### 5. To view the repository in the browser, enter the following command in the root directory of the repository.
```
yarn watch
```
### The repository is running on port 8080 (http://localhost:8080)

# Roomlet-api repository specific instructions (BACKEND API SETUP)
Setting up the Roomlet-Api Repository in local file directory

### 1. Clone the repository to local file directory
### 2. cd into the root level of the repository
### 3. Enter in the following command to initialize yarn and install node_modules
```
yarn install
```
### 4. Create a .env file in the root directory of the repository, containing the following information..
```
PORT=3000
CORS_ORIGINS: 'http://localhost:8080'
API_URL='http://localhost:3000'
MONGODB_URI='mongodb://localhost/dev'
```


### 5. To turn on the Mongo Database for this repository, run the following command in the root directory of the API repository
```
yarn run mongo-on
```


# Special Notes...
## In command prompt, open TWO windows, and follow along with specific instructions to both the Roomlet Repository and Roomlet-Api Repository. Both webpack must be compiled, as well as the Mongo Database must be running in order for the Website to achieve 100% functionality.


# Team

Kyle Aardal

Stephanie Dover

Joshua Evans

Michael Axelson
