import React, { useEffect } from "react";
import CategoryListOT from "./category_list_OT";
import CategoryListNT from "./category_list_NT";
import CategoryListThemes from "./category_list_Themes";
import { bibleBooks } from '../home/function_helpers/bookTitles'
import { setPayload, sortTitles, sortAlphabetically} from '../home/function_helpers/helper_funcs'

const styles = {
  she: {
    div: "categories-title-she",
  },
  he: {
    div: "categories-title-he",
  },
};

const CategoriesPage = ({
  fetchDevoIndex,
  fetchDevoBook,
  closeModal,
  sheDevoIndex,
  heDevoIndex,
}) => {
  useEffect(() => {
    fetchDevoIndex();
  }, []);

  /***********************************
   *           handleClick           *
   ***********************************/

  const handleClick = (devoPayload, e) => {
    e.preventDefault();
    fetchDevoBook(setPayload(devoPayload));
    return closeModal();
  };

  /***********************************
   *           renderBooks           *
   ***********************************/

  const renderBooks = (type, gender) => {
    let klass = gender === "she" ? "she-category-ul" : "he-category-ul";
    let devoIndex = gender === "she" ? sheDevoIndex : heDevoIndex;
    let Component = type === "ot" ? CategoryListOT : CategoryListNT;

    return (
      <ul className={klass}>
        {sortTitles(devoIndex, bibleBooks).map((title, i) => (
          <Component title={title} handleClick={handleClick} key={i} />
        ))}
      </ul>
    );
  };

  /***********************************
   *           renderThemes          *
   ***********************************/

  const renderThemes = (gender) => {
    let klass = gender === "she" ? "she-category-ul" : "he-category-ul";
    let devoIndex = gender === "she" ? sheDevoIndex : heDevoIndex;

    return (
      <ul className={klass}>
        {sortAlphabetically(devoIndex, bibleBooks).map((title, i) => (
          <CategoryListThemes title={title} handleClick={handleClick} key={i} />
        ))}
      </ul>
    );
  };

  /***********************************
   *              render             *
   ***********************************/

  return (
    <div className="categories-page-container">
      <div className="form-closing-x" onClick={closeModal}>
        &#10005;
      </div>

      <section className="categories-section-she">
        <div className={styles.she.div}>
          <span>Old Testament</span>
        </div>
        <div className="categories-OT">{renderBooks("ot", "she")}</div>
        <div className={styles.she.div}>
          <span>New Testament</span>
        </div>
        <div className="categories-NT">{renderBooks("nt", "she")}</div>
        <div className={styles.she.div}>
          <span>Themes</span>
        </div>
        <div className="categories-Other">{renderThemes("she")}</div>
      </section>

      <div className="form-or-separator-categories">
        <hr />
      </div>

      <section className="categories-section-he">
        <div className={styles.he.div}>
          <span>Old Testament</span>
        </div>
        <div className="categories-OT">{renderBooks("ot", "he")}</div>
        <div className={styles.he.div}>
          <span>New Testament</span>
        </div>
        <div className="categories-NT">{renderBooks("nt", "he")}</div>
        <div className={styles.he.div}>
          <span>Themes</span>
        </div>
        <div className="categories-Other">
          <div className="categories-Other">{renderThemes("he")}</div>
        </div>
      </section>
    </div>
  );
};

export default CategoriesPage;
