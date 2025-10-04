const imageData = [
    { id: 1, src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3', title: 'Mountain Landscape', description: 'Beautiful mountain view with clouds', category: 'nature' },
    { id: 2, src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3', title: 'Modern House', description: 'Contemporary architecture design', category: 'architecture' },
    { id: 3, src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3', title: 'Nature Reserve', description: 'Scenic view of a natural landscape', category: 'nature' },
    { id: 4, src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3', title: 'Delicious Meal', description: 'Gourmet food presentation', category: 'food' },
    { id: 5, src: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3', title: 'Artistic Composition', description: 'Creative art piece with vibrant colors', category: 'art' },
    { id: 6, src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3', title: 'Travel Destination', description: 'Beautiful location for travelers', category: 'travel' },
    { id: 7, src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3', title: 'City Skyline', description: 'Urban landscape at dusk', category: 'architecture' },
    { id: 8, src: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixlib=rb-4.0.3', title: 'Forest Path', description: 'Serene walk through the woods', category: 'nature' },
    { id: 9, src: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3', title: 'Gourmet Dish', description: 'Exquisitely prepared meal', category: 'food' },
    { id: 10, src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3', title: 'Abstract Art', description: 'Colorful abstract painting', category: 'art' },
    { id: 11, src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3', title: 'Travel Adventure', description: 'Exploring new destinations', category: 'travel' },
    { id: 12, src: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3', title: 'Architectural Detail', description: 'Intricate building design', category: 'architecture' }
];

class ImageGallery {
    constructor() {
        this.currentImages = [...imageData];
        this.filteredImages = [...imageData];
        this.currentIndex = 0;
        this.autoplayInterval = null;
        
        this.initializeElements();
        this.initializeGallery();
        this.setupEventListeners();
    }

    initializeElements() {
      
        this.gallery = document.getElementById('imageGallery');
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightboxImage');
        this.lightboxCaption = document.getElementById('lightboxCaption');
        this.lightboxClose = document.getElementById('lightboxClose');
        this.lightboxPrev = document.getElementById('lightboxPrev');
        this.lightboxNext = document.getElementById('lightboxNext');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.searchBox = document.querySelector('.search-box');
        this.loadMoreBtn = document.getElementById('loadMore');
        this.autoplayStart = document.getElementById('autoplayStart');
        this.autoplayStop = document.getElementById('autoplayStop');
    }

    initializeGallery() {
        this.renderGallery(this.currentImages);
    }

 
    renderGallery(images) {
        this.gallery.innerHTML = '';
        
        images.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item ${image.category}`;
            galleryItem.setAttribute('data-category', image.category);
            
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.title}" class="gallery-img">
                <div class="category-tag">${image.category}</div>
                <div class="gallery-caption">
                    <h3>${image.title}</h3>
                    <p>${image.description}</p>
                </div>
            `;
            
            galleryItem.addEventListener('click', () => this.openLightbox(index));
            this.gallery.appendChild(galleryItem);
        });
    }

    setupEventListeners() {
   
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.filterImages(filter);
                
           
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
  
        this.searchBox.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            this.filterBySearch(searchTerm);
        });
        
        this.lightboxClose.addEventListener('click', () => this.closeLightbox());
        this.lightboxPrev.addEventListener('click', () => this.showPrevImage());
        this.lightboxNext.addEventListener('click', () => this.showNextImage());
      
        document.addEventListener('keydown', (e) => {
            if (this.lightbox.classList.contains('active')) {
                if (e.key === 'Escape') this.closeLightbox();
                if (e.key === 'ArrowLeft') this.showPrevImage();
                if (e.key === 'ArrowRight') this.showNextImage();
            }
        });
        
    
        this.loadMoreBtn.addEventListener('click', () => this.loadMoreImages());
        
    
        this.autoplayStart.addEventListener('click', () => this.startAutoplay());
        this.autoplayStop.addEventListener('click', () => this.stopAutoplay());
    }

    filterImages(category) {
        if (category === 'all') {
            this.filteredImages = [...this.currentImages];
        } else {
            this.filteredImages = this.currentImages.filter(image => image.category === category);
        }
        this.renderGallery(this.filteredImages);
    }

    filterBySearch(term) {
        if (term === '') {
            this.filteredImages = [...this.currentImages];
        } else {
            this.filteredImages = this.currentImages.filter(image => 
                image.title.toLowerCase().includes(term) || 
                image.description.toLowerCase().includes(term) ||
                image.category.toLowerCase().includes(term)
            );
        }
        this.renderGallery(this.filteredImages);
    }

    openLightbox(index) {
        this.currentIndex = index;
        this.updateLightbox();
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
        this.stopAutoplay();
    }

    showPrevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.filteredImages.length) % this.filteredImages.length;
        this.updateLightbox();
    }

    showNextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.filteredImages.length;
        this.updateLightbox();
    }

   
    updateLightbox() {
        const image = this.filteredImages[this.currentIndex];
        this.lightboxImage.src = image.src;
        this.lightboxImage.alt = image.title;
        this.lightboxCaption.innerHTML = `
            <h3>${image.title}</h3>
            <p>${image.description}</p>
            <p><strong>Category:</strong> ${image.category}</p>
        `;
    }

    loadMoreImages() {
        
        const moreImages = [
            { id: 13, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3', title: 'Mountain Peak', description: 'Snow-covered mountain top', category: 'nature' },
            { id: 14, src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3', title: 'Urban Architecture', description: 'City buildings and structures', category: 'architecture' },
            { id: 15, src: 'https://images.unsplash.com/photo-1464822759844-d62ea929ef23?ixlib=rb-4.0.3', title: 'Winter Wonderland', description: 'Snowy landscape with trees', category: 'nature' }
        ];
        
        this.currentImages.push(...moreImages);
        this.filteredImages.push(...moreImages);
        this.renderGallery(this.filteredImages);
        
        
        this.loadMoreBtn.textContent = 'No More Images Available';
        this.loadMoreBtn.disabled = true;
    }


    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.showNextImage();
        }, 3000);
        
        this.autoplayStart.style.display = 'none';
        this.autoplayStop.style.display = 'block';
    }

  
    stopAutoplay() {
        clearInterval(this.autoplayInterval);
        this.autoplayStart.style.display = 'block';
        this.autoplayStop.style.display = 'none';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new ImageGallery();
});