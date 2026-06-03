// Central Service Data Definition Matrix
const serviceDataCatalog = [
    {
        id: "hair-sculpting",
        title: "Luxury Hair Sculpting",
        description: "Bespoke cuts, master color corrections, and artistic structural styling tailored exclusively to your face shape and personal style profiles.",
        features: ["Precision Scissor Artistry", "Organic Conditioning Glazes", "Custom Texturizing Therapies", "Structural Blowouts"],
        image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "skin-rejuvenation",
        title: "Elite Skin Rejuvenation",
        description: "Advanced clinical facials and therapeutic dermatological masques designed to purify your skin and restore cellular hydration.",
        features: ["Deep Pore Extractions", "Microcurrent Cellular Lifting", "Hyaluronic Hydration Infusions", "LED Photo-Biomodulation"],
        image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "nail-artistry",
        title: "Spa Manicure & Nail Art",
        description: "Precision cuticle maintenance and structural extension overlays complete with hand-painted, avant-garde aesthetic styling.",
        features: ["Gel-Extension Sculpting", "Botanical Scrub Exfoliation", "Paraffin Hydration Wraps", "Custom Hand-Painted Line Work"],
        image: "https://images.unsplash.com/photo-1604654894610-df490651e56c?auto=format&fit=crop&w=600&q=80"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    compileDesktopTabs();
    compileMobileAccordion();
    
    // Set default open state for index zero nodes
    activateTab(serviceDataCatalog[0].id);
});

// --- Desktop Implementation Pipeline ---
function compileDesktopTabs() {
    const strip = document.getElementById('desktopTabStrip');
    
    strip.innerHTML = serviceDataCatalog.map((service, idx) => `
        <button class="tab-trigger" id="trigger-${service.id}" onclick="activateTab('${service.id}')">
            ${service.title}
        </button>
    `).join('');
}

function activateTab(id) {
    document.querySelectorAll('.tab-trigger').forEach(btn => btn.classList.remove('active-tab'));
    
    const targetTrigger = document.getElementById(`trigger-${id}`);
    if(targetTrigger) targetTrigger.classList.add('active-tab');

    const activeRecord = serviceDataCatalog.find(s => s.id === id);
    const viewport = document.getElementById('desktopViewport');
    
    viewport.innerHTML = `
        <div class="panel-grid">
            <div class="panel-details">
                <h3>${escapeHtml(activeRecord.title)}</h3>
                <p>${escapeHtml(activeRecord.description)}</p>
                <ul class="feature-list">
                    ${activeRecord.features.map(f => `<li>${escapeHtml(f)}</li>`).join('')}
                </ul>
            </div>
            <div class="panel-media">
                <img src="${escapeHtml(activeRecord.image)}" alt="${escapeHtml(activeRecord.title)} Illustration">
            </div>
        </div>
    `;
}

// --- Mobile Implementation Pipeline ---
function compileMobileAccordion() {
    const stack = document.getElementById('mobileAccordionStack');
    
    stack.innerHTML = serviceDataCatalog.map(service => `
        <div class="accordion-item" id="item-${service.id}">
            <button class="accordion-header" onclick="toggleAccordionItem('${service.id}')">
                <span>${service.title}</span>
                <span class="icon-marker">+</span>
            </button>
            <div class="accordion-body" id="body-${service.id}">
                <div class="accordion-inner-content">
                    <div class="panel-grid">
                        <div class="panel-details">
                            <p>${escapeHtml(service.description)}</p>
                            <ul class="feature-list">
                                ${service.features.map(f => `<li>${escapeHtml(f)}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="panel-media">
                            <img src="${escapeHtml(service.image)}" alt="${escapeHtml(service.title)}">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleAccordionItem(id) {
    const targetItem = document.getElementById(`item-${id}`);
    const targetBody = document.getElementById(`body-${id}`);
    const isCurrentlyActive = targetItem.classList.contains('active-item');

    // Close all open item tracks to enforce single-panel display constraints
    document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active-item');
    });
    document.querySelectorAll('.accordion-body').forEach(body => {
        body.style.height = "0px";
    });

    if (!isCurrentlyActive) {
        targetItem.classList.add('active-item');
        // Calculate the raw scroll height of the internal elements wrapper block dynamically
        const internalHeight = targetBody.querySelector('.accordion-inner-content').scrollHeight;
        targetBody.style.height = internalHeight + "px";
    }
}

function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
