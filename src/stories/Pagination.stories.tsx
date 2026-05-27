import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { Pagination } from "../components/pagination.js";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function PaginationExample() {
    const [page, setPage] = React.useState(1);
    return <Pagination page={page} pageSize={10} total={100} onPageChange={setPage} />;
  },
};

export const WithPageSizeSelector: Story = {
  render: function PaginationWithPageSize() {
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10);
    return (
      <Pagination
        page={page}
        pageSize={pageSize}
        total={200}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
        showPageSizeChange
      />
    );
  },
};

export const LastPage: Story = {
  render: function PaginationLastPage() {
    const [page, setPage] = React.useState(10);
    return <Pagination page={page} pageSize={10} total={100} onPageChange={setPage} />;
  },
};

export const SmallDataset: Story = {
  render: function PaginationSmall() {
    const [page, setPage] = React.useState(1);
    return <Pagination page={page} pageSize={10} total={25} onPageChange={setPage} />;
  },
};
