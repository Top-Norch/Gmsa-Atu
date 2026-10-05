const menuToggle = document.querySelector(".menu-toggle");
const menuPanel = document.querySelector(".menu-panel");
const membershipForm = document.querySelector("#membership-form");
const formNotice = document.querySelector("#form-notice");

function setMenuOpen(isOpen) {
	menuToggle.setAttribute("aria-expanded", String(isOpen));
	menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
	menuPanel.hidden = !isOpen;
}

menuToggle.addEventListener("click", () => {
	setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

menuPanel.addEventListener("click", (event) => {
	if (event.target.closest("a")) setMenuOpen(false);
});

document.addEventListener("click", (event) => {
	if (!menuPanel.hidden && !event.target.closest(".nav")) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape" && !menuPanel.hidden) {
		setMenuOpen(false);
		menuToggle.focus();
	}
});

if (membershipForm) {
	const googleFormUrl = (membershipForm.dataset.googleFormUrl || "").trim();

	const setFormNotice = (message, state = "preview") => {
		formNotice.textContent = message;
		formNotice.classList.remove("is-preview", "is-success", "is-error");
		if (state === "success") {
			formNotice.classList.add("is-success");
		} else if (state === "error") {
			formNotice.classList.add("is-error");
		} else {
			formNotice.classList.add("is-preview");
		}
	};

	membershipForm.addEventListener("submit", (event) => {
		event.preventDefault();

		if (!membershipForm.checkValidity()) {
			membershipForm.reportValidity();
			setFormNotice("Please complete the required fields before submitting.", "error");
			return;
		}

		if (!googleFormUrl) {
			setFormNotice("Add your Google Form URL to activate live registration. The form is ready for linking.", "preview");
			return;
		}

		window.open(googleFormUrl, "_blank", "noopener,noreferrer");
		setFormNotice("Your registration page has opened in a new tab. Please complete the Google Form to submit your details.", "success");
	});
}

const coreValueItems = document.querySelectorAll(".about-value");

if (coreValueItems.length && "IntersectionObserver" in window) {
	const valuesObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("is-visible");
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.15 });

	coreValueItems.forEach((item, index) => {
		item.style.setProperty("--reveal-delay", `${index * 90}ms`);
		item.classList.add("reveal-pending");
		valuesObserver.observe(item);
	});
}

document.querySelector("#year").textContent = new Date().getFullYear();
