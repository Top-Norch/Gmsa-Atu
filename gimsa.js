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
	membershipForm.addEventListener("submit", (event) => {
		event.preventDefault();
		formNotice.textContent = "Your details were not sent or stored. This page is a preview without a registration service.";
		formNotice.classList.add("is-preview");
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
