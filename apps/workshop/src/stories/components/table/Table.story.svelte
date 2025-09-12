<svelte:options immutable={true} />

<script>
  /** @typedef {{ id: number; name: string; email: string; posts: number; }} User */
  /** @typedef {import("@duskit/components").TableDescriptor<User>} UserDescriptor */
  /** @typedef {import("@duskit/components").TableCellDataComponentRenderer<User, "posts", typeof Badge>} BadgeRenderer */

  import { logEvent } from "histoire/client";
  import { Badge, Button, Table } from "@duskit/components";

  export let Hst;

  const data = [
    { email: "jane.doe@example.com", id: 2, name: "Jane Doe", posts: 15 },
    { email: "john.doe@example.com", id: 1, name: "John Doe", posts: 5 },
    { email: "mario.rossi@example.com", id: 3, name: "Mario Rossi", posts: 25 },
  ];

  /** @type {UserDescriptor[]} */
  const descriptors = [
    {
      name: "id",
      sortable: true,
    },
    {
      name: "name",
      sortable: true,
    },
    {
      name: "email",
      sortable: true,
    },
    {
      name: "posts",

      /** @type {BadgeRenderer} */
      renderer: {
        component: Badge,
        getProps: (posts) => ({ text: posts.toString() }),
      },
      sortable: true,
    },
    {
      name: "actions",
      renderer: {
        component: Button,
        getProps: (user) => ({
          size: "small",
          text: `Edit (${user.id})`,
          variant: "secondary",
        }),
      },
    },
  ];
</script>

<Hst.Story title="Table" group="components">
  <Table {data} {descriptors} on:sort={(event) => logEvent("sort", event)} />
</Hst.Story>
