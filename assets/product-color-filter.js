class ProductColorFilter {
  constructor() {
    this.initializeFilter();
  }

  initializeFilter() {
    this.colorInputs = document.querySelectorAll('input.swatch[data-color]');

    this.slides = document.querySelectorAll('.swiper-slide');

    const swiperElement = document.querySelector('.product-gallery-swiper');
    this.swiper = swiperElement?.swiper;


    this.colorInputs.forEach(input => {
      input.addEventListener('change', (event) => {
        const selectedColor = event.target.dataset.color?.toLowerCase().trim();
        this.filterSlides(selectedColor);
      });
    });

    this.labelsInit();
  }

  labelsInit() {
    const labels = document.querySelectorAll('label[for^="swatch-"]')

    labels.forEach(label => {
      label.addEventListener('click', (event) => {
        const swatch = document.querySelector(`#${label.getAttribute('for')}`);
        if (swatch) {
          const selectedColor = swatch.dataset.color?.toLowerCase().trim();
          this.filterSlides(selectedColor);
        }
      });
    });

    if (this.colorInputs.length > 0) {
      const firstSwatch = this.colorInputs[0];
      firstSwatch.checked = true;
      this.filterSlides(firstSwatch.dataset.color?.toLowerCase().trim());
    }
  }

  filterSlides(selectedColor) {
    if (!selectedColor) {
      console.warn('No color selected, showing all slides');
      this.showAllSlides();
      return;
    }

    console.log('Filtering slides for color:', selectedColor);
    let firstVisibleSlideIndex = null;
    let visibleSlidesCount = 0;

    this.slides.forEach((slide, index) => {
      const img = slide.querySelector('img[data-media-alt]');
      const mediaColor = img ? img.getAttribute('data-media-alt')?.toLowerCase().trim() : null;
      

      if (mediaColor === selectedColor) {
        slide.style.display = '';
        visibleSlidesCount++;
        if (firstVisibleSlideIndex === null) {
          firstVisibleSlideIndex = index;
        }
      } else {
        slide.style.display = 'none';
      }
    });

    if (this.swiper) {
      this.swiper.update();
      if (firstVisibleSlideIndex !== null) {
        this.swiper.slideTo(firstVisibleSlideIndex, 0);
      }
    }

    if (visibleSlidesCount === 0) {
      console.warn('No slides visible, showing all');
      this.showAllSlides();
    }
  }

  showAllSlides() {
    this.slides.forEach(slide => {
      slide.style.display = '';
    });

    if (this.swiper) {
      this.swiper.update();
      this.swiper.slideTo(0, 0);
    }
  }
}

new ProductColorFilter(); 