const carvingPattern = document.getElementById('carvingPattern');
const fallingPieces = document.getElementById('fallingPieces');
const carvingProgress = document.getElementById('carvingProgress');
const designButtons = document.querySelectorAll('.carving-design');
const resetCarvingButton = document.getElementById('resetCarving');
const scrapCountLabel = document.getElementById('scrapCount');

const carvingDesigns = {
    grin: [
        { label: 'Left eye', path: 'M130 148 L184 158 L157 198 Z' },
        { label: 'Right eye', path: 'M256 158 L310 148 L283 198 Z' },
        { label: 'Nose', path: 'M220 190 L239 220 L220 232 L201 220 Z' },
        { label: 'Grinning mouth', path: 'M145 247 L169 235 L190 247 L211 235 L232 247 L253 235 L275 247 L295 239 L281 278 L263 287 L245 278 L226 288 L207 278 L188 287 L169 278 Z' }
    ],
    cat: [
        { label: 'Left cat eye', path: 'M137 171 C150 151 172 151 187 170 C173 188 151 190 137 171 Z' },
        { label: 'Right cat eye', path: 'M253 170 C268 151 290 151 303 171 C289 190 267 188 253 170 Z' },
        { label: 'Cat nose', path: 'M209 207 L231 207 L220 221 Z' },
        { label: 'Left whiskers', path: 'M153 212 L197 222 L196 228 L151 221 Z M151 234 L195 232 L195 238 L152 243 Z' },
        { label: 'Right whiskers', path: 'M243 222 L287 212 L289 221 L244 228 Z M245 232 L288 234 L287 243 L244 238 Z' }
    ],
    moon: [
        { label: 'Crescent moon', path: 'M245 139 C217 147 202 176 207 202 C211 226 231 243 255 245 C233 228 229 199 239 175 C245 161 255 150 269 144 C261 140 253 138 245 139 Z' },
        { label: 'Left star', path: 'M151 192 L158 207 L174 209 L162 220 L165 236 L151 228 L137 236 L140 220 L128 209 L144 207 Z' },
        { label: 'Right star', path: 'M310 192 L317 207 L333 209 L321 220 L324 236 L310 228 L296 236 L299 220 L287 209 L303 207 Z' }
    ]
};

let selectedDesign = 'grin';
let carvedCount = 0;
let scrapCount = 0;

function updateProgress() {
    const totalCuts = carvingDesigns[selectedDesign].length;
    carvingProgress.textContent = carvedCount === totalCuts
        ? 'Lantern complete! Choose another design or reset to carve again.'
        : `${carvedCount} of ${totalCuts} cuts carved`;
}

function carvePiece(piece) {
    if (piece.classList.contains('is-carved')) return;

    dropCarvedPiece(piece);
    piece.classList.add('is-carved');
    piece.setAttribute('aria-pressed', 'true');
    carvedCount += 1;
    scrapCount += 1;
    scrapCountLabel.textContent = String(scrapCount);
    updateProgress();
}

function dropCarvedPiece(piece) {
    const bounds = piece.getBBox();
    const centerX = bounds.x + bounds.width / 2;
    const centerY = bounds.y + bounds.height / 2;
    const fragment = piece.cloneNode(false);
    const startTime = performance.now();
    const duration = 850;

    fragment.setAttribute('class', 'carved-fragment');
    fragment.removeAttribute('tabindex');
    fragment.removeAttribute('role');
    fragment.removeAttribute('aria-label');
    fragment.removeAttribute('aria-pressed');
    fallingPieces.append(fragment);

    function animateFragment(time) {
        const progress = Math.min((time - startTime) / duration, 1);
        const easedProgress = 1 - (1 - progress) ** 3;
        const x = centerX + (393 - centerX) * easedProgress;
        const y = centerY + (328 - centerY) * progress + 42 * Math.sin(Math.PI * progress);
        const rotation = 210 * easedProgress;
        const scale = 1 - 0.72 * easedProgress;

        fragment.setAttribute('transform', `translate(${x} ${y}) rotate(${rotation}) scale(${scale}) translate(${-centerX} ${-centerY})`);

        if (progress < 1) {
            requestAnimationFrame(animateFragment);
        } else {
            fragment.remove();
        }
    }

    requestAnimationFrame(animateFragment);
}

function drawDesign(design) {
    selectedDesign = design;
    carvedCount = 0;
    carvingPattern.replaceChildren();

    carvingDesigns[design].forEach(({ label, path }) => {
        const piece = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        piece.setAttribute('class', 'carving-piece');
        piece.setAttribute('d', path);
        piece.setAttribute('tabindex', '0');
        piece.setAttribute('role', 'button');
        piece.setAttribute('aria-label', `Carve ${label}`);
        piece.setAttribute('aria-pressed', 'false');
        piece.addEventListener('click', () => carvePiece(piece));
        piece.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                carvePiece(piece);
            }
        });
        carvingPattern.append(piece);
    });

    designButtons.forEach((button) => {
        const isSelected = button.dataset.design === design;
        button.classList.toggle('is-selected', isSelected);
        button.setAttribute('aria-pressed', String(isSelected));
    });

    updateProgress();
}

designButtons.forEach((button) => {
    button.addEventListener('click', () => drawDesign(button.dataset.design));
});

resetCarvingButton.addEventListener('click', () => drawDesign(selectedDesign));

drawDesign(selectedDesign);
