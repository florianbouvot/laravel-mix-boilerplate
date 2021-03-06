import Alpine from 'alpinejs'
import baguetteBox from 'baguettebox.js'
import ScrollReveal from 'scrollreveal'

window.Alpine = Alpine
Alpine.start()

baguetteBox.run('.js-gallery');

ScrollReveal().reveal('[data-tada]', {
  duration: 900,
  scale: 0.75,
  delay: 100,
  distance: '50%',
});

ScrollReveal().reveal('[data-tada]:first-child', {
  delay: 0,
});
