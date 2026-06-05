import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  currentPage: number;
  totalPages: number; // Бекенд має повертати загальну кількість сторінок
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1); // Повертаємо React-стану нормальну сторінку (починаючи з 1)
  };

  return (
    <>
      <ReactPaginate
        forcePage={currentPage - 1} // Синхронізуємо поточну сторінку
        pageCount={totalPages} // Загальна кількість сторінок
        onPageChange={handlePageClick}
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        // Нижче підключаємо класи зі стилями (налаштуй під свій CSS-модуль)
        containerClassName={css.paginationContainer}
        pageClassName={css.pageItem}
        pageLinkClassName={css.pageLink}
        previousClassName={css.pageItem}
        previousLinkClassName={css.pageLink}
        nextClassName={css.pageItem}
        nextLinkClassName={css.pageLink}
        breakClassName={css.pageItem}
        breakLinkClassName={css.pageLink}
        activeClassName={css.activePage}
      />
    </>
  );
}

export default Pagination;
