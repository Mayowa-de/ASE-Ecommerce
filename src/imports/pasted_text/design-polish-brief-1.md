# Adeola Spiritual Enterprises — Final Design Polish Brief for Figma Make

## 1. Project Context

Adeola Spiritual Enterprises is an existing mobile-first ecommerce storefront for a Nigerian spiritual/Christian retail business serving the Celestial Church community.

The functional website already exists in HTML/CSS/JS and is intended to move toward WordPress + WooCommerce + Elementor.

This task is a **visual, responsive, and interaction-polish pass on the existing product**.

### This is NOT:

* a rebuild from scratch
* a new information architecture
* a feature-expansion exercise
* an opportunity to invent products, pricing, categories, or functionality
* a Figma-only visual experiment
* an invitation to replace the existing placeholder-image system with random stock photography

### The objective

Make the existing storefront feel cohesive, premium, trustworthy, responsive, and production-ready, with **mobile being the primary experience**.

Preserve the existing functionality and structure unless a change is necessary to resolve a visual, responsive, accessibility, or interaction inconsistency.

---

# 2. Design Philosophy

The visual direction is:

**Premium spiritual/Christian commerce — warm, trustworthy, modern, refined.**

The interface must NOT resemble:

* a generic ecommerce template
* a church flyer
* a religious poster
* a cluttered marketplace
* a template covered in decorative religious clip-art

Products remain the visual priority.

Branding should support the shopping experience rather than dominate it.

Avoid excessive gradients, unnecessary decorative elements, oversized typography, excessive shadows, excessive rounded cards, and unnecessary animation.

Every visual element should have a functional or hierarchical purpose.

---

# 3. Brand System

## Brand

**Adeola Spiritual Enterprises**

Domain:

**adeolaspiritualstore.com.ng**

Logo:

* compact badge
* text: **ASE**
* purple background
* gold text
* rounded-square shape
* NOT circular

## Color tokens

```css
--color-primary: #35105C;
--color-gold: #C99A24;
--color-champagne: #E7C978;

--color-background: #FFFDF8;
--color-surface: #FFFFFF;
--color-cream: #F7F0E3;

--color-dark-brand: #24103D;

--color-text: #211A24;
--color-text-secondary: #665E69;

--color-success: #218739;
--color-error: #C62828;
--color-warning: #B77900;
--color-info: #2468A2;
```

Approximate visual balance:

* 60% neutral/light surfaces
* 25% purple
* 10% gold/champagne
* 5% status colors

Do not allow gold to become the dominant background color.

Use gold primarily for emphasis, accents, selected states, small decorative details, and brand highlights.

## Typography

Headings / brand statements:

**Playfair Display**

Everything else:

**Inter**

Inter is used for:

* navigation
* product names
* prices
* buttons
* forms
* labels
* metadata
* body copy
* utility controls

Maintain a clear type hierarchy.

Do not use Playfair Display excessively.

---

# 4. Fixed Product Catalogue — Source of Truth

The catalogue below is authoritative.

Do NOT infer, restore, average, replace, or reuse pricing from previous versions, screenshots, generated designs, placeholder content, or previous iterations.

### Products

1. **Candles**

   * Small — ₦700
   * Medium — ₦900

2. **St. Michael**

   * Solo — ₦1,700

3. **Divine Grace**

   * Solo — ₦1,700

4. **Onola**

   * Solo — ₦2,000

5. **Back to Sender**

   * Solo — ₦2,000

6. **Miss Paris**

   * Solo — ₦1,700
   * Big — ₦4,000

7. **Amure**

   * ₦800

8. **Cross Wewe**

   * Price TBD
   * Display: **Coming Soon**
   * Must NOT be purchasable

9. **Bible**

   * Small — ₦6,000
   * Medium — ₦9,000

10. **Papa Perfume**

    * ₦2,000

11. **Goya Oil**

    * ₦1,000

## Categories

These categories are fixed:

* Candles
* Bibles
* Oils
* Perfumes
* Spiritual Items

Categories are admin-editable in the eventual system but are not user-creatable.

---

# 5. Product and Category Imagery

Real product photography is currently unavailable.

The existing intentional placeholder system must remain:

**SVG line icon + purple/gold gradient tile**

Do NOT introduce unrelated stock photography.

Previous stock-photo attempts failed because of broken image URLs and irrelevant imagery.

Unless genuinely relevant and guaranteed to resolve, use the existing icon + gradient treatment.

Maintain:

* consistent aspect ratios
* consistent icon weight
* consistent internal alignment
* consistent visual treatment
* consistent corner radius
* consistent spacing

Icons should communicate the product category clearly without becoming decorative clutter.

---

# 6. Site Map

The existing site contains these 13 screens:

1. Home
2. Shop / All Products
3. Product Detail
4. Cart
5. Login / Register
6. Checkout
7. Order Confirmation
8. Order Details
9. Order Cancelled
10. My Orders
11. Account
12. Privacy Policy
13. Terms & Conditions

### Account contains:

* Profile
* Wishlist
* Product Reviews
* Address Book
* Preferences
* Dark Mode
* Delete Account

---

# 7. Mobile Is the Primary Design Target

Design and evaluate mobile first.

Desktop should adapt from the mobile system rather than being treated as the primary canvas.

The design must work continuously across:

* 320px
* 375px
* 414px
* 768px

Do not design only for one "standard phone."

---

# 8. Responsive Behavior

Prefer fluid CSS behavior over unnecessary breakpoint jumps.

Use:

```css
clamp()
min()
max()
rem
%
vw
vh
container-relative sizing
```

where appropriate.

Avoid breakpoint-specific changes for minor differences in:

* typography
* spacing
* card width
* icon size
* button dimensions
* padding

Breakpoints should primarily be used for **structural changes**, not arbitrary visual resizing.

The interface should smoothly scale between phone sizes.

---

# 9. Global Mobile Layout Rules

The page must:

* never produce accidental horizontal scrolling
* never clip important text
* never hide primary actions
* never create overlapping controls
* never allow content to disappear behind fixed navigation
* maintain consistent content edges
* preserve intentional inset/full-bleed relationships

Use a consistent responsive spacing system.

Where content is inside a page container, its left and right alignment should remain consistent across sections unless that section is intentionally full-bleed.

---

# 10. Full-Bleed vs Inset Rules

These three patterns are intentional and must remain visually distinct.

### Hero

**Full bleed on mobile.**

No side margin.

### Category cards

**Inset.**

Visible surrounding white/light surface padding should remain clearly visible around the image/card.

### Product cards

**Edge-to-edge within their intended product-grid/container structure.**

Do not randomly add margins to product cards merely to make them visually similar to category cards.

Do not allow these three visual systems to drift toward one another.

---

# 11. Mobile Bottom Navigation

This is a strict requirement.

The fixed mobile bottom navigation contains **exactly four items**:

1. Home
2. Products
3. Orders
4. Account

Order must remain exactly as above.

Cart does NOT appear here.

Cart is accessed through the header/cart icon.

## Layout

Use CSS Grid:

```css
grid-template-columns: repeat(4, 1fr);
```

Each item must occupy exactly 25% of the available navigation width.

Do NOT use:

```css
justify-content: space-between;
```

for distributing the four navigation items.

Do NOT use manual offsets, arbitrary negative margins, uneven padding, or visual compensation.

Each icon and label must be horizontally centered inside its own 25% column.

## Navigation sizing

Target a minimum navigation height of approximately:

```css
64px
```

plus the device safe-area inset where applicable.

Use:

```css
padding-bottom: env(safe-area-inset-bottom);
```

or the equivalent safe-area approach.

Page content must have sufficient bottom spacing so the final content item can never be hidden behind the fixed navigation.

## States

Each item requires:

* default
* selected / active
* pressed
* focus
* disabled where relevant

Selected state should be visually obvious without relying solely on color.

The navigation must remain visually balanced at:

* 320px
* 375px
* 414px
* 768px

At each width, icons and labels must remain centered within their actual equal-width columns.

---

# 12. Touch Targets

Interactive controls should target approximately:

**44 × 44px minimum touch area where practical.**

No important mobile interaction should become difficult to tap merely because the visual icon is small.

This applies especially to:

* bottom-nav items
* header icons
* carousel controls
* quantity controls
* wishlist controls
* close buttons
* filter controls
* sort controls
* product actions
* form controls

Visual compactness must NOT come from shrinking the interactive hit area.

---

# 13. Header

The mobile header should remain compact while preserving comfortable touch targets.

The header should prioritize:

1. brand identity
2. navigation context
3. search where appropriate
4. cart access

Do not overcrowd the header.

Cart remains a header action rather than a bottom-nav item.

Header icons should use consistent iconography, size, stroke weight, and spacing.

Avoid duplicate icons.

---

# 14. Hero Carousel

The hero is intentionally full-bleed on mobile.

Hero content must remain readable at every supported viewport width.

Carousel controls must NOT overlap:

* headline
* body copy
* CTA buttons
* pagination
* important imagery

Carousel arrows should occupy dedicated edge zones.

They must remain at least approximately 44×44px as touch targets.

Hero text must accommodate multiple lines without clipping.

Do not assume headlines will always fit on one line.

Hero height must adapt sufficiently to its content rather than forcing text into a fixed-height area.

Do not allow arrows to become positioned directly over headline/body copy when text wraps.

Avoid unnecessarily large hero typography that consumes excessive vertical space on mobile.

---

# 15. Homepage Vertical Economy

Mobile screen height is limited.

Do not push product discovery unnecessarily far down the homepage with:

* oversized hero sections
* excessive whitespace
* oversized headings
* decorative filler
* unnecessary promotional panels

The homepage should clearly communicate the brand while moving users efficiently toward:

* categories
* products
* featured products
* shopping actions

Products remain the primary commercial focus.

Every homepage section must justify its vertical space.

---

# 16. Product Cards

Product cards must prioritize information in this order:

1. Product visual
2. Product name
3. Price / selected variant
4. Primary purchase action

Maintain consistent:

* image ratio
* card structure
* internal padding
* typography
* spacing
* action placement

Product names may wrap, but should not create wildly different card heights.

Prices must remain fully visible and must never be truncated.

Where cards have secondary actions such as Wishlist, they must have an independent touch target and must not conflict with the card's primary click behavior.

Product-card states:

* default
* hover for pointer devices
* pressed
* focus
* selected where relevant
* disabled

Hover must never be necessary for understanding or using the card on mobile.

---

# 17. Category Cards

Category cards should feel visually related to product cards while retaining their intentionally inset presentation.

Maintain:

* consistent image treatment
* consistent card height/aspect ratio
* consistent text placement
* consistent spacing
* clear tappable affordance

Do not make categories visually heavier than the products they lead to.

---

# 18. Product Detail

Product detail must support:

* product visual
* product name
* price
* variant selector where applicable
* quantity
* purchase action
* reviews

Variant selection must clearly communicate which option is selected.

Unavailable options must have an obvious disabled state.

Quantity controls must have comfortable touch targets.

The primary purchase action must remain prominent.

A sticky purchase bar may be used where appropriate, but it must:

* never obscure product content
* never cover the bottom navigation
* respect safe-area spacing
* never create competing primary actions

---

# 19. Cart

Cart must clearly communicate:

* product
* selected variant
* quantity
* price
* subtotal
* primary checkout action

Quantity adjustment controls must have large enough touch areas.

Empty-cart state must remain visually clear without unnecessary decorative space.

The cart should not introduce a second visual navigation system.

---

# 20. Checkout

Checkout is a task-focused experience.

It should be visually simpler than the shopping pages.

Minimize distractions.

Keep section hierarchy clear.

Use mobile-friendly full-width form controls where appropriate.

Use appropriate HTML input types and autocomplete attributes for:

* name
* phone
* email
* address
* state
* other relevant delivery information

Use appropriate mobile keyboard/input modes.

Avoid unnecessary field splitting.

## Delivery coverage

Current delivery states:

* Lagos
* Ogun
* Ondo

Do NOT imply nationwide delivery.

## Payment methods

* Cash on Delivery
* Bank Transfer
* Card

Card provider UI remains provider-agnostic:

**Paystack / Flutterwave**

Do not invent a specific payment-provider visual identity where it is not required.

---

# 21. Account Requirement

Guest checkout is NOT allowed.

Customers must have an account to place an order.

The UI should communicate this requirement clearly without making authentication feel unnecessarily disruptive.

Login and registration should retain a polished, calm visual hierarchy.

---

# 22. Order Screens

Maintain consistent status terminology across:

* Order Confirmation
* Order Details
* My Orders
* Order Cancelled

Status badges must use the defined status colors appropriately and remain readable.

Status communication should not rely on color alone.

---

# 23. Reviews

Reviews unlock only after an order reaches:

**Delivered**

No admin approval queue.

Customers can submit reviews directly after eligibility is reached.

The UI label must be:

**Product Reviews**

Do not shorten the navigation label to simply "Reviews."

---

# 24. Account Navigation

Account includes:

* Profile
* Wishlist
* Product Reviews
* Address Book
* Preferences
* Dark Mode
* Delete Account

Privacy Policy and Terms & Conditions must NOT be inserted into Account navigation.

Those remain footer-only links.

---

# 25. Dark Mode

Dark Mode is a theme transformation, not a completely different design.

Preserve:

* layout
* spacing
* component geometry
* hierarchy
* interaction states
* typography
* brand identity

Do NOT simply invert the entire interface.

Dark mode should use appropriate dark surfaces and adjusted text colors while maintaining sufficient contrast.

The purple/gold brand identity should remain recognizable.

---

# 26. Privacy Policy and Terms & Conditions

Privacy Policy and Terms & Conditions:

* live in the footer only
* are NOT part of Account navigation
* use a monochrome / grayscale visual treatment
* are visually distinct from the main purple/gold storefront

On mobile, the footer may be compact, but legal links must remain reachable after the main content.

---

# 27. Buttons

Create a consistent button system.

Required states:

* default
* hover for pointer devices
* pressed
* focus
* disabled

Primary buttons should use the primary brand color appropriately.

Secondary actions may use outlined, tonal, or neutral treatments.

Buttons must not contain duplicate icons.

Do not add an icon automatically when the text already contains one.

All icon + text spacing must be consistent.

Primary actions should remain visually distinct from secondary actions.

---

# 28. Form Fields

Create consistent states:

* default
* focus
* filled
* error
* disabled
* success where appropriate

Focus must be clearly visible.

Error messages should appear close enough to the affected field to establish a clear relationship.

Inputs must not become too small on mobile.

Labels must remain understandable without relying on placeholder text alone.

---

# 29. Status Badges

Create a reusable status-badge system.

Examples include:

* Delivered
* Cancelled
* Pending
* Processing
* Coming Soon

Use the appropriate status color while maintaining sufficient contrast.

A status must remain understandable through its text/shape/icon treatment, not color alone.

---

# 30. Accessibility

The polish pass must include accessibility considerations.

Ensure:

* readable contrast
* visible keyboard focus states
* meaningful selected states
* distinguishable disabled states
* controls are not identified by color alone
* icons have appropriate accessible labeling where required
* interactive controls have adequate touch areas
* text remains readable at supported viewport sizes
* important information is not clipped

Gold text on light/white backgrounds must be used carefully.

Do not use champagne/gold as body text where contrast is insufficient.

---

# 31. Interaction and Motion

Motion should be subtle and functional.

Use animation for:

* state changes
* small transitions
* carousel movement
* feedback

Avoid:

* excessive parallax
* large motion on navigation
* distracting auto-animation
* decorative animation that slows shopping

Respect reduced-motion preferences where applicable.

---

# 32. Spacing and Alignment Audit

Actively inspect the entire interface for:

* inconsistent left/right edges
* uneven card spacing
* misaligned icons
* inconsistent button heights
* inconsistent text baselines
* mismatched paddings
* irregular section spacing
* bottom-nav drift
* inconsistent header alignment
* inconsistent grid gutters

A repeated alignment issue must be solved at the component/layout level rather than manually corrected on individual screens.

Use reusable spacing values rather than arbitrary one-off numbers.

---

# 33. Duplicate UI Audit

Specifically search for:

* duplicate icons
* duplicate arrows
* duplicate cart icons
* repeated close buttons
* multiple navigation systems
* labels containing an icon plus a separately rendered icon
* duplicated action controls

If an icon is already baked into a component label, do not render another equivalent icon beside it.

---

# 34. Overflow Audit

The page itself must never horizontally overflow.

Horizontal scrolling may exist only where it is intentionally designed, such as:

* category carousels
* intentional product rails
* other explicit horizontal scrollers

Intentional horizontal scrollers must not cause the entire page to overflow.

Test:

* long product names
* long headings
* large prices
* multiple variant buttons
* long addresses
* error messages
* status labels
* narrow screens

---

# 35. Required Mobile QA Matrix

The final design must be evaluated at:

### 320px

Check:

* navigation
* hero
* text wrapping
* buttons
* product cards
* forms
* checkout
* overflow

### 375px

Check:

* normal phone layout
* card proportions
* navigation spacing
* hero hierarchy
* product-grid balance

### 414px

Check:

* larger phone scaling
* whitespace balance
* typography
* card width
* hero composition

### 768px

Treat as the transition point toward tablet behavior.

Check:

* content width
* grid behavior
* navigation behavior
* section proportions
* whether the interface becomes unnecessarily stretched

At EVERY viewport:

* no horizontal page scrolling
* no clipped text
* no accidental overlaps
* no hidden primary controls
* no content hidden behind fixed navigation
* no broken aspect ratios
* no navigation drift
* no strange breakpoint jumps

---

# 36. Required Bottom-Nav Verification

Explicitly verify the bottom navigation at:

**320px / 375px / 414px / 768px**

Expected structure:

```text
|  Home  | Products | Orders | Account |
|  25%   |   25%    |  25%   |   25%   |
```

Icons and labels must be centered inside their respective 25% columns.

Provide screenshots during QA when possible.

---

# 37. Component Consistency

Treat the following as reusable systems rather than independently styled screens:

* Header
* Bottom navigation
* Buttons
* Product cards
* Category cards
* Form fields
* Status badges
* Quantity controls
* Variant selectors
* Modal/popup surfaces
* Order cards
* Account menu items

A component should have one consistent visual language across the entire application.

Do not "redesign" the same component differently on different screens without a genuine functional reason.

---

# 38. Implementation Constraints

The final visual system must remain reproducible in:

**plain HTML + CSS**

or through clearly documented design tokens that can be translated directly to CSS.

The eventual implementation is:

**WordPress + WooCommerce + Elementor**

with:

* hand-pasted HTML widgets
* a single global stylesheet
* existing JavaScript where needed

Therefore:

**CSS-equivalent values are more important than Figma-native effects.**

Prefer:

* CSS variables
* CSS Grid
* Flexbox
* border-radius
* box-shadow
* transforms
* transitions
* gradients
* clamp()
* min()
* max()
* responsive units

Avoid design effects that are difficult or impossible to reproduce in ordinary CSS.

---

# 39. Do Not Change Existing Product/Business Rules

Do NOT invent:

* products
* prices
* discounts
* coupons
* delivery states
* payment methods
* account capabilities
* user-generated categories
* additional bottom-navigation items
* guest checkout
* random promotional programs

No coupons/discount codes exist in this version.

---

# 40. Required Audit Before Modification

Before changing the design, perform a complete visual audit.

Identify:

* spacing inconsistencies
* alignment issues
* responsive breakage
* typography inconsistencies
* component-state inconsistencies
* duplicate UI
* touch-target problems
* navigation drift
* hero overlap problems
* overflow issues
* contrast issues
* inappropriate mobile scaling
* inconsistent card proportions
* footer/legal inconsistencies
* dark-mode inconsistencies

Do not assume an existing component is correct simply because it already exists.

---

# 41. Required Deliverables

### Deliverable 1 — Visual Audit

Provide a concise audit showing:

**Problem → Location → Why it is inconsistent → Recommended correction**

Do this before applying changes.

### Deliverable 2 — Polished Component System

Standardize:

* buttons
* product cards
* category cards
* bottom navigation
* form fields
* status badges
* quantity controls
* variant selectors

Include all relevant interaction states.

### Deliverable 3 — Responsive QA

Verify:

* 320px
* 375px
* 414px
* 768px

Provide screenshots where possible.

### Deliverable 4 — CSS-Ready Design Tokens

Where practical, document the final design values as CSS variables/tokens so the system can be reproduced directly in HTML/CSS.

---

# 42. Final Quality Standard

The final design should feel like one coherent ecommerce product rather than 13 separately designed screens.

The user should experience:

**clear hierarchy → easy browsing → obvious product information → comfortable tapping → minimal friction → consistent navigation → trustworthy presentation**

Mobile is the deciding standard.

Desktop should remain polished, but mobile usability takes precedence whenever a visual compromise is unavoidable.

Do not add visual complexity merely to make the design appear more "premium."

Premium should come from:

**consistency, restraint, spacing, typography, hierarchy, responsiveness, and execution.**
