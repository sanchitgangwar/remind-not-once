# (Remind)+

Add events, with associated to-do tasks, to Google Calendar with custom reminders.

## Uses

 - [React v15](https://facebook.github.io/react/)
 - [React-router v4](https://reacttraining.com/react-router/)
 - [Material UI v1](http://www.material-ui.com/)
 - [Webpack v3](https://webpack.github.io/)

## Setting up

Make sure that you've [`npm`](https://www.npmjs.com) installed on your computer before proceeding.

### Build client code

 - Production build

```
npm run build
```


 - Development mode with hot-reload. This also starts the server on `localhost:3000`

```
npm run hot
```

### Build server code

```
npm run dev-server
```

### Start server

```
npm run start
```

## Details

(Remind)+ uses Google calendar to store events. Each event contains multiple tasks which are stored in the event's description in Google calendar in a special format which is understood by (Remind)+.

The tasks can be marked as completed and incomplete using the UI.

## To-do

 - Server-side rendering using `react-loadable`
