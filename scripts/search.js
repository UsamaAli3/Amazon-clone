export function searchProduct() {
  document.querySelector(".js-search-button").addEventListener("click", () => {
    const search = document.querySelector(".js-search-bar").value;

    window.location.href = `amazon.html?search=${search}`;

    /*
    //can also target the href of using <a></a> element property using currentTarget
    event.currentTarget.href = `amazon.html?search=${search}`;
    */
  });

  document
    .querySelector(".js-search-bar")
    .addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const search = document.querySelector(".js-search-bar").value;

        window.location.href = `amazon.html?search=${search}`;
      }
    });
}
