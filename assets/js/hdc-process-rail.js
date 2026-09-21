(() => {
  "use strict";

  const roots = document.querySelectorAll("[data-process-rail]");
  if (!roots.length) return;

  roots.forEach((root) => {
    if (root.dataset.processRailReady === "true") return;
    root.dataset.processRailReady = "true";

    const steps = Array.from(root.querySelectorAll(".process-step"));
    const buttons = steps.map((step) => step.querySelector(".process-step__trigger")).filter(Boolean);
    if (!steps.length || buttons.length !== steps.length) return;

    let activeIndex = -1;

    const syncPressedState = () => {
      buttons.forEach((button, index) => {
        button.setAttribute("aria-pressed", index === activeIndex ? "true" : "false");
      });
    };

    const activate = (index, moveFocus = false) => {
      if (index < 0 || index >= steps.length) return;

      if (index === activeIndex) {
        if (moveFocus) buttons[index].focus();
        return;
      }

      activeIndex = index;

      steps.forEach((step, stepIndex) => {
        step.classList.toggle("is-active", stepIndex === index);
      });

      syncPressedState();

      if (moveFocus) {
        buttons[index].focus();
      }
    };

    buttons.forEach((button, index) => {
      button.addEventListener("click", () => activate(index));

      button.addEventListener("keydown", (event) => {
        let target = null;

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          target = (index + 1) % buttons.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          target = (index - 1 + buttons.length) % buttons.length;
        } else if (event.key === "Home") {
          target = 0;
        } else if (event.key === "End") {
          target = buttons.length - 1;
        }

        if (target === null) return;

        event.preventDefault();
        activate(target, true);
      });
    });
  });
})();
