# FoodMood

### Table of contents
- [About](#about)
- [Requirements](#requirements)
- [Installation](#installation)
- [Launch](#launch)
- [API](#api)
- [Dockerfile](#dockerfile-installation)
- [Licence](#licence)

### About
Multiple recipes are available. User looks for one, with specific ingredients or with more filters available.

### Requirements
- NodeJS.
- MongoDB.

### Installation
At the project root, launch the commandline :
```npm i``` to install all the packages needed.

In the ```config.js``` file and put the corresponding URL to your Mongo base.

NB : make sure that mongod is launched well.

### Launch
At the project root, launch the commandline :
```npm run```

Then on your browser, go on ```https://localhost:3000```

### API :
* Spoonacular API : https://spoonacular.com/food-api
* Stripe : https://stripe.com/docs/api
  

### Dockerfile installation
Launch the command line : 
``` sudo docker build . ```

### Licence
This project is licensed under the [MIT licence](./LICENCE).