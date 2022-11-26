// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyCjrmskA8zLOHN8qTZaGd2V5kl7_5sx_2I',
    authDomain: 'auction-site-ebcee.firebaseapp.com',
    databaseURL:
      'https://auction-site-ebcee-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'auction-site-ebcee',
    storageBucket: 'auction-site-ebcee.appspot.com',
    messagingSenderId: '664179684848',
    appId: '1:664179684848:web:3642a9c21bb3f619d11935',
  },
  hubUrl: 'https://localhost:5001/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
