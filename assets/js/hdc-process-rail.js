(() => {
  "use strict";

  const roots = document.querySelectorAll("[data-process-rail]");
  if (!roots.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  roots.forEach((root) => {
    if (root.dataset.processRailReady === "true") return;
    root.dataset.processRailReady = "true";

    const steps = Array.from(root.querySelectorAll(".process-step"));
    const buttons = steps.map((step) => step.querySelector(".process-step__trigger")).filter(Boolean);
    let activeIndex = -1;
    let activationTimer = 0;

    const clearAnimationState = (step) => {
      step.classList.remove("is-printing", "is-complete");
      step.querySelectorAll(".process-step__deposit, .process-step__pass, .process-step__rail::before");
      step.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
    };

    const setPressedState = () => {
      buttons.forEach((button, index) => {
        button.setAttribute("aria-pressed", index === activeIndex ? "true" : "false");
      });
    };

    const activate = (index, moveFocus = false) => {
      if (index < 0 || index >= steps.length) return;
      if (index === activeIndex && steps[index].classList.contains("is-complete")) {
        if (moveFocus) buttons[index].focus();
        return;
      }

      window.clearTimeout(activationTimer);

      steps.forEach((step, stepIndex) => {
        step.classList.remove("is-active", "is-printing", "is-complete");
        step.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
        if (stepIndex === index) step.classList.add("is-active");
      });

      activeIndex = index;
      setPressedState();
      if (moveFocus) buttons[index].focus();

      const selected = steps[index];

      if (reducedMotion.matches) {
        selected.classList.add("is-complete");
        return;
      }

      activationTimer = window.setTimeout(() => {
        if (activeIndex !== index) return;
        selected.classList.add("is-printing");

        const deposit = selected.querySelector(".process-step__deposit");
        if (!deposit) {
          selected.classList.remove("is-printing");
          selected.classList.add("is-complete");
          return;
        }

        const finish = () => {
          if (activeIndex !== index) return;
          selected.classList.remove("is-printing");
          selected.classList.add("is-complete");
        };

        deposit.addEventListener("animationend", finish, { once: true });
        window.setTimeout(finish, 700);
      }, 70);
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

    reducedMotion.addEventListener?.("change", () => {
      if (activeIndex < 0) return;
      steps[activeIndex].classList.remove("is-printing");
      steps[activeIndex].classList.add("is-complete");
    });
  });
})();