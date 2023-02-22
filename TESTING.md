# Testing

Return back to the [README.md](README.md) file.

## Code Validation

### HTML

I have used the recommended [HTML W3C Validator](https://validator.w3.org) to validate all of my HTML files.

| Page | W3C URL | Screenshot | Notes |
| --- | --- | --- | --- |
| Home | [W3C](https://validator.w3.org/nu/?doc=https%3A%2F%2Fjonathan97-web.github.io%2FEevees-evolution%2Findex.html) | ![screenshot](/documentation/image/html-validator.png)

### CSS

I have used the recommended [CSS Jigsaw Validator](https://jigsaw.w3.org/css-validator) to validate all of my CSS files.


Sample CSS code validation documentation (tables are extremely helpful!):

| File | Jigsaw URL | Screenshot | Notes |
| --- | --- | --- | --- |
| style.css | [Jigsaw](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fjonathan97-web.github.io%2FEevees-evolution) | ![screenshot](/documentation/image/css-validator.png) | Pass: No Errors |

### JavaScript

I have used the recommended [JShint Validator](https://jshint.com) to validate all of my JS files.

Sample JS code validation documentation (tables are extremely helpful!):

| File | Screenshot | Notes |
| --- | --- | --- |
| script.js | ![screenshot](documentation/js-validation-script.png) | Unused variables from external files |

## Browser Compatibility

I've tested my deployed project on multiple browsers to check for compatibility issues.

| Browser | Screenshot | Notes |
| --- | --- | --- |
| Chrome | ![screenshot](/documentation/image/chrome-compability.png) | Works as expected |
| Firefox Developer Edition | ![screenshot](/documentation/image/firefox-de-compability.png) | Works as expected |
| Edge | ![screenshot](/documentation/image/microsoft-edge-compability.png) | Works as expected |
| Safari | ![screenshot](/documentation/image/safari-macOS-compability.png) | Works as expected |
| Opera GX | ![screenshot](/documentation/image/opera-gx-compability.png) | Works as expected |

## Responsiveness

I've tested my deployed project on multiple devices to check for responsiveness issues.

| Device | Screenshot | Notes |
| --- | --- | --- |
| Mobile (DevTools) | ![screenshot](/documentation/image/mobile-responsive.png) | Works as expected |
| Tablet (DevTools) | ![screenshot](/documentation/image/tablet-responsive.png) | Works as expected |
| Desktop (DevTools) | ![screenshot](/documentation/image/desktop-responsive-devtools.png) | Works as expected |
| Desktop| ![screenshot](/documentation/image/desktop-responsive.png) | Works as expected |
| XL Monitor (DevTools) | ![screenshot](/documentation/image/2k-monitor-devtools.png) | Works as expected |
| XL Monitor | ![screenshot](/documentation/image/2k-monitor.png) | Works as expected |
| 4K Monitor (DevTools) | ![screenshot](/documentation/image/4k-responsive-devtools.png) | Minor scaling issues |
| iPhone 14 Pro | ![screenshot](documentation/responsive-iphone.png) | Works as expected |
| Macbook 13" Pro | ![screenshot](/documentation/image/safari-macOS-compability.png) | Works as expected |

## Lighthouse Audit

I've tested my deployed project using the Lighthouse Audit tool to check for any major issues.

| Page | Size | Screenshot | Notes |
| --- | --- | --- | --- |
| Home | Mobile | ![screenshot](/documentation/image/lighthouse-mobile.png) | Some minor warnings |
| Home | Desktop | ![screenshot](/documentation/image/lighthouse-desktop.png) | Some minor warnings |

## Defensive Programming

Defensive programming (defensive design) is extremely important!

When building projects that accept user inputs or forms, you should always test the level of security for each.
Examples of this could include (not limited to):

Forms:
- Users cannot submit an empty form
- Users must enter valid email addresses

PP3 (Python-only):
- Users must enter a valid letter/word/string when prompted
- Users must choose from a specific list only

Flask/Django:
- Users cannot brute-force a URL to navigate to a restricted page
- Users cannot perform CRUD functionality while logged-out
- User-A should not be able to manipulate data belonging to User-B, or vice versa
- Non-Authenticated users should not be able to access pages that require authentication
- Standard users should not be able to access pages intended for superusers

You'll want to test all functionality on your application, whether it's a standard form,
or uses CRUD functionality for data manipulation on a database.
Make sure to include the `required` attribute on any form-fields that should be mandatory.
Try to access various pages on your site as different user types (User-A, User-B, guest user, admin, superuser).

You should include any manual tests performed, and the expected results/outcome.

Defensive programming was manually tested with the below user acceptance testing:

| Page | User Action | Expected Result | Pass/Fail | Comments |
| --- | --- | --- | --- | --- |
| Home Page | | | | |
| | Click on Eevee's evolution | Redirection to Home page | Pass | |
| | Click on Home link in navbar | Redirection to Home page | Pass | |
| Gallery Page | | | | |
| | Click on Gallery link in navbar | Redirection to Gallery page | Pass | |
| | Load gallery images | All images load as expected | Pass | |
| Contact Page | | | | |
| | Click on Contact link in navbar | Redirection to Contact page | Pass | |
| | Enter first/last name | Field will accept freeform text | Pass | |
| | Enter valid email address | Field will only accept email address format | Pass | |
| | Enter message in textarea | Field will accept freeform text | Pass | |
| | Click the Submit button | Redirects user to form-dump | Pass | User must click 'Back' button to return |
| Sign Up | | | | |
| | Click on Sign Up button | Redirection to Sign Up page | Pass | |
| | Enter valid email address | Field will only accept email address format | Pass | |
| | Enter valid password (twice) | Field will only accept password format | Pass | |
| | Click on Sign Up button | Asks user to confirm email page | Pass | Email sent to user |
| | Confirm email | Redirects user to blank Sign In page | Pass | |
| Log In | | | | |
| | Click on the Login link | Redirection to Login page | Pass | |
| | Enter valid email address | Field will only accept email address format | Pass | |
| | Enter valid password | Field will only accept password format | Pass | |
| | Click Login button | Redirects user to home page | Pass | |
| Log Out | | | | |
| | Click Logout button | Redirects user to logout page | Pass | Confirms logout first |
| | Click Confirm Logout button | Redirects user to home page | Pass | |
| Profile | | | | |
| | Click on Profile button | User will be redirected to the Profile page | Pass | |
| | Click on the Edit button | User will be redirected to the edit profile page | Pass | |
| | Click on the My Orders link | User will be redirected to the My Orders page | Pass | |
| | Brute forcing the URL to get to another user's profile | User should be given an error | Pass | Redirects user back to own profile |

Repeat for all other tests, as applicable to your own site.
The aforementioned tests are just an example of a few different project scenarios.

## Bugs

- timeSecond--; causing countDown to stack so the timer went down way faster when clicking the countdown timer

    - To fix this, I added a clearInterval(CountDown) to the StartGame function.  

- If you click a card several times when already selected a faulty pair sometimes it gets stuck and let you choose more cards without unlocking the already flipped cards.
    - I haven't found the solution to this yet, I added a timer so that you need to wait 1 second before pressing another card but if you spam you can still go through it, I need more time to find a solution.

At the time of writing I cannot find any other bugs.

**Fixed Bugs**

- timeSecond--; causing countDown to stack so the timer went down way faster when clicking the countdown timer

    - To fix this, I added a clearInterval(CountDown) to the StartGame function.  

## Unfixed Bugs

- If you click a card several times when already selected a faulty pair sometimes it gets stuck and let you choose more cards without unlocking the already flipped cards.

- Attempted fix: I haven't found the solution to this yet, I added a timer so that you need to wait 1 second before pressing another card but if you spam you can still go through it, I need more time to find a solution.

There are no remaining bugs that I am aware of.