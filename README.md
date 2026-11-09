# IT313 Student Directory Viewer

This Expo app demonstrates React Native core components in a student-advising directory. Advisers can browse the five starter students, search by name, and toggle an advising flag on each student card.

## Component structure

- `StudentCard` receives a student's `id`, `name`, `year`, `photoUrl`, `flagged` state, and `onToggleFlag` callback. It uses `View`, `Image`, and `Text` for the student layout, and a `Pressable` control for toggling the advising flag.
- `StudentDirectory` owns the student list and search query in state. It filters names without regard to case and renders matching cards with stable student IDs inside a `ScrollView`.
- `App` renders `StudentDirectory` as the app screen. The implementation is in [App.js](./App.js).

## Run the app

Install dependencies if needed, then start Expo:

```bash
npm install
npx expo start
```

Open the project in Expo Go or an emulator. Search for a student name and tap **Flag for Advising** to verify the interactions.

## Controlled TextInput experiment

In `StudentDirectory`, temporarily remove the `value={query}` and `onChangeText={setQuery}` props from the `TextInput`. Typing will no longer update the query state, so the list will not filter. Restore both props to make the controlled search work again.
