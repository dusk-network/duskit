<svelte:options immutable={true} />

<script>
  import {
    mdiArrowTopRight,
    mdiBankTransfer,
    mdiBellOutline,
    mdiCheck,
    mdiCogOutline,
    mdiPlus,
    mdiSwapHorizontal,
  } from "@mdi/js";

  import {
    Badge,
    Button,
    Card,
    ContentSwitch,
    Table,
    Textbox,
  } from "@duskit/components";

  const tabs = [
    { id: "positions", label: "Positions" },
    { id: "activity", label: "Activity" },
  ];

  const markets = [
    {
      asset: "DUSK / USDC",
      change: "+2.18%",
      liquidity: "$1.24M",
      status: "Active",
      volume: "$284.6K",
    },
    {
      asset: "ABRDN EUR",
      change: "+0.42%",
      liquidity: "$640.2K",
      status: "Review",
      volume: "$92.1K",
    },
    {
      asset: "State Street USD",
      change: "-0.16%",
      liquidity: "$812.8K",
      status: "Paused",
      volume: "$118.4K",
    },
  ];

  const descriptors = [
    { name: "asset", label: "Market", sortable: true },
    { name: "volume", label: "24h volume", sortable: true },
    { name: "liquidity", label: "Liquidity", sortable: true },
    { name: "change", label: "Move" },
    { name: "status", label: "Status" },
  ];

  const activity = [
    {
      amount: "+500 DUSK",
      detail: "Moonlight - block 1,204,300",
      status: "Failed",
      title: "Error while performing the transaction",
      tone: "error",
    },
    {
      amount: "+1,250.00 DUSK",
      detail: "Moonlight - block 1,204,318",
      status: "Finalized",
      title: "Received from 0x4f2a...d8e1",
      tone: "success",
    },
    {
      amount: "-500.00 DUSK",
      detail: "Hyperstaking - 10s finality",
      status: "Finalized",
      title: "Stake delegated to val_7f2c",
      tone: "info",
    },
    {
      amount: "-2,500.00 DUSK",
      detail: "Moonlight",
      status: "Pending",
      title: "Sent to npex_treasury",
      tone: "warning",
    },
  ];
</script>

<main class="dashboard">
  <header class="dashboard__header">
    <div class="dashboard__brand">
      <span class="brand-mark" aria-hidden="true"></span>
      <div class="brand-text">
        <span class="eyebrow-heading">Duskit</span>
        <h1 class="brand-title">Dusk app example</h1>
      </div>
    </div>

    <nav class="dashboard__actions" aria-label="Global actions">
      <Button icon={{ path: mdiBellOutline }} variant="tertiary" />
      <Button icon={{ path: mdiCogOutline }} variant="tertiary" />
      <Button text="Connect wallet" variant="primary" />
    </nav>
  </header>

  <div class="dashboard__content">
    <div class="dashboard__grid-top">
      <article class="dashboard__card-balance">
        <Card>
          <svelte:fragment slot="header">
            <h2 class="eyebrow-heading">Total Balance</h2>
            <Badge text="Testnet" variant="success" />
          </svelte:fragment>

          <div class="balance-amount">29,715.1207</div>
          <dl class="balance-split">
            <div class="balance-split-item">
              <dt>Public</dt>
              <dd>29,600.1189</dd>
            </div>
            <div class="balance-split-item">
              <dt>Shielded</dt>
              <dd>115.0018</dd>
            </div>
          </dl>

          <svelte:fragment slot="footer">
            <Button
              icon={{ path: mdiArrowTopRight, position: "before" }}
              size="small"
              text="Send"
              variant="secondary"
            />
            <Button
              icon={{ path: mdiPlus, position: "before" }}
              size="small"
              text="Receive"
              variant="secondary"
            />
            <Button
              icon={{ path: mdiSwapHorizontal, position: "before" }}
              size="small"
              text="Shield"
              variant="secondary"
            />
            <Button
              icon={{ path: mdiBankTransfer, position: "before" }}
              size="small"
              text="Stake"
              variant="secondary"
            />
          </svelte:fragment>
        </Card>
      </article>

      <article class="dashboard__card-order">
        <Card>
          <svelte:fragment slot="header">
            <h2 class="eyebrow-heading">Order</h2>
            <div class="order-badges">
              <Badge text="Ready" variant="info" />
            </div>
          </svelte:fragment>

          <div class="form-layout">
            <label class="form-field">
              <span class="form-label">Amount</span>
              <Textbox name="amount" value="1250.00" />
            </label>
            <label class="form-field">
              <span class="form-label">Destination</span>
              <Textbox name="destination" value="0x4f2a...d8e1" />
            </label>
          </div>

          <svelte:fragment slot="footer">
            <Button
              icon={{ path: mdiCheck, position: "before" }}
              size="small"
              text="Review order"
              variant="primary"
            />
          </svelte:fragment>
        </Card>
      </article>
    </div>

    <article class="dashboard__card-markets">
      <Card>
        <svelte:fragment slot="header">
          <h2 class="eyebrow-heading">Markets</h2>
          <ContentSwitch items={tabs} selectedTab="positions" />
        </svelte:fragment>

        <Table data={markets} {descriptors} />
      </Card>
    </article>

    <article class="dashboard__card-activity">
      <Card>
        <svelte:fragment slot="header">
          <h2 class="eyebrow-heading">Recent Transactions</h2>
          <Button text="View all" variant="tertiary" size="small" />
        </svelte:fragment>

        <ul class="activity-list">
          {#each activity as item (item.title)}
            <li class="activity-item">
              <span
                class="activity-icon"
                class:positive={item.tone === "success"}
                aria-hidden="true"
              >
                {item.tone === "warning" ? "!" : "->"}
              </span>
              <div class="activity-details">
                <strong class="activity-title">{item.title}</strong>
                <span class="activity-subtitle">{item.detail}</span>
              </div>
              <Badge text={item.status} variant={item.tone} />
              <strong class="activity-amount">{item.amount}</strong>
            </li>
          {/each}
        </ul>
      </Card>
    </article>
  </div>
</main>

<style>
  /* * MISSING CONTRACTS PROTOCOL
   * These tokens should be added to Layer 3 (e.g., layout.css).
   * Mapped here temporarily to avoid polluting the component with Layer 1.
   */
  .dashboard {
    --_local-eyebrow-text-color: var(--text-accent-primary-color);
    --_local-border-color: var(--surface-border-color);
    --_local-muted-text-color: var(--muted-color);
  }

  /* ==========================================================================
     LAYOUT
     ========================================================================== */
  .dashboard {
    display: flex;
    flex-direction: column;
    gap: var(--layout-box-relaxed-gap);
    width: min(72rem, calc(100vw - 3rem));
    margin-inline: auto;
    padding-block: var(--layout-box-standard-padding-block);
  }

  .dashboard__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--layout-box-standard-gap);
  }

  .dashboard__content {
    display: flex;
    flex-direction: column;
    gap: var(--layout-box-relaxed-gap);
  }

  .dashboard__grid-top {
    display: grid;
    grid-template-columns: minmax(0, 1.35fr) minmax(18rem, 0.65fr);
    gap: var(--layout-box-relaxed-gap);
  }

  /* ==========================================================================
     HEADER & BRANDING
     ========================================================================== */
  .dashboard__brand {
    display: flex;
    align-items: center;
    gap: var(--layout-box-compact-gap);
  }

  .brand-text {
    display: flex;
    flex-direction: column;
    gap: var(--layout-box-compact-gap);
  }

  .brand-mark {
    width: 2rem;
    height: 2rem;
    background:
      linear-gradient(
        90deg,
        transparent 42%,
        var(--smokey-black) 42% 58%,
        transparent 58%
      ),
      var(--cornflower); /* Exception for direct brand logo colors */
    border-radius: var(--layout-box-radius-slight-size);
  }

  .brand-title {
    margin: 0;
    font-family: var(--layout-heading-text-family);
    font-size: var(--layout-heading-text-size);
    line-height: 1.1;
  }

  .dashboard__actions {
    display: flex;
    align-items: center;
    gap: var(--layout-box-compact-gap);
    flex-wrap: wrap;
  }

  /* ==========================================================================
     TYPOGRAPHY & EYEBROWS (The Brackets Trick)
     ========================================================================== */
  .eyebrow-heading {
    margin: 0;
    font-family: var(--layout-raw-text-family);
    font-size: var(--layout-title-text-size);
    color: var(--_local-eyebrow-text-color);
    text-transform: uppercase;
    letter-spacing: var(--layout-raw-text-letter-spacing);
  }

  /* Adds decorative brackets without polluting the HTML/Screen readers */
  .eyebrow-heading::before {
    content: "[ ";
  }
  .eyebrow-heading::after {
    content: " ]";
  }

  /* ==========================================================================
     CARDS & INTERNAL COMPONENTS
     ========================================================================== */

  /* Prevent flex/grid blowouts */
  :global(.dashboard .dusk-card) {
    min-width: 0;
  }

  /* Using the internal Card API for layout without adding DOM nodes */
  :global(.dashboard .dusk-card__header) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--layout-box-compact-gap);
  }

  :global(.dashboard .dusk-card__footer) {
    display: flex;
    align-items: center;
    gap: var(--layout-box-compact-gap);
  }

  /* --- Balance Section --- */
  .balance-amount {
    font-family: var(--display-text-family);
    font-variant-numeric: var(--display-font-variant-numeric);
    font-size: clamp(2.5rem, 8vw, 3.5rem);
    font-weight: 500;
    line-height: 0.95;
  }

  .balance-split {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--layout-box-standard-gap);
    margin: 0;
    margin-block-start: var(--layout-box-standard-padding-block);
    padding-block-start: var(--layout-box-standard-padding-block);
    border-block-start: var(--layout-box-border-width) solid
      var(--_local-border-color);
  }

  .balance-split-item {
    flex: 1;
    min-width: 0;
  }

  .balance-split-item dt {
    margin: 0;
    font-family: var(--layout-label-text-family);
    font-size: var(--layout-label-text-size);
    color: var(--_local-muted-text-color);
  }

  .balance-split-item dd {
    margin: 0;
    margin-block-start: var(--layout-box-compact-gap);
    font-family: var(--display-text-family);
    font-variant-numeric: var(--display-font-variant-numeric);
    font-weight: 500;
  }

  /* Force buttons to stretch equally in the balance footer */
  :global(.dashboard__card-balance .dusk-card__footer) {
    width: 100%;
  }
  :global(.dashboard__card-balance .dusk-card__footer .dusk-button) {
    flex: 1;
  }

  /* --- Order Section --- */
  .order-badges {
    display: flex;
    flex-wrap: wrap;
    gap: var(--layout-box-compact-gap);
  }

  .form-layout {
    display: flex;
    flex-direction: column;
    gap: var(--layout-box-standard-gap);
  }

  .form-field {
    display: grid;
    gap: var(--layout-box-compact-gap);
  }

  .form-label {
    font-family: var(--layout-label-text-family);
    font-size: var(--layout-label-text-size);
    color: var(--_local-muted-text-color);
  }

  :global(.dashboard__card-order .dusk-card__footer) {
    justify-content: flex-end;
  }

  /* --- Markets Table Section --- */

  :global(.dashboard__card-markets .dusk-card__body) {
    overflow-x: auto;
  }
  :global(.dashboard__card-markets .duskit-table) {
    min-width: 48rem;
  }

  /* --- Activity List Section --- */
  .activity-list {
    display: grid;
    gap: 0;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .activity-item {
    display: flex;
    align-items: center;
    gap: var(--layout-box-standard-gap);
    min-width: 0;
    padding-block: var(--layout-box-standard-padding-block);
    border-block-end: var(--layout-box-border-width) solid
      var(--_local-border-color);
  }

  .activity-item:first-child {
    padding-block-start: 0;
  }

  .activity-item:last-child {
    padding-block-end: 0;
    border-block-end: 0;
  }

  .activity-icon {
    display: grid;
    place-items: center;
    flex: 0 0 auto;
    width: 2.25rem;
    height: 2.25rem;
    color: var(--feedback-surface-soft-neutral-text-color);
    background-color: var(--feedback-surface-soft-neutral-bg-color);
    border-radius: var(--layout-box-radius-slight-size);
  }

  .activity-icon.positive {
    color: var(--feedback-surface-soft-success-text-color);
    background-color: var(--feedback-surface-soft-success-bg-color);
  }

  .activity-details {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    gap: var(--layout-box-compact-gap);
  }

  .activity-title {
    font-family: var(--layout-body-text-family);
    font-size: var(--layout-body-text-size);
  }

  .activity-subtitle {
    font-family: var(--layout-label-text-family);
    font-size: var(--layout-label-text-size);
    color: var(--_local-muted-text-color);
  }

  .activity-amount {
    margin-inline-start: auto;
    font-family: var(--display-text-family);
    font-variant-numeric: var(--display-font-variant-numeric);
  }

  /* ==========================================================================
     RESPONSIVE
     ========================================================================== */

  @media (max-width: 760px) {
    .dashboard {
      width: min(100%, calc(100vw - 1rem));
      padding-block: var(--layout-box-compact-padding-block);
    }

    .dashboard__header {
      flex-direction: column;
      align-items: stretch;
    }

    .dashboard__grid-top {
      grid-template-columns: 1fr;
    }

    .activity-item {
      flex-wrap: wrap;
    }

    .activity-amount {
      width: 100%;
      margin-inline-start: 0;
    }
  }
</style>
