/*
  Yıldırım Plastik Web Sitesi
  Ürünleri düzenlemek için aşağıdaki products listesini değiştirmen yeterli.
  Yeni ürün eklemek için listedeki yapıyı kopyalayıp yeni obje olarak ekle.
*/

const products = [
  {
    name: "Plastik Ürün 1",
    image: "assets/images/product-1.svg",
    short: "Dayanıklı yapısı ve temiz yüzeyiyle endüstriyel kullanıma uygun plastik ürün.",
    description: "Plastik Ürün 1; farklı sektörlerde kullanılabilecek, sağlamlık ve işlevsellik odaklı tasarlanmış örnek ürün grubudur.",
    specs: ["Yüksek dayanım", "Kolay temizlenebilir yüzey", "Farklı ölçülerde üretim", "Kurumsal siparişe uygun"],
    uses: ["Sanayi işletmeleri", "Depolama alanları", "Üretim hatları", "Genel kullanım"]
  },
  {
    name: "Plastik Ürün 2",
    image: "assets/images/product-2.svg",
    short: "Hafif, pratik ve uzun ömürlü kullanım için geliştirilen ürün seçeneği.",
    description: "Plastik Ürün 2; taşıma, düzenleme ve yardımcı üretim ihtiyaçlarında tercih edilebilecek verimli bir çözümdür.",
    specs: ["Hafif gövde", "Ekonomik çözüm", "Seri üretime uygun", "Kolay stoklanabilir"],
    uses: ["Lojistik", "Atölye kullanımı", "Perakende", "Tedarik süreçleri"]
  },
  {
    name: "Plastik Ürün 3",
    image: "assets/images/product-3.svg",
    short: "Estetik görünüm ve sağlam üretimi bir araya getiren modern plastik ürün.",
    description: "Plastik Ürün 3; hem görsel kalite hem de uzun süreli kullanım beklentisi olan firmalar için geliştirilmiş örnek ürün grubudur.",
    specs: ["Modern tasarım", "Dayanıklı malzeme", "Renk seçeneği", "Uzun ömürlü kullanım"],
    uses: ["Mağaza ekipmanları", "Kurumsal kullanım", "Üretim destek ürünleri", "Tanıtım ürünleri"]
  },
  {
    name: "Özel Üretim Ürünler",
    image: "assets/images/product-4.svg",
    short: "İhtiyacınıza özel ölçü, adet ve kullanım alanına göre üretim çözümleri.",
    description: "Özel Üretim Ürünler; firmanızın talebine göre ölçü, form, renk ve kullanım senaryosu dikkate alınarak planlanır.",
    specs: ["Talebe özel ölçü", "Renk ve form seçeneği", "Proje bazlı üretim", "Teklif odaklı planlama"],
    uses: ["Özel projeler", "Kurumsal tedarik", "Sanayi uygulamaları", "Markaya özel çözümler"]
  }
];

const productGrid = document.querySelector("#productGrid");
const modal = document.querySelector("#productModal");
const modalImage = document.querySelector("#modalImage");
const modalTitle = document.querySelector("#modalTitle");
const modalDescription = document.querySelector("#modalDescription");
const modalSpecs = document.querySelector("#modalSpecs");
const modalUses = document.querySelector("#modalUses");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#navMenu");
const form = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");

function renderProducts() {
  productGrid.innerHTML = products.map((product, index) => `
    <article class="product-card reveal">
      <img src="${product.image}" alt="${product.name} görseli" loading="lazy" width="420" height="315">
      <div class="product-body">
        <h3>${product.name}</h3>
        <p>${product.short}</p>
        <button class="btn btn-secondary" type="button" data-product-index="${index}">Detayları Gör</button>
      </div>
    </article>
  `).join("");
}

function openProductModal(index) {
  const product = products[index];
  modalImage.src = product.image;
  modalImage.alt = `${product.name} detay görseli`;
  modalTitle.textContent = product.name;
  modalDescription.textContent = product.description;
  modalSpecs.innerHTML = product.specs.map(item => `<li>${item}</li>`).join("");
  modalUses.innerHTML = product.uses.map(item => `<li>${item}</li>`).join("");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

renderProducts();

document.addEventListener("click", event => {
  const productButton = event.target.closest("[data-product-index]");
  if (productButton) openProductModal(productButton.dataset.productIndex);

  if (event.target.closest("[data-close-modal]")) closeProductModal();

  if (event.target.closest(".nav-menu a")) {
    navMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) closeProductModal();
});

form.addEventListener("submit", event => {
  event.preventDefault();

  if (!form.checkValidity()) {
    formNote.textContent = "Lütfen tüm alanları doğru şekilde doldurun.";
    form.reportValidity();
    return;
  }

  const data = new FormData(form);
  const name = encodeURIComponent(data.get("name"));
  const phone = encodeURIComponent(data.get("phone"));
  const email = encodeURIComponent(data.get("email"));
  const message = encodeURIComponent(data.get("message"));

  const mailto = `mailto:info@yildirimplastik.com?subject=Web Sitesi Teklif Talebi&body=Ad Soyad: ${name}%0ATelefon: ${phone}%0AE-posta: ${email}%0A%0AMesaj:%0A${message}`;
  window.location.href = mailto;

  formNote.textContent = "Mesajınız e-posta uygulamanıza aktarıldı. Mail adresini değiştirince burası gerçek firmaya göre çalışır.";
  form.reset();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

function observeRevealElements() {
  document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
}

observeRevealElements();
document.querySelector("#year").textContent = new Date().getFullYear();
