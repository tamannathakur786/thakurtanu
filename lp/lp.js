/**
 * Riwaaz Clothing - Google Ads Landing Page Logic
 * Dedicated Hotline: +91 8580540470
 */

document.addEventListener("DOMContentLoaded", () => {
  const WHATSAPP_PHONE = "918580540470";

  // Parse UTM / Google Ads query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get("utm_source") || "google";
  const utmCampaign = urlParams.get("utm_campaign") || "festive_wedding_2026";
  const utmTerm = urlParams.get("utm_term") || "";
  const gclid = urlParams.get("gclid") || "";

  // 1. Live Countdown Timer (Set for 4 hours rolling cycle)
  const initCountdown = () => {
    let duration = 4 * 3600 + 42 * 60 + 18; // 4h 42m 18s
    const hoursEl = document.getElementById("timerHours");
    const minsEl = document.getElementById("timerMins");
    const secsEl = document.getElementById("timerSecs");

    if (!hoursEl || !minsEl || !secsEl) return;

    setInterval(() => {
      duration--;
      if (duration < 0) duration = 4 * 3600;

      const h = Math.floor(duration / 3600);
      const m = Math.floor((duration % 3600) / 60);
      const s = Math.floor(duration % 60);

      hoursEl.textContent = String(h).padStart(2, "0");
      minsEl.textContent = String(m).padStart(2, "0");
      secsEl.textContent = String(s).padStart(2, "0");
    }, 1000);
  };

  initCountdown();

  // 2. Open WhatsApp Helper
  const openWhatsApp = (msg) => {
    const encoded = encodeURIComponent(msg.trim());
    const link = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
    window.open(link, "_blank");
  };

  // 3. Lead Capture Form Submission
  const leadForm = document.getElementById("lpLeadForm");
  leadForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("lpName")?.value.trim();
    const phone = document.getElementById("lpPhone")?.value.trim();
    const category = document.getElementById("lpCategory")?.value;
    const date = document.getElementById("lpDate")?.value;

    let sourceInfo = "Google Ads";
    if (utmCampaign) sourceInfo += ` (${utmCampaign})`;
    if (utmTerm) sourceInfo += ` [Keyword: ${utmTerm}]`;

    const message = `
👑 *GOOGLE ADS EXCLUSIVE INQUIRY - RIWAAZ CLOTHING* 👑
------------------------------------------------------
Hello Riwaaz Team, I clicked your Google Ad and would like to claim the 10% Festive Discount (Code: RIWAAZ10) and connect with a stylist!

👤 *Client Name*: ${name}
📞 *WhatsApp Number*: ${phone}
👗 *Interested In*: ${category}
📅 *Needed By Date*: ${date || "Flexible"}
🎟️ *Promo Code Applied*: RIWAAZ10 (Extra 10% OFF + Free Fall-Pico)
📍 *Ad Campaign*: ${sourceInfo}

Please confirm fabric availability and share video clips of the current designs!
    `.trim();

    openWhatsApp(message);
  });

  // 4. Product Card Inquiries
  window.orderProductOnWhatsApp = (title, price, discount, fabric) => {
    const message = `
✨ *GOOGLE AD SPECIAL ORDER - RIWAAZ CLOTHING* ✨
------------------------------------------------
Hello Riwaaz Designer Team, I would like to order this outfit featured on your Google Ad:

👗 *Product*: ${title}
💵 *Offer Price*: ₹${Number(price).toLocaleString("en-IN")} (${discount} OFF)
🧵 *Fabric*: ${fabric}
🎁 *Special Offer*: Extra 10% OFF (Code: RIWAAZ10) + Free Express Shipping

Could you please confirm available sizes and share a quick WhatsApp fabric video before dispatch?

Thank you!
    `.trim();

    openWhatsApp(message);
  };

  // 5. Scroll to Form Helper
  window.scrollToLeadForm = () => {
    document.getElementById("leadFormCard")?.scrollIntoView({ behavior: "smooth" });
  };

  // 6. FAQ Accordion Toggle
  document.querySelectorAll(".lp-faq-header").forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const isActive = item.classList.contains("active");

      document.querySelectorAll(".lp-faq-item").forEach((f) => f.classList.remove("active"));

      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
});
