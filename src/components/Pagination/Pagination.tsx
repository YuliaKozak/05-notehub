import css from "./Pagination.module.css";

import type { ComponentType } from "react";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  // Безпечно дістаємо дефолтний експорт без використання 'any'
  // через перевірку наявності властивості в об'єкті
  const Paginate =
    typeof ReactPaginate === "object" &&
    ReactPaginate !== null &&
    "default" in ReactPaginate
      ? ((ReactPaginate as Record<string, unknown>)
          .default as typeof ReactPaginate)
      : ReactPaginate;

  return (
    <Paginate
      forcePage={currentPage - 1}
      pageCount={totalPages}
      onPageChange={handlePageClick}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      containerClassName={css.pagination}
      pageClassName={css.active}
      pageLinkClassName=""
      previousClassName=""
      previousLinkClassName=""
      nextClassName=""
      nextLinkClassName=""
      breakClassName=""
      breakLinkClassName=""
      activeClassName=""
    />
  );
}

export default Pagination;
