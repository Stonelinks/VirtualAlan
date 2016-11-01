
## Virtual Alan

Based on [start-react/native-starter-kit](https://github.com/start-react/native-starter-kit)

## Get Started

###1. System Requirements

* Globally installed [node](https://nodejs.org/en/) >= 4.0

* Globally installed [npm](https://www.npmjs.org/) >= 3.0

* Globally installed [rnpm](https://github.com/rnpm/rnpm) *(only if React Native version < 0.29)*

* Globally installed [react-native CLI](https://facebook.github.io/react-native/docs/getting-started.html)

###2. Installation

A few set of commands, and you are ready to get going.

```
git clone git@github.com:Stonelinks/native-starter-kit.git

cd react-native-native-base-seed

npm install

react-native upgrade

react-native android
```
If React Native < 0.29

```sh
$rnpm link
```

If React Native >= 0.29

```sh
$ react-native link
```

While running `react-native android` do not overwrite `index.android.js` file.


###3. Simulate for iOS

**Method One**

*	Open the project in XCode from **ios/ReactNativeNativeBaseSeed.xcodeproj**

*	Hit the play button.


**Method Two**

*	Run the following command in your terminal

```sh
$ react-native run-ios
```

###4. Simulate for Android

*	Make sure you have an **Android emulator** installed and running.

*	Run the following command in your terminal

```sh
$ react-native run-android
```

Note: If you are building for first time on your system, please follow Method One to simulate on iOS.
