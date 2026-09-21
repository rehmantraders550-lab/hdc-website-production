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
    if (!steps.length || buttons.length !== steps.length) return;

    let activeIndex = -1;
    let runId = 0;
    let startTimer = 0;
    let finishTimer = 0;

    const cancelTimers = () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(finishTimer);
      startTimer = 0;
      finishTimer = 0;
    };

    const cancelAnimations = () => {
      steps.forEach((step) => {
        step.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
      });
    };

    const syncPressedState = () => {
      buttons.forEach((button, index) => {
        button.setAttribute("aria-pressed", index === activeIndex ? "true" : "false");
      });
    };

    const resetVisualStates = (nextIndex) => {
      steps.forEach((step, index) => {
        step.classList.remove("is-active", "is-printing", "is-complete");
        if (index === nextIndex) step.classList.add("is-active");
      });
    };

    const activate = (index, moveFocus = false) => {
      if (index < 0 || index >= steps.length) return;

      if (index === activeIndex && steps[index].classList.contains("is-complete")) {
        if (moveFocus) buttons[index].focus();
        return;
      }

      runId += 1;
      const thisRun = runId;

      cancelTimers();
      cancelAnimations();
      resetVisualStates(index);

      activeIndex = index;
      syncPressedState();
      if (moveFocus) buttons[index].focus();

      const selected = steps[index];

      if (reducedMotion.matches) {
        selected.classList.add("is-complete");
        return;
      }

      startTimer = window.setTimeout(() => {
        if (thisRun !== runId || activeIndex !== index) return;

        selected.classList.add("is-printing");
        const deposit = selected.querySelector(".process-step__deposit");

        if (!deposit) {
          selected.classList.remove("is-printing");
          selected.classList.add("is-complete");
          return;
        }

        let finished = false;
        const finish = () => {
          if (finished || thisRun !== runId || activeIndex !== index) return;
          finished = true;
          window.clearTimeout(finishTimer);
          selected.classList.remove("is-printing");
          selected.classList.add("is-complete");
        };

        deposit.addEventListener("animationend", finish, { once: true });
        finishTimer = window.setTimeout(finish, 650);
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

      runId += 1;
      cancelTimers();
      cancelAnimations();

      const active = steps[activeIndex];
      active.classList.remove("is-printing");

      if (reducedMotion.matches) {
        active.classList.add("is-complete");
      } else {
        active.classList.remove("is-complete");
      }
    });
  });
})();
