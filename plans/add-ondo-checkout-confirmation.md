# Add Ondo Delivery and Pre-Placement Checkout Confirmation

## Objective

Update ASE so Lagos, Ogun, and Ondo are consistently presented as the supported delivery states, and change checkout so customers review and confirm their order before it is created. Cash on Delivery places the order after confirmation; Card and Bank Transfer simulate a provider handoff and successful return before the order is created.

## Confirmed Product Decisions

- Keep checkout as a single page.
- Present the final review in a modal over checkout rather than adding routes/screens.
- Do not build Paystack/Flutterwave card-entry or bank-transfer UI.
- For Card and Bank Transfer, simulate a successful external provider return after confirmation.
- For Cash on Delivery, skip the payment handoff.
- Create the order and clear the cart only after the applicable confirmation/payment path completes.
- Preserve the existing provider-agnostic “Paystack / Flutterwave” wording.

## Implementation Plan

### 1. Make Ondo part of the authoritative delivery configuration

**Files:** `src/data.ts` and delivery-copy consumers listed below

- Add `Ondo` to `STORE_CONFIG.deliveryStates`, producing `['Lagos', 'Ogun', 'Ondo']`.
- Use `storeConfig.deliveryStates` for the checkout state options instead of the checkout-local `DELIVERY_STATES` constant so admin/config changes and customer choices cannot drift apart.
- Add or reuse one small delivery-state list formatter so customer-facing copy reads naturally as “Lagos, Ogun, and Ondo” rather than duplicating manually maintained lists.
- Keep delivery restricted to configured states; do not imply nationwide delivery.

### 2. Update every customer-facing delivery coverage reference

**Files:**

- `src/screens/Checkout.tsx`
- `src/screens/Cart.tsx`
- `src/screens/ProductDetail.tsx`
- `src/screens/HelpSupport.tsx`
- `src/screens/Terms.tsx`
- `src/screens/PrivacyPolicy.tsx`

Changes:

- Ensure each delivery message includes Lagos, Ogun, and Ondo.
- Where the screen already consumes app context, render the list from `storeConfig.deliveryStates`.
- Wire the remaining legal/static screens to the same app configuration where practical so changing delivery states in Admin Settings updates their displayed coverage too.
- Preserve the existing Cart copy that already includes Ondo, but derive it from the same configuration rather than leaving it as a hardcoded exception.
- Do not change store location, contact channels, delivery fees, or delivery timelines.

`src/admin/AdminSettings.tsx` already exposes Ondo as an available state, so no new state option is required there; the default selected configuration will now include it.

### 3. Split checkout submission from order creation

**File:** `src/screens/Checkout.tsx`

Refactor the current immediate-submit behavior into explicit stages:

1. **Editing:** Customer enters contact, delivery, and payment details.
2. **Review:** Form submission validates fields and opens a confirmation modal without adding an order or clearing the cart.
3. **Processing:** The customer confirms from the modal. Controls are disabled to prevent duplicate submissions.
4. **Completion:** Create the order once, clear the cart, and navigate to the existing order-confirmation screen.

Implementation details:

- Keep the existing validation rules and inline errors.
- Build the prospective order items from the current cart before showing the review.
- Keep the modal state local to checkout; no new route or global checkout state is needed.
- Extract a single local finalization function that constructs/adds the order, clears the cart, and navigates, so both payment paths share the same mutation logic.
- Guard against an empty/invalid cart at finalization and avoid creating an empty order.
- Disable close/back/confirm actions while processing so the simulated callback cannot create duplicate orders.
- Clear any timer used for simulated payment if checkout unmounts.

### 4. Add an accessible order-review modal

**File:** `src/screens/Checkout.tsx`

Use the project’s existing blurred-backdrop modal language and CSS-token styles. The modal will include:

- “Confirm your order” heading and concise explanation.
- Item names, selected variants where applicable, quantities, line totals, and overall total.
- Customer name and phone/email summary.
- Full delivery address and selected state.
- Selected payment method.
- A secondary “Back to edit” action.
- A primary action whose label reflects the payment choice:
  - Cash on Delivery: **Place Order**
  - Card or Bank Transfer: **Proceed to Payment**

Accessibility/interaction requirements:

- Use `role="dialog"`, `aria-modal="true"`, and an associated title.
- Move focus into the modal when it opens and return focus to the checkout submit button when it closes.
- Close on Escape and backdrop click only while idle, not while payment/order processing is active.
- Keep touch targets and responsive width consistent with the existing mobile-first UI.
- Make loading/success text available through an `aria-live` region.

### 5. Model the two confirmation outcomes

**File:** `src/screens/Checkout.tsx`

#### Cash on Delivery

- After modal confirmation, briefly show the existing placing state.
- Create the order with `paymentStatus: 'Pending'` and `status: 'Pending'`.
- Clear the cart and navigate to `order-confirmation`.

#### Card and Bank Transfer

- After modal confirmation, show a provider-neutral handoff state such as “Connecting to Paystack / Flutterwave…”.
- Simulate a successful provider return in the prototype; do not render payment fields, collect financial information, or invent a provider-branded page.
- Show a short “Payment successful” state, then create the order.
- Create the order with `paymentStatus: 'Paid'` and `status: 'Pending'`.
- Clear the cart and navigate to `order-confirmation`.

The order must not appear in customer/admin order lists and the cart must remain intact until the relevant flow succeeds.

### 6. Keep order confirmation semantics accurate

**File:** `src/screens/OrderConfirmation.tsx`

- Keep the existing success screen and order lookup.
- Adjust confirmation messaging if needed so it is accurate for both paid online orders and Cash on Delivery orders without claiming COD has already been paid.
- Display the stored payment method as today; avoid adding gateway transaction identifiers because the prototype has no real provider response.

## Out of Scope

- Real Paystack or Flutterwave SDK/API integration.
- Real redirect URLs, webhooks, payment verification, bank account details, or transaction references.
- Backend persistence or recovery after browser refresh.
- Delivery fee changes or state-specific pricing.
- Changes to authentication, admin order-status controls, navigation, or unrelated screens.

## Verification

### Automated

- Run `pnpm build` and require a successful TypeScript/Vite production build.
- Search customer-facing source (excluding archived pasted briefs) for stale “Lagos and Ogun” delivery coverage strings.
- Confirm no unintended files or generated artifacts were changed with `git diff --stat` and `git diff`.

### Manual scenarios in the existing preview

1. Open Checkout and verify Lagos, Ogun, and Ondo are selectable.
2. Submit missing/invalid details and verify the review modal does not open.
3. Enter valid Ondo delivery details and verify the modal accurately summarizes contact, address, items, totals, and payment method.
4. Close the modal with Back to edit, Escape, and backdrop click; verify form/cart data remains intact and focus returns appropriately.
5. Confirm a Cash on Delivery order; verify no payment handoff appears, the order is created once with pending payment, the cart clears, and the confirmation screen opens.
6. Confirm a Card order; verify provider handoff and success states appear before order creation, then the order is created once as paid and the cart clears.
7. Repeat the non-COD path with Bank Transfer.
8. During processing, verify repeated clicks, Escape, and backdrop clicks cannot create duplicate orders or dismiss the flow.
9. Verify delivery coverage copy on Cart, Product Detail, Help & Support, Terms, and Privacy Policy says Lagos, Ogun, and Ondo.
10. Toggle dark mode and check the modal/backdrop, review content, loading states, and buttons remain legible on mobile and wider layouts.
11. In Admin Settings, verify Ondo is selected by default and the displayed delivery configuration is reflected by customer-facing screens.
