# RemitWise Component Reference

Public component props, usage notes, and design-token contracts.
Keep this file in sync whenever a public prop signature changes.

---

## Table of Contents

1. [StatCard](#statcard)
2. [WidgetErrorState](#widgeterrorstate)
3. [DashboardLoadingSkeleton](#dashboardloadingskeleton)
4. [RecipientAddressInput](#recipientaddressinput)
5. [AmountCurrencySection](#amountcurrencysection)
6. [ReviewStep](#reviewstep)
7. [TransactionSuccessReceipt](#transactionsuccessreceipt)
8. [SmartMoneySplitHeader](#smartmoneysplittheader)
9. [AsyncSubmissionStatus](#asyncsubmissionstatus)
10. [Design tokens](#design-tokens)

---

## StatCard

`components/Dashboard/StatCard.tsx`

Displays a single KPI tile on the dashboard grid.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | required | Card heading (e.g. "Total Sent"). |
| `value` | `string` | required | Formatted primary metric (e.g. "$4,250.00"). |
| `icon` | `React.ReactNode` | required | Icon rendered in the top-left pill. |
| `detail1` | `string` | — | Primary change/highlight text (e.g. "+$240"). Canonical alias of legacy `percentage`. |
| `detail1Color` | `string` | `"text-[#DC2626]"` | Tailwind text-color class for `detail1`. Must reference a design-token color — no hard-coded hex. |
| `detail2` | `string` | — | Secondary contextual text (e.g. "12 transfers"). |
| `showTrend` | `boolean` | `true` when `detail1` present | Override whether the trend indicator (icon + text) is shown. |
| `trend` | `"up" \| "down" \| "none"` | `"up"` | Drives the directional icon and accessible label. Never conveys meaning through color alone. |
| `percentage` | `string` | — | **Deprecated.** Legacy alias for `detail1`. Use `detail1` in new code. |

### Design tokens used

- Background: CSS variable `--card` (`linear-gradient(var(--color-bg2), var(--color-bg3))`)
- Border: `border-[#FFFFFF14]` hover `border-white/30`
- Icon container background: `bg-[#2D0A0A]` — a dark-red tint derived from `--accent`
- Text: `text-gray-400` (label), `text-white` (value)

### Usage

```tsx
<StatCard
  title="Total Sent"
  value="$4,250.00"
  icon={<Send className="w-5 h-5" />}
  detail2="4 transfers"
/>
```

---

## WidgetErrorState

`components/ui/WidgetErrorState.tsx`

Inline error fallback with a retry action.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `message` | `string` | required | Error description shown to the user. |
| `onRetry` | `() => void` | required | Callback invoked when the user activates the retry button. |

### Usage

```tsx
<WidgetErrorState
  message="We couldn't load your dashboard summary."
  onRetry={reload}
/>
```

---

## DashboardLoadingSkeleton

`components/ui/LoadingSkeletons.tsx`

Skeleton placeholder shown while the dashboard data is fetching.

### Props

None — renders a fixed four-card skeleton grid matching the dashboard layout.

---

## RecipientAddressInput

`app/send/components/RecipientAddressInput.tsx`

Step 1 of the Send wizard — Stellar address input with inline checksum validation.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `initialAddress` | `string` | `""` | Pre-filled address (e.g. from a recent-recipient selection). |
| `onAddressChange` | `(address: string) => void` | required | Called on every keystroke with the current raw value. |
| `onContinue` | `() => void` | required | Called when the user activates "Continue to Amount" on a valid address. |

### Validation rules

- Must be exactly 56 characters.
- Must start with `G` (Stellar public key prefix).
- Checksum is verified client-side via the Stellar SDK.

---

## AmountCurrencySection

`app/send/components/AmountCurrencySection.tsx`

Step 2 of the Send wizard — amount entry and currency selection.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `onReview` | `(amount: number, currency: string) => void` | required | Called when the user activates "Review Transaction" with valid inputs. |
| `onBack` | `() => void` | required | Called when the user activates "Back to Recipient". |

### Validation rules

- Minimum amount: $1.00
- Maximum amount: $10,000.00

---

## ReviewStep

`app/send/components/ReviewStep.tsx`

Step 3 of the Send wizard — read-only summary before confirmation.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `recipient` | `string` | required | Stellar address of the recipient. |
| `amount` | `number` | required | Amount in the chosen currency. |
| `currency` | `string` | required | Currency code (e.g. `"USDC"`, `"XLM"`). |
| `onConfirm` | `() => void` | required | Called when the user activates "Confirm & Send Remittance". |
| `onBack` | `() => void` | required | Called when the user activates "Back to Amount". |
| `onEmergencyAction` | `() => void` | required | Called to open the Emergency Transfer modal. |
| `isPending` | `boolean` | `false` | When `true`, the confirm button is disabled and shows a loading spinner. |

---

## TransactionSuccessReceipt

`components/TransactionSuccessReceipt.tsx`

Full-screen overlay receipt shown after a successful send.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `hash` | `string` | required | Transaction ID / hash. |
| `amount` | `number` | required | Sent amount. |
| `currency` | `string` | required | Currency code. |
| `recipientName` | `string` | required | Truncated address or display name. |
| `recipientAddress` | `string` | required | Full Stellar address. |
| `date` | `string` | required | Formatted date string. |
| `fee` | `number` | required | Network fee (XLM base reserve). |
| `splits` | `{ spending: number; savings: number; bills: number; insurance: number }` | required | Per-bucket allocation amounts. |
| `onClose` | `() => void` | required | Called when the user dismisses the receipt. |

---

## SmartMoneySplitHeader

`components/SmartMoneySplitHeader.tsx`

Page header for the `/split` route.

### Props

None.

---

## AsyncSubmissionStatus

`components/AsyncSubmissionStatus.tsx`

Inline status card that reflects idle / pending / success / error states for async form submissions.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `pending` | `boolean` | required | Whether a submission is in flight. |
| `error` | `string \| undefined` | — | Error message to display. |
| `success` | `string \| undefined` | — | Success message to display. |
| `idleTitle` | `string` | required | Heading shown in idle state. |
| `idleDescription` | `string` | required | Body copy shown in idle state. |
| `pendingTitle` | `string` | required | Heading shown while pending. |
| `pendingDescription` | `string` | required | Body copy shown while pending. |
| `successTitle` | `string` | required | Heading shown on success. |
| `successDescription` | `string \| undefined` | — | Body copy shown on success (falls back to `success` prop). |
| `errorTitle` | `string` | required | Heading shown on error. |

---

## Design tokens

All colors and spacing in components **must** reference the Tailwind design tokens defined in `tailwind.config.js` or the CSS custom properties in `app/globals.css`. Hard-coded hex values, pixel spacing, or border-radius values are not permitted in component files.

### Color tokens

| Token | Value | Usage |
|---|---|---|
| `brand-red` | `#D72323` | Primary action color, active states |
| `brand-dark` | `#0A0A0A` | Page background |
| `--accent` | `#dc2626` | CSS variable — icon tints, neon-pulse |
| `--card` | `linear-gradient(#0f0f0f, #0a0a0a)` | StatCard background |
| `status-success-fg` | `#86EFAC` | Success text |
| `status-error-fg` | `#FDA4AF` | Error text |
| `status-warning-fg` | `#FDE68A` | Warning text |

### Spacing tokens

See `tailwind.config.js` → `theme.extend.spacing` for the full list.
Key values: `space-xs` (4px), `space-sm` (8px), `space-md` (16px), `space-lg` (24px), `space-xl` (32px).

### Focus ring tokens

Use `ring-focus` (3px) and `ring-offset-focus` (4px) for keyboard-focus styles.

---

*Last updated: 2026-06-26 — added visual regression test coverage for StatCard, WidgetErrorState, RecipientAddressInput, ReviewStep, and AsyncSubmissionStatus (issue #763).*
