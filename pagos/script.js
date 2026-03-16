const cards = document.querySelectorAll('.card');
const payBtn = document.getElementById('payBtn');
const selectedStars = document.getElementById('selectedStars');

cards.forEach(card => {
  card.addEventListener('click', () => {

    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    const stars = card.dataset.stars;
    const price = card.dataset.price;

    selectedStars.textContent = `⭐ ${stars}`;
    payBtn.textContent = `Recargar por $${price}`;
  });
});