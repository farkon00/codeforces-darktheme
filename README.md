# Codeforces Dark Theme

This is a fixed version of a dark theme made by [GaurangTandon](https://github.com/GaurangTandon/codeforces-darktheme)
and greatly improved on by [LordLava](https://github.com/LordLava/codeforces-darktheme).

## Download instructions

1. Install Tampermonkey for your browser. ([Instructions](https://tampermonkey.net/)).
2.
[**Click this link (White Nutella) **](https://github.com/farkon00/codeforces-darktheme/raw/master/codeforces-darktheme.user.js) to install Codeforces dark theme userscript.

[**Click this link (Black Nutella) **](https://github.com/farkon00/codeforces-darktheme/raw/master/codeforces-darktheme-darknutella.user.js) to install Codeforces dark theme userscript.

Do not know the difference between the versions? [Click here.](#the-black-nutella-version)

3. Reload Codeforces twice.

![screenshot of home page](./imgs/screenshot.png)

In case the script is updated later, you need not revisit the page. Tampermonkey auto fetches new updates every 24hrs by default. 

In case you're getting this warning:

> Apps, extensions, and user scripts can not be added from this website.

This warning is mainly to prevent vulnerable users from installing malicious extensions and apps. In my case, you can trust this userscript as its code is posted on GitHub, under public scrutiny. So, you can safely ignore the warning and proceed with installation.

## Rating color adjustments
User handle colors needed to be reworked to be nice with the dark theme. That means the following colors now appear only ever so differently, but the sharp eyes amongst you may notice ;) These color adjustments are only meant to **improve the contrast ratio of the text** against a dark background.

| users                                        | original color                                                            |                             new color                              |
| -------------------------------------------- | ------------------------------------------------------------------------- | :----------------------------------------------------------------: |
| admins, non-rated, first letter of legendary | black (`#000`)                                                            |                           white (`#fff`)                           |
| Grandmaster                                  | ![red](https://user-images.githubusercontent.com/62207434/181259908-2df502e7-c398-4407-9bd6-1da3cdd8b920.png) red                  | ![#ff4747](https://user-images.githubusercontent.com/62207434/181260614-2738b0d5-f52d-4411-bd79-2ab9f9c37043.png) `#ff4747` |
| Candidate master                             | ![violet](https://user-images.githubusercontent.com/62207434/181260265-1be718c2-e867-44d0-a066-e588e480fe3b.png) violet            | ![#ce8aff](https://user-images.githubusercontent.com/62207434/181260624-c29a5d22-6c11-4c19-9874-0acc28c64e3e.png) `#ce8aff` |
| Expert                                       | ![blue](https://user-images.githubusercontent.com/62207434/181260319-bf58addb-b327-4c31-a340-6fde2c6c30d6.png) blue                | ![#757dff](https://user-images.githubusercontent.com/62207434/181260628-a04e4ed5-43b4-485a-8156-8c4a380a4d11.png) `#757dff` |
| Specialist                                   | ![cyan](https://user-images.githubusercontent.com/62207434/181260378-738f0f7a-5302-41f1-851d-efcad298c265.png) cyan (`#03a89e`)    | ![#01bdb2](https://user-images.githubusercontent.com/62207434/181260639-e6cfad86-0b25-4f07-a23d-4ca73b17885b.png) `#01bdb2` |
| Pupil                                        | ![green](https://user-images.githubusercontent.com/62207434/181260440-9b43353d-07ad-4c5c-bde7-1703bb413ac3.png) green (`#00d700`) | ![#00c700](https://user-images.githubusercontent.com/62207434/181260653-430462ca-ff29-48a4-ae08-d5ccbda4d648.png) `#00c700` |
| Newbie                                       | ![gray](https://user-images.githubusercontent.com/62207434/181260480-d0c737a4-7367-454a-9dd2-3ebea0019265.png) gray                | ![#8c8c8c](https://user-images.githubusercontent.com/62207434/181260660-440aab86-daaa-495f-97be-72ab4463f114.png) `#8c8c8c` |

To view all the color changes at once, view the table on the [blog post "Second Revolution of Colors and Titles"](https://codeforces.com/blog/entry/20638).

### The black nutella version
You might have noticed there are two versions of the theme: the white nutella and the black nutella. The table above describes
the white nutella version(the default). The word nutella here refers to the legendary grandmaster rating color scheme(the first letter is black and the rest are red). The white nutella version changes the first letter to be white, meanwhile the black nutella version leaves the first letter as is. Choose whichever one you like best!

## External dependencies

The dependecy is used for dark theme syntax highlighting of code.

1. [prettyprint's desert.css](https://github.com/google/code-prettify/blob/master/styles/desert.css), since Codeforces depends on the same library for formatting submission's display ([Apache license](https://github.com/google/code-prettify/blob/master/COPYING)).

## Contribution guidelines

PRs are most welcome! Though it may be better to first create an issue describing the problem the PR fixes and then create it, in order to get more alternate views on the problem.

## License

MIT License attached.
