/**
 * Searchable Dropdown component for SSSAM Academy
 * Replaces standard dropdowns or text inputs with premium, searchable dropdowns.
 */
class SearchableDropdown {
  constructor(container, options = {}) {
    this.container = typeof container === "string" ? document.getElementById(container) : container;
    if (!this.container) return;

    this.options = Object.assign({
      placeholder: "Search or select...",
      apiUrl: null,
      staticItems: [],
      onSelect: null,
      showOther: true,
      otherPlaceholder: "Please specify...",
      fieldName: "field",
      required: false
    }, options);

    this.items = [];
    this.selectedItem = null;
    this.init();
  }

  async init() {
    this.container.classList.add("searchable-dropdown-container");
    this.container.innerHTML = `
      <div class="sd-wrapper">
        <input type="text" class="sd-input" placeholder="${this.options.placeholder}" autocomplete="off" ${this.options.required ? "required" : ""}>
        <span class="sd-arrow">▼</span>
        <div class="sd-list" hidden></div>
      </div>
      <div class="sd-other-wrap" style="display: none; margin-top: 10px;">
        <input type="text" class="sd-other-input" placeholder="${this.options.otherPlaceholder}">
      </div>
    `;

    this.input = this.container.querySelector(".sd-input");
    this.arrow = this.container.querySelector(".sd-arrow");
    this.list = this.container.querySelector(".sd-list");
    this.otherWrap = this.container.querySelector(".sd-other-wrap");
    this.otherInput = this.container.querySelector(".sd-other-input");

    this.bindEvents();
    await this.loadItems();
  }

  async loadItems() {
    if (this.options.apiUrl) {
      try {
        const res = await fetch(this.options.apiUrl);
        if (res.ok) {
          const data = await res.json();
          // Extract name from object list if array of objects
          this.items = data.map(item => typeof item === "object" ? item.name : item);
        }
      } catch (err) {
        console.error("Failed to load dropdown items from API:", err);
      }
    } else {
      this.items = this.options.staticItems;
    }

    if (this.options.showOther) {
      this.items.push("Other");
    }

    this.renderList(this.items);
  }

  renderList(filteredItems) {
    if (filteredItems.length === 0) {
      this.list.innerHTML = `<div class="sd-no-results">No results found</div>`;
      return;
    }

    this.list.innerHTML = filteredItems
      .map(item => `<div class="sd-item" data-value="${item}">${item}</div>`)
      .join("");
  }

  bindEvents() {
    this.input.addEventListener("focus", () => {
      this.showList();
    });

    this.input.addEventListener("input", () => {
      const val = this.input.value.trim().toLowerCase();
      const filtered = this.items.filter(item => item.toLowerCase().includes(val));
      this.renderList(filtered);
      this.showList();
      
      // If user typed something not in list, trigger selection clear unless "Other" is handled
      this.selectedItem = null;
    });

    this.arrow.addEventListener("click", (e) => {
      e.stopPropagation();
      if (this.list.hidden) {
        this.input.focus();
        this.showList();
      } else {
        this.hideList();
      }
    });

    this.list.addEventListener("click", (e) => {
      const itemEl = e.target.closest(".sd-item");
      if (!itemEl) return;

      const val = itemEl.getAttribute("data-value");
      this.select(val);
      this.hideList();
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!this.container.contains(e.target)) {
        this.hideList();
        // If not selected anything valid and input is empty/not matching, reset or handle
        if (!this.selectedItem && !this.items.includes(this.input.value)) {
          // If required or we want to force match:
          // this.input.value = "";
        }
      }
    });
  }

  select(value) {
    this.selectedItem = value;
    this.input.value = value;
    this.input.dispatchEvent(new Event("change"));

    if (value === "Other") {
      this.otherWrap.style.display = "block";
      this.otherInput.required = true;
    } else {
      this.otherWrap.style.display = "none";
      this.otherInput.required = false;
      this.otherInput.value = "";
    }

    if (this.options.onSelect) {
      this.options.onSelect(this.getValue());
    }
  }

  showList() {
    this.list.hidden = false;
    this.arrow.textContent = "▲";
  }

  hideList() {
    this.list.hidden = true;
    this.arrow.textContent = "▼";
  }

  getValue() {
    if (this.selectedItem === "Other") {
      return this.otherInput.value.trim();
    }
    return this.input.value.trim();
  }

  setValue(val) {
    if (this.items.includes(val)) {
      this.select(val);
    } else if (val) {
      this.select("Other");
      this.otherInput.value = val;
    } else {
      this.selectedItem = null;
      this.input.value = "";
      this.otherWrap.style.display = "none";
      this.otherInput.value = "";
    }
  }
}

window.SearchableDropdown = SearchableDropdown;
