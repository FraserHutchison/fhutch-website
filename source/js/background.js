document.addEventListener('DOMContentLoaded', () => {
    const images = [
        '/background/background-img-01.png',
        '/background/background-img-02.png',
        '/background/background-img-03.png',
        '/background/background-img-04.png',
        '/background/background-img-05.png',
        '/background/background-img-06.png',
        '/background/background-img-07.png',
        '/background/background-img-08.png',
        '/background/background-img-09.png',
        '/background/background-img-10.png',
    ];

    const container = document.getElementById('background-container');
    let imageSize = 50; // Default size of each image in pixels
    const gridSpacing = 3; // Number of images between each image
    const enableRandomRotation = true; // Toggle for random rotation
    const enableRandomOffset = true; // Toggle for random offset
    const mouseRadius = 150; // Radius for the hover effect
    const iconOpacity = 0.04; // Minimum opacity for the hover effect

    if (!container) {
        return; // Exit if the container element is not found
    }

    if (window.innerWidth <= 600) {
        imageSize = 50; // Smaller size for mobile devices
    }

    function getRandomImage() {
        return images[Math.floor(Math.random() * images.length)];
    }

    function createImageElement(src) {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('background-image');
        img.style.width = `${imageSize}px`;
        img.style.height = `${imageSize}px`;

        applyRandomAnimations(img);

        if (enableRandomRotation) {
            img.style.transform = `rotate(${Math.random() * 360}deg)`; // Random rotation
        }
        return img;
    }

    function applyRandomAnimations(img) {
        const wobbleAnimationName = `wobble-${Math.random().toString(36).substr(2, 9)}`;
        const glideAnimationName = `glide-${Math.random().toString(36).substr(2, 9)}`;

        const wobbleKeyframes = `
            @keyframes ${wobbleAnimationName} {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(${Math.random() * 10 - 5}deg); }
                50% { transform: rotate(${Math.random() * 10 - 5}deg); }
                75% { transform: rotate(${Math.random() * 10 - 5}deg); }
            }
        `;

        const glideKeyframes = `
            @keyframes ${glideAnimationName} {
                0% { transform: translate(0, 0); }
                100% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px); }
            }
        `;

        const styleSheet = document.styleSheets[0];
        styleSheet.insertRule(wobbleKeyframes, styleSheet.cssRules.length);
        styleSheet.insertRule(glideKeyframes, styleSheet.cssRules.length);

        const glideDuration = `${Math.random() * 5 + 3}s`; // Random duration between 3s and 8s
        const glideDelay = `${Math.random() * 5}s`; // Random delay for glide only
        
        img.style.animation = `${wobbleAnimationName} 1s infinite, ${glideAnimationName} ${glideDuration} infinite alternate ${glideDelay}`;
    }

    function fillContainerWithImages() {
        const columns = Math.ceil(window.innerWidth / imageSize) + 4; // Add extra columns for off-screen images
        const rows = Math.ceil(window.innerHeight / imageSize) + 4; // Add extra rows for off-screen images

        for (let row = -gridSpacing; row < rows; row += gridSpacing) {
            for (let col = -gridSpacing; col < columns; col += gridSpacing) {
                const imgSrc = getRandomImage();
                const imgElement = createImageElement(imgSrc);
                positionImageElementRandomly(imgElement, row, col);
                container.appendChild(imgElement);
            }
        }
    }

    function positionImageElementRandomly(imgElement, row, col) {
        // Start with random positions instead of grid positions
        const baseX = col * imageSize;
        const baseY = row * imageSize;
        
        // Add larger random offset so images start scattered
        const xOffset = (Math.random() - 0.5) * imageSize * 2; // Larger random offset
        const yOffset = (Math.random() - 0.5) * imageSize * 2; // Larger random offset
        
        imgElement.style.top = `${baseY + yOffset}px`;
        imgElement.style.left = `${baseX + xOffset}px`;
    }
    function positionImageElement(imgElement, row, col) {
        if (enableRandomOffset) {
            const xOffset = (Math.random() - 0.5) * imageSize; // Random x offset
            const yOffset = (Math.random() - 0.5) * imageSize; // Random y offset
            imgElement.style.top = `${row * imageSize + yOffset}px`;
            imgElement.style.left = `${col * imageSize + xOffset}px`;
        } else {
            imgElement.style.top = `${row * imageSize}px`;
            imgElement.style.left = `${col * imageSize}px`;
        }
    }

    function updateImageOnMouse(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const images = document.querySelectorAll('.background-image');
        images.forEach(img => {
            const rect = img.getBoundingClientRect();
            const imgX = rect.left + rect.width / 2;
            const imgY = rect.top + rect.height / 2;
            const distance = Math.sqrt((mouseX - imgX) ** 2 + (mouseY - imgY) ** 2);

            // Calculate the grayscale & opacity linear falloff from mouse position
            const grayscale = Math.min(100, (distance / mouseRadius) * 100);
            const opacity = Math.max(iconOpacity, 1 - (distance / mouseRadius));
            img.style.filter = `grayscale(${grayscale}%)`;
            img.style.opacity = opacity;
        });
    }

    function updateImageOnTouch(event) {
        const touch = event.touches[0];
        if (touch) {
            updateImageOnMouse({
                clientX: touch.clientX,
                clientY: touch.clientY
            });
        }
    }

    fillContainerWithImages();
    document.addEventListener('mousemove', updateImageOnMouse);
});