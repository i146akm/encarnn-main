document.addEventListener("DOMContentLoaded", function () {
    const titles = document.querySelectorAll('.car-detail-bottom-title');

    titles.forEach(title => {
        title.addEventListener('click', () => {
            const ul = title.nextElementSibling;
            const toggleBtn = title.querySelector('.bottom-toggle');

            if (ul && ul.tagName.toLowerCase() === 'ul') {
                const isVisible = ul.style.display === 'flex';
                ul.style.display = isVisible ? 'none' : 'flex';

                // Вращаем кнопку, если она есть
                if (toggleBtn) {
                    toggleBtn.classList.toggle('rotate', !isVisible);
                }
            }
        });
    });
});

const now = new Date();

const day = String(now.getDate()).padStart(2, '0');
const month = String(now.getMonth() + 1).padStart(2, '0'); // +1, т.к. месяцы с 0
const year = now.getFullYear();

const formattedDate = `${day}-${month}-${year}`;
const datetime_now = document.querySelectorAll('.datetime_now')

datetime_now.forEach(i => {
    i.textContent = formattedDate;
});

function setupToggle(buttonSelector, blockSelector) {
    const button = document.querySelector(buttonSelector);
    const block = document.querySelector(blockSelector);

    if (!button || !block) return;
            button.addEventListener('click', () => {
            block.classList.toggle('hidden');
            button.classList.toggle('clicked')
        });
    }


document.addEventListener("DOMContentLoaded", function () {
  const mainPhoto = document.getElementById("mainPhoto");
  const thumbs = document.querySelectorAll(".thumb");

  thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      mainPhoto.src = thumb.src;
      thumbs.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
    });
  });
});
setupToggle('#toggleButton', '#toggleBlock');
