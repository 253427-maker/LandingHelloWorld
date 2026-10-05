document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const entries = document.querySelectorAll(".entry");

  /* ---------- Filtro por materia ---------- */
  function applyFilter(filter) {
    filterBtns.forEach((b) =>
      b.classList.toggle("active", b.getAttribute("data-filter") === filter)
    );
    entries.forEach((entry) => {
      const show = filter === "all" || entry.getAttribute("data-category") === filter;
      entry.style.display = show ? "grid" : "none";
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => applyFilter(btn.getAttribute("data-filter")));
  });

  /* Botones "Ver entradas" dentro de cada materia */
  document.querySelectorAll(".subject-link").forEach((btn) => {
    btn.addEventListener("click", () => {
      applyFilter(btn.getAttribute("data-filter"));
      document.getElementById("bitacora").scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ---------- Ventana de lectura ---------- */
  const modal = document.getElementById("entryModal");
  const closeBtn = modal.querySelector(".close-modal");
  const modalTag = document.getElementById("modalTag");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  let lastFocused = null;

  function openEntry(entry) {
    lastFocused = document.activeElement;
    const tag = entry.querySelector(".entry-tag");
    modalTag.textContent = tag ? tag.textContent : "";
    modalTag.parentElement.style.setProperty(
      "--dot",
      getComputedStyle(entry).getPropertyValue("--dot")
    );
    modalTitle.textContent = entry.querySelector("h3").textContent;
    modalBody.innerHTML = entry.querySelector(".entry-full").innerHTML;
    modal.classList.add("open");
    document.body.classList.add("modal-open");
    modal.querySelector(".modal-content").scrollTop = 0;
    closeBtn.focus();
  }

  function closeEntry() {
    modal.classList.remove("open");
    document.body.classList.remove("modal-open");
    if (lastFocused) lastFocused.focus();
  }

  entries.forEach((entry) => {
    entry.addEventListener("click", () => openEntry(entry));
  });

  closeBtn.addEventListener("click", closeEntry);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeEntry();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeEntry();
  });
});
