# HawkEye-Trades: 🦅 
:octocat:

Web Application to jot down, analyze and create blog posts about your trades..... ^-^




# Table of Contents
* [Getting Started](#getting-started)  
* [Project Structure](#project-structure)  
* [Major libraries used](#major-libraries-used)
* [Sign in](#sign-in)
* [Sign up](#sign-up)
* [Blog posts](#blog-posts)
* [Create blog](#create-blog)
* [Trade journal](#trade-journal)
* [Trade History](#trade-history)
* [Trade info](#trade-info)
* [Update profile](#update-profile)
* [Page not found](#page-not-found)


## Getting Started
- This Application is build on top of react library

> Hosted using **Firebase** - https://hawkeye-trades.web.app/

> Hosted using **Netlify** - https://hawkeye-trades.netlify.app/


## Project Scafolding
```
├── App.css
├── App.tsx
├── assets
|  ├── fonts
|  |  └── Nunito
|  └── images
|     ├── app-info
|     ├── generic
|     ├── illustrations
|     ├── nli
|     ├── page-not-found
|     ├── trade-history
|     └── waves
├── components
|  ├── blog-card
|  |  ├── blog-card.component.tsx
|  |  └── blog-card.styles.ts
|  ├── blog-details
|  |  ├── blog-details.component.tsx
|  |  └── blog-details.styles.ts
|  ├── editor-draftjs
|  |  ├── editor-draftjs.component.tsx
|  |  └── editor-draftjs.styles.ts
|  ├── form-input-fields
|  |  ├── button.component.tsx
|  |  └── text-input.component.tsx
|  ├── modal
|  |  ├── modal.component.tsx
|  |  └── modal.styles.ts
|  ├── navigation
|  |  └── navigation.component.tsx
|  ├── page-not-found
|  |  ├── page-not-found.component.tsx
|  |  └── page-not-found.styles.ts
|  ├── player
|  |  └── player.component.tsx
|  ├── route
|  |  └── route.component.tsx
|  ├── snackbar
|  |  └── snackbar.component.tsx
|  ├── spinner
|  |  ├── spinner.component.tsx
|  |  └── spinner.styles.ts
|  ├── stock-price-table
|  |  └── stock-price-table.component.tsx
|  ├── teddy-login-rive
|  |  └── teddy-login-rive.component.tsx
|  ├── trade-details
|  |  ├── trade-details.component.tsx
|  |  └── trade-details.styles.ts
|  ├── trade-overview-card
|  |  ├── trade-overview-card.component.tsx
|  |  └── trade-overview-card.styles.ts
|  ├── tree-rive
|  |  └── tree-rive.component.tsx
|  └── user-avatar
|     ├── user-avatar.component.tsx
|     └── user-avatar.styles.ts
├── constants
|  ├── app-constans.ts
|  ├── route-paths.ts
|  └── theme.ts
├── features
|  ├── api
|  |  └── rapid-API
|  |     └── nse-data.ts
|  ├── firebase
|  |  ├── auth.ts
|  |  ├── blog.ts
|  |  ├── config.ts
|  |  ├── trade-journal.ts
|  |  └── users.ts
|  └── redux
|     ├── redux-toolkit-hooks
|     |  └── redux-toolkit-hooks.ts
|     ├── reset-redux-state
|     |  └── reset-redux-state.ts
|     ├── slice
|     |  ├── app-users.slice.ts
|     |  ├── blog.slice.ts
|     |  ├── login.slice.ts
|     |  ├── sign-up.slice.ts
|     |  ├── trade-journal.slice.ts
|     |  └── user.slice.ts
|     └── store
|        └── store.ts
├── helpers
|  ├── currency-formatter.ts
|  ├── helper-API-status.ts
|  └── helper-date.ts
├── hooks
|  ├── use-document-height.ts
|  ├── use-login-teddy-rive.ts
|  ├── use-toast.ts
|  ├── use-tree-rive.ts
|  └── use-window-dimensions.ts
├── index.css
├── index.tsx
├── interface
|  └── interface.ts
├── pages
|  ├── blog
|  |  ├── blog.page.tsx
|  |  └── blog.styles.ts
|  ├── create-blog
|  |  ├── create-blog.page.tsx
|  |  └── create-blog.styles.ts
|  ├── info
|  |  ├── info.page.tsx
|  |  └── info.styles.ts
|  ├── sign-in
|  |  ├── sign-in.page.tsx
|  |  └── sign-in.styles.ts
|  ├── sign-up
|  |  └── sign-up.page.tsx
|  ├── stocks-info
|  |  └── stocks-info.page.tsx
|  ├── trade-history
|  |  ├── trade-history.page.tsx
|  |  └── trade-history.styles.ts
|  ├── trade-info
|  |  ├── trade-info.page.tsx
|  |  └── trade-info.styles.ts
|  ├── trade-journal
|  |  ├── trade-journal.page.tsx
|  |  └── trade-journal.styles.ts
|  └── user-profile
|     ├── user-profile.page.tsx
|     └── user-profile.styles.ts

directory: 54 file: 120

```


## Major libraries used
  Below are the libraries used for developing this application:

- Used **Typescript** for optional static typing to the language
- For Routing used **React-Router**.
- For Forms used **React-Hook-Form**.
- For State Management used **Redux-toolkit**.
- Used **MUI** for creating user interfaces.
- used **Styled-Components** for component level styles and Styled-components leverage a mixture of JavaScript and CSS using a technique called CSS-in-JS.
- Utilized **DraftJS** for text editor.
- Used **Firebase** for Authentication, Database and storage.
- Used **Imgur** for online image sharing and image hosting service.

![libraries-used](https://user-images.githubusercontent.com/54638348/140985877-5e997ad6-4650-45fb-8071-1f880a36bce9.png)

# **# Below are some of the features implemented**

# Sign in

- User can sign-in using Google credentials or Email & Password.
- Upon forgort password reset password link will be sent to user registered Email.
- Upon user interactivity with input fields below images will interact/react accordingly.

![sign-in](https://user-images.githubusercontent.com/54638348/140979425-03e14e7f-a7a7-4cfe-a231-e66f5f7de9fc.png)

# Sign up

- User can sign-up using Email and Password.
- Random images will be displayed upon each mount.

![sign-up](https://user-images.githubusercontent.com/54638348/140979874-60e99869-acec-4757-97b8-24fad56c67e5.png)

# Blog posts

- Blog posts are public for all authenticated users.
- Users can comment on blog posts and interact with the community.

![blog-1](https://user-images.githubusercontent.com/54638348/140980622-75b460ff-e261-43c7-a675-501ca719d2fd.png)

![blog-2](https://user-images.githubusercontent.com/54638348/140980706-2cd20744-6ef0-41ec-84cc-dd260e1944af.png)

![blog-3](https://user-images.githubusercontent.com/54638348/141129620-8fa14d64-0950-44bb-ab9b-7cd85b650e59.png)

# Create blog

- Users can create blogs and post them to view on blog page.
- Used draftJS as text editor

![create-blog-post](https://user-images.githubusercontent.com/54638348/140981213-0ae81a97-aca8-4192-8d2a-59e84797db2b.png)

# Trade journal

- Users can journal their trades and save them and these are kept private.

![trade-journal](https://user-images.githubusercontent.com/54638348/140981690-6e435393-6eb7-4ce6-b8d4-fb9f7a11e5c3.png)

# Trade history

- Only the trades which are specific to the user are shown
- Random trading quotes are shown on top right side.

![trade-history](https://user-images.githubusercontent.com/54638348/141294863-2d790b93-15ab-4252-bf3d-7da9d28d9997.png)

# Trade info

- Upon specific card selction in trade history page user can view their entire journal which user had saved earlier.

![specific-trade](https://user-images.githubusercontent.com/54638348/140982526-6ed17eca-3be4-4c64-a61c-5e3dd0c8c48e.png)

# Update profile

- User can change his display name and profile picture
- Updated display name and profile picture will be updated across the application.

![update-profile](https://user-images.githubusercontent.com/54638348/140982983-32d790fd-1c79-40cf-a300-b434287528a7.png)

# Page not found
- User can redirect to sign-in page or home page based on authentication status.
- Images are loaded dynamically.

![screely-1637680561638](https://user-images.githubusercontent.com/54638348/143051134-29998284-9806-4961-b0f9-f05dd8daacda.png)



Thanks for going through README file ☮️
