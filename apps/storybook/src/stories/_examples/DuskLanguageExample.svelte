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

<section class="dsl-page">
  <header class="dsl-topbar">
    <div class="dsl-brand">
      <span class="dsl-mark" aria-hidden="true"></span>
      <div>
        <p class="dsl-label">[ DUSKIT ]</p>
        <h1>Dusk app language</h1>
      </div>
    </div>
    <nav class="dsl-actions" aria-label="Demo actions">
      <Button icon={{ path: mdiBellOutline }} variant="tertiary" />
      <Button icon={{ path: mdiCogOutline }} variant="tertiary" />
      <Button text="Connect wallet" variant="primary" />
    </nav>
  </header>

  <div class="dsl-grid">
    <Card className="dsl-card dsl-balance">
      <svelte:fragment slot="header">
        <div class="dsl-section-header">
          <span>[ TOTAL BALANCE ]</span>
          <Badge text="Testnet" variant="success" />
        </div>
      </svelte:fragment>

      <div class="dsl-amount">29,715.1207</div>
      <dl class="dsl-split">
        <div>
          <dt>Public</dt>
          <dd>29,600.1189</dd>
        </div>
        <div>
          <dt>Shielded</dt>
          <dd>115.0018</dd>
        </div>
      </dl>

      <svelte:fragment slot="footer">
        <div class="dsl-button-grid">
          <Button
            icon={{ path: mdiArrowTopRight, position: "before", size: "small" }}
            text="Send"
            variant="secondary"
          />
          <Button
            icon={{ path: mdiPlus, position: "before", size: "small" }}
            text="Receive"
            variant="secondary"
          />
          <Button
            icon={{ path: mdiSwapHorizontal, position: "before", size: "small" }}
            text="Shield"
            variant="secondary"
          />
          <Button
            icon={{ path: mdiBankTransfer, position: "before", size: "small" }}
            text="Stake"
            variant="secondary"
          />
        </div>
      </svelte:fragment>
    </Card>

    <Card className="dsl-card dsl-panel">
      <svelte:fragment slot="header">
        <div class="dsl-section-header">
          <span>[ ORDER ]</span>
          <Badge text="Ready" variant="info" />
        </div>
      </svelte:fragment>

      <label class="dsl-field">
        <span>Amount</span>
        <Textbox name="amount" value="1250.00" />
      </label>
      <label class="dsl-field">
        <span>Destination</span>
        <Textbox name="destination" value="0x4f2a...d8e1" />
      </label>

      <svelte:fragment slot="footer">
        <Button
          icon={{ path: mdiCheck, position: "before", size: "small" }}
          text="Review order"
          variant="primary"
        />
      </svelte:fragment>
    </Card>
  </div>

  <Card className="dsl-card">
    <svelte:fragment slot="header">
      <div class="dsl-section-header">
        <span>[ MARKETS ]</span>
        <ContentSwitch items={tabs} selectedTab="positions" />
      </div>
    </svelte:fragment>

    <div class="dsl-table-scroll">
      <Table data={markets} {descriptors} />
    </div>
  </Card>

  <Card className="dsl-card">
    <svelte:fragment slot="header">
      <div class="dsl-section-header">
        <span>[ RECENT TRANSACTIONS ]</span>
        <Button text="View all" variant="tertiary" size="small" />
      </div>
    </svelte:fragment>

    <ul class="dsl-activity">
      {#each activity as item (item.title)}
        <li class="dsl-activity-item">
          <span class:positive={item.tone === "success"} class="dsl-activity-icon">
            {item.tone === "warning" ? "!" : "->"}
          </span>
          <div class="dsl-activity-copy">
            <strong>{item.title}</strong>
            <span>{item.detail}</span>
          </div>
          <Badge text={item.status} variant={item.tone} />
          <strong class="dsl-activity-amount">{item.amount}</strong>
        </li>
      {/each}
    </ul>
  </Card>
</section>

<style>
  .dsl-page {
    display: flex;
    width: min(72rem, calc(100vw - 3rem));
    margin: 0 auto;
    padding: 2rem 0;
    color: var(--on-background-color);
    flex-direction: column;
    gap: var(--large-gap);
  }

  .dsl-topbar,
  .dsl-section-header,
  .dsl-actions,
  .dsl-brand,
  .dsl-split,
  .dsl-button-grid,
  .dsl-activity-item {
    display: flex;
    align-items: center;
  }

  .dsl-topbar {
    justify-content: space-between;
    gap: var(--default-gap);
  }

  .dsl-brand,
  .dsl-actions,
  .dsl-section-header {
    gap: var(--small-gap);
  }

  .dsl-section-header {
    width: 100%;
    justify-content: space-between;
  }

  .dsl-section-header > span,
  .dsl-label {
    font-family: var(--mono-font-family);
    font-size: 0.6875rem;
    line-height: 1;
    color: var(--cornflower-light);
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  .dsl-label {
    margin: 0 0 0.375rem;
  }

  .dsl-mark {
    width: 2rem;
    height: 2rem;
    background:
      linear-gradient(90deg, transparent 42%, var(--smokey-black) 42% 58%, transparent 58%),
      var(--cornflower);
    border-radius: var(--control-border-radius-size);
  }

  h1 {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.1;
  }

  .dsl-grid {
    display: grid;
    gap: var(--large-gap);
    grid-template-columns: minmax(0, 1.35fr) minmax(18rem, 0.65fr);
  }

  :global(.dsl-card) {
    min-width: 0;
  }

  .dsl-amount {
    font-size: clamp(2.5rem, 8vw, 4.75rem);
    font-weight: 500;
    line-height: 0.95;
  }

  .dsl-split {
    padding: 0.75rem 0 0;
    border-top: var(--control-border-size) solid var(--surface-border-color);
    justify-content: space-between;
    gap: var(--default-gap);
  }

  .dsl-split div {
    min-width: 0;
    flex: 1;
  }

  .dsl-split dt,
  .dsl-field span,
  .dsl-activity-copy span {
    color: var(--muted-color);
  }

  .dsl-split dt,
  .dsl-split dd {
    margin: 0;
  }

  .dsl-split dd {
    margin-top: 0.375rem;
    font-weight: 500;
  }

  .dsl-button-grid {
    width: 100%;
    gap: var(--small-gap);
  }

  .dsl-button-grid :global(.dusk-button) {
    flex: 1;
  }

  .dsl-field {
    display: grid;
    gap: 0.5rem;
  }

  .dsl-table-scroll {
    width: 100%;
    overflow-x: auto;
  }

  .dsl-table-scroll :global(.duskit-table) {
    min-width: 48rem;
  }

  :global(.dsl-panel .dusk-card__footer-container) {
    display: flex;
    justify-content: flex-end;
  }

  .dsl-activity {
    display: grid;
    list-style: none;
    gap: 0;
  }

  .dsl-activity-item {
    min-width: 0;
    padding: 0.875rem 0;
    border-bottom: var(--control-border-size) solid var(--surface-border-color);
    gap: var(--default-gap);
  }

  .dsl-activity-item:first-child {
    padding-top: 0;
  }

  .dsl-activity-item:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }

  .dsl-activity-icon {
    display: grid;
    width: 2.25rem;
    height: 2.25rem;
    color: var(--cornflower-light);
    background-color: var(--surface-alt-color);
    border-radius: var(--control-border-radius-size);
    flex: 0 0 auto;
    place-items: center;
  }

  .dsl-activity-icon.positive {
    color: var(--success-color);
  }

  .dsl-activity-copy {
    display: grid;
    min-width: 0;
    gap: 0.25rem;
    flex: 1;
  }

  .dsl-activity-amount {
    margin-left: auto;
  }

  @media (width <= 760px) {
    .dsl-page {
      width: min(100%, calc(100vw - 1rem));
      padding: 1rem 0;
    }

    .dsl-topbar,
    .dsl-grid,
    .dsl-activity-item {
      display: grid;
    }

    .dsl-grid {
      grid-template-columns: 1fr;
    }

    .dsl-actions,
    .dsl-button-grid {
      flex-wrap: wrap;
    }

    .dsl-activity-amount {
      margin-left: 0;
    }
  }
</style>
