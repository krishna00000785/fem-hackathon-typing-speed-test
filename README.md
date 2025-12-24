# Frontend Mentor - Typing Speed Test solution

This is a solution to the [Typing Speed Test challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/typing-speed-test). The project focuses on building a realistic typing test experience with clean architecture and strong TypeScript safety.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

---

## Overview

### The challenge

Users should be able to:

- Select a typing difficulty (Easy, Medium, Hard)
- Type a passage with real-time character validation
- See live typing statistics such as WPM, accuracy, and time
- Complete the test either by finishing the passage or when the timer ends
- Use the application seamlessly on desktop and mobile devices
- Experience locked controls during an active test to prevent invalid actions

The challenge focuses on building a realistic typing test experience with accurate metrics and smooth UX.

---

### Screenshot

### Links

- [Live Site](https://fem-hackathon-typing-speed-test.vercel.app/)
- [GitHub](https://github.com/krishna00000785/fem-hackathon-typing-speed-test)

## My process

### Built with

- Semantic HTML5 markup
- Mobile-first workflow
- Flexbox
- Vite
- React
- TypeScript
- Tailwind CSS

### What I learned

This project helped reinforce several important frontend concepts:

- Managing complex UI state across sibling components
- Deriving values like WPM and accuracy instead of storing redundant state
- Building reusable and type-safe custom components
- Handling typing input correctly across desktop and mobile devices
- Separating UI labels from data keys using mapping patterns
- Avoiding common React pitfalls such as unnecessary `useEffect` state updates

This challenge significantly improved my confidence in structuring larger React components cleanly.

### Continued development

In future projects, I’d like to focus more on

- Persist best scores using localStorage
- Final results screen with summary
- Restart / retry shortcuts
- Sound or animation feedback on errors
- Multiplayer or leaderboard mode

## Author

- Frontend Mentor - [@krishna00000785](https://www.frontendmentor.io/profile/krishna00000785)

## Acknowledgments

Thanks to the Frontend Mentor community for feedback and inspiration, and to everyone who shared insights during the development process.
