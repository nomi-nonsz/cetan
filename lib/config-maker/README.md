# Config Maker

### It's just convert the config enviroment variable to javascript code and then injects it into the fire directory.

Since we host on vercel, it can only use sources from github. Configurations that contain
sensitive tokens are ignored on github. The only way to pass config to the app to be deployed
is to use enviroment variables in vercel.

To access the enviroment variable we use the `process` object, but because the firebase app initialization
is in vanilla javascript it makes the browser not recognize the it. [See the firebase file](../../src/firebase/index.js)

To solve this problem, we create a node script to get data from the enviroment variable and then convert it to a javascript object,
after that injecting the file into the firebase [directory which is stored as config.js](../../src/firebase/).
