# Shared Typescript Library

## Usage

When you did any changes to this library a new package needs to be created and the consuming components needs to be updated.

Please run the code below to perform a package update:

``` sh
# Install dependencies 
yarn

# Perform update
# It's recommended to stop all docker containers when doing the update
yarn deploy:patch
```
